export default function ResultCounter({ count }: { count?: number }) {
  return (
    <div>
      <p className="text-lg font-bold">Current Count: {count}</p>
    </div>
  );
}
