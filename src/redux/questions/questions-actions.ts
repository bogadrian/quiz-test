import { QuestionsType } from './questions-type';
import { IQuestions } from '../../custom-types';

export interface ActionType {
  type: QuestionsType;
  questions: IQuestions[];
  error: Error | null;
}

export const fetchQuestions = () => {
  return { type: QuestionsType.START_FETCH };
};

export const fetchSuccess = (questions: IQuestions[]) => {
  return { type: QuestionsType.FETCH_SUCCESS, questions };
};

export const fetchError = (error: Error) => {
  return { type: QuestionsType.FETCH_FAILURE, error };
};
