import InputRunningText from "@/app/ui/state/global-running-text/InputRunningText";
import RunningTextShow from "@/app/ui/state/global-running-text/RunningTextShow";

export default function Page() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Global Running Text</h1>
        <small>Component Input</small>
        <div className="border border-dashed p-4 mb-4">
          <InputRunningText />
        </div>
        <small>Component Result</small>
        <div className="border border-dashed p-4 mb-4">
          <RunningTextShow />
        </div>
      </div>
    </div>
  );
}
