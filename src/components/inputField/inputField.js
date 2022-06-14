import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import tableActions from "../../actions/tableActions";
import "../table/table.scss";

function InputFieldComp(props) {
//   const dispatch = useDispatch();
//   const tableData = useSelector((state) => state.TableData);

const handleFieldOne = (event) => {

}

const handleFieldTwo = (event) => {
    
}
  
  return (
    <>
      <div>
        <input type="text" placeholder="input field 1" onClick={(e) => handleFieldOne(e)} />
        <input type="text" placeholder="input field 2" onClick={(e) => handleFieldTwo(e)} />
      </div>
    </>
  );
}

export default InputFieldComp;
