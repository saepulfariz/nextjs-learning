"use client";

import { decrement, increment } from "@/lib/features/counterSlice";
import { RootState } from "@/lib/store";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
export default function Counter() {
  const count = useAppSelector((state: RootState) => state.counterHard.value);
  const dispatch = useAppDispatch();

  return (
    <>
      <div className="text-center">
        <small>Component 1</small>
      </div>
      <div className="border border-dashed p-2">
        <h1 className="text-center">Counter: {count}</h1>
        <button
          className="bg-blue-500 text-white px-2 py-2 rounded"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <button
          className="bg-red-500 ml-2 text-white px-2 py-2 rounded"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
      </div>
    </>
  );
}
