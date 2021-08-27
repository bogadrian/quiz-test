import './header.scss';

export const Header: React.FC = () => {
  return (
    <div className="App">
      <header className="header-container">
        <span className="header-container_name">Trivia Game</span>
        <span className="header-container_user">Hi there!</span>
      </header>
    </div>
  );
};
