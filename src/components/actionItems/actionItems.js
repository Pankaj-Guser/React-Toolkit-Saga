import React, { useState } from "react";
import { useDispatch } from "react-redux";
import tableActions from "../../actions/tableActions";
import Button from "terra-button";
import Spacer from "terra-spacer";
import "../table//table.scss";
import ModalComp from "../Modal";

function ActionItemsComp(props) {
  const [passedValue, setPassedValue] = useState("");
  const dispatch = useDispatch();
  const {
    selectedKey,
    selectedStoredKey,
    cell1Value,
    cell2Value,
    UpdateSelectedKey,
    UpdateCell1Value,
    UpdateCell2Value,
  } = props;

  const PassValueUpdate = () => {
    setPassedValue("update");
  };

  const PassValueAdd = () => {
    setPassedValue("Add");
  };
  const UpdateSelected = () => {
    const updatedCellData = {
      knowledge_basis: {
        facility_cd: cell1Value,
        primary_criteria_cd: cell2Value,
      },
    };
    dispatch({
      type: tableActions.UPDATE_SINGLE_ROW_DATA,
      selectedKey,
      updatedCellData,
    });
    UpdateSelectedKey([]);
    UpdateCell1Value("");
    UpdateCell2Value("");
  };

  const RemoveSelected = () => {
    dispatch({ type: tableActions.DELETE_SINGLE_ROW_DATA, selectedKey });
    UpdateSelectedKey([]);
    UpdateCell1Value("");
    UpdateCell2Value("");
  };

  const AddElement = () => {
    const createdCellData = {
      knowledge_basis: {
        facility_cd: cell1Value,
        primary_criteria_cd: cell2Value,
        locale_code: {
          code: cell1Value,
          locale: cell1Value,
        },
      },
    };
    dispatch({ type: tableActions.ADD_SINGLE_ROW_DATA, createdCellData });
    UpdateSelectedKey([]);
    UpdateCell1Value("");
    UpdateCell2Value("");
  };

  return (
    <>
      <ModalComp
        cell1Value={cell1Value}
        cell2Value={cell2Value}
        UpdateCell1Value={UpdateCell1Value}
        UpdateCell2Value={UpdateCell2Value}
        passedValue = {passedValue}
        clickedFunction={passedValue === "Add" ? AddElement : UpdateSelected}
      />
      <div className="float-right">
        <Spacer
          className="spacerdemoprimary"
          padding="large small"
          isInlineBlock
        >
          <Button
            text="Create"
            isDisabled={
              selectedKey.length > 0 && selectedStoredKey !== undefined
                ? true
                : false
            }
            data-toggle="modal"
            data-target="#exampleModal"
            onClick={PassValueAdd}
          />
        </Spacer>
        <Spacer
          className="spacerdemodefault"
          paddingTop="large"
          paddingBottom="large"
          paddingLeft="small"
          paddingRight="small"
          marginTop="medium"
          marginBottom="medium"
          isInlineBlock
        >
          <Button
            isDisabled={
              selectedKey.length > 0 && selectedStoredKey !== undefined
                ? false
                : true
            }
            text="Update"
            data-toggle="modal"
            data-target="#exampleModal"
            onClick={PassValueUpdate}
          />
        </Spacer>
        <Spacer
          className="spacerdemodefault"
          paddingTop="large"
          paddingBottom="large"
          paddingLeft="small"
          paddingRight="small"
          marginTop="medium"
          marginBottom="medium"
          isInlineBlock
        >
          <Button
            isDisabled={
              selectedKey.length > 0 && selectedStoredKey !== undefined
                ? false
                : true
            }
            text="Remove"
            onClick={RemoveSelected}
          />
        </Spacer>
      </div>
    </>
  );
}

export default ActionItemsComp;
