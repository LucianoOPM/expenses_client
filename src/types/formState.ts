import z from "zod";

const passwordRegex =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
export type FormState =
  | {
      error?: {
        name?: string[];
        email?: string[];
        message?: string[];
      };
      message?: string;
    }
  | undefined;

export const SignUpFromSchema = z.object({
  name: z.string().min(2, { message: "El nombre es muy corto" }).trim(),
  email: z.string().email({ message: "El correo no es válido" }).trim(),
  password: z
    .string()
    .min(8, { message: "La contraseña debe tener al menos 8 caracteres" })
    .regex(passwordRegex, {
      message:
        "La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial",
    })
    .trim(),
});

export const LoginFromSchema = z.object({
  email: z.string().email({ message: "El correo no es válido" }).trim(),
  password: z
    .string()
    .min(8, { message: "La contraseña debe tener al menos 8 caracteres" })
    .regex(passwordRegex, {
      message:
        "La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial",
    })
    .trim(),
});
