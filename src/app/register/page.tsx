"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SubmitButton from "@/components/ui/submitButton";
import { signUp } from "@/lib/auth";
import { useActionState } from "react";

export default function RegistroForm() {
  const [state, action] = useActionState(signUp, undefined);

  return (
    <div className="dark bg-background text-foreground min-h-screen flex items-center justify-center">
      <Card className="w-[350px] bg-card text-card-foreground">
        <CardHeader>
          <CardTitle>Registro</CardTitle>
          <CardDescription>Crea una nueva cuenta</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={action}>
            <div className="space-y-2">
              <Label htmlFor="nombre" className="text-foreground">
                Nombre
              </Label>
              <Input
                id="nombre"
                type="text"
                placeholder="Tu nombre"
                name="name"
                required
                className="bg-background text-foreground border-input focus:ring-primary"
              />
              <p className="text-sm text-red-500">
                {state?.error?.name?.join(", ")}
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="correo" className="text-foreground">
                Correo electrónico
              </Label>
              <Input
                id="correo"
                type="email"
                name="email"
                placeholder="tu@ejemplo.com"
                required
                className="bg-background text-foreground border-input focus:ring-primary"
              />
              <p className="text-sm text-red-500">
                {state?.error?.email?.join(", ")}
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground">
                Contraseña
              </Label>
              <Input
                id="password"
                type="password"
                name="password"
                required
                className="bg-background text-foreground border-input focus:ring-primary"
              />
            </div>
            <p className="text-sm text-red-500">{state?.message}</p>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-foreground">
                Confirmar contraseña
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                required
                className="bg-background text-foreground border-input focus:ring-primary"
              />
            </div>
            <SubmitButton>Registrar</SubmitButton>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
