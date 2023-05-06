import Layout from "~/components/Layout";
import Doughnut from "~/components/charts/Doughnut";
import Bar from "~/components/charts/Bar";

interface StatsViewProps {
  counts: { type: string; count: number }[];
}

function StatsView({ counts }: StatsViewProps) {
  const labels = counts.map((c) => c.type.toLowerCase().replace("_", " "));
  const data = counts.map((c) => c.count);

  return (
    <Layout title="Stats">
      <div className="mb-8 bg-white p-8">
        <Bar labels={labels} data={data} />
        <Doughnut labels={labels} data={data} />
      </div>
    </Layout>
  );
}

export default StatsView;
