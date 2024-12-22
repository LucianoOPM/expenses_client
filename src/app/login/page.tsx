"use client";

import { useState } from "react";
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
import { useFetchData } from "@/hooks/postData";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function LoginForm() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { data, error, isLoading, sendRequest } = useFetchData();

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();

    console.log("Email:", email);
    console.log("Password:", password);
    console.log(data);

    const userInfo = {
      email,
      password,
    };
    await sendRequest("/auth/login", "POST", userInfo)
      .then((res) => {
        console.log(res);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="dark bg-background text-foreground min-h-screen flex items-center justify-center">
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
            <Label htmlFor="email">Correo electrónico</Label>
            <Input
              id="email"
              type="email"
              placeholder="email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Contraseña</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </CardContent>
        {error && (
          <div className="flex justify-center">
            <Alert
              variant="destructive"
              className="bg-destructive/15 text-destructive mb-5 w-10/12 text-center"
            >
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          </div>
        )}
        <CardFooter>
          <Button className="w-full" onClick={onSubmit}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Iniciar sesión
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
