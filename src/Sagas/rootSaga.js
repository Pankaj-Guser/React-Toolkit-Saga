import { all } from 'redux-saga/effects';

import tableSaga from './tableSaga';

export default function* rootSaga() {
    yield all([tableSaga()]);
}