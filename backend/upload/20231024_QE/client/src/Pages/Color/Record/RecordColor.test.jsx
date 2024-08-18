import React from "react";
import ReactDOM from "react-dom";
import Records from "./RecordColor";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Records />, div);
});
