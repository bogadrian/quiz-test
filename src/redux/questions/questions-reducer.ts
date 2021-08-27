import { QuestionsType } from './questions-type';

import { ActionType } from './questions-actions';
import { IQuestions } from '../../custom-types';

interface IQuestionsState {
  response: IQuestions[] | null;
  isLoading: boolean;
  error: Error | null;
}

const INITIAL_STATE = {
  response: null,
  isLoading: false,
  error: null
};

export const reducerQuestions = (
  state: IQuestionsState = INITIAL_STATE,
  action: ActionType
) => {
  switch (action.type) {
    case QuestionsType.START_FETCH:
      return { ...state, isLoading: true, response: null, error: null };
    case QuestionsType.FETCH_SUCCESS:
      return {
        ...state,
        response: action.questions,
        isLoading: false,
        error: null
      };
    case QuestionsType.FETCH_FAILURE:
      return {
        ...state,
        response: null,
        isLoading: false,
        error: action.error
      };
    default:
      return state;
  }
};
