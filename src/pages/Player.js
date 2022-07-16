import React, { useEffect } from "react";
import Body from "../components/Playlist";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import "./css/Player.css";
import Home from "../components/Home";
import Header from "../components/Header";
import { useStateProviderValue } from "../StateProvider";
import Playlist from "../components/Playlist";
import ViewCategory from "../components/ViewCategory";
function Player() {
  const [{ currentPlaylist, viewCategory, spotify }] = useStateProviderValue();
  return (
    <div className="player">
      <div className="player_body">
        <Sidebar />
        <div className="player_right">
          {currentPlaylist ? (
            <Playlist />
          ) : !viewCategory ? (
            <>
              <Header />
              <Home />
            </>
          ) : (
            <>
              <Header />
              <ViewCategory />
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Player;
