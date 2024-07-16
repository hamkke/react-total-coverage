import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <ul>
        <li>
          <Link to='/'>POPULAR</Link>
        </li>
        <li>
          <Link to='/now-playing'>NOW PLAYING</Link>
        </li>
        <li>
          <Link to='/coming-soon'>COMING SOON</Link>
        </li>
      </ul>
    </header>
  );
};
export default Header;
