"use client";

import SubmitButton from "@/components/SubmitButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { usePostStore } from "@/stores/usePostStore";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface UpsertPostFormProps {
  formAction: (payload: FormData) => void;
};

const UpsertPostForm = (props: UpsertPostFormProps) => {
  const { message, status, error, post } = usePostStore();

  const [imageUrl, setImageUrl] = useState("");
  useEffect(() => {
    if (message)
      if (status) {
        toast.success(message);
      } else {
        toast.error(message);
      }
  }, [message, status]);

  return (
    <form
      className="flex flex-col gap-5 [&>div>label]:text-slate-500 [&>div>input]:transition [&>div>textarea]:transition"
    >
      <input hidden name="postId" defaultValue={post?.id} />
      <div>
        <Label htmlFor="title">Title</Label>
        <Input
          name="title"
          placeholder="Enter The Title of Your Post"
          defaultValue={post?.title}
        />
      </div>
      {!!error && (
        <p className="text-red-500 animate-shake">{error}</p>
      )}

      <div>
        <Label htmlFor="content">Content</Label>
        <Textarea
          name="content"
          placeholder="Write Your Post Content Here"
          rows={6}
          defaultValue={post?.content}
        />
      </div>
      {!!error && (
        <p className="text-red-500 animate-shake">{error}</p>
      )}
      <div>
        <Label htmlFor="thumbnail">Thumbnail</Label>
        <Input
          type="file"
          name="thumbnail"
          accept="image/*"
          onChange={(e) => {
            if (e.target.files)
              setImageUrl(URL.createObjectURL(e.target.files[0]));
          }}
        />
        {!!error && (
          <p className="text-red-500 animate-shake">{error}</p>
        )}
        {(!!imageUrl || !!post?.thumbnail) && (
          <Image
            src={(imageUrl || post?.thumbnail) ?? ""}
            alt="post thumbnail"
            width={200}
            height={150}
          />
        )}
      </div>
      <div>
        <Label htmlFor="tags">Tags (comma-separated)</Label>
        <Input
          name="tags"
          placeholder="Enter tags (comma-separated)"
          defaultValue={post?.tags?.map((tag: ITag) => tag?.name).join(",")}
        />
      </div>
      {!!error && (
        <p className="text-red-500 animate-shake">{error}</p>
      )}
      <div className="flex items-center">
        <input
          className="mx-2 w-4 h-4"
          type="checkbox"
          name="published"
          defaultChecked={post?.published ? true : false}
        />
        <Label htmlFor="published">Published Now</Label>
      </div>
      {!!error && (
        <p className="text-red-500 animate-shake">{error}</p>
      )}

      <SubmitButton onClick={() => props.formAction}>Save</SubmitButton>
    </form>
  );
};

export default UpsertPostForm;