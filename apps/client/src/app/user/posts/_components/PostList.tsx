import Pagination from "@/components/Pagination";
import PostListItem from "./PostListItem";

interface PostListProps {
  posts: IPost[];
  currentPage: number;
  totalPages: number;
};

const PostList = ({ posts, currentPage, totalPages }: PostListProps) => {
  return (
    <>
      <div className="grid grid-cols-8 rounded-md shadow-md m-3 p-3 text-center">
        <div className="col-span-2" />

        <div />

        <div>Date</div>

        <div>Published</div>

        <div>Likes</div>

        <div>Comments</div>

        <div />
      </div>

      {posts.map((post) => (
        <PostListItem post={post} key={post.id} />
      ))}
      <Pagination {...{ currentPage, totalPages }} className="my-4" />
    </>
  );
};

export default PostList;