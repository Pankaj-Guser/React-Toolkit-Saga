import React from "react";
import Button from "terra-button";
import InputFieldComp from "./inputField/inputField";

function ModalComp(props) {
  const {
    cell1Value,
    cell2Value,
    UpdateCell1Value,
    UpdateCell2Value,
    clickedFunction,
    passedValue
  } = props;

  const handleSave = () => clickedFunction();
  return (
    <>
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Input Fields
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <InputFieldComp
                cell1Value={cell1Value}
                cell2Value={cell2Value}
                UpdateCell1Value={UpdateCell1Value}
                UpdateCell2Value={UpdateCell2Value}
                passedValue={passedValue}
              />
            </div>
            <div class="modal-footer">
              <Button
                type="button"
                text="Save"
                class="btn btn-primary"
                data-dismiss="modal"
                onClick={handleSave}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ModalComp;
