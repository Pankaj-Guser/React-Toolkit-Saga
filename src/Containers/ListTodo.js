import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { todoActions } from "../actions/todoActions";
import TableComp from "../Components/Table/Table";
// import renderList from "../Components/renderList";

const ListTodo = () => {
  const dispatch = useDispatch();
  const todos = useSelector(state => state.todo.todos); 

  useEffect( () => {
    dispatch({ type: todoActions.FETCH_DATA_SAGA })
  }, [])
  return (
    <div>
      {/* <button onClick={() => dispatch({ type: todoActions.FETCH_DATA_SAGA })}>
        Getdata
      </button>
      {renderList(todos)} */}
      <TableComp />
    </div>
  );
}

export default ListTodo;
