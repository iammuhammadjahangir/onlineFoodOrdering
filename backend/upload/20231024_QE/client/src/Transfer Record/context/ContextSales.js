import { createContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export const State = createContext();

export default function StateContext({ children }) {
  const [salesId, setSalesId] = useState("sss");
  const [selectedRadioOption, setSelectedRadioOption] = useState('')

  const salesRef = useRef();


  const context = {
    salesId,
    setSalesId,
    selectedRadioOption, setSelectedRadioOption,
    salesRef,
  };


  return <State.Provider value={context}>{children}</State.Provider>;
}
