import { useEffect, useState } from 'react';
import BeatLoader from 'react-spinners/BeatLoader';

export default function UserList({ userList }) {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState();

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
              </section>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
