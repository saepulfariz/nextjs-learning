"use client";
import ResultCounter from "@/app/ui/state/local-counter/ResultCounter";
import TriggerCounter from "@/app/ui/state/local-counter/TriggerCounter";
import { useState } from "react";

export default function Page() {
  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleDecrement = () => {
    setCount(count - 1);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <small>Parent Component</small>
      <h1 className="border p-2 border-dashed text-2xl font-bold mb-4">
        Counter: {count}
      </h1>

      <small>Result Component</small>
      <div className="border border-dashed p-4 mb-4">
        <ResultCounter count={count} />
      </div>

      <small>Trigger Component</small>
      <div className="border border-dashed p-4 mb-4">
        <TriggerCounter
          onIncrement={handleIncrement}
          onDecrement={handleDecrement}
        />
      </div>
    </div>
  );
}
