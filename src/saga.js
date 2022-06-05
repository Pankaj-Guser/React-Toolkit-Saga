import { call, takeEvery, put } from "redux-saga/effects";
import { fetchData } from "./Features/TODODataReducer";
import { todoActions } from "./actions/todoActions";
import todoApi from "./utils/todoApi";
const todoApiUrl = {
  url: "https://jsonplaceholder.typicode.com/todos/1",
}
export function* fetchDataSaga() {
  try {
    console.log("methode call step 1")
    let result = yield call( ()=> todoApi.callAPI(todoApiUrl));
    console.log("methode call step 2", result)
    
    yield put(fetchData(result.data));
  } catch (e) {
    yield put({ type: "TODO_FETCH_FAILED" });
  }
}

export default function* rootSaga() {
  yield takeEvery(todoActions.FETCH_DATA_SAGA, fetchDataSaga);
}
