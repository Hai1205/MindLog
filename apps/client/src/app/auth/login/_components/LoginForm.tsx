"use client";

import SubmitButton from "@/components/SubmitButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/stores/useAuthStore";
import { useState } from "react";
import { useRouter } from "next/navigation";

const LoginForm = () => {
    const router = useRouter();
    
    const { login, error } = useAuthStore();

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [message, setMessage] = useState<string>("");
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrors({});
        setMessage("");

        const formData = new FormData(e.currentTarget);
        await login(formData);

        if (error) {
            setMessage(error || "Đã xảy ra lỗi khi đăng nhập");
            return;
        }

        router.push("/user/posts");
        setIsSubmitting(false);
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            {!!message && (
                <p className="text-red-500 text-sm">{message}</p>
            )}
            <div>
                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    name="email"
                    placeholder="john@example.com"
                    type="email"
                />
            </div>
            {!!errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
            )}

            <div>
                <Label htmlFor="password">Password</Label>
                <Input
                    id="password"
                    name="password"
                    type="password"
                />
            </div>
            {!!errors.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
            )}

            <SubmitButton disabled={isSubmitting}>
                {isSubmitting ? "Đang đăng nhập..." : "Login"}
            </SubmitButton>
        </form>
    );
};

export default LoginForm;