import React from "react";
import Card from "terra-card/lib/Card";
import classNames from "classnames/bind";
import styles from "./CardPaddingHR.scss";

const cx = classNames.bind(styles);
function InputFieldComp(props) {
  const { cell2Value, cell1Value, UpdateCell1Value, UpdateCell2Value, passedValue } = props;

  const handleFieldOne = (event) => UpdateCell1Value(event.target.value);

  const handleFieldTwo = (event) => UpdateCell2Value(event.target.value);

  return (
    <div>
      <Card>
        <Card.Body>
          <input
            type="text"
            value={ cell1Value !== "" ? cell1Value : ""}
            placeholder="facility_cd"
            onChange={handleFieldOne}
          />
        </Card.Body>
        <hr className={cx("horizontal-rule")} />
        <Card.Body>
          <input
            type="text"
            value={cell2Value !== "" ? cell2Value :""}
            placeholder="primary_criteria_cd"
            onChange={handleFieldTwo}
          />
        </Card.Body>
      </Card>
    </div>
  );
}

export default InputFieldComp;
