import { gql } from 'apollo-server-express';

export default gql`
    extend type Query {
        me: User
        myMessages: [Message!]
        myProducts: [Product!]
        getUser(id: ID!): User
        getAllUsers: [User!]
    }

    type User {
        id: ID!
        firstName: String!
        lastName: String!
        email: String!
        products: [Product]
        role: String
        messages: [Message]
    }

    extend type Mutation {
        signIn(email: String!, password: String!): Token!
    }
    
    type Token {
        token: String!
    }

`;