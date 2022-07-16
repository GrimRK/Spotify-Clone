import React, { useEffect, useState } from "react";
import "./css/Panel.css";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import { useStateProviderValue } from "../StateProvider";
function Panel({ item }) {
  const [{ spotify }, dispatch] = useStateProviderValue();
  const [songs, setSongs] = useState();
  useEffect(() => {
    spotify
      ?.getPlaylist(item?.id)
      .then((data) => {
        setSongs(data.tracks.items);
      })
      .catch((err) => console.log(err));
  }, []);

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
  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + " . . ." : str;
  }
  const [showPlay, setShowplay] = useState(false);

  return (
    <div
      className="panel"
      onMouseEnter={() => setShowplay(true)}
      onMouseLeave={() => setShowplay(false)}
      onClick={() => {
        dispatch({ type: "SET_CURRENTPLAYLIST", currentPlaylist: item });
      }}
    >
      <div className="image_container">
        <img className="panel_image" src={item?.images[0]?.url} alt=""></img>
        <PlayCircleIcon
          className={`panel_play ${showPlay ? "showPlay" : ""}`}
          onClick={() => addToQueue(0)}
        />
      </div>
      <div className="info_container">
        <h3>{item?.name}</h3>
        <p>{truncate(item?.description, 36)}</p>
      </div>
    </div>
  );
}

export default Panel;
