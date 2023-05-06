import useChart from "~/components/charts/useChart";

interface BarChartProps {
  labels: string[];
  data: number[];
}

function BarChart({ labels, data }: BarChartProps) {
  const { id } = useChart("bar", data, labels);
  return <canvas id={id} />;
}

export default BarChart;
