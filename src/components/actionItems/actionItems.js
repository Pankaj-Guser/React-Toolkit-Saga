import React from "react";
import { useDispatch } from "react-redux";
import tableActions from "../../actions/tableActions";
import Button from "terra-button";
import Spacer from "terra-spacer";
import "./Spacer.module.scss";
// import InputFieldComp from "../inputField/inputField";
import "../table/table.scss";

function ActionItemsComp(props) {
  const dispatch = useDispatch();

  // const tableData = useSelector((state) => state.TableData);
  const { selectedKey, cell1Value, cell2Value } = props;

  const RemoveSelected = () => {
    dispatch({ type: tableActions.DELETE_SINGLE_ROW_DATA, selectedKey });
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
  };

  return (
    <>
      <div>
        <Spacer
          className="spacerdemoprimary"
          padding="large small"
          isInlineBlock
        >
          <Button text="Create" onClick={AddElement}>
            Add
          </Button>
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
          <Button text="Update" onClick={UpdateSelected}>
            Update
          </Button>
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
          <Button text="Remove" onClick={RemoveSelected}>
            Remove
          </Button>
        </Spacer>
      </div>
    </>
  );
}

export default ActionItemsComp;
