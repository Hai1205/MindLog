"use client";

import { usePostStore } from "@/stores/usePostStore";
import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as SolidHeartIcon } from "@heroicons/react/20/solid";
import { useEffect } from "react";

interface LikeProps {
  postId: number;
  user?: IUser;
};

const Like = (props: LikeProps) => {
  const { likePost, unlikePost, getPostLikeData, likeCount, userLikedPost } = usePostStore();

  useEffect(() => {
    const fetchPostLikeData = async () => {
      const response = await getPostLikeData(props.postId);
      if (response && response.status && response.data) {
        return response.data;
      }
    };

    fetchPostLikeData();
  }, [getPostLikeData, props.postId]);

  return (
    <div className="mt-3 flex items-center justify-start gap-2">
      {userLikedPost ? (
        <button onClick={() => unlikePost(props.postId)}>
          <SolidHeartIcon className="w-6 text-rose-600 cursor-pointer" />
        </button>
      ) : (
        <button onClick={() => likePost(props.postId)}>
          <HeartIcon className="w-6 cursor-pointer" />
        </button>
      )}

      <p className="text-slate-600">{likeCount}</p>
    </div>
  );
};

export default Like;