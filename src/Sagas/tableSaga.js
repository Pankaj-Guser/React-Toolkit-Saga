import { call, fork, put, takeEvery } from "redux-saga/effects";
import { ActionsConstant } from "../actions/ActionsConstant";
import tableAPI from "../utils/tableAPI";
import axios from "axios";
import TableData from "../helpers/tableDataConverter";
import mockData from "../mockData/tableMockData";

export function* fetchDataSaga() {
  try {
    let result = yield call(() => tableAPI.fetchData());
    result = TableData(result);
    yield put({ type: ActionsConstant.GET_TABLE_DATA_SUCCESS, payload: result });
  } catch (e) {
    yield put({
      type: ActionsConstant.GET_TABLE_DATA_ERROR,
      payload: "API server is down",
    });
  }
}
export function* deleteDataSaga(selectedRow) {
  try {
    yield call(() => tableAPI.deleteSingleRowData(selectedRow.selectedKey));
    let result = yield call(() => tableAPI.fetchData());
    result = TableData(result);
    yield put({ type: ActionsConstant.GET_TABLE_DATA_SUCCESS, payload: result });
  } catch (e) {
    yield put({
      type: ActionsConstant.DELETE_SINGLE_ROW_DATA_ERROR,
      payload: "API server is down",
    });
  }
}

export function* getPolicyText() {
  try{
      let result = yield call(() => tableAPI.getPolicyText());
      yield put({type: ActionsConstant.GET_POLICY_TEXT_SUCCESS, payload: result.data[0].locale_texts_data[1].content})
  } catch(e) {
    yield put({type: ActionsConstant.GET_POLICY_TEXT_ERROR, payload: "API server is down"})
  }
}

const callAPI = async ({ url, method, data }) => {
  const response= await axios({
    url,
    method,
    data
  }).then(({ data }) => data)
  return response
};
export function* addDataSaga(addRowData) {
  try {
    const response = yield call( () => callAPI({url:'http://localhost:8000/api/v1/tenants/5bc8222c-974b-4113-9c59-0cbf5c157ead/knowledge_basis',
    method:'POST',
    data:addRowData.createdCellData}));
    // const response = yield call(() => tableAPI.updateSingleRowData, addRowData.createdCellData);
    if(response.success === true) {
      let result = yield call(() => tableAPI.fetchData());
      result = TableData(result);
      yield put({ type: ActionsConstant.GET_TABLE_DATA_SUCCESS, payload: result });
    }
  } catch (e) {

    yield put({
      type: ActionsConstant.ADD_SINGLE_ROW_DATA_ERROR,
      payload: "API server is down",
    });
  }
}
export function* updateDataSaga(bodyData) {
  try {
    const response = yield call(() => callAPI({url:'http://localhost:8000/api/v1/tenants/5bc8222c-974b-4113-9c59-0cbf5c157ead/knowledge_basis/'+bodyData.selectedKey,
    method:'PUT',
    data:bodyData.updatedCellData}));
    // const response = yield call(() => tableAPI.updateSingleRowData, bodyData.selectedKey[0], bodyData.updatedCellData);
    if(response.success === true) {
      // yield call(() => tableAPI.updateSingleRowData, bodyData.selectedKey, bodyData.updatedCellData);
      let result = yield call(() => tableAPI.fetchData());
      result = TableData(result);
      yield put({ type: ActionsConstant.GET_TABLE_DATA_SUCCESS, payload: result });
    }
  } catch (e) {

    yield put({
      
      type: ActionsConstant.UPDATE_SINGLE_ROW_DATA_ERROR,
      payload: "API server is down",
    });
  }
}

export function* fetchPolicyText() {
  yield takeEvery(ActionsConstant.GET_POLICY_TEXT, getPolicyText);
}

export function* fetchTableDataAll() {
  yield takeEvery(ActionsConstant.FETCH_DATA_SAGA, fetchDataSaga);
}

export function* deleteTableDataSingle() {
  yield takeEvery(ActionsConstant.DELETE_SINGLE_ROW_DATA, deleteDataSaga);
}

export function* updateTableDataSingle() {

  yield takeEvery(ActionsConstant.UPDATE_SINGLE_ROW_DATA, updateDataSaga)
}

export function* addTableDataSingle() {

  yield takeEvery(ActionsConstant.ADD_SINGLE_ROW_DATA, addDataSaga)
}

export default function* root() {
  yield fork(fetchTableDataAll);
  yield fork(deleteTableDataSingle);
  yield fork(updateTableDataSingle);
  yield fork(addTableDataSingle);
  yield fork(fetchPolicyText);
}
