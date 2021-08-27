import { useEffect } from 'react';
import './containerMain.scss';

import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../redux/root-reducer';

import { fetchQuestions } from '../../redux/questions/questions-actions';

import { Questions } from './questions/Questions';
import { Display } from './display/Display';

export const ContainerMain: React.FC = () => {
  const dispatch = useDispatch();

  const answers = useTypedSelector(state => state?.answers?.answers);

  useEffect(() => {
    dispatch(fetchQuestions());
  }, [dispatch]);

  return (
    <div className="containerMain-container" data-testid="container-main">
      <Questions />
      {answers?.length > 0 && <Display answers={answers} />}
    </div>
  );
};
