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
    }
  }
});

export const { fetchData } = todoSlice.actions;

export default todoSlice;