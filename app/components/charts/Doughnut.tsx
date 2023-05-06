import useChart from "~/components/charts/useChart";

interface PieChartProps {
  data: number[];
  labels: string[];
}

function DoughnutChart({ data, labels }: PieChartProps) {
  const { id: canvasId } = useChart("doughnut", data, labels);
  return <canvas id={canvasId} />;
}

export default DoughnutChart;
