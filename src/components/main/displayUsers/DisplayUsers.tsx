import { useEffect, useState } from 'react';

import { IUserStorage } from '../../../custom-types';

import './displayUsers.scss';
import '../questions/questions.scss';

import { useDispatch } from 'react-redux';

import { cleanAnswers } from '../../../redux/answers/answers-actions';

interface Props {
  cleanAllStore: () => void;
}
export const DisplayUsers: React.FC<Props> = ({ cleanAllStore }) => {
  const dispatch = useDispatch();
  const [users, setUsers] = useState<IUserStorage[]>([]);
  useEffect(() => {
    const usersStorage: string | null = localStorage.getItem('user');

    if (usersStorage) {
      const res: IUserStorage[] = JSON.parse(usersStorage);

      const resSorted = res
        ?.sort((a: { score: number }, b: { score: number }) => {
          return a.score > b.score ? -1 : 1;
        })
        .reduce((acc: IUserStorage[], curr: IUserStorage) => {
          const x = acc?.find((item: IUserStorage) => item.name === curr.name);
          if (!x) {
            return acc.concat([curr]);
          } else {
            return acc;
          }
        }, [])
        .slice(0, 10);

      setUsers(resSorted);
    }
  }, []);

  return (
    <>
      <div className="displayUsers-container">
        {users?.map((el: IUserStorage, i: number) => {
          return (
            <ol key={i} className="displayUsers">
              {i + 1} <li> Name: {el.name}</li>
              <li>Score: {el.score}</li>
              <li>Date: {new Date(el.date)?.toLocaleString()}</li>
            </ol>
          );
        })}
      </div>
      <button
        className="game-over_button_yes"
        onClick={() => {
          dispatch(cleanAnswers());
          cleanAllStore();
        }}
      >
        Start over again
      </button>
    </>
  );
};
