"use client";

import Counter from "@/app/ui/state/global-counter/easy/Counter";

export default function GlobalCounterPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="font-bold">Global Counter</h1>
      <Counter />
    </div>
  );
}
