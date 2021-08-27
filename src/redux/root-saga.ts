import { all, call } from 'redux-saga/effects';

import { resQuestions } from './questions/questions-saga';

function* rootSaga() {
  yield all([call(resQuestions)]);
}

export default rootSaga;
