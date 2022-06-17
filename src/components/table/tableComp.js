import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import mockData from "../../mockData/tableMockData";
import Table from "terra-table";
import EmptyComp from "../emptyComp";
import Spacer from "terra-spacer";
import { useHistory } from "react-router-dom";
import tableActions from "../../actions/tableActions";
import ActionItemsComp from "../actionItems/actionItems";
import "./table.scss";

export default function TableComp(props) {
  const { tableData } = props;
  const tableHeaderData = mockData.tableHeaderMockData;
  let history = useHistory();
  const dispatch = useDispatch();
  const columnKeys = ["column-0", "column-1"];
  const selectedStoredKey = useSelector(
    (state) => state.TableData.selectedCellKey
  );
  const cell1InputData = useSelector((state) => state.TableData.cell1InputData);
  const cell2InputData = useSelector((state) => state.TableData.cell2InputData);
  const [cell1Value, setCell1value] = useState(
    cell1InputData ? cell1InputData : ""
  );
  const [cell2Value, setCell2value] = useState(
    cell2InputData ? cell2InputData : ""
  );
  const [selectedKey, setSelectedKey] = useState([]);
  useEffect(() => {
    selectedKey.push(selectedStoredKey);
  }, [selectedStoredKey]);
  const UpdateSelectedKey = (value) => {
    setSelectedKey(value);
  };
  const UpdateCell1Value = (value) => {
    setCell1value(value);
  };
  const UpdateCell2Value = (value) => {
    setCell2value(value);
  };
  const createCell = (cell) => ({ key: cell.key, children: cell.title });
  const createCellsForRow = (cells) => cells.map((cell) => createCell(cell));
  const handleRowToggle = (event, metaData) => {
    event.preventDefault();
    if (selectedKey !== metaData.key) {
      let data = tableData.tabledata;
      let selectedCellData = data.filter(
        (data) => data.key === metaData.key && data
      );
      UpdateSelectedKey(metaData.key);
      dispatch({
        type: tableActions.SET_SELECTED_CELL_KEY,
        payload: selectedCellData,
      });
      history.push("/selectedKnowledgebasisDetail", selectedCellData);
    } else {
      UpdateSelectedKey([]);
    }
  };
  const sortData = (data, sortColumn) => {
    if (!sortColumn) {
      return data;
    }

    const dataCopy = Object.assign([], data);
    dataCopy.sort((a, b) => {
      const x = a.cells[columnKeys.indexOf(sortColumn.key)].title.toLowerCase();
      const y = b.cells[columnKeys.indexOf(sortColumn.key)].title.toLowerCase();
      if (x < y) {
        return -1;
      }
      if (x > y) {
        return 1;
      }
      return 0;
    });

    return sortColumn.sortDesc ? dataCopy.reverse() : dataCopy;
  };

  const [sortColumn, setSortColumn] = useState({
    key: columnKeys[0],
    sortDesc: false,
  });

  const handleSortClick = (event, metaData) => {
    event.preventDefault();
    if (sortColumn.key !== metaData.key) {
      setSortColumn({ key: metaData.key, sortDesc: false });
    } else {
      setSortColumn({ key: metaData.key, sortDesc: !sortColumn.sortDesc });
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
  const createRows = (data) => {
    const sortedData = sortData(data, sortColumn);
    return sortedData.map((childItem) => createRow(childItem));
  };

  const createHeaderCell = (key, title) => ({
    key,
    id: `header-${key}`,
    metaData: { key },
    onSortAction: handleSortClick,
    isSortDesc: sortColumn.key === key ? sortColumn.sortDesc : false,
    isSortActive: sortColumn.key === key,
    children: title,
  });
  const GenerateTableHeader = (headers) =>
    headers.map((headerCell, index) =>
      createHeaderCell(columnKeys[index], headerCell.children)
    );
  return (
    <div>
      {tableData.tabledata.length > 0 ? (
        <div>
          <Spacer
            className="spacerdemodefault mb-0"
            paddingTop="large"
            paddingBottom="large"
            marginTop="medium"
            marginBottom="medium"
          >
            knowledge_basis Details
          </Spacer>
          <Table
            summaryId="example-multi-select"
            summary="This table shows an implementation of multiple row selection."
            aria-multiselectable
            rowStyle="toggle"
            numberOfColumns={2}
            cellPaddingStyle="standard"
            dividerStyle="both"
            headerData={{
              selectAllColumn: {
                checkLabel: "Single Selection",
              },
              cells: GenerateTableHeader(tableHeaderData),
            }}
            bodyData={[
              {
                rows: createRows(tableData.tabledata),
              },
            ]}
          />
          <ActionItemsComp
            selectedKey={selectedKey}
            selectedStoredKey={selectedStoredKey}
            cell1Value={cell1Value}
            cell2Value={cell2Value}
            UpdateSelectedKey={UpdateSelectedKey}
            UpdateCell1Value={UpdateCell1Value}
            UpdateCell2Value={UpdateCell2Value}
          />
        </div>
      ) : (
        <EmptyComp />
      )}
    </div>
  );
}
