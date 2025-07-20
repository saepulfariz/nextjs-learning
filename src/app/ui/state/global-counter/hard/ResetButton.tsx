"use client";

import { resetState } from "@/lib/features/counterSlice";
import { useAppDispatch } from "@/lib/hooks";

export default function ResetButton() {
  const dispatch = useAppDispatch();

  return (
    <>
      <div className="text-center">
        <small>Component 3</small>
      </div>
      <div className="border border-dashed p-2">
        <button
          className="bg-gray-500 text-white px-2 py-2 rounded"
          onClick={() => dispatch(resetState(0))}
        >
          Reset Counter
        </button>
      </div>
    </>
  );
}
