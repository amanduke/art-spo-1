const { gql } = require('apollo-server-express');

// make sure to include a difference between 'saveArt' and 'savedArt'.
const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        artCount: Int
        savedArt: [Art]
    }

    type Art {
        artId: ID
        title: String
        authors: [String]
        description: String
        image: String
        link: String
    }

    type ArtInputs {
        artId: ID
        authors: [String]
        description: String
        title: String
        image: String
        link: String
    }

    type Auth {
        token: ID
        uesr: User
    }

    type Query {
        me: User
        users: [User]
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveArt(artData: ArtInput!): User
        removeArt(artId: ID!): User
    }
`;

module.exports = typeDefs;