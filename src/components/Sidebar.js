import React, { useState } from "react";
import "./css/Sidebar.css";
import logo from "../images/Spotify_Logo_RGB_White.png";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import SidebarOption from "./SidebarOption";
import {
  HomeOutlined,
  SearchOutlined,
  LibraryMusicOutlined,
} from "@mui/icons-material";
import { useStateProviderValue } from "../StateProvider";
import { Slide } from "@mui/material";
function Sidebar() {
  const [{ playlists, inFooter, currentSong }, dispatch] =
    useStateProviderValue();
  const [show, setShow] = useState(false);
  const handleCollapse = () => {
    dispatch({
      type: "SET_INFOOTER",
      inFooter: true,
    });
  };
  // console.log("Play : ", playlists);
  const handleClick = (item) => {
    dispatch({
      type: "SET_CURRENTPLAYLIST",
      currentPlaylist: item,
    });
  };
  return (
    <div className="sidebar">
      <img className="spotify_sidebar_logo" src={logo} alt=""></img>
      <div
        onClick={() => {
          dispatch({
            type: "SET_CURRENTPLAYLIST",
            currentPlaylist: null,
          });
        }}
      >
        <SidebarOption title={"Home"} Icon={HomeOutlined} />
      </div>
      <div>
        <SidebarOption title={"Search"} Icon={SearchOutlined} />
      </div>
      <div>
        <SidebarOption title={"Your Library"} Icon={LibraryMusicOutlined} />
      </div>

      <br />
      <strong className="sidebar_title">PLAYLISTS</strong>
      <hr />
      {playlists?.items?.map((item) => {
        return (
          <div key={item.id} onClick={() => handleClick(item)}>
            <SidebarOption title={item.name} />
          </div>
        );
      })}
      {currentSong ? (
        <Slide
          className="slide"
          direction="up"
          in={!inFooter}
          mountOnEnter
          unmountOnExit
        >
          <div
            className="sidebar_cover"
            onMouseEnter={() => setShow(true)}
            onMouseLeave={() => setShow(false)}
          >
            <ExpandMoreOutlinedIcon
              className={`collapse_icon ${show ? "show_collapse" : ""}`}
              onClick={() => handleCollapse()}
            />
            <img
              className="sidebar_song_cover"
              src={currentSong?.track?.album?.images[0]?.url}
              alt="song cover"
            ></img>
          </div>
        </Slide>
      ) : (
        ""
      )}
    </div>
  );
}

export default Sidebar;
