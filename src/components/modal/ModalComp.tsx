import { useState } from 'react';

import Modal from 'react-modal';
import { useTypedSelector } from '../../redux/root-reducer';
import './modal.scss';
import '../main/questions/questions.scss';

const customStyles = {
  content: {
    width: '40rem',
    height: 'auto',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

interface Props {
  handleNo: () => void;
  handleYes: () => void;
  iRegistred: (reg: boolean) => void;
  open: boolean;
}
export const ModalComp: React.FC<Props> = ({ handleNo, open, iRegistred }) => {
  const [name, setName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const score = useTypedSelector(state => state.answers.score);

  const handleRegister = () => {
    const user = {
      name,
      password,
      score,
      date: new Date()
    };
    const userStorage: string | null = localStorage.getItem('user');

    if (userStorage) {
      const res = JSON.parse(userStorage);
      res.push(user);

      localStorage.setItem('user', JSON.stringify(res));
    } else {
      localStorage.setItem('user', JSON.stringify([user]));
    }
    iRegistred(true);
    handleNo();
  };

  return (
    <Modal isOpen={open} style={customStyles} ariaHideApp={false}>
      <div className="modal-container">
        <div className="modal-x" onClick={handleNo}>
          <span className="modal-x__text">X</span>
        </div>
        <div className="modal-text">
          <span>Register</span>
        </div>
        <div
          style={{
            width: '100%',
            height: '10rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <input
            type="text"
            placeholder="Name"
            onChange={e => setName(e.target.value)}
            style={{ width: '70%', height: '3rem' }}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={e => setPassword(e.target.value)}
            style={{ width: '70%', height: '3rem', marginTop: '2rem' }}
          />
        </div>
        <div className="modal-buttons">
          <button onClick={handleRegister} className="game-over_button_yes">
            Register
          </button>
          <button onClick={handleNo} className="game-over_button_no">
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
};

const modal: HTMLElement | null = document.querySelector('#modal');
if (process.env.NODE_ENV !== 'test' && modal) Modal.setAppElement(modal);
