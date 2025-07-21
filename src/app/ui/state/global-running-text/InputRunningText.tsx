"use client";

import { setText as setTextGlobal } from "@/lib/features/runningTextSlice";
import { useAppDispatch } from "@/lib/hooks";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";

export default function InputRunningText() {
  const runningText = useSelector((state: RootState) => state.runningText.text);
  const dispatch = useAppDispatch();
  const [textRunning, setTextRunning] = useState("");

  useEffect(() => {
    setTextRunning(runningText);
  }, [runningText]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setTextGlobal(textRunning));
  };

  return (
    <form onSubmit={handleSubmit} className="mb-2">
      <input
        className="border p-2"
        type="text"
        value={textRunning}
        onChange={(e) => setTextRunning(e.target.value)}
      />
      <button
        className="bg-blue-500 border border-blue-500 text-white p-2 cursor-pointer"
        type="submit"
      >
        Change
      </button>
    </form>
  );
}
