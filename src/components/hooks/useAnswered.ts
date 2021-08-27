import { useEffect, useState } from 'react';
import { IAnswers, IQuestions } from '../../custom-types';

export const useAnswered = (
  answers: IAnswers[],
  questions: IQuestions[] | null
) => {
  const [answered, setAnswered] = useState<
    { question: string; anse: string }[]
  >([]);
  useEffect(() => {
    if (
      Array.isArray(questions) &&
      questions?.length > 0 &&
      answers.length > 0
    ) {
      const r = questions
        ?.map(el => {
          return answers.filter(elm => elm.question === el.question);
        })
        .flat();

      if (Array.isArray(r) && r.length > 0) {
        setAnswered((el: { question: string; anse: string }[]) => [
          ...el,
          ...r
        ]);
      }
    }
  }, [answers, questions]);
  return answered;
};
