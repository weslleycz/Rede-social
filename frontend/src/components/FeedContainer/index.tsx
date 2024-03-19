import { ReactNode, useEffect, useState } from "react";
import { Menu } from "@/components/Menu";
import { Box, Grid, useMediaQuery } from "@mui/material";
import { MobileMenu } from "../MobileMenu";
import { useQuery } from "react-query";
import { api } from "@/services/api";
import { getCookie } from "cookies-next";
import { Friend } from "../Friend";

type Props = {
  children: ReactNode;
};

export const FeedContainer = ({ children }: Props) => {
  const [isLoadingFeed, setIsLoadingFeed] = useState(true);
  const matches = useMediaQuery("(min-width:900px)");

  const { data, isLoading, isError, refetch } = useQuery(
    "getFriends",
    async () => {
      const res = await api.get(`/user/listFriends/${getCookie("id")}`);
      return res.data as any[];
    }
  );

  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setIsLoadingFeed(false);
    }, 100);
    return () => clearTimeout(loadingTimeout);
  }, []);

  return (
    <>
      {isLoadingFeed ? null : (
        <>
          {matches ? (
            <Grid container>
              <Grid item xs>
                <Box
                  sx={{
                    height: "85vh",
                    borderRadius: 0,
                    background: "#ffffff",
                    display: "flex",
                    position: "sticky",
                    top: 0,
                  }}
                >
                  <Menu />
                </Box>
              </Grid>

              <Grid item xs={8}>
                {children}
              </Grid>

              <Grid item xs>
                <Box
                  sx={{
                    height: "85vh",
                    borderRadius: 0,
                    background: "#ffff",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "sticky",
                    top: 0,
                    zIndex: 1000,
                    width: "100%",
                  }}
                >
                  {data?.map((user, index) => (
                    <div key={index}>
                      <Friend
                        avatar={user.id}
                        subtitle="ghjghj"
                        title={user.name}
                        isOnline={user.status === "Online"}
                      />
                    </div>
                  ))}
                </Box>
              </Grid>
            </Grid>
          ) : (
            <>
              {children}
              <MobileMenu />
            </>
          )}
        </>
      )}
    </>
  );
};
