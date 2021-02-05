import gql from 'graphql-tag';

export const query = gql`
query {
  popular_artists(size: 3) {
    artists {
      name
      	artworks {
      	  id
          title
          is_for_sale
          price
          	image {
              image_url
              
          	}
      	}
    }
  }
}
`