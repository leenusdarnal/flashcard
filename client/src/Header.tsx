import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <div className='header'>
      <div className='container'>
        <div>
          <a href='/'>FLASHCARDS</a>
        </div>
        <div>
          <a href='/'>Decks</a>
        </div>
        <div>
          <a href='/'>LOGIN</a>
        </div>
      </div>
    </div>
  );
};

export default Header;
