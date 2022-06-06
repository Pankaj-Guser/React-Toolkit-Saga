import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { tableActions } from "../actions/tableActions";
import TableComp from "../Components/Table/Table";

export default function ListTodo() {
  const dispatch = useDispatch();
  const tableData = useSelector(state => state.TableData); 

  useEffect(()=>{
    dispatch({ type: tableActions.FETCH_DATA_SAGA })
  }, [dispatch])
  
  const addTableRow = (newRow) => {

    dispatch({type: "ADD_ROW", payload: [...tableData.tabledata, newRow]})
  }
  const removeTableRow = (tableData) => {

    dispatch({type: "REMOVE_ROW", payload: tableData})
  }

  return (
    <div>
      <TableComp 
        tableData = {tableData}
        addTableRow = {addTableRow}
        removeTableRow = {removeTableRow}
      />
    </div>
  );
}

