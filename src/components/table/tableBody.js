import React, { useState } from "react";
import {FormattedMessage} from "react-intl"
import Button from "terra-button";
import { useDispatch } from "react-redux";
import Spacer from "terra-spacer";
import { useHistory } from "react-router-dom";
import { Cell, Row } from "terra-html-table";
import ActionsConstant from "../../actions/ActionsConstant";
import ModalComp from "../modal/Modal";
import "../table//table.scss";

const TableBodyComp = (props) => {
  const dispatch = useDispatch();
  let history = useHistory();
  const { row } = props;
  const [openModal, setOpenModal] = useState(false);
  const PassValueUpdate = () => {
    setOpenModal(true);
  };

  const UpdateSelected = (cell1Value, cell2Value, selectedKey) => {
    const updatedCellData = {
      knowledge_basis: {
        facility_cd: cell1Value,
        primary_criteria_cd: cell2Value,
      },
    };
    dispatch({
      type: ActionsConstant.UPDATE_SINGLE_ROW_DATA,
      selectedKey,
      updatedCellData,
    });
  };

  const RemoveSelected = (selectedKey) => {
    dispatch({ type: ActionsConstant.DELETE_SINGLE_ROW_DATA, selectedKey });
  };
  
  const NavigateToDetailsPage = (selectedCellData) => {
    history.push("/selectedKnowledgebasisDetail", selectedCellData);
  }

  return (
    <>
      <ModalComp
        openModal={openModal}
        setOpenModal={setOpenModal}
        row={row}
        selectedKey = {row.key}
        clickedFunction={UpdateSelected}
      />
      <Row key={row.key} >
        {row.cells.map((cell) => (
          <Cell key={cell.key}>{cell.title}</Cell>
        ))}
        <Cell key={`btn${row.key}`} >
          <Spacer
            className="spacerdemoprimary"
            paddingRight="medium"
            isInlineBlock
          >
            <Button text={<FormattedMessage id="app.Edit.button" defaultMessage="btn" />} onClick={PassValueUpdate} />
          </Spacer>
          <Spacer
            className="spacerdemoprimary"
            paddingLeft="medium"
            paddingRight="medium"
            isInlineBlock
          >
            <Button text={<FormattedMessage id="app.Remove.button" defaultMessage="btn" />} onClick={() => RemoveSelected(row.key)} />
          </Spacer>
          <Spacer
            className="spacerdemoprimary"
            paddingLeft="medium"
            isInlineBlock
          >
            <Button text={<FormattedMessage id="app.Detail.button" defaultMessage="btn" />} onClick={() => NavigateToDetailsPage(row)} />
          </Spacer>
        </Cell>
      </Row>
    </>
  );
};

export default TableBodyComp;
