import Layout from "~/components/Layout";
import Count from "~/components/Views/StatsView/Count";
import type { CountProps } from "~/components/Views/StatsView/Count";

interface StatsViewProps {
  counts: CountProps[];
}

function StatsView({ counts }: StatsViewProps) {
  return (
    <Layout title="Stats">
      <div className="flex justify-center">
        <div className="flex w-auto flex-col justify-center gap-2">
          {counts.length > 0 ? (
            counts.map((count) => {
              return <Count key={count.type} {...count} />;
            })
          ) : (
            <div>No Activity</div>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default StatsView;
