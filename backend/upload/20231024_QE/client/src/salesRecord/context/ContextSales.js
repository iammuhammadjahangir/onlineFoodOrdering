import { createContext, useRef, useState } from "react";

export const State = createContext();

export default function StateContext({ children }) {
  const [salesId, setSalesId] = useState("sss");

  const salesRef = useRef();
  const context = {
    salesId,
    setSalesId,
    salesRef,
  };

  return <State.Provider value={context}>{children}</State.Provider>;
}
