"use client";

import UpsertPostForm from "@/app/user/create-post/_components/UpsertPostForm";
import { updatePost } from "@/lib/actions/post.action";
import { useActionState } from "react";

interface UpdatePostContainerProps {
  post: IPost;
};

const UpdatePostContainer = ({ post }: UpdatePostContainerProps) => {
  const actionWrapper = async (prevState: PostFormState | undefined, formData: FormData) => {
    return updatePost(formData);
  };

  const [state, action] = useActionState(actionWrapper, {
    data: {
      postId: post?.id,
      title: post?.title,
      content: post?.content,
      published: post?.published ? "on" : undefined,
      tags: post?.tags?.map((tag) => tag?.name).join(","),
      previousThumbnailUrl: post?.thumbnail ?? undefined,
    },
  });

  return <UpsertPostForm state={state} formAction={action} />;
};

export default UpdatePostContainer;