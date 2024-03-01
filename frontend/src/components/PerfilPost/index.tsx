import { api } from "@/services/api";
import { useQuery } from "react-query";
import { Post } from "../Post";
import { Box, Skeleton } from "@mui/material";

type Props = {
  id: string;
};

export const PerfilPost = ({ id }: Props) => {
  const { data, isLoading, isError, refetch } = useQuery(
    "getPosts",
    async () => {
      const res = await api.get(`/post/user/${id}`);
      return res.data;
    }
  );
  return (
    <>
      <Box marginBottom={2} p={1}>
        <Box
          sx={{
            borderRadius: 0,
            background: "#ffffff0",
            position: "relative",
            zIndex: 1,
            overflowY: "auto",
            maxHeight: "80vh",
            "::-webkit-scrollbar": {
              backgroundColor: "#ff00000",
            },
          }}
        >
          <Box marginBottom={20}>
            {isLoading ? (
              <>
                <Skeleton variant="rounded" width={"100%"} height={100} />
                <Skeleton
                  variant="rounded"
                  sx={{ marginTop: 1 }}
                  width={"100%"}
                  height={100}
                />
                <Skeleton
                  variant="rounded"
                  sx={{ marginTop: 1 }}
                  width={"100%"}
                  height={100}
                />
                <Skeleton
                  variant="rounded"
                  sx={{ marginTop: 1 }}
                  width={"100%"}
                  height={100}
                />
              </>
            ) : (
              <>
                {data.map((item: any, i: number) => (
                  <div key={i}>
                    <Post {...item} />
                  </div>
                ))}
              </>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
};
