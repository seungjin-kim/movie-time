export const MOVIEDB_API_KEY = process.env.MOVIEDB_API_KEY

export const baseURL = 'https://api.themoviedb.org/3'
export const didMountURL = `${baseURL}/trending/movie/week?api_key=${MOVIEDB_API_KEY}`
export const searchURL = `${baseURL}/search/movie?api_key=${MOVIEDB_API_KEY}&query=`
export const tokenURL = `${baseURL}/authentication/token/new?api_key=${MOVIEDB_API_KEY}`
export const authenticateURL = `${baseURL}/authentication/session/new?api_key=${MOVIEDB_API_KEY}`
export const createListURL = `${baseURL}/list?api_key=${MOVIEDB_API_KEY}&session_id=`
export const getWatchListURL = `${baseURL}/account/{account_id}/watchlist/movies?api_key=${MOVIEDB_API_KEY}&session_id=`

export default MOVIEDB_API_KEY;
