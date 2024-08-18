import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  Title,
  ChartOptions,
  ChartData,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  Title
);

const months = ["January", "February", "March", "April", "May", "June", "July"];

interface LineChartProps {
  data: number[];
  label: string;
  backgroundColor: string;
  borderColor: string;
  labels?: string[];
  text: string;
}

export const LineChart = ({
  data,
  label,
  backgroundColor,
  borderColor,
  labels = months,
  text,
}: LineChartProps) => {
  console.log(text);
  const optionsLineChart: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          color: "#333",
        },
      },
      title: {
        display: true,
        text: text,
        color: "#333",
        font: {
          size: 20,
        },
      },
      tooltip: {
        enabled: true,
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        titleColor: "#fff",
        bodyColor: "#fff",
        cornerRadius: 4,
      },
    },
    hover: {
      mode: "nearest",
      intersect: true,
    },
    scales: {
      x: {
        grid: {
          display: false,
          color: "rgba(255, 99, 132, 0.2)",
        },
        ticks: {
          color: "#333",
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(255, 99, 132, 0.2)",
        },
        ticks: {
          color: "#333",
        },
      },
    },
    elements: {
      point: {
        radius: 5,
        hoverRadius: 7,
        backgroundColor: borderColor,
      },
      line: {
        tension: 0.4,
        borderWidth: 2,
      },
    },
  };

  const gradientBackground = (ctx: CanvasRenderingContext2D) => {
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, backgroundColor);
    gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
    return gradient;
  };

  const dataLineChart: ChartData<"line", number[], string> = {
    labels,
    datasets: [
      {
        fill: true,
        label,
        data,
        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx } = chart;
          return gradientBackground(ctx);
        },
        borderColor,
      },
    ],
  };

  return <Line options={optionsLineChart} data={dataLineChart} />;
};

// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   ChartData,
//   ChartOptions,
//   LineElement,
//   Filler,
// } from "chart.js";
// import { Line } from "react-chartjs-2";

// ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler);

// const months = ["January", "February", "March", "April", "May", "June", "July"];

// interface LineChartProps {
//   data: number[];
//   label: string;
//   backgroundColor: string;
//   borderColor: string;
//   labels?: string[];
// }

// export const LineChart = ({
//   data,
//   label,
//   backgroundColor,
//   borderColor,
//   labels = months,
// }: LineChartProps) => {
//   const optionsLineChart: ChartOptions<"line"> = {
//     responsive: true,
//     maintainAspectRatio: false, // Add this line to disable the default aspect ratio
//     plugins: {
//       legend: {
//         display: false,
//       },
//       title: {
//         display: false,
//         text: "Chart.js Bar Chart",
//       },
//     },

//     scales: {
//       x: {
//         grid: {
//           display: false,
//         },
//       },
//       y: {
//         beginAtZero: true,
//         grid: {
//           display: false,
//         },
//       },
//     },
//   };

//   const dataLineChart: ChartData<"line", number[], string> = {
//     labels,
//     datasets: [
//       {
//         fill: true,
//         label,
//         data,
//         backgroundColor,
//         borderColor,
//       },
//     ],
//   };
//   return <Line options={optionsLineChart} data={dataLineChart} />;
// };
