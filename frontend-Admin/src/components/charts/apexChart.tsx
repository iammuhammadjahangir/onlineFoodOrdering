import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

// Function to generate a formatted date
const generateDayWiseTimeSeries = (baseval: Date): string => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const date = new Date(baseval);
  const formattedDate = `${date.getDate()} ${
    months[date.getMonth()]
  } ${date.getFullYear()}`;
  return formattedDate;
};

// Function to transform the raw data
const transformData = (
  data: any[],
  transformationFunc: (entry: any) => { x: string; y: number }
) => {
  const seriesData = data.map(transformationFunc);
  return [{ data: seriesData }];
};

// Define the props for the ApexCharts component
interface ApexChartsProps {
  title: string;
  subtitle: string;
  xAxisLabel: string;
  yAxisLabel: string;
  data: any[];
  transformFunc: (entry: any) => { x: string; y: number };
  chartType?: "line" | "bar" | "area" | "scatter";
  color?: string;
  height?: number;
  width?: string;
  tooltipFormatter?: (value: number) => string;
  xAxisType?: "datetime" | "category" | "numeric";
  yAxisFormatter?: (value: number) => string;
}

// The main component
const ApexCharts: React.FC<ApexChartsProps> = ({
  title,
  subtitle,
  xAxisLabel,
  yAxisLabel,
  data,
  transformFunc,
  chartType = "line",
  color = "#3C6E71",
  height = 400,
  width = "30vw",
  tooltipFormatter = (value) => `${value.toFixed(2)}`,
  xAxisType = "datetime",
  yAxisFormatter = (value) => `${value.toFixed(2)}`,
}) => {
  const [state, setState] = useState<{
    series: { data: { x: string; y: number }[] }[];
    options: ApexOptions;
  }>({
    series: [],
    options: {
      chart: {
        type: chartType,
        height: 560,
        dropShadow: {
          enabled: false,
          blur: 3,
          color: "#000",
          opacity: 0.35,
        },
        toolbar: {
          show: true,
          offsetX: 0,
          offsetY: 0,
          export: {
            csv: {
              headerValue: "",
            },
          },
          autoSelected: "zoom",
        },
        fontFamily: "Roboto",
      },
      colors: [color],
      xaxis: {
        type: xAxisType,
        labels: {
          rotate: 0,
          rotateAlways: true,
        },
      },
      yaxis: {
        labels: {
          formatter: yAxisFormatter,
        },
        axisBorder: {
          show: true,
          color: "#78909C",
        },
        axisTicks: {
          show: true,
          color: "#78909C",
        },
        tooltip: {
          enabled: true,
        },
        title: {
          text: yAxisLabel,
          style: {
            fontSize: "18px",
            fontFamily: "Roboto",
            fontWeight: 600,
          },
        },
      },
      stroke: {
        curve: "smooth",
        colors: [color],
        width: 2,
      },
      tooltip: {
        enabled: true,
        followCursor: true,
        y: {
          formatter: tooltipFormatter,
        },
        x: {
          format: "dd MMMM yyyy",
        },
      },
      title: {
        text: title,
        align: "center",
        style: {
          fontSize: "1.5vmax",
          fontWeight: "normal",
          fontFamily: "Roboto",
          color: "#3C6E71",
        },
      },
      subtitle: {
        text: subtitle,
        align: "center",
        style: {
          fontSize: "1vmax",
          fontWeight: "normal",
          fontFamily: "Roboto",
          color: "#3C6E71",
        },
      },
    },
  });

  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      series: transformData(data, transformFunc),
    }));
  }, [data, transformFunc]);

  return (
    <div id="wrapper">
      <div id="chart-line">
        <ReactApexChart
          options={state.options}
          series={state.series}
          type={chartType}
          height={height}
          width={width}
        />
      </div>
    </div>
  );
};

export default ApexCharts;
