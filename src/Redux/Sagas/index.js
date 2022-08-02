import { all, fork } from 'redux-saga/effects';
import watchAuthSaga from './AuthSaga';
import watchDasboardSaga from './DasboardSaga';

const rootSaga = function* () {
  yield all([fork(watchAuthSaga), fork(watchDasboardSaga)]);
};

export default rootSaga;
