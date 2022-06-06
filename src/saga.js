import { call, takeEvery, put } from "redux-saga/effects";
import { tableActions } from "./actions/tableActions";
import todoApi from "./utils/todoApi";
const todoApiUrl = {
  url: "https://jsonplaceholder.typicode.com/todos/1",
}
export function* fetchDataSaga() {
  try {
    let result = yield call( ()=> todoApi.callAPI(todoApiUrl));
    result.data = [
      ["data1", "data2"],
      ["data21", "data21"],
      ["data31", "data32"],
      ["data41", "data42"],
      ["data51", "data51"],
      ["data61", "data62"]
    ]
    yield put({type: "GET_TABLE_DATA", payload: result.data});
  } catch (e) {
    yield put({ type: "TODO_FETCH_FAILED" });
  }
}

export default function* rootSaga() {
  yield takeEvery(tableActions.FETCH_DATA_SAGA, fetchDataSaga);
}
