import BlogPostClient from "./components/BlogPostClient";
import { usePostStore } from "@/stores/usePostStore";
import { useEffect } from "react";
import { useAuthStore } from "@/stores/useAuthStore";

interface PostPageProps {
  params: {
    id: string,
  };
};

const PostPage = ({ params }: PostPageProps) => {
  const { getPostById, post } = usePostStore();
  const { userAuth } = useAuthStore();

  useEffect(() => {
    const fetchPost = async () => {
      const response = await getPostById(+params.id);
      if (response && response.status && response.data) {
        return response.data;
      }
    };
    fetchPost();
  }, [getPostById, params.id]);

  if (!post) return <div>Loading...</div>;

  return <BlogPostClient post={post} user={userAuth as IUser} />;
};

export default PostPage;


