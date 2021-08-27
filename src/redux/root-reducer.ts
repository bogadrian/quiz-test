import { combineReducers } from 'redux';
import { useSelector, TypedUseSelectorHook } from 'react-redux';

import { reducerQuestions } from './questions/questions-reducer';
import { reducerAnswers } from './answers/answers-reducer';

export const rootReducer = combineReducers({
  questions: reducerQuestions,
  answers: reducerAnswers
});

export type AppState = ReturnType<typeof rootReducer>;
export const useTypedSelector: TypedUseSelectorHook<AppState> = useSelector;
