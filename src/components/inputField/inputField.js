import React, { useState } from "react";
import Card from "terra-card/lib/Card";
import classNames from "classnames/bind";
import styles from "./CardPaddingHR.scss";
// import { useDispatch, useSelector } from "react-redux";
// import tableActions from "../../actions/tableActions";
import "../table/table.scss";
const cx = classNames.bind(styles);

function InputFieldComp(props) {
  const { getFieldOneValue, getFieldTwoValue, cell1Value, cell2Value } = props;
  const [inputField1Value, setInputField1value] = useState(cell1Value);
  const [inputField2Value, setInputField2value] = useState(cell2Value);
  const handleFieldOne = (event) => {
    getFieldOneValue(event.target.value);
    setInputField1value(event.target.value);
  };

  const handleFieldTwo = (event) => {
    getFieldTwoValue(event.target.value);
    setInputField2value(event.target.value);
  };
  return (
    <>
    <label>Input Fields</label>
      <Card >
        <Card.Body>
          <input
            type="text"
            value={inputField1Value !== "" ? inputField1Value : cell1Value}
            placeholder="input field 1"
            onChange={handleFieldOne}
          />
        </Card.Body>
        <hr className={cx("horizontal-rule")} />
        <Card.Body>
          <input
            type="text"
            value={inputField2Value !== "" ? inputField2Value : cell2Value}
            placeholder="input field 2"
            onChange={handleFieldTwo}
          />
        </Card.Body>
      </Card>
    </>
  );
}

export default InputFieldComp;
