export const searchGoogleArtists  = (query) => {
    return fetch(`https://www.googleapis.com/artists/v1/volumes?q=${query}`);
  };

