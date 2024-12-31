"use server";

import {
  FormState,
  LoginFromSchema,
  SignUpFromSchema,
} from "@/types/formState";
import { redirect } from "next/navigation";
import { createSession } from "./session";
import { axiosInstance } from "./axios";

export async function signUp(
  state: FormState,
  formData: FormData
): Promise<FormState> {
  const validationFields = SignUpFromSchema.safeParse({
    name: formData.get("name")?.toString(),
    email: formData.get("email")?.toString(),
    password: formData.get("password")?.toString(),
  });
  if (!validationFields.success) {
    return {
      error: validationFields.error.flatten().fieldErrors,
      message: "Error en los campos",
    };
  }
  const { name, email, password } = validationFields.data;
  const res = await axiosInstance.post(`/register`, {
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });
  if (res.status === 201) {
    const { data } = res;
    await createSession(data.accessToken);
    redirect("/");
  } else {
    return {
      error: {
        message: [res.data.message],
      },
    };
  }
}

export async function signIn(
  state: FormState,
  formData: FormData
): Promise<FormState> {
  const validationFields = LoginFromSchema.safeParse({
    email: formData.get("email")?.toString(),
    password: formData.get("password")?.toString(),
    remember: formData.get("remember")?.valueOf(),
  });
  if (!validationFields.success) {
    return {
      error: validationFields.error.flatten().fieldErrors,
      message: "Error en los campos",
    };
  }
  const { email, password } = validationFields.data;
  const res = await axiosInstance.post("/login", { email, password });
  if (res.status === 201) {
    const { data } = res;
    await createSession(data.accessToken);
    redirect("/");
  } else {
    return {
      error: {
        message: [res.data.message],
      },
    };
  }
}
