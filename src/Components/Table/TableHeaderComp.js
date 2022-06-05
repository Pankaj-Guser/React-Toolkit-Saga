import React from "react";
import {useSelector, useDispatch } from "react-redux";
import {
  Add
} from "../../Features/TODODataReducer";
import "./table.scss";
export default function TableHeaderComp() {
  const tableData = useSelector(state => state.todo.todos); 
  const dispatch = useDispatch();

  function AddElement() {
    let data = [...tableData, ["", ""]];
    dispatch(Add(data));
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
