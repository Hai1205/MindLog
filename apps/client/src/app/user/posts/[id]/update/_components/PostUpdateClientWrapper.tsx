"use client";

import { useEffect, useState } from "react";
import { usePostStore } from "@/stores/usePostStore";
import UpdatePostContainer from "./UpdatePostContainer";
import { Skeleton } from "@/components/ui/skeleton";

interface PostUpdateClientWrapperProps {
    postId: number;
}

const PostUpdateClientWrapper = ({ postId }: PostUpdateClientWrapperProps) => {
    const [post, setPost] = useState<IPost | null>(null);
    const [error, setError] = useState("");

    const { getPostById, isLoading } = usePostStore();

    useEffect(() => {
        const fetchPost = async () => {
            const response = await getPostById(postId);

            if (response?.error) {
                setError("Không thể tải bài viết");
                return;
            }

            setPost(response?.data?.post ?? null);
        };

        fetchPost();
    }, [getPostById, postId]);

    if (isLoading) {
        return (
            <div className="bg-white shadow-md rounded-md p-6 max-w-2xl w-full">
                <Skeleton className="h-6 w-3/4 mb-4" />
                <Skeleton className="h-8 w-full mb-2" />
                <Skeleton className="h-32 w-full mb-2" />
                <Skeleton className="h-8 w-1/4" />
            </div>
        );
    }

    if (error || !post) {
        return <div className="text-red-500">{error || "Không tìm thấy bài viết"}</div>;
    }

    return (
        <div className="bg-white shadow-md rounded-md p-6 max-w-2xl w-full">
            <h2 className="text-lg text-center font-bold text-slate-700">
                Update Your Post
            </h2>

            <UpdatePostContainer post={post} />
        </div>
    );
};

export default PostUpdateClientWrapper; 