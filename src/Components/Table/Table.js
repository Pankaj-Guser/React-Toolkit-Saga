import React from "react";
import TableHeaderComp from "./TableHeaderComp";
import TableBodyComp from "./TableBodyComp";
import "./table.scss";
export default function TableComp(props) {
  const {
    tableData,
    addTableRow,
    removeTableRow
  } = props;

  return (
    <div>
      <table className="table">
        <TableHeaderComp
          tableData = {tableData.tabledata}
          addTableRow = {addTableRow}
        />
        <TableBodyComp
          tableData = {tableData.tabledata}
          removeTableRow = {removeTableRow}
        />
      </table>
    </div>
  );
}