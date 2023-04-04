import humanizeConstant from "~/utils/humanizeConstant";

export interface CountProps {
  type: string;
  count: number;
}

function Count({ type, count }: CountProps) {
  return (
    <div className="bg-white p-6 text-slate-900">
      <div className="text-center text-2xl font-bold">
        {humanizeConstant(type)}
      </div>
      <div className="flex justify-center text-xl font-bold">{count}</div>
    </div>
  );
}

export default Count;
