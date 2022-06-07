import React from "react";
import { useDispatch, useSelector } from "react-redux";
import tableActions from "../../actions/tableActions"
import "./table.scss";

function ActionItemsComp(props) {
  const dispatch = useDispatch();
  const tableData = useSelector((state) => state.TableData);
  const {selectedKeys} = props
  
  const RemoveSelected = () => {
    let data = tableData.tabledata;
    data = data.filter((item) => selectedKeys.indexOf(item.key) === -1);
    dispatch({ type: tableActions.REMOVE_ROW, payload: data });
  };

  const AddElement = () => {
    let data = tableData.tabledata;
    const latestIndex = parseInt(data[data.length - 1].key) + 1;
    const newData = {
      key: latestIndex.toString(),
      toggleText: "toggle",
      cells: [
        { key: "cell-0", id: "toggle-0", title: "Name1" },
        { key: "cell-1", id: "toggle-1", title: "Address" },
        { key: "cell-2", id: "toggle-2", title: "Phone Number" },
        { key: "cell-3", id: "toggle-3", title: "Email Id" },
      ],
    };

    dispatch({ type: tableActions.ADD_ROW, payload: [...tableData.tabledata, newData] });
  };

  return (
    <>
      <div className="btn-space">
        <button type="button" onClick={AddElement}>
          Add
        </button>
        <button type="button" onClick={RemoveSelected}>
          Remove
        </button>
      </div>
    </>
  );
}

export default ActionItemsComp;
