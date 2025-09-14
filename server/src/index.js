import { ApolloServer } from "@apollo/server"
import { startStandaloneServer } from "@apollo/server/standalone"

const users = [
    {id: '1',name: 'kashvi gupta',age: '20',isMarried: true},
    {id: '2',name: 'Atul',age: '21',isMarried: false},
    {id: '3',name: 'pranshu',age: '23',isMarried: true},
    {id: '4',name: 'pari',age: '22',isMarried: false},
]

const typeDefs = `
    type Query {
        getUsers: [User]
        getUserById(id: ID!): User
    }

    type Mutation {
        createUser(name: String!, age: Int!,isMarried: Boolean): User
    }

    type User {
        id: ID
        name: String
        age: Int
        isMarried: Boolean
    }
`

const resolvers={
    Query: {
        getUsers: ()=>{
            return users
        },
        getUserById: (parent,args)=>{ // parent allow to access
            const id=args.id;
            return users.find((user) => user.id === id)
        }
    },
    Mutation: {
        createUser: (parent,args) =>{
            const {name,age,isMarried} = args;
            const newUser={
                id: (users.length+1),
                name,
                age,
                isMarried
            };
            users.push(newUser);
        }
    },
}


const server= new ApolloServer({typeDefs,resolvers});

const { url } =await startStandaloneServer(server,{
    listen: {port: 3000},
});

console.log(`server running at: ${url}`);
