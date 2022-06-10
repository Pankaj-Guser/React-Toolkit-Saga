import { runSaga } from 'redux-saga';
import { tableActions } from "../../actions/tableActions";
import { fetchDataSaga } from '../tableSaga';
import * as tableApi from '../../utils/tableAPI';

test('should load and handle table Data in case of success', async () => {
    const dispatchedActions = [];
    const tableBodyMockData = ["abc"];
    tableApi.callAPI = jest.fn(() => Promise.resolve([tableBodyMockData]));

    const fakeStore = {
        dispatch: () => dispatchedActions.push({type: tableActions.GET_TABLE_DATA_SUCCESS, payload: tableBodyMockData}),
    };

    await runSaga(fakeStore, fetchDataSaga).done;
    expect(tableApi.callAPI.mock.calls.length).toBe(1);
    expect(dispatchedActions).toContainEqual({type: tableActions.GET_TABLE_DATA_SUCCESS, payload: tableBodyMockData});
});

test('should handle image load errors in case of failure', async () => {
    const dispatchedActions = [];
    const error = 'API server is down';
    
    tableApi.callAPI = jest.fn(() => Promise.resolve(error));

    const fakeStore = {
        dispatch: () => dispatchedActions.push({type: tableActions.GET_TABLE_DATA_ERROR, payload: error}),
    };

    await runSaga(fakeStore, fetchDataSaga).done;

    expect(tableApi.callAPI.mock.calls.length).toBe(1);
    expect(dispatchedActions).toContainEqual({type: tableActions.GET_TABLE_DATA_ERROR, payload: error});
});