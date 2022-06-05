import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { todoActions } from "../actions/todoActions";
import renderList from "../Components/renderList";

const ListTodo = () => {
  const dispatch = useDispatch();
  const todos = useSelector(state => state.todo.todos); 

  return (
    <div>
      <button onClick={() => dispatch({ type: todoActions.FETCH_DATA_SAGA })}>
        Getdata
      </button>
      {renderList(todos)}
    </div>
  );
}

export default ListTodo;
