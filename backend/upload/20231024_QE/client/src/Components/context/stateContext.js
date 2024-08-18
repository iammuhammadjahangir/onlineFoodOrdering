import { createContext, useEffect, useRef, useState } from "react";

export const State = createContext();
export default function StateContext({ children }) {
    const [searchData, setSearchData]=useState(false);
    const context = {
        searchData, setSearchData
    }
    return <State.Provider value={context}>{children}</State.Provider>;
}
