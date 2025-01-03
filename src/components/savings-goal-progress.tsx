"use client";

import { Progress } from "@/components/ui/progress";

export function SavingsGoalProgress() {
  const currentSavings = 5000;
  const savingsGoal = 10000;
  const progress = (currentSavings / savingsGoal) * 100;

  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <span className="text-sm font-medium">Meta de ahorro</span>
        <span className="text-sm font-medium">{`$${currentSavings} / $${savingsGoal}`}</span>
      </div>
      <Progress value={progress} className="w-full" />
      <p className="text-sm text-muted-foreground">
        Has alcanzado el {progress.toFixed(1)}% de tu meta de ahorro.
      </p>
    </div>
  );
}
