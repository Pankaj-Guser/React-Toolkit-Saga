import { call, fork, put, takeLatest } from "redux-saga/effects";
import { tableActions } from "../actions/tableActions";
import tableAPI from "../utils/tableAPI";
import axios from "axios";
import TableData from "../helpers/tableDataConverter";
const callAPI = async ({ url, method, data }) => {
  console.log("methode get called", url)
  return await axios({
    url,
    method,
    data
  });
};
export function* addDataSaga(addRowData) {
  try {
    yield call(callAPI({url:'http://localhost:8000/api/v1/tenants/5bc8222c-974b-4113-9c59-0cbf5c157ead/knowledge_basis',
    method:'POST',
    data:addRowData.createdCellData}));
    let result = yield call(() => tableAPI.fetchData());
    result = TableData(result);
    yield put({ type: tableActions.GET_TABLE_DATA_SUCCESS, payload: result });
  } catch (e) {
  console.log("update data fail")

    yield put({
      type: tableActions.ADD_SINGLE_ROW_DATA_ERROR,
      payload: "API server is down",
    });
  }
}
export function* updateDataSaga(bodyData) {
  try {
    yield call(callAPI({url:'http://localhost:8000/api/v1/tenants/5bc8222c-974b-4113-9c59-0cbf5c157ead/knowledge_basis/'+bodyData.selectedKey,
    method:'PUT',
    data:bodyData.updatedCellData}));
    // yield call(() => tableAPI.updateSingleRowData, bodyData.selectedKey, bodyData.updatedCellData);
    let result = yield call(() => tableAPI.fetchData());
    result = TableData(result);
    yield put({ type: tableActions.GET_TABLE_DATA_SUCCESS, payload: result });
  } catch (e) {
  console.log("update data fail")

    yield put({
      
      type: tableActions.UPDATE_SINGLE_ROW_DATA_ERROR,
      payload: "API server is down",
    });
  }
}
export function* fetchDataSaga() {
  try {
    let result = yield call(() => tableAPI.fetchData());
    result = TableData(result);
    yield put({ type: tableActions.GET_TABLE_DATA_SUCCESS, payload: result });
  } catch (e) {
    yield put({
      type: tableActions.GET_TABLE_DATA_ERROR,
      payload: "API server is down",
    });
  }
}
export function* deleteDataSaga(selectedRow) {
  try {
    yield call(() => tableAPI.deleteSingleRowData(selectedRow.selectedKey));
    let result = yield call(() => tableAPI.fetchData());
    result = TableData(result);
    yield put({ type: tableActions.GET_TABLE_DATA_SUCCESS, payload: result });
  } catch (e) {
    yield put({
      type: tableActions.DELETE_SINGLE_ROW_DATA_ERROR,
      payload: "API server is down",
    });
  }
}



export function* fetchTableDataAll() {
  yield takeLatest(tableActions.FETCH_DATA_SAGA, fetchDataSaga);
}

export function* deleteTableDataSingle() {
  yield takeLatest(tableActions.DELETE_SINGLE_ROW_DATA, deleteDataSaga);
}

export function* updateTableDataSingle() {
  console.log("step 2")

  yield takeLatest(tableActions.UPDATE_SINGLE_ROW_DATA, updateDataSaga)
}

export function* addTableDataSingle() {

  yield takeLatest(tableActions.ADD_SINGLE_ROW_DATA, addDataSaga)
}

export default function* root() {
  console.log("step x")
  yield fork(fetchTableDataAll);
  yield fork(deleteTableDataSingle);
  yield fork(updateTableDataSingle);
  yield fork(addTableDataSingle);
}
