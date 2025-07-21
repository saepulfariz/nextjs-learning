"use client";

import { RootState } from "@/lib/store";

import { useSelector } from "react-redux";
import Marquee from "react-fast-marquee";

export default function RunningTextShow() {
  const runningText = useSelector((state: RootState) => state.runningText);
  const { text, loading } = runningText;
  return (
    <div>
      <h2 className="text-xl font-bold">Result Running Text</h2>
      <div className="w-56 sm:w-96 md:w-[600px] lg:w-[800px]">
        <div className="text-center text-underline border border-e-red-600 ">
          <Marquee pauseOnHover={true} direction="left" className="p-2">
            {loading
              ? "Loading..."
              : text.length > 0
              ? text
              : "No text available"}
          </Marquee>
        </div>
      </div>
    </div>
  );
}
