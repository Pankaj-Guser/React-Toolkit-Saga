import React from "react";
import { useDispatch, useSelector } from "react-redux";
import tableActions from "../../actions/tableActions";
import "../table//table.scss";

function ActionItemsComp(props) {
  const dispatch = useDispatch();
  const tableData = useSelector((state) => state.TableData);
  const { selectedKeys } = props;

  const RemoveSelected = () => {
    // let data = tableData.tabledata;
    // data = data.filter((item) => selectedKeys.indexOf(item.key) === -1);
    // dispatch({ type: tableActions.REMOVE_ROW, payload: data });
    console.log("step1", selectedKeys)
    dispatch({type: tableActions.DELETE_SINGLE_ROW_DATA, selectedKeys})
  };

  const AddElement = () => {
    let data = tableData.tabledata;
    const latestIndex = parseInt(data[data.length - 1].key) + 1;
    const newData = {
      key: latestIndex.toString(),
      toggleText: "toggle",
      cells: [
        {
          key:'cell-0', id: 'toggle-0', title: "111"
        },
        {
            key:'cell-1', id: 'toggle-1', title: "111"
        }
      ],
    };

    dispatch({
      type: tableActions.ADD_ROW,
      payload: [...tableData.tabledata, newData],
    });
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
