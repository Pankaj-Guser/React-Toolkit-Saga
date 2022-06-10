import { call, fork, takeEvery, put } from "redux-saga/effects";
import { tableActions } from "../actions/tableActions";
import tableAPI from "../utils/tableAPI";
import TableData from "../helpers/tableDataConverter";
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
    let result = yield call(() => tableAPI.deleteSingleRowData(selectedRow.selectedKeys[0]));
    result = TableData(result);
    yield put({ type: tableActions.DELETE_SINGLE_ROW_DATA_SUCCESS, payload: result });
  } catch (e) {
    yield put({
      type: tableActions.DELETE_SINGLE_ROW_DATA_ERROR,
      payload: "API server is down",
    });
  }
}

export function* fetchTableDataAll() {
  yield takeEvery(tableActions.FETCH_DATA_SAGA, fetchDataSaga);
}

export function* deleteTableDataSingle() {
  yield takeEvery(tableActions.DELETE_SINGLE_ROW_DATA, deleteDataSaga);
}

export default function* root() {
  yield fork(fetchTableDataAll);
  yield fork(deleteTableDataSingle);
}
