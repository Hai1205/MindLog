"use client";

import { DEFAULT_PAGE_SIZE } from "@/utils/services/constants";
import { useState, useEffect, useCallback } from "react";
import CommentCard from "./CommentCard";
import CommentCardSkeleton from "./CommentCardSkeleton";
import AddComment from "./AddComment";
import { RefreshCcwIcon } from "lucide-react";
import CommentPagination from "./CommentPagination";
import { usePostStore } from "@/stores/usePostStore";

interface CommentsProps {
  post: IPost;
  user?: IUser;
};

const Comments = (props: CommentsProps) => {
  const [page, setPage] = useState(1);
  const { getPostComments, comments, isLoading, CommentCount } = usePostStore();

  const fetchComments = useCallback(async () => {
    await getPostComments(
      props.post.id,
      (page - 1) * DEFAULT_PAGE_SIZE,
      DEFAULT_PAGE_SIZE
    );
  }, [props.post.id, page, getPostComments]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments, page, props.post.id]);

  const totalPages = Math.ceil((CommentCount ?? 0) / DEFAULT_PAGE_SIZE);

  return (
    <div className="p-2 rounded-md shadow-md">
      <button onClick={() => fetchComments()}>
        <RefreshCcwIcon className="w-6 cursor-pointer" />
      </button>

      <h6 className="text-lg text-slate-700 ">Comments</h6>

      {!!props.user && <AddComment user={props.user} postId={props.post.id} refetch={() => fetchComments()} />}

      <div className="flex flex-col gap-4">
        {isLoading
          ? Array.from({ length: 12 }).map((_, index) => (
            <CommentCardSkeleton key={index} />
          ))
          : comments.map((comment) => (
            <CommentCard key={comment.id} comment={comment} />
          ))}
      </div>

      {totalPages > 1 && <CommentPagination
        className="p-2"
        currentPage={page}
        setCurrentPage={(currentPage: number) => setPage(currentPage)}
        totalPages={totalPages}
      />}
    </div>
  );
};

export default Comments;