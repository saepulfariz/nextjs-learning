"use client";

import { RootState } from "@/lib/store";

import { useSelector } from "react-redux";

export default function RunningTextShow() {
  const runningText = useSelector((state: RootState) => state.runningText);
  const { text, loading } = runningText;
  return (
    <>
      <h2 className="text-xl font-bold">Result Running Text</h2>
      <p className="text-center text-underline border border-e-red-600">
        {loading ? "Loading..." : text.length > 0 ? text : "No text available"}
      </p>
    </>
  );
}
