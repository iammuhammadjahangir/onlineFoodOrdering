// import {Xl} from "xlsx";

import { FormEvent } from "react";

// import XlsxPopulate from "xlsx-populate";
export const formattedHighestOrderValue = (value: number) => {
  return new Intl.NumberFormat("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: true,
  }).format(value);
};

// Function to generate dynamic colors
export const generateColors = (baseColor: string, count: number) => {
  const colors = [baseColor];
  for (let i = 1; i < count; i++) {
    const hue = Math.floor(Math.random() * 360);
    const saturation = 80 + Math.random() * 20; // Saturation between 80% and 100%
    const lightness = 40 + Math.random() * 20; // Lightness between 40% and 60%
    colors.push(`hsl(${hue}, ${saturation}%, ${lightness}%)`);
  }
  return colors;
};
// Function to generate dynamic offsets
export const generateOffsets = (count: number) => {
  const offsets = new Array(count).fill(0);
  // Example logic to set offsets
  offsets[0] = 50; // Adjust this as needed
  return offsets;
};

export const getMonthName = (monthNumber: number) => {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return monthNames[monthNumber - 1];
};

export const formatNumber = (value: number) => {
  if (value >= 1_000_000) {
    return (value / 1_000_000).toFixed(1) + "M"; // Format in millions
  } else if (value >= 1_000) {
    return (value / 1_000).toFixed(1) + "k"; // Format in thousands
  } else {
    return value.toString(); // No formatting for values less than 1,000
  }
};

export const gradientColors = [
  "rgb(245, 176, 65)", // Equivalent of the first gradient start color
  "rgb(255, 105, 70)", // Equivalent of the second gradient start color
  "rgb(255, 106, 74)", // Equivalent of the third gradient start color
];

export const classes = ["yellow", "orange", "red"]; // Adjust as needed

function getSheetData(data: any, header: any) {
  var fields = Object.keys(data[0]);
  var sheetData = data.map(function (row: any) {
    return fields.map(function (fieldName) {
      return row[fieldName] ? row[fieldName] : "";
    });
  });
  sheetData.unshift(header);
  return sheetData;
}

// export const exportToExcel = ({ data, header, fileName }: any) => {
//   // var data = [
//   //   { name: "John", city: "Seattle" },
//   //   { name: "Mike", city: "Los Angeles" },
//   //   { name: "Zach", city: "New York" }
//   // ];
//   // let header = ["Name", "City"];

//   XlsxPopulate.fromBlankAsync().then(async (workbook: any) => {
//     const sheet1 = workbook.sheet(0);
//     const sheetData = getSheetData(data, header);
//     const totalColumns = sheetData[0].length;

//     sheet1.cell("A1").value(sheetData);
//     const range = sheet1.usedRange();
//     const endColumn = String.fromCharCode(64 + totalColumns);
//     sheet1.row(1).style("bold", true);
//     sheet1.range("A1:" + endColumn + "1").style("fill", "BFBFBF");
//     range.style("border", true);
//     return workbook.outputAsync().then((res: any) => {
//       saveAs(res, "file.xlsx");
//     });
//   });
// };

// const exportToExcel = () => {
//   const ws = XLSX.utils.json_to_sheet(data);
//   const wb = XLSX.utils.book_new();
//   XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
//   XLSX.writeFile(wb, "data.xlsx");
// };

// const exportToPDF = () => {
//   const doc = new jsPDF();
//   doc.autoTable({
//     head: [columns.map(col => col.Header)],
//     body: data.map(row => columns.map(col => row[col.accessor])),
//   });
//   doc.save("data.pdf");
// };

export const copyText = async (coupon: string) => {
  await window.navigator.clipboard.writeText(coupon);
  // setIsCopied(true);
};

export const generatePromoCode = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const allLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const allNumbers = "0123456789";

  let result = "";

  // Generate first three characters (letters)
  for (let i = 0; i < 3; i++) {
    const randomLetter = allLetters.charAt(
      Math.floor(Math.random() * allLetters.length)
    );
    result += randomLetter;
  }

  // Generate next three characters (numbers)
  for (let i = 0; i < 3; i++) {
    const randomNumber = allNumbers.charAt(
      Math.floor(Math.random() * allNumbers.length)
    );
    result += randomNumber;
  }

  console.log("Generated code:", result);
  return result;
  // Handle the rest of your form submission logic here
};
export const convertTimeToCompleteDate = (timeString: string): string => {
  // Get the current date
  const currentDate = new Date();

  // Extract the hours and minutes from the timeString
  const [hours, minutes] = timeString.split(":").map(Number);

  // Set the hours and minutes of the current date
  currentDate.setHours(hours);
  currentDate.setMinutes(minutes);
  currentDate.setSeconds(0); // Set seconds to 0 if not provided

  // Convert the date to the required format
  const completeDateString = currentDate.toString(); // This will give the full date in the format you want

  return completeDateString;
};

export const formatTime = (time: string) => {
  const [hours, minutes] = time.split(":").map(Number);

  // Adjust minutes if greater than 59
  const adjustedMinutes = minutes >= 60 ? minutes % 60 : minutes;
  const adjustedHours = hours + Math.floor(minutes / 60);

  // Format hours and minutes to two digits
  const formattedHours = String(adjustedHours).padStart(2, "0");
  const formattedMinutes = String(adjustedMinutes).padStart(2, "0");

  return `${formattedHours}:${formattedMinutes}`;
};
