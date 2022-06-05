import {
  createSlice,
} from "@reduxjs/toolkit";

const todoSlice = createSlice({
  name: "todo",
  initialState: {
    todos: []
  },
  reducers: {
    fetchData: (state, action) => {
      return {
        todos: action.payload
      };
    },
    Remove: (state, action) => {
      return {
      todos: action.payload
      }
    },
    Add: (state, action) => {

      return{
        todos: action.payload
      }
    }
  }
});

export const { fetchData, Remove, Add } = todoSlice.actions;


export default todoSlice;