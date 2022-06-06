import React from "react";

import "./table.scss";
export default function TableHeaderComp(props) {
  const {
    addTableRow
  } = props;

  const AddElement = () => {
    let data = ["", ""];
    addTableRow(data)
  }
  return (
    <div className="display container" >
      <thead className="table-header">
        <tr>
          <th>header1</th>
          <th>header2</th>
          <th>header3</th>
        </tr>
      </thead>
      <button
        type="button"
        className="btn btn-link"
        onClick={() => AddElement()}
      >
        Add
      </button>
    </div>
  );
}
