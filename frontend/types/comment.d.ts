export type IComment = {
  user: {
    id: string;
    name: string;
  };
  id: string;
  text: string;
  postId: string;
  userId: string;
};
