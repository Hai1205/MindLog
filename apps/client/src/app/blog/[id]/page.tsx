import Image from "next/image";
import SanitizedContent from "./components/SanitizedContent";
import Comments from "./components/Comments";
import { getSession } from "@/lib/session";
import Like from "./components/Like";
import { fetchPostById } from "@/lib/actions/post.action";

interface PostPageProps {
  params: {
    id: string,
  };
};

const PostPage = async ({ params }: PostPageProps) => {
  const resolvedParams = await params;
  const postId = resolvedParams.id;
  const post = await fetchPostById(+postId);
  const session = await getSession();

  return (
    <main className="container mx-auto px-4 py-8 mt-16">
      <h1 className="text-4xl font-bold mb-4 text-slate-700">{post?.title ?? ""}</h1>

      <p className="text-slate-500 text-sm mb-4">
        By {post?.author?.name} | {new Date(post?.createdAt ?? "").toLocaleDateString()}
      </p>

      <div className="relative w-80 h-60">
        <Image
          src={post?.thumbnail ?? "/no-image.png"}
          alt={post?.title ?? ""}
          fill
          className="rounded-md object-cover"
        />
      </div>

      <SanitizedContent content={post?.content ?? ""} />

      <Like postId={post?.id ?? 0} user={session?.user} />

      <Comments user={session?.user} postId={post?.id ?? 0} />
    </main>
  );
};

export default PostPage;