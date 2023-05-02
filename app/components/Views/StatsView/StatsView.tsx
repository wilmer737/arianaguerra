import React from "react";
import Chart from "chart.js/auto";

import Layout from "~/components/Layout";

interface StatsViewProps {
  counts: { type: string; count: number }[];
}

interface PieChartProps {
  id: string;
  data: number[];
  labels: string[];
}

function DoughnutChart({ id, data, labels }: PieChartProps) {
  const canvasId = `pie-chart-${id}`;

  React.useEffect(() => {
    const canvasDom = document.getElementById(canvasId);
    if (!(canvasDom instanceof HTMLCanvasElement)) {
      return;
    }

    const dChart = new Chart(canvasDom, {
      type: "doughnut",
      data: {
        datasets: [
          {
            data,
          },
        ],
        labels,
      },
    });

    return () => {
      if (dChart) {
        dChart.destroy();
      }
    };
  }, [canvasId, data, labels]);

  return <canvas id={canvasId} />;
}

function StatsView({ counts }: StatsViewProps) {
  const labels = counts.map((c) => c.type.toLowerCase());
  const data = counts.map((c) => c.count);

  return (
    <Layout title="Stats">
      <div>
        <div className="mb-8 bg-white p-8">
          <DoughnutChart id="count" labels={labels} data={data} />
        </div>
      </div>
    </Layout>
  );
}

export default StatsView;
