import { call, takeEvery, put } from "redux-saga/effects";
import { tableActions } from "./actions/tableActions";
import todoApi from "./utils/todoApi";
import TableData from "./helpers/TableDataConverter"
import mockData from "./mockData/TableMockData"
const todoApiUrl = {
  url: "https://jsonplaceholder.typicode.com/todos/1",
}
export function* fetchDataSaga() {
  try {
    let result = yield call( ()=> todoApi.callAPI(todoApiUrl));
    
    result.data = TableData(mockData.tableBodyMockData);
    yield put({type: "GET_TABLE_DATA", payload: result.data});
  } catch (e) {
    yield put({ type: "TODO_FETCH_FAILED" });
  }
}

export default function* rootSaga() {
  yield takeEvery(tableActions.FETCH_DATA_SAGA, fetchDataSaga);
}
