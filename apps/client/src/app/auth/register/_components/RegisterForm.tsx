"use client";

import SubmitButton from "@/components/SubmitButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { register } from "@/lib/actions/auth.action";
import { useActionState } from "react";

const initialState = {
    data: {},
    errors: {},
    message: "",
};

const RegisterForm = () => {
    const [state, formAction] = useActionState(register, initialState);

    return (
        <form action={formAction} className="flex flex-col gap-2">
            {!!state?.message && (
                <p className="text-red-500 text-sm">{state.message}</p>
            )}

            <div>
                <Label htmlFor="name">Name</Label>

                <Input
                    id="name"
                    name="name"
                    placeholder="John Doe"
                    defaultValue={state?.data?.name as string}
                />
            </div>

            {!!state?.errors?.name && (
                <p className="text-red-500 text-sm">{state.errors.name}</p>
            )}

            <div>
                <Label htmlFor="email">Email</Label>

                <Input
                    id="email"
                    name="email"
                    placeholder="john@example.com"
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
                <div className="text-sm text-red-500">
                    <p>Password Must:</p>

                    <ul>
                        {state.errors.password.map((err) => (
                            <li key={err}>{err}</li>
                        ))}
                    </ul>
                </div>
            )}

            <SubmitButton>Register</SubmitButton>
        </form>
    );
};

export default RegisterForm;