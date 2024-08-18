import React from "react";

type CheckboxProps = {
  indeterminate?: boolean; // Making this optional to avoid strict prop checking
} & React.InputHTMLAttributes<HTMLInputElement>; // Including all input attributes

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ indeterminate = false, ...rest }, ref) => {
    const defaultRef = React.useRef<HTMLInputElement>(null);
    const resolvedRef = ref || defaultRef;

    React.useEffect(() => {
      if (
        resolvedRef &&
        typeof resolvedRef !== "function" &&
        resolvedRef.current
      ) {
        resolvedRef.current.indeterminate = indeterminate;
      }
    }, [resolvedRef, indeterminate]);

    return <input type="checkbox" ref={resolvedRef} {...rest} />;
  }
);

Checkbox.displayName = "Checkbox"; // Adding displayName for debugging purposes
