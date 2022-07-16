export const initialState = {
  user: null,
  token: null,
  playlists: null,
  currentPlaylist: null,
  nextSongs: null,
  prevSongs: null,
  currentSong: null,
  isPlaying: false,
  item: null,
  inFooter: false,
  categories: null,
  viewCategory: null,
  spotify: null,
};

const reducer = (state, action) => {
  // console.log(action);

  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };
    case "SET_TOKEN":
      return {
        ...state,
        token: action.token,
      };
    case "SET_PLAYLISTS":
      return {
        ...state,
        playlists: action.playlists,
      };
    case "SET_CURRENTPLAYLIST":
      return {
        ...state,
        currentPlaylist: action.currentPlaylist,
      };
    case "SET_INFOOTER":
      return {
        ...state,
        inFooter: action.inFooter,
      };
    case "SET_CATEGORIES":
      return {
        ...state,
        categories: action.categories,
      };
    case "SET_CURRENTSONG":
      return {
        ...state,
        currentSong: action.currentSong,
      };
    case "SET_NEXTSONGS":
      return {
        ...state,
        nextSongs: action.nextSongs,
      };
    case "SET_PREVSONGS":
      return {
        ...state,
        prevSongs: action.prevSongs,
      };
    case "SET_ISPLAYING":
      return {
        ...state,
        isPlaying: action.isPlaying,
      };
    case "SET_VIEWCATEGORY":
      return {
        ...state,
        viewCategory: action.viewCategory,
      };
    case "SET_SPOTIFY":
      return {
        ...state,
        spotify: action.spotify,
      };
    default:
      return state;
  }
};

export default reducer;
