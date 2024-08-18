import React from "react";
import { useAsyncDebounce } from "react-table";

interface columnFilterProps {
  column: {
    filterValue: string;
    setFilter: (value: string) => void;
  };
}

export const ColumnFilter = ({ column }: columnFilterProps) => {
  const { filterValue, setFilter } = column;

  return (
    <span>
      <input
        value={filterValue || ""}
        onChange={(e) => setFilter(e.target.value)}
      />
    </span>
  );
};
