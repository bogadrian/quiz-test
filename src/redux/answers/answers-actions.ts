import { AnswersType } from './answers-types';

export interface ActionType {
  type: AnswersType;
  answer: {
    question: string;
    anse: string;
    correct: boolean;
    difficulty: string;
  };
  score: number;
}

export const setAnswer = (answer: {
  question: string;
  anse: string;
  correct: boolean;
  difficulty: string;
}) => {
  return { type: AnswersType.SET_ANSWERS, answer };
};

export const getScore = (
  answers: {
    question: string;
    anse: string;
    correct: boolean;
    difficulty: string;
  }[]
) => {
  let score = 0;

  answers?.forEach(
    (elm: {
      question: string;
      anse: string;
      correct: boolean;
      difficulty: string;
    }) => {
      if (elm.difficulty === 'easy' && elm.correct) {
        score = score + 1;
      }
      if (elm.difficulty === 'medium' && elm.correct) {
        score = score + 2;
      }
      if (elm.difficulty === 'hard' && elm.correct) {
        score = score + 3;
      }
    }
  );

  return { type: AnswersType.GET_SCORE, score };
};

export const cleanAnswers = () => {
  return { type: AnswersType.CLEAN_ANSWERS };
};
