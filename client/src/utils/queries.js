import gql from 'graphql-tag';

export const GET_ME = gql`
    {
        me {
            _id
            username
            email
            artCount
            savedArtist {
                name
                artId
                description
                image
                link
            }
        }
    }
`;
