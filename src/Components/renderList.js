import React from "react";

const renderList = (todos) => {
    return Object.values(todos).map((todo,index) => {
      console.log("log result", todo)
      return <p key={index}>{todo}</p>;
    });
  };
  export default renderList;