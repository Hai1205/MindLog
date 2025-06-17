"use client";

import SubmitButton from "@/components/SubmitButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from "@/lib/actions/auth.action";
import { useActionState } from "react";

const initialState = {
    data: {},
    errors: {},
    message: "",
};

const LoginForm = () => {
    const [state, formAction] = useActionState(login, initialState);

    return (
        <form action={formAction} className="flex flex-col gap-2">
            {!!state?.message && (
                <p className="text-red-500 text-sm">{state.message}</p>
            )}
            <div>
                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    name="email"
                    placeholder="john@example.com"
                    type="email"
                    defaultValue={state?.data?.email as string}
                />
            </div>
            {!!state?.errors?.email && (
                <p className="text-red-500 text-sm">{state.errors.email}</p>
            )}

            <div>
                <Label htmlFor="password">Password</Label>
                <Input
                    id="password"
                    name="password"
                    type="password"
                    defaultValue={state?.data?.password as string}
                />
            </div>
            {!!state?.errors?.password && (
                <p className="text-red-500 text-sm">{state.errors.password}</p>
            )}

            <SubmitButton>Login</SubmitButton>
        </form>
    );
};

export default LoginForm;