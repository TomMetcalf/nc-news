import { useEffect, useState, useContext } from 'react';
import BeatLoader from 'react-spinners/BeatLoader';
import { UserContext } from '../contexts/UserContext';
import { fetchUsers } from '../api';
import { useNavigate, useLocation } from 'react-router-dom';

export default function UserList() {
  const [isLoading, setIsLoading] = useState();
  const { setUser } = useContext(UserContext);
  const [selectedUser, setSelectedUser] = useState();
  const [userList, setUserList] = useState([]);
  const navigate = useNavigate();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const articleId = searchParams.get('article_id');

  useEffect(() => {
    setIsLoading(true);
    fetchUsers()
      .then((users) => {
        return users;
      })
      .then((users) => {
        setUserList(users.users);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <>
        <BeatLoader
          color={'#ffffff'}
          loading={isLoading}
          size={30}
          aria-label="Loading Spinner"
          data-testid="loader"
          margin={20}
        />
        <p>Loading Users...</p>
      </>
    );
  }

  const handleUserSelect = (user) => {
    setUser(user);
    setSelectedUser(user.username);
    if (articleId) {
    navigate(`/articles/${articleId}`);
    }
  };

  return (
    <section>
      <ul>
        { userList.map((user) => {
              return (
                <li key={user.username}>
                  <section className="user-card">
                    <h2>Username: {user.username}</h2>
                    <h3>Name: {user.name}</h3>
                    <img
                      className="avatar-img"
                      src={user.avatar_url}
                      alt={user.name}
                    />
                    <button
                      onClick={() => handleUserSelect(user)}
                      className="select-user-btn"
                    >
                      Select this user
                    </button>
                    {selectedUser === user.username && (
                      <p>User {selectedUser} logged in.</p>
                    )}
                  </section>
                </li>
              );
            })}
      </ul>
    </section>
  );
}
