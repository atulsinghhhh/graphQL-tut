import * as Apollo from '@apollo/client';
const { useQuery, gql } = Apollo;

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

function App() {
  const { data: getUserData, error: getUserError, loading: getUserLoading } = useQuery(GET_USERS);
  const { data: getUserByIdData, error: getUserByError, loading: getUserByLoading } = useQuery(GET_USER_BY_ID, {
    variables: { id: "4" },
  });

  if (getUserLoading) return <p>Data loading...</p>;
  if (getUserError) return <p>Error: {getUserError.message}</p>;

  return (
    <>
      <h1>Users</h1>
      <div>
        <h2>Chosen User:</h2>
        {getUserByLoading && <p>Loading user...</p>}
        {getUserByError && <p>Error: {getUserByError.message}</p>}
        {getUserByIdData?.getUserById && (
          <div>
            <p>Name: {getUserByIdData.getUserById.name}</p>
            <p>Age: {getUserByIdData.getUserById.age}</p>
            <p>Married: {getUserByIdData.getUserById.isMarried ? "Yes" : "No"}</p>
          </div>
        )}
      </div>

      <div>
        <h2>All Users:</h2>
        {getUserData?.getUsers.map((user) => (
          <div key={user.id}>
            <p>Name: {user.name}</p>
            <p>Age: {user.age}</p>
            <p>Is this user Married: {user.isMarried ? "Yes" : "No"}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
