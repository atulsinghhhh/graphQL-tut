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

function App() {
  const { data, error, loading } = useQuery(GET_USERS);

  if (loading) return <p>Data loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <h1>Users</h1>
      <div>
        {data.getUsers.map((user) => (
          <div key={user.id}>
            <p>Name: {user.name}</p>
            <p>Age: {user.age}</p>
            <p>Is this user Married: {user.isMarried ? "yes" : "no"}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
