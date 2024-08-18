import React from "react";
import ReactDOM from "react-dom";
import Records from "./CompanyRexord";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Records />, div);
});
