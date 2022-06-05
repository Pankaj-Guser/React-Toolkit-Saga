import React from "react";
import TableHeaderComp from "./TableHeaderComp";
import TableBodyComp from "./TableBodyComp";
import "./table.scss";
export default function TableComp() {
  return (
    <div>
      <table className="table">
        <TableHeaderComp />
        <TableBodyComp />
      </table>
    </div>
  );
}