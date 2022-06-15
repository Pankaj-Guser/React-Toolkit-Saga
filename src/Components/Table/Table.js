import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import mockData from "../../mockData/tableMockData";
// import ActionItemsComp from "../actionItems/actionItems";
import Table from "terra-table";
import EmptyComp from "../emptyComp";
import Card from "terra-card/lib/Card";
import classNames from "classnames/bind";
import Button from "terra-button";
import Spacer from "terra-spacer";
import { useHistory } from "react-router-dom";
import "../actionItems/Spacer.module.scss";
// import cellInputField from "../inputField/cellInputField"
import tableActions from "../../actions/tableActions";
import InputFieldComp from "../inputField/inputField";
import styles from "./CardPaddingHR.scss";
import "../table/table.scss";
import "./Spacer.module.scss";
import "./table.scss";

const cx = classNames.bind(styles);
export default function TableComp(props) {
  const { tableData } = props;
  console.log("??????>>><<>><", props);
  let history = useHistory();
  const dispatch = useDispatch();
  const columnKeys = ["column-0", "column-1"];
  const error = useSelector((state) => state.TableData.error);
  const selectedCellKey = useSelector(
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
  // const [cell1Value, setCell1value] = useState("");
  // const [cell2Value, setCell2value] = useState("");

  const [passedValue, setPassedValue] = useState("");
  const PassValueUpdate = () => {
    setPassedValue("update");
  };

  const PassValueAdd = () => {
    setPassedValue("Add");
    setCell1value("");
    setCell2value("");
  };

  const [selectedKey, setSelectedKey] = useState([]);
  const tableHeaderData = mockData.tableHeaderMockData;
  useEffect(() => {
    selectedKey.push(selectedCellKey);
  }, [selectedCellKey]);

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
  const handleFieldOne = (event) => {
    setCell1value(event.target.value);
  };

  const ResetFields = () => {
    setSelectedKey([]);
    setCell1value("");
    setCell2value("");
  };

  const handleFieldTwo = (event) => {
    setCell2value(event.target.value);
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
      dispatch({
        type: tableActions.SET_SELECTED_CELL_KEY,
        payload: selectedCellData,
      });
      history.push("/selectedRowDetails", selectedCellData);
    } else {
      setSelectedKey([]);
      setCell1value("");
      setCell2value("");
      // dispatch({type: tableActions.SET_SELECTED_CELL_KEY, payload: []})
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
  const createHeaders = (data) =>
    data.map((childItem) => createHeader(childItem));
  return (
    <div>
      {tableData.tabledata.length > 0 ? (
        <div>
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
                  <Card>
                    <Card.Body>
                      <input
                        type="text"
                        value={cell1Value !== "" ? cell1Value : ""}
                        placeholder="facility_cd"
                        onChange={handleFieldOne}
                      />
                    </Card.Body>
                    <hr className={cx("horizontal-rule")} />
                    <Card.Body>
                      <input
                        type="text"
                        value={cell2Value !== "" ? cell2Value : ""}
                        placeholder="primary_criteria_cd"
                        onChange={handleFieldTwo}
                      />
                    </Card.Body>
                  </Card>
                </div>
                <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-secondary"
                      data-dismiss="modal"
                    >
                      Close
                    </button>
                    <button
                      type="button"
                      class="btn btn-primary"
                      data-dismiss="modal"
                      onClick={
                        passedValue === "Add" ? AddElement : UpdateSelected
                      }
                    >
                      Save changes
                    </button>
                </div>
              </div>
            </div>
          </div>
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
              // cells: createHeaders(tableHeaderData),
              cells: [
                createHeaderCell(columnKeys[0], "facility_cd"),
                createHeaderCell(columnKeys[1], "primary_criteria_cd"),
              ],
            }}
            bodyData={[
              {
                rows: createRows(tableData.tabledata),
              },
            ]}
          />
          <div className="float-left">
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
                  selectedKey.length > 0 && selectedCellKey !== undefined
                    ? false
                    : true
                }
                text="Reset"
                onClick={ResetFields}
              >
                Remove
              </Button>
            </Spacer>
          </div>
          <div className="float-right">
            <Spacer
              className="spacerdemoprimary"
              padding="large small"
              isInlineBlock
            >
              <Button
                text="Create"
                data-toggle="modal"
                data-target="#exampleModal"
                onClick={PassValueAdd}
              >
                Create
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
              <Button
                isDisabled={
                  selectedKey.length > 0 && selectedCellKey !== undefined
                    ? false
                    : true
                }
                text="Update"
                data-toggle="modal"
                data-target="#exampleModal"
                onClick={PassValueUpdate}
              >
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
              <Button
                isDisabled={
                  selectedKey.length > 0 && selectedCellKey !== undefined
                    ? false
                    : true
                }
                text="Remove"
                onClick={RemoveSelected}
              >
                Remove
              </Button>
            </Spacer>
          </div>
        </div>
      ) : (
        <EmptyComp />
      )}
    </div>
  );
}
