"use client";

import { RootState } from "@/lib/store";

import { useSelector } from "react-redux";

export default function Result() {
  const countState = useSelector((state: RootState) => state.counterHard.value);
  return (
    <>
      <small>Component 2</small>
      <div className="border border-dashed p-2">
        <h2>Result : {countState}</h2>
      </div>
    </>
  );
}
