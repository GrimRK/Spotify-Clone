import React, { useEffect, useState } from "react";
import "./css/Playlist.css";
import Header from "./Header";
import { useStateProviderValue } from "../StateProvider";
import PlayCircleFilledRoundedIcon from "@mui/icons-material/PlayCircleFilledRounded";
import PauseCircleFilledRoundedIcon from "@mui/icons-material/PauseCircleFilledRounded";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import SongRow from "./SongRow";
function Playlist() {
  const [{ currentPlaylist, isPlaying, spotify, currentSong }, dispatch] =
    useStateProviderValue();
  const [songs, setSongs] = useState(null);
  const [totalTime, setTotalTime] = useState(0);
  const [toggles, setToggles] = useState(false);

  useEffect(() => {
    spotify
      ?.getPlaylist(currentPlaylist?.id)
      .then((data) => {
        setSongs(data.tracks.items);
      })
      .catch((err) => console.log(err));
  }, [currentPlaylist]);

  function msToHMS(ms) {
    let seconds = ms / 1000;
    const hours = parseInt(seconds / 3600);
    seconds = seconds % 3600;
    const minutes = parseInt(seconds / 60);
    seconds = seconds % 60;
    return `${hours} hr ${
      parseInt(minutes) < 10 ? "0" + parseInt(minutes) : parseInt(minutes)
    } min`;
  }
  useEffect(() => {
    var tempTime = 0;
    songs?.map((item) => {
      tempTime += item.track.duration_ms;
    });
    setTotalTime(msToHMS(tempTime));
  }, [songs]);

  useEffect(() => {
    if (
      currentSong &&
      songs &&
      songs.find((item) => item.track.id === currentSong?.track?.id)
    ) {
      setToggles(true);
    } else {
      setToggles(false);
    }
  }, [currentSong]);
  const addToQueue = (index) => {
    dispatch({
      type: "SET_ISPLAYING",
      isPlaying: false,
    });
    setTimeout(() => {
      if (index > 0) {
        dispatch({
          type: "SET_PREVSONGS",
          prevSongs: songs?.slice(0, index),
        });
      }
      dispatch({
        type: "SET_NEXTSONGS",
        nextSongs: songs?.slice(index + 1),
      });
      dispatch({
        type: "SET_CURRENTSONG",
        currentSong: songs[index],
      });
      dispatch({
        type: "SET_ISPLAYING",
        isPlaying: true,
      });
    }, 1000);
  };

  return (
    <div className="playlist">
      <Header spotify={spotify} />
      <div className="playlist_info">
        <img
          className="playlist_banner"
          src={currentPlaylist?.images[0]?.url}
          alt=""
        ></img>
        <div className="playlist_info_text">
          <strong>PLAYLIST</strong>
          <h2>{currentPlaylist?.name}</h2>
          <p>{currentPlaylist?.description}</p>
          <p className="owner_info_container">
            <strong className="owner_info">
              {currentPlaylist?.owner?.display_name} .{" "}
              {currentPlaylist?.tracks?.total} Songs,
            </strong>{" "}
            {totalTime}
          </p>
        </div>
      </div>
      <div className="playlist_content">
        <div className="playlist_buttons">
          {isPlaying && toggles ? (
            <PauseCircleFilledRoundedIcon
              className="playlist_play_icon"
              onClick={() => {
                dispatch({
                  type: "SET_ISPLAYING",
                  isPlaying: false,
                });
              }}
            />
          ) : (
            <PlayCircleFilledRoundedIcon
              className="playlist_play_icon"
              onClick={() => addToQueue(0)}
            />
          )}

          <FavoriteBorderRoundedIcon className="playlist_fav_icon" />
          <MoreHorizRoundedIcon className="playlist_dots_icon" />
        </div>
        <div className="table_header">
          <p className="tb_srno">#</p>
          <p className="tb_title">TITLE</p>
          <p className="tb_album">ALBUM</p>
          <p className="tb_date">DATE ADDED</p>
          <p className="tb_duration">DURATION</p>
        </div>
        <div>
          {songs?.map((item, i) => (
            <div
              key={i}
              onClick={() => addToQueue(i)}
              style={{ padding: "0px 30px 0px 10px" }}
            >
              <SongRow srno={i + 1} item={item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Playlist;
