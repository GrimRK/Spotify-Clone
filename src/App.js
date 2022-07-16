import { useEffect, useState } from "react";
// import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Login } from "./pages/Login";
import Player from "./pages/Player";
import { getTokenFromUrl } from "./spotify";
import SpotifyWebApi from "spotify-web-api-js";
import { useStateProviderValue } from "./StateProvider";
const spotify = new SpotifyWebApi();
function App() {
  const [{ user, token }, dispatch] = useStateProviderValue();
  useEffect(() => {
    const hash = getTokenFromUrl();
    // console.log("Token:", hash);
    const _token = hash.access_token;
    if (_token) {
      dispatch({
        type: "SET_TOKEN",
        token: _token,
      });
      dispatch({
        type: "SET_SPOTIFY",
        spotify: spotify,
      });
      spotify.setAccessToken(_token);

      spotify.getMe().then((user) => {
        dispatch({
          type: "SET_USER",
          user: user,
        });
      });

      spotify.getUserPlaylists().then((playlists) => {
        dispatch({
          type: "SET_PLAYLISTS",
          playlists: playlists,
        });
      });
      spotify
        .getCategories({ limit: 5, country: "IN" })
        .then((categories) => {
          dispatch({
            type: "SET_CATEGORIES",
            categories: categories.categories.items,
          });
        })
        .catch((err) => console.log(err.message));
    }
  }, []);
  // console.log("User: ", user);
  // console.log("Token: ", token);
  return <div className="App">{token ? <Player /> : <Login />}</div>;
}

export default App;
