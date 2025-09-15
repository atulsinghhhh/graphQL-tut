import * as Apollo from '@apollo/client';
import React, { useState } from 'react';

const { useQuery, gql, useMutation } = Apollo;

const GET_USERS = gql`
  query GetUsers {
    getUsers {
      id
      name
      age
      isMarried
    }
  }
`;

const GET_USER_BY_ID = gql`
  query GETUserById($id: ID!) {
    getUserById(id: $id) {
      id
      name
      age
      isMarried
    }
  }
`;

const CREATE_USER = gql`
  mutation createUser($name: String!, $age: Int!, $isMarried: Boolean!) {
    createUser(name: $name, age: $age, isMarried: $isMarried) {
      id
      age
      name
      isMarried
    }
  }
`;

function App() {
  const { data: getUserData, error: getUserError, loading: getUserLoading } =
    useQuery(GET_USERS);
  const {
    data: getUserByIdData,
    error: getUserByError,
    loading: getUserByLoading,
  } = useQuery(GET_USER_BY_ID, {
    variables: { id: '4' },
  });

  const [createUser, { loading: creating, error: createError }] = useMutation(
    CREATE_USER,
    {
      refetchQueries: [{ query: GET_USERS }], // auto refresh list after creating
    }
  );

  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [isMarried, setIsMarried] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !age) return;
    await createUser({
      variables: {
        name,
        age: parseInt(age),
        isMarried,
      },
    });
    setName('');
    setAge('');
    setIsMarried(false);
  };

  if (getUserLoading) return <p>Data loading...</p>;
  if (getUserError) return <p>Error: {getUserError.message}</p>;

  return (
    <>
      <h1>Users</h1>

      <div>
        <h2>Create New User</h2>
        <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
          <input
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="number"
            placeholder="Enter age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
          <label>
            Married:
            <input
              type="checkbox"
              checked={isMarried}
              onChange={(e) => setIsMarried(e.target.checked)}
            />
          </label>
          <button type="submit" disabled={creating}>
            {creating ? 'Creating...' : 'Create User'}
          </button>
        </form>
        {createError && <p style={{ color: 'red' }}>Error: {createError.message}</p>}
      </div>

      <div>
        <h2>Chosen User:</h2>
        {getUserByLoading && <p>Loading user...</p>}
        {getUserByError && <p>Error: {getUserByError.message}</p>}
        {getUserByIdData?.getUserById && (
          <div>
            <p>Name: {getUserByIdData.getUserById.name}</p>
            <p>Age: {getUserByIdData.getUserById.age}</p>
            <p>
              Married: {getUserByIdData.getUserById.isMarried ? 'Yes' : 'No'}
            </p>
          </div>
        )}
      </div>

      <div>
        <h2>All Users:</h2>
        {getUserData?.getUsers.map((user) => (
          <div key={user.id} style={{ marginBottom: '10px' }}>
            <p>Name: {user.name}</p>
            <p>Age: {user.age}</p>
            <p>Is this user Married: {user.isMarried ? 'Yes' : 'No'}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
