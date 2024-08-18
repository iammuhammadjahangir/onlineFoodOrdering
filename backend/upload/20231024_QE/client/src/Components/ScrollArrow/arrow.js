import React from "react";
import { BsArrowUpCircleFill } from "react-icons/bs";
import { AiOutlineArrowUp } from "react-icons/ai";

const arrow = ({ tableContainerRef }) => {
  const scrollToTop = () => {
    tableContainerRef.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        padding: "15px",
        backgroundColor: "#21ba45",
        color: "#fff",
        border: "none",
        borderRadius: "50%",
        cursor: "pointer",
      }}
      onClick={scrollToTop}
    >
      <AiOutlineArrowUp size={42} />
    </button>
  );
};

export default arrow;