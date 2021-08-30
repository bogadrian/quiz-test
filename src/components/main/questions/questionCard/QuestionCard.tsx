import { useState, memo } from 'react';

import { IQuestions } from '../../../../custom-types';
import './questionCard.scss';

import { useNextQuestion } from '../../../hooks/useNextQuestion';
import { useAnswered } from '../../../hooks/useAnswered';

import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../../../redux/root-reducer';

import { toast } from 'react-toastify';

import arrowRight from '../../../../assets/arrow-right.svg';
import arrowLeft from '../../../../assets/arrow-left.svg';

import { setAnswer } from '../../../../redux/answers/answers-actions';

interface InputProps {
  ans: string;
  question: { correct_answer: string; question: string };
  difficulty: string;
}

export const InputRadio: React.FC<InputProps> = memo(
  ({ ans, question: { correct_answer, question }, difficulty }) => {
    const dispatch = useDispatch();
    const [value, setValue] = useState<string>('');

    const questions = useTypedSelector(state => state.questions.response);
    const answers = useTypedSelector(state => state?.answers?.answers);

    const answered = useAnswered(answers, questions);

    const handleClick = (anse: string) => {
      setValue(anse);

      if (correct_answer === anse) {
        dispatch(setAnswer({ question, anse, correct: true, difficulty }));
        toast.success('Correct answer!');
      } else {
        dispatch(setAnswer({ question, anse, correct: false, difficulty }));
        toast.error('Wrong answer!');
      }
    };

    return (
      <div
        className="answers-container_arr"
        style={
          answered
            ?.map(el => (el.question === question ? el.question : null))
            .includes(question)
            ? {
                pointerEvents: 'none',
                minWidth: '20rem'
              }
            : {}
        }
        data-testid="input-radio"
      >
        <input
          name={question}
          id={ans}
          type="radio"
          onChange={() => handleClick(ans)}
          checked={
            answers?.map(el => el.anse).includes(ans) &&
            answers?.map(el => el.question).includes(question)
              ? true
              : ans === value
              ? true
              : false
          }
        />
        <label htmlFor={ans} onClick={() => handleClick(ans)}>
          {ans}
        </label>
      </div>
    );
  }
);
interface Props {
  question: IQuestions;
  goToNext: () => void;
  goToPrev: () => void;
  sliceStart: number;
  setClicked: (clicked: boolean) => void;
  clicked: boolean;
}

export const QuestionCard: React.FC<Props> = memo(
  ({ question, goToNext, sliceStart, goToPrev, setClicked, clicked }) => {
    const questions = useTypedSelector(state => state.questions.response);

    const answers = useTypedSelector(state => state?.answers?.answers);

    useNextQuestion(answers, questions, setClicked, question);

    const makeAnswers = (question: IQuestions) => {
      const arr: string[] = [];
      const random: string[] = [];

      

      question.incorrect_answers.forEach(q => arr.push(q));
      
      const rand = Math.floor(Math.random() * arr.length);
      
      arr.splice(rand, 0, question.correct_answer);

      arr.forEach(el => {
        random.push(el);
      });

      random.sort();

      return (
        <>
          {random.map((ans: string) => {
            return (
              <div key={ans}>
                <InputRadio
                  ans={ans}
                  question={question}
                  difficulty={question.difficulty}
                />
              </div>
            );
          })}
        </>
      );
    };

    return (
      <div>
        <div className="container-questionCard">
          <div className="question">
            <div className="question_title">
              <div className="question_label">
                <span>Question:</span> {question.question}
              </div>
            </div>
            <div className="question_title">
              <span className="question_label">Category: </span>
              <span className="question_info">{question.category}</span>{' '}
              <span className="question_label">Difficulty: </span>
              <span className="question_info">
                {question.difficulty.charAt(0).toLocaleUpperCase() +
                  question.difficulty.slice(1)}
              </span>
            </div>
          </div>
          <div className="answers-container">
            <div
              style={{
                width: '10rem',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              {sliceStart !== 0 && (
                <img
                  src={arrowLeft}
                  alt="arrow-right"
                  style={{
                    height: '4rem',
                    cursor: 'pointer'
                  }}
                  onClick={() => {
                    goToPrev();
                  }}
                />
              )}
            </div>

            <div className="answers-container_answers">
              <div
                style={{
                  minWidth: '50%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-start'
                }}
              >
                {makeAnswers(question)}
              </div>
            </div>
            <div
              style={{
                width: '10rem',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              {clicked && (
                <img
                  src={arrowRight}
                  alt="arrow-left"
                  style={{
                    height: '4rem',

                    cursor: 'pointer'
                  }}
                  onClick={() => {
                    goToNext();
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
);
