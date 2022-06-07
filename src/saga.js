import { call, takeEvery, put } from "redux-saga/effects";
import { tableActions } from "./actions/tableActions";
import todoApi from "./utils/todoApi";
import TableData from "./helpers/TableDataConverter"
const todoApiUrl = {
  url: "https://jsonplaceholder.typicode.com/todos/1",
}
export function* fetchDataSaga() {
  try {
    let result = yield call( ()=> todoApi.callAPI(todoApiUrl));
    const tabledata = [
      {key: '0', 
      toggleText: "toggle",
      cells:[
        { key: 'cell-0', id: 'toggle-0', title: 'Name' },
        { key: 'cell-1', id: 'toggle-1', title: 'Address' },
        { key: 'cell-2', id: 'toggle-2', title: 'Phone Number' },
        { key: 'cell-3', id: 'toggle-3', title: 'Email Id' },
      ]},
      {key: '1', 
      toggleText: "toggle",
      cells:[
        { key: 'cell-0', id: 'toggle-0', title: 'Name' },
        { key: 'cell-1', id: 'toggle-1', title: 'Address' },
        { key: 'cell-2', id: 'toggle-2', title: 'Phone Number' },
        { key: 'cell-3', id: 'toggle-3', title: 'Email Id' },
      ]},
      {key: '2', 
      toggleText: "toggle",
      cells:[
        { key: 'cell-0', id: 'toggle-0', title: 'Name' },
        { key: 'cell-1', id: 'toggle-1', title: 'Address' },
        { key: 'cell-2', id: 'toggle-2', title: 'Phone Number' },
        { key: 'cell-3', id: 'toggle-3', title: 'Email Id' },
      ]},
      {key: '3', 
      toggleText: "toggle",
      cells:[
        { key: 'cell-0', id: 'toggle-0', title: 'Name' },
        { key: 'cell-1', id: 'toggle-1', title: 'Address' },
        { key: 'cell-2', id: 'toggle-2', title: 'Phone Number' },
        { key: 'cell-3', id: 'toggle-3', title: 'Email Id' },
      ]},
      {key: '4', 
      toggleText: "toggle",
      cells:[
        { key: 'cell-0', id: 'toggle-0', title: 'Name' },
        { key: 'cell-1', id: 'toggle-1', title: 'Address' },
        { key: 'cell-2', id: 'toggle-2', title: 'Phone Number' },
        { key: 'cell-3', id: 'toggle-3', title: 'Email Id' },
      ]},
      {key: '5', 
      toggleText: "toggle",
      cells:[
        { key: 'cell-0', id: 'toggle-0', title: 'Name' },
        { key: 'cell-1', id: 'toggle-1', title: 'Address' },
        { key: 'cell-2', id: 'toggle-2', title: 'Phone Number' },
        { key: 'cell-3', id: 'toggle-3', title: 'Email Id' },
      ]},
    ]
    result.data = TableData(tabledata);
    yield put({type: "GET_TABLE_DATA", payload: result.data});
  } catch (e) {
    yield put({ type: "TODO_FETCH_FAILED" });
  }
}

export default function* rootSaga() {
  yield takeEvery(tableActions.FETCH_DATA_SAGA, fetchDataSaga);
}
