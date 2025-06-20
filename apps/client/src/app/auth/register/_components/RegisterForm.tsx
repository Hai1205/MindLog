"use client";

import SubmitButton from "@/components/SubmitButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/stores/useAuthStore";
import { useState } from "react";
import { useRouter } from "next/navigation";

const RegisterForm = () => {
    const router = useRouter();

    const { register, error } = useAuthStore();

    const [message, setMessage] = useState<string>("");
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage("");

        const formData = new FormData(e.currentTarget);

        await register(formData);

        if (error) {
            setMessage(error || "Đã xảy ra lỗi khi đăng ký");
            return;
        }

        router.push("/auth/login");
        setIsSubmitting(false);
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            {!!message && (
                <p className="text-red-500 text-sm">{message}</p>
            )}

            <div>
                <Label htmlFor="name">Name</Label>

                <Input
                    id="name"
                    name="name"
                    placeholder="John Doe"
                />  
            </div>

            {!!error && (
                <p className="text-red-500 text-sm">{error}</p>
            )}

            <div>
                <Label htmlFor="email">Email</Label>

                <Input
                    id="email"
                    name="email"
                    placeholder="john@example.com"
                />
            </div>

            {!!error && (
                <p className="text-red-500 text-sm">{error}</p>
            )}

            <div>
                <Label htmlFor="password">Password</Label>

                <Input
                    id="password"
                    name="password"
                    type="password"
                />
            </div>

            {!!error && (
                <div className="text-sm text-red-500">
                    <p>Password Must:</p>

                    <ul>
                        {Array.isArray(error) ? (
                            error.map((err: string) => <li key={err}>{err}</li>)
                        ) : (
                            <li>{error}</li>
                        )}
                    </ul>
                </div>
            )}

            <SubmitButton disabled={isSubmitting}>
                {isSubmitting ? "Đang đăng ký..." : "Register"}
            </SubmitButton>
        </form>
    );
};

export default RegisterForm;