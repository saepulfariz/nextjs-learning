"use client";

import Counter from "@/app/ui/state/global-counter/hard/Counter";
import ResetButton from "@/app/ui/state/global-counter/hard/ResetButton";
import Result from "@/app/ui/state/global-counter/hard/Result";

export default function GlobalCounterPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="font-bold">Global Counter</h1>
      <div className="mb-2">
        <Counter />
      </div>
      <div className="mb-2">
        <Result />
      </div>
      <div className="mb-2">
        <ResetButton />
      </div>
    </div>
  );
}
