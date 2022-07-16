import React, { useState } from "react";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import "./css/SongRow.css";
function SongRow({ srno, item }) {
  const [flag, setFlag] = useState(false);
  function msToHMS(ms) {
    let seconds = ms / 1000;
    seconds = seconds % 3600;
    const minutes = parseInt(seconds / 60);
    seconds = seconds % 60;
    return `${minutes}:${
      parseInt(seconds) < 10 ? "0" + parseInt(seconds) : parseInt(seconds)
    }`;
  }

  return (
    <div
      className="table_row"
      onMouseEnter={() => setFlag(true)}
      onMouseLeave={() => setFlag(false)}
    >
      <div className="r_srno">{flag ? <PlayArrowRoundedIcon /> : srno}</div>
      <div className="r_title">
        <img src={item?.track?.album?.images[2]?.url} alt=""></img>
        <div className="song_names">
          <p>{item?.track?.name}</p>
          <p className="song_artist">
            {item?.track?.artists?.map((artist, i) => {
              let str = "";
              if (i !== 0) str += ", ";
              str += artist.name;
              return str;
            })}
          </p>
        </div>
      </div>
      <div className="r_album">{item?.track?.album?.name}</div>
      <div className="r_date"></div>
      <div className="r_duration">{msToHMS(item?.track?.duration_ms)}</div>
    </div>
  );
}

export default SongRow;
