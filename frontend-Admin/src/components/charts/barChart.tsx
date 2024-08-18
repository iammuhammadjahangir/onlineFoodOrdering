import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const months = ["January", "February", "March", "April", "May", "June", "July"];

interface BarChartProps {
  horizontal?: boolean;
  data_1: number[];
  data_2: number[];
  title_1: string;
  title_2: string;
  bgColor_1: string;
  bgColor_2: string;
  labels?: string[];
  heading: string;
}

export const BarChart = ({
  data_1 = [],
  data_2 = [],
  title_1,
  title_2,
  bgColor_1,
  bgColor_2,
  horizontal,
  labels = months,
  heading,
}: BarChartProps) => {
  const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: horizontal ? "y" : "x",
    plugins: {
      legend: {
        display: data_1.length > 0 && data_2.length > 0, // Show legend only if both datasets are present
      },
      title: {
        display: false,
        text: `${heading}`, // Dynamic title based on provided titles
      },
      tooltip: {
        mode: "index", // Improve tooltip for better data comparison
        intersect: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          display: false,
        },
      },
    },
  };

  const data: ChartData<"bar", number[], string> = {
    labels,
    datasets: [
      {
        label: title_1,
        data: data_1,
        backgroundColor: bgColor_1,
        borderColor: bgColor_1,
        borderWidth: 1,
        barThickness: 20,
        barPercentage: 1,
        categoryPercentage: 0.4,
      },
      {
        label: title_2,
        data: data_2,
        backgroundColor: bgColor_2,
        borderColor: bgColor_2,
        borderWidth: 1,
        barThickness: 20,
        barPercentage: 1,
        categoryPercentage: 0.4,
      },
    ],
  };

  return <Bar width={horizontal ? "200%" : ""} options={options} data={data} />;
};

// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
//   ChartData,
//   ChartOptions,
// } from "chart.js";
// import { Bar } from "react-chartjs-2";
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// );

// const months = ["January", "February", "March", "April", "May", "June", "July"];

// interface BarChartProps {
//   horizontal?: boolean;
//   data_1: number[];
//   data_2: number[];
//   title_1: string;
//   title_2: string;
//   bgColor_1: string;
//   bgColor_2: string;
//   labels?: string[];
// }

// export const BarChart = ({
//   data_1 = [],
//   data_2 = [],
//   title_1,
//   title_2,
//   bgColor_1,
//   bgColor_2,
//   horizontal,
//   labels = months,
// }: BarChartProps) => {
//   const options: ChartOptions<"bar"> = {
//     responsive: true,
//     indexAxis: horizontal ? "y" : "x",
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

//   const data: ChartData<"bar", number[], string> = {
//     labels,
//     datasets: [
//       {
//         label: title_1,
//         data: data_1,
//         backgroundColor: bgColor_1,
//         barThickness: "flex",
//         barPercentage: 1,
//         categoryPercentage: 0.4,
//       },
//       {
//         label: title_2,
//         data: data_2,
//         backgroundColor: bgColor_2,
//         barThickness: "flex",
//         barPercentage: 1,
//         categoryPercentage: 0.4,
//       },
//     ],
//   };
//   return <Bar width={horizontal ? "200%" : ""} options={options} data={data} />;
// };
