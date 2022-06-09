import React, { useState} from "react";
import mockData from "../../mockData/tableMockData";
import ActionItemsComp from "./ActionItems";
import Table, { Utils } from "terra-table";
import EmptyComp from "../EmptyComp";
import "./table.scss";

export default function TableComp(props) {
  const { tableData } = props;

  const tableHeaderData = mockData.tableHeaderMockData;

  // let maxSectionCount = tableData.tabledata.length;

  const createCell = (cell) => ({ key: cell.key, children: cell.title });
  const createHeader = (cell) => ({ key: cell.key, children: cell.children });

  const createCellsForRow = (cells) => cells.map((cell) => createCell(cell));

  const [selectedKeys, setSelectedKeys] = useState([]);
  const handleRowToggle = (event, metaData) => {
    event.preventDefault();
    setSelectedKeys(Utils.toggleArrayValue(selectedKeys, metaData.key));
  };

  const createRow = (rowData) => ({
    key: rowData.key,
    cells: createCellsForRow(rowData.cells),
    toggleAction: {
      metaData: { key: rowData.key },
      onToggle: handleRowToggle,
      isToggled: selectedKeys.indexOf(rowData.key) >= 0,
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
                checkLabel: "Multi Selection",
              },
              cells: createHeaders(tableHeaderData),
            }}
            bodyData={[
              {
                rows: createRows(tableData.tabledata),
              },
            ]}
          />
          <ActionItemsComp selectedKeys={selectedKeys} />
        </div>
      ) : (
        <EmptyComp />
      )}
    </div>
  );
}
