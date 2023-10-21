import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <Link to="/">
      <h1 className="header-text">NC News</h1>
    </Link>
  );
}
