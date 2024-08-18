// import React from "react";
// import Modal from "react-modal";
// import { Checkbox } from "flowbite-react";

// // Define types for column and props
// interface Column {
//   id: string;
//   Header: string;
//   isHidden: boolean;
// }

// interface ColumnVisibilityModalProps {
//   isOpen: boolean;
//   onRequestClose: () => void;
//   //   allColumns: Column[];
//   toggleColumn: (columnId: string) => void;
// }

// const ColumnVisibilityModal: React.FC<ColumnVisibilityModalProps> = ({
//   isOpen,
//   onRequestClose,
//   //   allColumns,
//   toggleColumn,
// }) => {
//   return (
//     <Modal
//       isOpen={isOpen}
//       onRequestClose={onRequestClose}
//       contentLabel="Column Visibility"
//       ariaHideApp={false} // Set this based on your app needs
//       className="modal"
//       overlayClassName="modal-overlay"
//     >
//       <h2>Select Columns to Display</h2>
//       {/* {allColumns.map((column) => (
//         <div key={column.id}>
//           <label>
//             <Checkbox
//               checked={!column.isHidden}
//               onChange={() => toggleColumn(column.id)}
//             />
//             {column.Header}
//           </label>
//         </div>
//       ))} */}
//       <button onClick={onRequestClose}>Close</button>
//     </Modal>
//   );
// };

// export default ColumnVisibilityModal;
