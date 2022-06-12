import React, { useState } from "react";
import mockData from "../../mockData/tableMockData";
import ActionItemsComp from "../actionItems/actionItems";
import Table from "terra-table";
import EmptyComp from "../emptyComp";
// import cellInputField from "../inputField/cellInputField"
import InputFieldComp from "../inputField/inputField";
import "./table.scss";

export default function TableComp(props) {
  const { tableData } = props;
  const [selectedKey, setSelectedKey] = useState([]);
  const [cell1Value, setCell1value] = useState("");
  const [cell2Value, setCell2value] = useState("");
  const tableHeaderData = mockData.tableHeaderMockData;
  const getFieldOneValue = (val) => {
    setCell1value(val);
  };
  const getFieldTwoValue = (val) => {
    setCell2value(val);
  };
  const createCell = (cell) => ({ key: cell.key, children: cell.title });
  const createHeader = (cell) => ({ key: cell.key, children: cell.children });
  const createCellsForRow = (cells) => cells.map((cell) => createCell(cell));
  const handleRowToggle = (event, metaData) => {
    event.preventDefault();
    if (selectedKey !== metaData.key) {
      let data = tableData.tabledata;
      let selectedCellData = data.filter(
        (data) => data.key === metaData.key && data
      );
      setSelectedKey(metaData.key);
      setCell1value(selectedCellData[0].cells[0].title);
      setCell2value(selectedCellData[0].cells[1].title);
    }
  };
  const createRow = (rowData) => ({
    key: rowData.key,
    cells: createCellsForRow(rowData.cells),
    toggleAction: {
      metaData: { key: rowData.key },
      onToggle: handleRowToggle,
      isToggled: selectedKey.indexOf(rowData.key) >= 0,
      toggleLabel: rowData.toggleText,
    },
  });
  const createRows = (data) => data.map((childItem) => createRow(childItem));
  const createHeaders = (data) =>
    data.map((childItem) => createHeader(childItem));
  return (
    <div>
      {tableData.tabledata.length > 0 ? (
        <div>
          <ActionItemsComp
            cell1Value={cell1Value}
            cell2Value={cell2Value}
            selectedKey={selectedKey}
          />

          <InputFieldComp
            cell1Value={cell1Value}
            cell2Value={cell2Value}
            getFieldOneValue={getFieldOneValue}
            getFieldTwoValue={getFieldTwoValue}
          />

          <Table
            summaryId="example-multi-select"
            summary="This table shows an implementation of multiple row selection."
            aria-multiselectable
            rowStyle="toggle"
            numberOfColumns={4}
            cellPaddingStyle="standard"
            dividerStyle="both"
            headerData={{
              selectAllColumn: {
                checkLabel: "Single Selection",
              },
              cells: createHeaders(tableHeaderData),
            }}
            bodyData={[
              {
                rows: createRows(tableData.tabledata),
              },
            ]}
          />
        </div>
      ) : (
        <EmptyComp />
      )}
    </div>
  );
}
