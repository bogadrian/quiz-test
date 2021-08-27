import { AnswersType } from './answers-types';
import { ActionType } from './answers-actions';

interface AnswersState {
  answers: {
    question: string;
    anse: string;
    correct: boolean;
    difficulty: string;
  }[];
  score: number;
}

const INITIAL_STATE = {
  answers: [],
  score: 0
};

export const reducerAnswers = (
  state: AnswersState = INITIAL_STATE,
  action: ActionType
) => {
  switch (action.type) {
    case AnswersType.SET_ANSWERS:
      return {
        ...state,
        answers: [...state.answers, action.answer]
      };
    case AnswersType.GET_SCORE:
      return { ...state, score: action.score };
    case AnswersType.CLEAN_ANSWERS:
      return { ...state, answers: [], score: 0 };
    default:
      return state;
  }
};
