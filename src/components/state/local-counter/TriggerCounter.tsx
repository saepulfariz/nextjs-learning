import { useState } from "react";

export default function TriggerCounter({
  onIncrement,
  onDecrement,
}: {
  onIncrement: () => void;
  onDecrement: () => void;
}) {
  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    setCount(count + 1);
    onIncrement();
  };

  const handleDecrement = () => {
    setCount(count - 1);
    onDecrement();
  };

  return (
    <div>
      <h1 className="text-center text-2xl font-bold mb-4">Counter: {count}</h1>
      <div>
        <button
          className="bg-blue-500 mr-2 text-white p-2 rounded"
          onClick={handleIncrement}
        >
          Increment
        </button>
        <button
          className="bg-red-500 text-white p-2 rounded"
          onClick={handleDecrement}
        >
          Decrement
        </button>
      </div>
    </div>
  );
}
