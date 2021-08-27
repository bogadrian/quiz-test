import { useEffect } from 'react';

import { IAnswers } from '../../../custom-types';

import { useTypedSelector } from '../../../redux/root-reducer';
import { useDispatch } from 'react-redux';
import { getScore } from '../../../redux/answers/answers-actions';
import './display.scss';

interface Props {
  answers: IAnswers[];
}

export const Display: React.FC<Props> = ({ answers }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getScore(answers));
  }, [answers, dispatch]);

  const score = useTypedSelector(state => state.answers.score);
  return (
    <div className="container-display">
      <div className="container-display_card">
        <span>Score: {score}</span>
        <span>
          You answerd {answers.length === 10 ? 'all the' : answers.length}{' '}
          questions so far
        </span>
      </div>
    </div>
  );
};
