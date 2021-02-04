export const searchGoogleArtists  = (query) => {
    return fetch(`https://api.artic.edu/api/v1/artworks/search?q=${query}`);
  };

