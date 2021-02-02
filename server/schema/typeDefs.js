const { gql } = require('apollo-server-express');

// make sure to include a difference between 'saveArtist' and 'savedArtist'.
const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        artistCount: Int
        savedArtist: [Artist]
    }

    type Artist {
        artistId: ID
        name: String
        description: String
        image: String
        link: String
    }

    type ArtistInputs {
        artistId: ID
        description: String
        name: String
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
        saveArtist(artistData: ArtistInput!): User
        removeArtist(artistId: ID!): User
    }
`;

module.exports = typeDefs;