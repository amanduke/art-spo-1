import gql from 'graphql-tag';

export const GET_ME = gql`
    {
        me {
            _id
            username
            email
            bookCount
            savedArtist {
                title
                bookId
                authors
                description
                image
                link
            }
        }
    }
`;
