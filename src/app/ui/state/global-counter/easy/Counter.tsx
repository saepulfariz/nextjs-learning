"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/lib/store";
import {
  increment,
  decrement,
  incrementByAmount,
} from "@/lib/features/counterSliceEasy";

export default function Counter() {
  const count = useSelector((state: RootState) => state.counterEasy.value);
  const dispatch = useDispatch();

  return (
    <div className="text-center">
      <h1>Counter: {count}</h1>
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
      <button
        className="bg-green-500 ml-2 text-white px-2 py-2 rounded"
        onClick={() => dispatch(incrementByAmount(5))}
      >
        Increment by 5
      </button>
    </div>
  );
}
