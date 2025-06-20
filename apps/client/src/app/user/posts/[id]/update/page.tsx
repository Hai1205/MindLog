import PostUpdateClientWrapper from "./_components/PostUpdateClientWrapper";

type Props = {
  params: {
    id: string;
  };
};

const UpdatePostPage = ({ params }: Props) => {
  const postId = parseInt(params.id);

  return <PostUpdateClientWrapper postId={postId} />;
};

export default UpdatePostPage;