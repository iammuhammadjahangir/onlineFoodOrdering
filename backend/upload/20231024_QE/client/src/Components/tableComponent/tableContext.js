import React, { useContext,createContext, useState, useEffect } from "react";
export const tableState = createContext();

export default function TableContext({ children }) {

    const [rowCount, setRowCount] = useState(0);


    const context = {
        rowCount, setRowCount
    };

    return <tableState.Provider value={context}>{children}</tableState.Provider>;
}