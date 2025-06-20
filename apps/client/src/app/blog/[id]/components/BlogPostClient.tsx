"use client";

import Image from "next/image";
import SanitizedContent from "./SanitizedContent";
import Comments from "./Comments";
import Like from "./Like";

interface BlogPostClientProps {
    post: IPost;
    user?: IUser;
}

const BlogPostClient = (props: BlogPostClientProps) => {
    return (
        <main className="container mx-auto px-4 py-8 mt-16">
            <h1 className="text-4xl font-bold mb-4 text-slate-700">{props.post?.title ?? ""}</h1>

            <p className="text-slate-500 text-sm mb-4">
                By {props.post?.author?.name} | {new Date(props.post?.createdAt ?? "").toLocaleDateString()}
            </p>

            <div className="relative w-80 h-60">
                <Image
                    src={props.post?.thumbnail ?? "/no-image.png"}
                    alt={props.post?.title ?? ""}
                    fill
                    className="rounded-md object-cover"
                />
            </div>

            <SanitizedContent content={props.post?.content ?? ""} />

            <Like postId={props.post?.id ?? 0} user={props.user} />

            <Comments user={props.user} post={props.post} />
        </main>
    );
};

export default BlogPostClient; 