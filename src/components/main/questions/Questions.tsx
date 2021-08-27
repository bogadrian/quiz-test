import { useState, useEffect } from 'react';
import './questions.scss';
import { IQuestions } from '../../../custom-types';

import { useDispatch } from 'react-redux';

import { useTypedSelector } from '../../../redux/root-reducer';
import { cleanAnswers } from '../../../redux/answers/answers-actions';

import { QuestionCard } from './questionCard/QuestionCard';

import Spinner from '../../Spinner/Spinner';
import { ModalComp } from '../../modal/ModalComp';
import { DisplayUsers } from '../displayUsers/DisplayUsers';

export const Questions: React.FC = () => {
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [reg, setReg] = useState<boolean>(false);
  const [over, setOver] = useState<boolean>(false);
  const [clicked, setClicked] = useState<boolean>(false);
  const [sliceStart, setSliceStart] = useState<number>(0);
  const [sliceEnd, setSliceEnd] = useState<number>(1);
  const answers = useTypedSelector(state => state.answers.answers);
  const questions = useTypedSelector(state => state.questions.response);

  const handleClick = (clicked: boolean) => {
    setClicked(clicked);
  };
  useEffect(() => {
    if (answers && answers?.length === questions?.length) {
      setOver(true);
    }
  }, [sliceEnd, answers, questions]);

  const handleNextQuestion = () => {
    setSliceStart(sliceStart => sliceStart + 1);
    setSliceEnd(sliceEnd => sliceEnd + 1);
  };
  const handleGoToPrev = () => {
    if (sliceStart > 0) {
      setSliceStart(sliceStart => sliceStart - 1);
    }
    setSliceEnd(sliceEnd => sliceEnd - 1);
  };

  const iRegisterd = (reg: boolean) => {
    setReg(reg);
  };
  const cleanAllStore = () => {
    dispatch(cleanAnswers());
    setOver(false);
    setReg(false);
    setSliceStart(0);
    setSliceEnd(1);
  };

  return (
    <>
      {!reg && (
        <div>
          {questions ? (
            <div className="container-questions">
              {!over && (
                <span className="container-questions_title">
                  Please answer these questions:
                </span>
              )}
              {questions
                ?.slice(sliceStart, sliceEnd)
                .map((question: IQuestions) => {
                  return (
                    <div key={question.question}>
                      {!over ? (
                        <QuestionCard
                          question={question}
                          goToNext={handleNextQuestion}
                          sliceStart={sliceStart}
                          goToPrev={handleGoToPrev}
                          setClicked={handleClick}
                          clicked={clicked}
                        />
                      ) : (
                        <div
                          style={{ display: 'flex', flexDirection: 'column' }}
                        >
                          <span className="container-questions_title">
                            Game Over!
                          </span>
                          <span className="game-over_text">
                            Would you like to register and save your play?
                          </span>
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                              width: '100%',
                              marginTop: '3rem'
                            }}
                          >
                            <button
                              className="game-over_button_yes"
                              onClick={() => setOpenModal(true)}
                            >
                              Yes
                            </button>
                            <button
                              className="game-over_button_no"
                              onClick={cleanAllStore}
                            >
                              No
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>
          ) : (
            <div style={{ height: '100rem', width: '100%' }}>
              <Spinner />
            </div>
          )}
          <ModalComp
            open={openModal}
            handleYes={() => {}}
            handleNo={() => setOpenModal(false)}
            iRegistred={iRegisterd}
          />
        </div>
      )}
      {reg && <DisplayUsers cleanAllStore={cleanAllStore} />}
    </>
  );
};
