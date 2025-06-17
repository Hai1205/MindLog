"use client";

import { saveNewPost } from "@/lib/actions/post.action";
import { useActionState } from "react";
import UpsertPostForm from "./UpsertPostForm";

const initialState = {
  data: {},
  errors: {},
  message: "",
};

const CreatePostContainer = () => {
  const actionWrapper = async (prevState: PostFormState | undefined, formData: FormData) => {
    return saveNewPost(formData);
  };

  const [state, action] = useActionState(actionWrapper, initialState);

  return <UpsertPostForm state={state} formAction={action} />;
};

export default CreatePostContainer;