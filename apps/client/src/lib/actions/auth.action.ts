"use server";

import { fetchGraphQL } from "../fetchGraphQL";
import { REGISTER_MUTATION, LOGIN_MUTATION } from "../gqlQueries/auth.query";
import { createSession } from "../session";
import { LoginFormSchema, RegisterFormSchema } from "../formSchemas/auth.formSchema";
import { print } from "graphql";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export type RegisterFormState = {
  data: Record<string, FormDataEntryValue | string>;
  errors?: Record<string, string[]>;
  message?: string;
};

export async function register(
  prevState: RegisterFormState | undefined,
  formData: FormData
): Promise<RegisterFormState> {
  const validatedFields = RegisterFormSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success)
    return {
      data: Object.fromEntries(formData.entries()),
      errors: validatedFields.error.flatten().fieldErrors,
    };

  const data = await fetchGraphQL(print(REGISTER_MUTATION), {
    input: {
      ...validatedFields.data,
    },
  });

  if (data.errors)
    return {
      data: Object.fromEntries(formData.entries()),
      message: "Something went wrong",
    };

  redirect("/auth/login");
}

export async function login(
  prevState: RegisterFormState | undefined,
  formData: FormData
): Promise<RegisterFormState> {
  const validatedFields = LoginFormSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success)
    return {
      data: Object.fromEntries(formData.entries()),
      errors: validatedFields.error.flatten().fieldErrors,
    };

  const data = await fetchGraphQL(print(LOGIN_MUTATION), {
    input: {
      ...validatedFields.data,
    },
  });

  if (data.errors) {
    return {
      data: Object.fromEntries(formData.entries()),
      message: "Invalid Credentials",
    };
  }

  await createSession({
    user: {
      id: data.login.id,
      name: data.login.name,
      avatar: data.login.avatar,
    },
    accessToken: data.login.accessToken,
  });

  revalidatePath("/");
  redirect("/");
}