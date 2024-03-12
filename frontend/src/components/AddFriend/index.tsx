import { Box, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { getCookie } from "cookies-next";
import { User } from "../../../types/user";
import { api } from "@/services/api";
import { useEffect, useState } from "react";

type Props = {
  user: User | undefined;
};

export const AddFriend = ({ user }: Props) => {
  const [isFriend, setIsFriend] = useState(false);
  const [isEffectExecuted, setIsEffectExecuted] = useState(false);

  useEffect(() => {
    setIsFriend(
      user?.friendOf.map((friend) => friend.id).indexOf(getCookie("id")) === -1
    );
    setIsEffectExecuted(true);
  }, [user?.friendOf]);

  const handleAdd = async () => {
    try {
      setIsFriend(!isFriend);
      await api.get(`/user/addFriend/${user?.id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = async () => {
    try {
      setIsFriend(!isFriend);
      await api.get(`/user/cancelFriend/${user?.id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {isEffectExecuted && getCookie("id") !== user?.id ? (
        <>
          {isFriend ? (
            <Button
              variant="contained"
              color="primary"
              size="large"
              startIcon={<AddIcon />}
              onClick={() => handleAdd()}
            >
              Adicionar amigo
            </Button>
          ) : (
            <Button
              variant="contained"
              color="error"
              size="large"
              startIcon={<CloseIcon />}
              onClick={() => handleCancel()}
            >
              Cancelar amizade
            </Button>
          )}
        </>
      ) : null}
    </>
  );
};
