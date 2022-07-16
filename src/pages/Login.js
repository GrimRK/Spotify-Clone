import { Button } from "@mui/material";
import React from "react";
import logo from "../images/Spotify_Logo_RGB_Green.png";
import "./css/Login.css";
import { loginUrl } from "../spotify";
export const Login = () => {
  return (
    <div className="login">
      <img className="spotify" src={logo} alt="spotify_logo_white"></img>
      <p>
        <center>
          This is a Spotify Clone not the official spotify Web App. This web app
          is designed to view playlists and play song preview which are fetched
          using the official spotify Web API.
        </center>
      </p>
      <Button
        className="login_btn"
        onClick={() => {
          window.location.assign(loginUrl);
        }}
      >
        Login
      </Button>
    </div>
  );
};
