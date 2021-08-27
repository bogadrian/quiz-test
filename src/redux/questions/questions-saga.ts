import { takeLatest, put, call, all, StrictEffect } from 'redux-saga/effects';
import { QuestionsType } from './questions-type';
import { IQuestions } from '../../custom-types';

import { fetchSuccess, fetchError } from './questions-actions';
import { makeCallToGetQuestions } from '../apis/getQuestions';

export function* setQuestions(): Generator<StrictEffect, void, IQuestions[]> {
  try {
    const results: IQuestions[] = yield call(makeCallToGetQuestions);

    yield put(fetchSuccess(results));
  } catch (err) {
    yield put(fetchError(err as Error));
  }
}

export function* getResults() {
  yield takeLatest(QuestionsType.START_FETCH, setQuestions);
}

export function* resQuestions() {
  yield all([call(getResults)]);
}
