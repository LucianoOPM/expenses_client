"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { NewTransactionForm } from "@/components/new-transaction-form";
import { Plus } from "lucide-react";

export function NewTransactionModal() {
  const [open, setOpen] = useState(false);

  const handleSubmit = (values: unknown) => {
    console.log(values);
    // Aquí iría la lógica para guardar la transacción
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Movimiento
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Nuevo Movimiento</DialogTitle>
          <DialogDescription>
            Registra un nuevo ingreso o gasto. Llena los campos y haz clic en
            guardar cuando termines.
          </DialogDescription>
        </DialogHeader>
        <NewTransactionForm onSubmit={handleSubmit} />
      </DialogContent>
    </Dialog>
  );
}
