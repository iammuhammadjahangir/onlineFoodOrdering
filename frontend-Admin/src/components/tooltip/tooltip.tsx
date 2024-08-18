import React from "react";

interface TooltipProps {
  children: React.ReactNode;
  text: string;
  position?: string;
  length?: string;
}

const Tooltip = ({
  children,
  text,
  length = "fit",
  position = "down",
}: TooltipProps) => {
  return (
    <p className="inlineParagraph">
      <span
        className="tooltip"
        data-tooltip={`${text}`}
        data-tooltip-pos={`${position}`}
        data-tooltip-length={`${length}`}
      >
        {children}
      </span>
    </p>
  );
};

export default Tooltip;
