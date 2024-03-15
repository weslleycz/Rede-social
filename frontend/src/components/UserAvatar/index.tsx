import { Avatar } from "@mui/material";

type Props = {
  name: string;
  id: string;
};

export const UserAvatar = ({ id, name }: Props) => {
  return (
    <>
      <Avatar alt={name} src={id} />
    </>
  );
};
