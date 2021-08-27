import { useEffect } from 'react';
import { IAnswers, IQuestions } from '../../custom-types';

export const useNextQuestion = (
  answers: IAnswers[],
  questions: IQuestions[] | null,
  setClicked: (clicked: boolean) => void,
  question: IQuestions
) => {
  useEffect(() => {
    const arr: string[] = [];
    questions?.forEach(el => {
      arr.push(el.question);
    });
    const currentAnswers = [
      ...question.incorrect_answers,
      question.correct_answer
    ];

    const ansRes = answers.map(elm => elm.anse);

    arr.forEach(elm => {
      if (
        question.question === elm &&
        currentAnswers.some(el => {
          return ansRes.includes(el);
        })
      ) {
        return setClicked(true);
      }
      if (
        !currentAnswers.some(el => {
          return ansRes.includes(el);
        })
      ) {
        return setClicked(false);
      }
    });
  }, [answers, questions, setClicked, question]);
};
