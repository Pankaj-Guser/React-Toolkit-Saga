import React, { useState } from "react";
import Button from "terra-button";
import { injectIntl } from "react-intl";
import InputFieldComp from "./inputField/inputField";
import AbstractModal from "terra-abstract-modal";
import Card from "terra-card/lib/Card";
import classNames from "classnames/bind";
import Spacer from "terra-spacer";
import styles from "./ExampleAbstractSize.module.scss";
import generalStyles from "./AbstractModalDocCommon.module.scss";

const cx = classNames.bind(generalStyles);
function ModalComp(props) {
  const {
    cell1Value,
    cell2Value,
    UpdateCell1Value,
    UpdateCell2Value,
    clickedFunction,
    passedValue,
    UpdateSelectedKey,
    openModal,
    setOpenModal
  } = props;

  const handleSave = () => {setOpenModal(false); clickedFunction()}
  const [isOpen, setIsOpen] = useState(openModal);
  const handleCloseModal = () => {
    setOpenModal(false); 
    UpdateSelectedKey([])
    UpdateCell1Value("");
    UpdateCell2Value("");
  };

  const paraOne = "abc";
  console.log(">>>>>>>>>, ", props, isOpen)

  return (
    <>
      <AbstractModal
        ariaLabel="Default Modal"
        isOpen={openModal}
        onRequestClose={handleCloseModal}
        classNameModal={styles["fixed-size"]}
      >
        <Card variant="raised">
          <Card.Body>
            <label>Input Fields</label>
            <div className={cx("content-wrapper")}>
              <InputFieldComp
                cell1Value={cell1Value}
                cell2Value={cell2Value}
                UpdateCell1Value={UpdateCell1Value}
                UpdateCell2Value={UpdateCell2Value}
                passedValue={passedValue}
              />
            </div>

            <Spacer
              className="spacerdemodefault float-right"
              paddingTop="large"
              paddingBottom="large"
              paddingLeft="small"
              paddingRight="small"
              marginTop="medium"
              marginBottom="medium"
              isInlineBlock
            >
              <Button text="Save" onClick={handleSave} />
            </Spacer>
            <Spacer
              className="spacerdemodefault float-right"
              paddingTop="large"
              paddingBottom="large"
              paddingLeft="small"
              paddingRight="small"
              marginTop="medium"
              marginBottom="medium"
              isInlineBlock
            >
              <Button text="Close" onClick={handleCloseModal} />
            </Spacer>
          </Card.Body>
        </Card>
      </AbstractModal>
    </>
  );
}

export default injectIntl(ModalComp);
