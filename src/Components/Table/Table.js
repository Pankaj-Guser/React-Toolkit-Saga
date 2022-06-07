import React, { useState} from "react";
import mockData from "../../mockData/TableMockData"

import Table, { Utils } from "terra-table";
import EmptyComp from "../../Components/EmptyComp";
import "./table.scss";

export default function TableComp(props) {
  const {
    tableData,
    addTableRow,
    removeTableRow
  } = props;

  const tableHeaderData = mockData.tableHeaderMockData;
  
  const maxSectionCount = tableData.tabledata.length-1;

  const createCell = (cell) => ({ key: cell.key, children: cell.title });
  const createHeader = (cell) => ({ key: cell.key, children: cell.children });

  const createCellsForRow = (cells) => cells.map((cell) => createCell(cell));

  const [selectedKeys, setSelectedKeys] = useState([]);

  const handleRowToggle = (event, metaData) => {
    event.preventDefault();
    setSelectedKeys(Utils.toggleArrayValue(selectedKeys, metaData.key));
  };

  const RemoveSelected = (e) => {
    e.preventDefault();
    let data = tableData.tabledata
    data = data.filter(item => selectedKeys.indexOf(item.key) === -1);
    removeTableRow(data);
  }

  const AddElement = () => {
    let data = tableData.tabledata;
    let latestIndex = parseInt(data[data.length-1].key) + 1;
    let newData = {key: latestIndex.toString(), 
    toggleText: "toggle",
    cells:[
      { key: 'cell-0', id: 'toggle-0', title: 'Name1' },
      { key: 'cell-1', id: 'toggle-1', title: 'Address' },
      { key: 'cell-2', id: 'toggle-2', title: 'Phone Number' },
      { key: 'cell-3', id: 'toggle-3', title: 'Email Id' },
    ]}

    addTableRow(newData);
  }

  const createRow = (rowData) => ({
    key: rowData.key,
    cells: createCellsForRow(rowData.cells),
    isDisabled: !Utils.canToggleArrayValue(
      maxSectionCount,
      selectedKeys,
      rowData.key
    ),
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
          <div className="btn-space" >
            <button
              type="button"
              onClick={AddElement}
            >
              Add
            </button>
            <button
              type="button"
              onClick={RemoveSelected}
            >
              Remove
            </button>
          </div>
        </div>
      ) : (
        <EmptyComp />
      )}
    </div>
  );
}
