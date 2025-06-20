import { formatDateInDDMMYYY } from "@/utils/services/helpers";
import Image from "next/image";
import Link from "next/link";

interface PostCardProps {
  post: IPost;
}

const PostCard = ({ post }: PostCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
      <div className="relative h-60 ">
        <Image src={post?.thumbnail ?? "/images/no-image.png"} alt={post?.title ?? ""} fill />
      </div>

      <div className="p-6 flex-grow  flex flex-col">
        <h3 className="text-lg font-bold mt-4 break-words text-center text-gray-600">
          {post?.title}
        </h3>

        <p className="mt-2 text-gray-500 text-sm ">
          {formatDateInDDMMYYY(post?.createdAt ?? "")}
        </p>

        <p className="mt-4 text-gray-700 break-words">
          {post?.content?.slice(0, 100)}...
        </p>

        <Link
          className="text-indigo-600 hover:underline mt-auto text-right block"
          href={`/blog/${post?.id}`}
        >
          Read more
        </Link>
      </div>
    </div>
  );
};

export default PostCard;