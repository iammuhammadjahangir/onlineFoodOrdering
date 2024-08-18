// import React from "react";
// // import Modal from "react-modal";
// import XLSX from "xlsx";
// import Papa from "papaparse";
// import jsPDF from "jspdf";
// import "jspdf-autotable";

// // Define types for props
// interface Column {
//   Header: string;
//   accessor?: string;
//   id: string;
// }

// interface ExportModalProps {
//   isOpen: boolean;
//   onRequestClose: () => void;
//   data: Record<string, any>[];
//   columns: any[];
// }

// const ExportModal: React.FC<ExportModalProps> = ({
//   isOpen,
//   onRequestClose,
//   data,
//   columns,
// }) => {
//   const handleExport = (type: "csv" | "excel" | "pdf") => {
//     switch (type) {
//       case "csv":
//         const csvData = Papa.unparse({
//           fields: columns.map((col) => col.Header),
//           data: data.map((row) =>
//             columns.map((col) => row[col.accessor || col.id])
//           ),
//         });
//         const csvBlob = new Blob([csvData], {
//           type: "text/csv;charset=utf-8;",
//         });
//         const csvUrl = URL.createObjectURL(csvBlob);
//         const csvLink = document.createElement("a");
//         csvLink.href = csvUrl;
//         csvLink.setAttribute("download", "table-data.csv");
//         document.body.appendChild(csvLink);
//         csvLink.click();
//         document.body.removeChild(csvLink);
//         break;
//       case "excel":
//         const ws = XLSX.utils.json_to_sheet(data, {
//           header: columns.map((col) => col.Header),
//         });
//         const wb = XLSX.utils.book_new();
//         XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
//         XLSX.writeFile(wb, "table-data.xlsx");
//         break;
//       case "pdf":
//         const doc = new jsPDF();
//         const tableData = data.map((row) =>
//           columns.map((col) => row[col.accessor || col.id])
//         );
//         (doc as any).autoTable({
//           head: [columns.map((col) => col.Header)],
//           body: tableData,
//         });
//         doc.save("table-data.pdf");
//         break;
//       default:
//         break;
//     }
//     onRequestClose();
//   };

//   return (
//     <div
//     //   isOpen={isOpen}
//     //   onRequestClose={onRequestClose}
//     //   contentLabel="Export Options"
//     //   ariaHideApp={false}
//     >
//       <h2>Select Export Format</h2>
//       <button onClick={() => handleExport("csv")}>Export as CSV</button>
//       <button onClick={() => handleExport("excel")}>Export as Excel</button>
//       <button onClick={() => handleExport("pdf")}>Export as PDF</button>
//       <button onClick={onRequestClose}>Close</button>
//     </div>
//   );
// };

// export default ExportModal;
