import { Link } from 'react-router-dom';

export default function Nav() {
  return (
    <nav className="nav">
      <Link className="nav-link" to="/">
        Articles
      </Link>
      <Link className="nav-link" to="/topics">
        Topics
      </Link>
    </nav>
  );
}
