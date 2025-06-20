"use client";

import { usePostStore } from "@/stores/usePostStore";
import UpsertPostForm from "./UpsertPostForm";

const CreatePostContainer = () => {
  const {createPost} = usePostStore();

  const handleFormAction = async (formData: FormData) => {
      const response = await createPost(formData);

      if (response && response.status) {
        return {
          message: "Tạo bài viết thành công"
        };
      } else {
        return {
          message: response?.error || "Đã xảy ra lỗi khi tạo bài viết"
        };
      }
  };

  return <UpsertPostForm formAction={handleFormAction} />;
};

export default CreatePostContainer;