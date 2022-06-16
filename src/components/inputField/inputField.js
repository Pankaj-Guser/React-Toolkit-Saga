import React, { useState } from "react";
import Card from "terra-card/lib/Card";
import classNames from "classnames/bind";
import styles from "./CardPaddingHR.scss";

const cx = classNames.bind(styles);
function InputFieldComp(props) {
  const { cell2Value, cell1Value, UpdateCell1Value, UpdateCell2Value, passedValue } = props;
  const [field1value, setField1value] = useState("")
  const [field2value, setField2value] = useState("")


  const handleFieldOne = (event) => {UpdateCell1Value(event.target.value); setField1value(event.target.value)}

  const handleFieldTwo = (event) => {UpdateCell2Value(event.target.value); setField2value(event.target.value)}

  return (
    <div>
      <Card>
        <Card.Body>
          <input
            type="text"
            value={ passedValue !== "Add"  ? cell1Value : field1value}
            placeholder="facility_cd"
            onChange={handleFieldOne}
          />
        </Card.Body>
        <hr className={cx("horizontal-rule")} />
        <Card.Body>
          <input
            type="text"
            value={passedValue !== "Add" ? cell2Value :field2value}
            placeholder="primary_criteria_cd"
            onChange={handleFieldTwo}
          />
        </Card.Body>
      </Card>
    </div>
  );
}

export default InputFieldComp;
