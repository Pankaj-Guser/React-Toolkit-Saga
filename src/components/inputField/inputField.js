import React, { useState } from "react";
import Card from "terra-card/lib/Card";
import classNames from "classnames/bind";
import Spacer from "terra-spacer";
import styles from "./CardPaddingHR.scss";

const cx = classNames.bind(styles);
function InputFieldComp(props) {
  const {
    cell2Value,
    cell1Value,
    UpdateCell1Value,
    UpdateCell2Value,
  } = props;
  // const [field1value, setField1value] = useState("");
  // const [field2value, setField2value] = useState("");

  const handleFieldOne = (event) => {
    UpdateCell1Value(event.target.value);
    // setField1value(event.target.value);
  };

  const handleFieldTwo = (event) => {
    UpdateCell2Value(event.target.value);
    // setField2value(event.target.value);
  };

  return (
    <div>
      <Card>
        <Card.Body>
          <Spacer
            className="spacerdemodefault"
            marginRight="medium"
            isInlineBlock
          >
            <label>Facility</label>
          </Spacer>
          <input
            type="text"
            className="float-right"
            value={cell1Value !== "" ? cell1Value : ""}
            placeholder="facility"
            onChange={handleFieldOne}
          />
        </Card.Body>
        <hr className={cx("horizontal-rule")} />
        <Card.Body>
          <Spacer
            className="spacerdemodefault"
            marginRight="medium"
            isInlineBlock
          >
            <label>Primary criteria</label>
          </Spacer>

          <input
            className="float-right"
            type="text"
            value={cell2Value !== "" ? cell2Value : ""}
            placeholder="primary criteria"
            onChange={handleFieldTwo}
          />
        </Card.Body>
      </Card>
    </div>
  );
}

export default InputFieldComp;
