import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Remove
} from "../../Features/TODODataReducer";

import "./table.scss";

export default function TableBodyComp() {
  const tableData = useSelector(state => state.todo.todos); 
  const dispatch = useDispatch();
  const [bodyData, SetbodyData] = useState(tableData);

  useEffect(() => {
    SetbodyData(tableData);
  }, [tableData]);

  function ConfirmBox() {
    return (
      <>
        {tableData.length > 1
          ? alert("are you sure! You want to remove it")
          : alert("list is going to be empty! are you sure you want to do ths")}
      </>
    );
  }

  function RemoveElement(index) {
    let tableData = [...bodyData];
    tableData.splice(index, 1);
    ConfirmBox();
    dispatch(Remove(tableData));
  }
  return (
    <tbody className="table-body" key="tableBody">
      {bodyData.length > 0 ? (
        bodyData.map((data, index) => (
          <tr className="table-row" key={index}>
            {data.map((rowData, key) => (
              <td className="table-cell" key={`rowData${key}`}>
                {rowData}
              </td>
            ))}
            <button
              type="button"
              className="btn btn-link"
              key={`removeButton${index}`}
              onClick={(e) => RemoveElement(index)}
            >
              Remove
            </button>
          </tr>
        ))
      ) : (
        <div className="error-msg-style">No Record in Table</div>
      )}
    </tbody>
  );
}
