import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';

export default function Nav() {
  const {user} = useContext(UserContext);

  return (
    <nav className="nav">
      <Link className="nav-link" to="/">
        Articles
      </Link>
      <Link className="nav-link" to="/topics">
        Topics
      </Link>
      <Link className="nav-link" to="/users">
        Users
      </Link>
      <span className="nav-link">User: {user.username}</span>
    </nav>
  );
}
