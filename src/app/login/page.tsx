"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Icons } from "@/components/ui/icons";
import SubmitButton from "@/components/ui/submitButton";
import Link from "next/link";
import { useActionState } from "react";
import { signIn } from "@/lib/auth";
import { Checkbox } from "@/components/ui/checkbox";

export default function LoginForm() {
  const [state, action] = useActionState(signIn, undefined);

  return (
    <div className="dark bg-background text-foreground min-h-screen flex items-center justify-center">
      <form action={action}>
        <Card className="w-[350px]">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Iniciar sesión</CardTitle>
            <CardDescription>
              Ingresa tus credenciales para acceder a tu cuenta
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid grid-cols-2 gap-6">
              <Button variant="outline">
                <Icons.google className="mr-2 h-4 w-4" />
                Google
              </Button>
              <Button variant="outline">
                <Icons.gitHub className="mr-2 h-4 w-4" />
                GitHub
              </Button>
            </div>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  O continúa con
                </span>
              </div>
            </div>
            <div className="grid gap-2">
              {state?.message && (
                <p className="text-sm text-red-500">{state.message}</p>
              )}
              <Label htmlFor="email">Correo electrónico</Label>
              <Input
                id="email"
                type="email"
                placeholder="email@example.com"
                name="email"
              />
            </div>
            <div className="grid gap-2">
              {state?.message && (
                <p className="text-sm text-red-500">{state.message}</p>
              )}
              <Label htmlFor="password">Contraseña</Label>
              <Input id="password" type="password" name="password" />
            </div>
          </CardContent>
          <CardContent className="flex space-x-2">
            <Checkbox id="keep-me-logged-in" name="remember" />
            <Label htmlFor="keep-me-logged-in">
              Mantener mi sesión iniciada
            </Label>
          </CardContent>
          <CardContent>
            <Link href="#" className="text-sm underline">
              ¿Olvidaste tu contraseña?
            </Link>
          </CardContent>
          <CardFooter className="grid grid-rows-2">
            <SubmitButton>Iniciar sesión</SubmitButton>
            {state?.error?.message && (
              <p className="text-sm text-red-500">{state.error.message}</p>
            )}
            <div>
              <p className="text-sm text-muted-foreground">
                ¿No tienes una cuenta?{" "}
                <Link href="/register" className="underline">
                  Regístrate
                </Link>
              </p>
            </div>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
