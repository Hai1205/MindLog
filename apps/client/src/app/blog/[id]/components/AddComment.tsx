import SubmitButton from "@/components/SubmitButton";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { usePostStore } from "@/stores/usePostStore";
import { cn } from "@/lib/utils";
import { Dialog } from "@radix-ui/react-dialog";
import { useState } from "react";
import { toast } from "react-toastify";

interface AddCommentProps {
  postId: number;
  user: IUser;
  className?: string;
  refetch: () => Promise<void>;
};

const AddComment = (props: AddCommentProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  const { createComment } = usePostStore();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!content.trim()) {
      setError("Nội dung không được để trống");
      return;
    }

    setIsSubmitting(true);

    const response = await createComment(props.postId, content);

    if (response?.status) {
      await props.refetch();
      setContent("");
      setIsOpen(false);
      toast.success("Bình luận đã được đăng!");
    } else {
      setError(response?.error || "Có lỗi xảy ra khi đăng bình luận");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="cursor-pointer">Leave Your Comment</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogTitle>Write Your Comment</DialogTitle>

        <form onSubmit={handleSubmit} className={cn(props.className)}>
          <Label htmlFor="comment">Your Comment</Label>

          <div className="border-t border-x rounded-t-md">
            <Textarea
              className="border-none active:outline-none focus-visible:ring-0 shadow-none"
              name="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />

            {!!error && (
              <p className="text-red-500 animate-shake">
                {error}
              </p>
            )}
          </div>

          <p className="border rounded-b-md p-2">
            <span className="text-slate-400">Write as </span>

            <span className="text-slate-700">{props.user.name}</span>
          </p>

          <SubmitButton
            className="mt-2 cursor-pointer"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Đang gửi..." : "Submit"}
          </SubmitButton>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddComment;