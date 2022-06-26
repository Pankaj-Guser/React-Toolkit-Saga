import React, { useState } from "react";
import Button from "terra-button";
import { injectIntl } from "react-intl";
import InputFieldComp from "../inputField/inputField";
import Spacer from "terra-spacer";
import { FormattedMessage } from "react-intl";
import ActionHeader from "terra-action-header";
import DialogModal from "terra-dialog-modal";
import generalStyles from "./AbstractModalDocCommon.module.scss";

function ModalComp(props) {
  const { clickedFunction, openModal, setOpenModal, selectedKey } = props;
  const [cell1Value, setCell1value] = useState("");
  const [cell2Value, setCell2value] = useState("");
  const UpdateCell1Value = (value) => {
    setCell1value(value);
  };
  const UpdateCell2Value = (value) => {
    setCell2value(value);
  };
  const handleSave = () => {
    setOpenModal(false);
    clickedFunction(cell1Value, cell2Value, selectedKey);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const FooterButton = () => (
    <>
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
        <Button text={<FormattedMessage id="app.modal.closebutton" defaultMessage="close button" />} onClick={handleCloseModal} />
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
        <Button text={<FormattedMessage id="app.modal.savebutton" defaultMessage="save button" />} onClick={handleSave} />
      </Spacer>
    </>
  );

  return (
    <>
      <DialogModal
        ariaLabel="Dialog Modal With Long Text"
        isOpen={openModal}
        onRequestClose={handleCloseModal}
        header={
          <ActionHeader
            title={
              <FormattedMessage
                id="app.modal.title"
                defaultMessage="modal title"
              />
            }
            onClose={handleCloseModal}
          />
        }
        footer={<FooterButton />}
        width="640"
      >
        <InputFieldComp
          cell1Value={cell1Value}
          cell2Value={cell2Value}
          UpdateCell1Value={UpdateCell1Value}
          UpdateCell2Value={UpdateCell2Value}
        />
      </DialogModal>
    </>
  );
}

export default injectIntl(ModalComp);
