import { useEffect, useState, useContext } from 'react';
import BeatLoader from 'react-spinners/BeatLoader';
import { UserContext } from '../contexts/UserContext';

export default function UserList({ userList }) {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState();
  const { setUser } = useContext(UserContext);

  useEffect(() => {
    setIsLoading(true);
    setUsers(userList.users);
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <BeatLoader
        color={'#ffffff'}
        loading={isLoading}
        size={30}
        aria-label="Loading Spinner"
        data-testid="loader"
        margin={20}
      />
    );
  }

  return (
    <section>
      <ul>
        {users.map((user) => {
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
                  onClick={() => {
                    setUser(user);
                  }}
                  className="select-user-btn"
                >
                  Select this user
                </button>
              </section>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
