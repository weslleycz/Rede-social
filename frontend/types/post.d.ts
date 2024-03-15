export type IPost = {
  id: string | undefined;
  refetch: any | undefined;
  content: string | undefined;
  urlImg: string | undefined;
  links: string[];
  comments: any[];
  userId: string | undefined;
  createDate: string | undefined;
  user: {
    name: string | undefined;
    id: string | undefined;
  };
};
