import React from "react";
import Chart from "chart.js/auto";
import type { ChartTypeRegistry } from "chart.js/auto";

function useChart(
  type: keyof ChartTypeRegistry,
  data: number[],
  labels: string[]
) {
  const id = React.useId();

  React.useEffect(() => {
    const canvasDom = document.getElementById(id);
    if (!(canvasDom instanceof HTMLCanvasElement)) {
      return;
    }

    const chart = new Chart(canvasDom, {
      type,
      data: {
        datasets: [
          {
            data,
            label: "Count",
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(255, 159, 64, 0.2)",
              "rgba(255, 205, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(201, 203, 207, 0.2)",
            ],
            borderColor: [
              "rgb(255, 99, 132)",
              "rgb(255, 159, 64)",
              "rgb(255, 205, 86)",
              "rgb(75, 192, 192)",
              "rgb(54, 162, 235)",
              "rgb(153, 102, 255)",
              "rgb(201, 203, 207)",
            ],
            borderWidth: 1,
          },
        ],
        labels,
      },
    });

    return () => {
      if (chart) {
        chart.destroy();
      }
    };
  }, [data, id, labels, type]);

  return {
    id,
  };
}

export default useChart;
