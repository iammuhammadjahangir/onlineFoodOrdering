import {
  AiOutlineSortAscending,
  AiOutlineSortDescending,
} from "react-icons/ai";
import { CiSearch } from "react-icons/ci";

import jsPDF from "jspdf";
import "jspdf-autotable"; //
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import {
  Column,
  TableOptions,
  useFilters,
  useGlobalFilter,
  usePagination,
  useRowSelect,
  useSortBy,
  useTable,
} from "react-table";
import { utils, writeFile } from "xlsx";
import { RootState } from "../../redux/store";
import { Checkbox } from "./checkboxTable";
import { ColumnFilter } from "./columnFilter";
// import { exportToExcel } from "../../features/utils";

//we pass the type of object with it so T will relace by that type (we use T because data is not always same type)
function TableHOC<T extends object>(
  columns: Column<T>[],
  data: T[],
  containerClassname: string,
  heading: string,
  showPagination: boolean = false,
  canShowSearchContainer: boolean = true
) {
  return function HOC() {
    const { user } = useSelector((state: RootState) => state.userReducer);
    const { t } = useTranslation();
    const defaultColumn = useMemo(() => {
      return {
        Filter: ColumnFilter,
      };
    }, []);

    const options: TableOptions<T> = {
      columns,
      data,
      defaultColumn,
      // defaultColumns,
      initialState: {
        pageSize: user?.tableRows || 5, // default number of rows per page
      },
    };

    const [exportModalIsOpen, setExportModalIsOpen] = useState(false);
    const [isColumnDialogOpen, setIsColumnDialogOpen] = useState(false);
    const [hiddenColumns, setHiddenColumns] = useState<Set<string>>(new Set());

    const toggleExportModal = () => {
      setIsColumnDialogOpen(false);
      setExportModalIsOpen(!exportModalIsOpen);
    };
    const toggleColumnDialog = () => {
      setExportModalIsOpen(false);
      setIsColumnDialogOpen(!isColumnDialogOpen);
    };

    const toggleColumn = (columnId: string) => {
      setHiddenColumns((prev) => {
        const newSet = new Set(prev);
        if (newSet.has(columnId)) {
          newSet.delete(columnId);
        } else {
          newSet.add(columnId);
        }
        return newSet;
      });
    };

    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      page,
      prepareRow,
      previousPage,
      canPreviousPage,
      nextPage,
      canNextPage,
      pageCount,
      gotoPage,
      setGlobalFilter,
      selectedFlatRows, // Ensure this is used correctly
      state: { pageIndex, globalFilter },
      allColumns,
      getToggleHideAllColumnsProps,
    } = useTable(
      options,
      useFilters,
      useGlobalFilter,
      useSortBy,
      usePagination,
      useRowSelect,
      (hooks) => {
        hooks.visibleColumns.push((columns) => [
          {
            id: "selection",
            Header: ({ getToggleAllRowsSelectedProps }) => (
              <Checkbox {...getToggleAllRowsSelectedProps()} />
            ),
            Cell: ({ row }: any) => (
              <Checkbox {...row.getToggleRowSelectedProps()} />
            ),
          },
          ...columns,
        ]);
      }
    );

    const exportToExcel = () => {
      // Extract headers
      const headers = columns.map((col) => col.Header);

      // Extract data
      const tableData = page.map((row) => row.cells.map((cell) => cell.value));

      // Create a worksheet
      const worksheet = utils.aoa_to_sheet([headers, ...tableData]);

      // Create a workbook and add the worksheet
      const workbook = utils.book_new();
      utils.book_append_sheet(workbook, worksheet, "Sheet1");

      // Write the workbook to a file and trigger a download
      writeFile(workbook, "table_data.xlsx");
    };

    const exportToPDF = () => {
      const doc = new jsPDF();
      console.log(doc);
      const tableColumn = columns.map((col) => (col.Header as string) || "");
      const tableRows: any[] = [];

      data.forEach((rowData) => {
        const row: any[] = [];
        columns.forEach((col) => {
          row.push(rowData[col.accessor as keyof T]);
        });
        tableRows.push(row);
      });

      (doc as any).autoTable({
        head: [tableColumn],
        body: tableRows,
      });

      doc.save("table_data.pdf");
    };

    const exportToCSV = () => {
      // Define the headers from the columns
      const tableColumn = columns.map((col) => col.Header as string);

      // Initialize an array to hold the data rows
      const tableRows: any[] = [];

      // Iterate over the data to build the rows
      data.forEach((rowData) => {
        const row: any[] = [];
        columns.forEach((col) => {
          let cellData: any = rowData[col.accessor as keyof T];

          // Convert complex objects to JSON strings
          if (typeof cellData === "object" && cellData !== null) {
            cellData = JSON.stringify(cellData);
          }

          // Escape any commas, quotes, or newlines in the cell data
          cellData = `"${String(cellData).replace(/"/g, '""')}"`;

          row.push(cellData);
        });
        tableRows.push(row);
      });

      // Convert the column headers and rows to CSV format
      let csvContent = "data:text/csv;charset=utf-8,";
      csvContent += tableColumn.join(",") + "\n"; // Header row
      tableRows.forEach((row) => {
        csvContent += row.join(",") + "\n"; // Data rows
      });

      // Create a downloadable link and trigger the download
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "table_data.csv");
      document.body.appendChild(link); // Required for Firefox
      link.click();
      document.body.removeChild(link);
    };

    // After the table rendering and state update
    useEffect(() => {
      console.log(selectedFlatRows.map((row) => row.original)); // Log the selected rows' data
    }, [selectedFlatRows]);

    return (
      <div className={`${containerClassname} mainTableContainer`}>
        {heading && <h2 className="heading"> {heading}</h2>}
        {true && (
          <div className="topTableContainer">
            <div className="searchContainer">
              <CiSearch />
              <input
                type="text"
                placeholder="Filter Table Records"
                value={globalFilter || ""}
                onChange={(e) => setGlobalFilter(e.target.value)}
              />
            </div>
            <div className="extraFeatures">
              {/* Export Button */}
              <button
                onClick={toggleExportModal}
                className="featureButton export"
              >
                <img
                  width="40"
                  height="40"
                  src="https://img.icons8.com/bubbles/50/export.png"
                  alt="export"
                />
                Export
                {exportModalIsOpen && (
                  <dialog open className="modal exportModal">
                    <button className="close" onClick={toggleExportModal}>
                      &times;
                    </button>
                    <h2>Export Data</h2>
                    <ul>
                      <li onClick={exportToPDF}>
                        <img
                          width="48"
                          height="48"
                          src="https://img.icons8.com/3d-fluency/94/pdf-file.png"
                          alt="pdf-file"
                        />
                        Export as PDF
                      </li>
                      <li onClick={exportToExcel}>
                        <img
                          width="48"
                          height="48"
                          src="https://img.icons8.com/fluency/48/microsoft-excel-2019.png"
                          alt="microsoft-excel-2019"
                        />
                        Export as Excel
                      </li>
                      <li onClick={exportToCSV}>
                        <img
                          width="48"
                          height="48"
                          src="https://img.icons8.com/color/48/import-csv.png"
                          alt="import-csv"
                        />
                        Export as CSV
                      </li>
                    </ul>
                  </dialog>
                )}
              </button>

              {/* Column Visibility Button */}
              <button
                onClick={toggleColumnDialog}
                className="featureButton columnVisibility"
              >
                <img
                  width="40"
                  height="40"
                  src="https://img.icons8.com/nolan/64/hide-grid.png"
                  alt="hide-grid"
                />
                Column Visibility
                {isColumnDialogOpen && (
                  <dialog open className="modal columnModal">
                    <button className="close" onClick={toggleColumnDialog}>
                      &times;
                    </button>
                    <div>
                      <Checkbox {...getToggleHideAllColumnsProps()} /> Toggle
                      All
                    </div>
                    {allColumns.map((column: any) => (
                      <div key={column.id} className="columnOption">
                        <label>
                          {console.log(typeof column.Header)}
                          <input
                            type="checkbox"
                            {...column.getToggleHiddenProps()}
                          />
                          {typeof column.Header === "function"
                            ? "Multi Select"
                            : column.Header}
                        </label>
                      </div>
                    ))}
                  </dialog>
                )}
              </button>
            </div>
          </div>
        )}
        <table className="table" {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render("Header")}
                    {column.isSorted && (
                      <span>
                        {" "}
                        {column.isSortedDesc ? (
                          <AiOutlineSortDescending />
                        ) : (
                          <AiOutlineSortAscending />
                        )}
                      </span>
                    )}
                    {/* {column.canFilter && column.render("Filter") ? (
                      <div>{column.render("Filter")}</div>
                    ) : null} */}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);

              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
        {showPagination && (
          <div className="tablePagination">
            <button disabled={!canPreviousPage} onClick={() => gotoPage(0)}>
              {t("goToFirstPage")}
            </button>
            <button disabled={!canPreviousPage} onClick={previousPage}>
              {t("previousPage")}
            </button>
            <span>{`${pageIndex + 1} of ${pageCount}`}</span>
            <button disabled={!canNextPage} onClick={nextPage}>
              {t("nextPage")}
            </button>
            <button
              disabled={!canNextPage}
              onClick={() => gotoPage(pageCount - 1)}
            >
              {t("goToLastPage")}
            </button>
          </div>
        )}
      </div>
    );
  };
}

export default TableHOC;
