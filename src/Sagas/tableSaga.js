import { call, takeEvery, put } from "redux-saga/effects";
import { tableActions } from "../actions/tableActions";
import tableAPI from "../utils/tableAPI";
import TableData from "../helpers/tableDataConverter";
export function* fetchDataSaga() {
  try {
    let result = yield call(() => tableAPI.fetchData());
    result = TableData(result);
    yield put({ type: tableActions.GET_TABLE_DATA, payload: result });
  } catch (e) {
    yield put({
      type: tableActions.GET_TABLE_DATA_ERROR,
      payload: "API server is down",
    });
  }
}

export default function* rootSaga() {
  yield takeEvery(tableActions.FETCH_DATA_SAGA, fetchDataSaga);
}
