"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useFetchData } from "@/hooks/postData";
import { UserRegister } from "@/interface/register";

export default function RegistroForm() {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const {
    data,
    error: errorPost,
    isLoading,
    sendRequest,
  } = useFetchData<UserRegister>();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!nombre || !correo || !password || !confirmPassword) {
      setError("Por favor, completa todos los campos.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }
    const userInfo = {
      name: nombre,
      email: correo,
      password,
    };
    await sendRequest("/users", "POST", userInfo)
      .then((res) => {
        console.log(res);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
    if (errorPost) {
      setError(errorPost);
    } else {
      setNombre("");
      setCorreo("");
      setPassword("");
      setConfirmPassword("");
      setError("");
    }

    alert("Registro exitoso");
  };

  return (
    <div className="dark bg-background text-foreground min-h-screen flex items-center justify-center">
      <Card className="w-[350px] bg-card text-card-foreground">
        <CardHeader>
          <CardTitle>Registro</CardTitle>
          <CardDescription>Crea una nueva cuenta</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="nombre" className="text-foreground">
                Nombre
              </Label>
              <Input
                id="nombre"
                type="text"
                placeholder="Tu nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
                className="bg-background text-foreground border-input focus:ring-primary"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="correo" className="text-foreground">
                Correo electrónico
              </Label>
              <Input
                id="correo"
                type="email"
                placeholder="tu@ejemplo.com"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                required
                className="bg-background text-foreground border-input focus:ring-primary"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground">
                Contraseña
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-background text-foreground border-input focus:ring-primary"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-foreground">
                Confirmar contraseña
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="bg-background text-foreground border-input focus:ring-primary"
              />
            </div>
            {error && (
              <Alert
                variant="destructive"
                className="bg-destructive/15 text-destructive"
              >
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <Button
              type="submit"
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              disabled={isLoading}
            >
              Registrarse
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
