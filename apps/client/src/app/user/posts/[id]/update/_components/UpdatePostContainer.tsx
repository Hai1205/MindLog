"use client";

import UpsertPostForm from "@/app/user/create-post/_components/UpsertPostForm";
import { usePostStore } from "@/stores/usePostStore";

interface UpdatePostContainerProps {
  post: IPost;
};

const UpdatePostContainer = ({ post }: UpdatePostContainerProps) => {
  const {updatePost} = usePostStore();

  const handleFormAction = async (formData: FormData) => {
    formData.append("postId", post.id.toString());

    const response = await updatePost(formData);

    if (response && response.status) {
      return {
        message: "Cập nhật bài viết thành công"
      };
    } else {
      return {
        message: response?.error || "Đã xảy ra lỗi khi cập nhật bài viết"
      };
    }
  };

  return <UpsertPostForm formAction={handleFormAction} />;
};

export default UpdatePostContainer;