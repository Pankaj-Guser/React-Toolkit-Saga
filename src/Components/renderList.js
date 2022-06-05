import React from "react";

const renderList = (todos) => {
    return Object.values(todos).map((todo,index) => {
      return <p key={index}>{todo}</p>;
    });
  };
  export default renderList;