export const searchGoogleArtists  = (query) => {
  return fetch(`https://api.artsy.net/api/search?q=${query}`).then(res=>{console.log(res)})
};

