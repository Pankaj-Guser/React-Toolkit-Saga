import React, { useState } from "react";
import mockData from "../../mockData/tableMockData";
import HeaderComp from "./tableHeader";
import { useDispatch } from "react-redux";
import EmptyComp from "../emptycomponent/emptyComp";
import Spacer from "terra-spacer";
import Table, { Body } from "terra-html-table";
import ActionsConstant from "../../actions/ActionsConstant";
import Button from "terra-button";
import TableBodyComp from "./tableBody";
import ModalComp from "../modal/Modal";
import { FormattedMessage } from "react-intl";
import "./table.scss";

export default function TableComp(props) {
  const { tableData } = props;
  const dispatch = useDispatch();
  const tableHeaderData = mockData.tableHeaderMockData;
  const [passedValue, setPassedValue] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const PassValueAdd = () => {
    setOpenModal(true);
    setPassedValue("Add");
  };

  const AddElement = (cell1Value, cell2Value) => {
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
    dispatch({ type: ActionsConstant.ADD_SINGLE_ROW_DATA, createdCellData });
  };

  return (
    <div>
      {tableData.tabledata.length > 0 ? (
        <div>
          <ModalComp
            passedValue={passedValue}
            openModal={openModal}
            setOpenModal={setOpenModal}
            clickedFunction={AddElement}
          />
          <Spacer
            className="spacerdemodefault mb-0"
            paddingBottom="large"
            marginBottom="medium"
            paddingTop="large"
            marginTop="medium"
            isInlineBlock
          >
            <FormattedMessage
              id="app.table.title"
              defaultMessage="table title"
            />
          </Spacer>
          <Spacer
            className="spacerdemoprimary float-right"
            padding="large tiny"
            isInlineBlock
          >
            <Button
              text={
                <FormattedMessage id="app.create.button" defaultMessage="btn" />
              }
              onClick={PassValueAdd}
            />
          </Spacer>
          <Table paddingStyle="standard">
            <HeaderComp headers={tableHeaderData} />
            <Body>
              {tableData.tabledata &&
                tableData.tabledata.map((row, index) => (
                  <TableBodyComp key={index} row={row} />
                ))}
            </Body>
          </Table>
        </div>
      ) : (
        <EmptyComp />
      )}
    </div>
  );
}
