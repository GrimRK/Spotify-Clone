import React, { useEffect, useRef, useState } from "react";
import "./css/Footer.css";
import PlayCircleFilledWhiteOutlinedIcon from "@mui/icons-material/PlayCircleFilledWhiteOutlined";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import ShuffleOutlinedIcon from "@mui/icons-material/ShuffleOutlined";
import RepeatIcon from "@mui/icons-material/Repeat";
import RepeatOneIcon from "@mui/icons-material/RepeatOne";
import PlaylistAddOutlinedIcon from "@mui/icons-material/PlaylistAddOutlined";
import PauseCircleOutlineRoundedIcon from "@mui/icons-material/PauseCircleOutlineRounded";
import VolumeUpOutlinedIcon from "@mui/icons-material/VolumeUpOutlined";
import VolumeDownOutlinedIcon from "@mui/icons-material/VolumeDownOutlined";
import VolumeOffOutlinedIcon from "@mui/icons-material/VolumeOffOutlined";
import { Grid, LinearProgress, Slide, Slider } from "@mui/material";
import ExpandLessOutlinedIcon from "@mui/icons-material/ExpandLessOutlined";

import { useStateProviderValue } from "../StateProvider";
import { useEventListener } from "usehooks-ts";
function Footer() {
  const [{ inFooter, isPlaying, currentSong, prevSongs, nextSongs }, dispatch] =
    useStateProviderValue();
  const audioRef = useRef();

  const [duration, setDuration] = useState(1);
  const [currTime, setCurrTime] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [loopStatus, setLoopStatus] = useState(0);
  const [show, setShow] = useState(false);

  function msToHMS(ms) {
    let seconds = ms / 1000;
    seconds = seconds % 3600;
    const minutes = parseInt(seconds / 60);
    seconds = parseInt(seconds % 60);
    return `${minutes < 10 ? "0" + minutes : minutes}:${
      seconds < 10 ? "0" + seconds : seconds
    }`;
  }

  useEffect(() => {
    setInterval(
      () => {
        setCurrTime(audioRef?.current?.currentTime);
      },
      isPlaying ? 100 : null
    );
    if (loopStatus == 0) {
      audioRef.current.onended = function () {
        dispatch({
          type: "SET_ISPLAYING",
          isPlaying: false,
        });
        if (!nextSongs) return;
        if (nextSongs.length === 0) {
          return;
        }
        setTimeout(() => {
          var temp = prevSongs;
          if (!temp) {
            temp = [currentSong];
          } else {
            temp.push(currentSong);
          }
          dispatch({
            type: "SET_PREVSONGS",
            prevSongs: temp,
          });
          dispatch({
            type: "SET_CURRENTSONG",
            currentSong: nextSongs[0],
          });
          dispatch({
            type: "SET_NEXTSONGS",
            nextSongs: nextSongs.slice(1),
          });

          dispatch({
            type: "SET_ISPLAYING",
            isPlaying: true,
          });
        }, 1000);
      };
    } else if (loopStatus == 1) {
      audioRef.current.onended = function () {
        dispatch({
          type: "SET_ISPLAYING",
          isPlaying: false,
        });
        if (!nextSongs) {
          return;
        }
        if (nextSongs.length === 0) {
          dispatch({
            type: "SET_NEXTSONGS",
            nextSongs: prevSongs[0],
          });
        }
        setTimeout(() => {
          var temp = prevSongs;
          if (!temp) {
            temp = [currentSong];
          } else {
            temp.push(currentSong);
          }
          var temp2 = prevSongs[0];
          var temp3 = nextSongs;
          temp3.push(temp2);
          dispatch({
            type: "SET_PREVSONGS",
            prevSongs: temp.slice(1),
          });
          dispatch({
            type: "SET_CURRENTSONG",
            currentSong: nextSongs[0],
          });
          dispatch({
            type: "SET_NEXTSONGS",
            nextSongs: temp3.slice(1),
          });

          dispatch({
            type: "SET_ISPLAYING",
            isPlaying: true,
          });
        }, 1000);
      };
    } else if (loopStatus == 2 && isPlaying) {
      audioRef.current.onended = audioRef.current.play();
    }
  });

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    const seconds = Math.floor(audioRef.current.duration);
    setDuration(seconds);
  }, [audioRef?.current?.loadmetadata, audioRef?.current?.readyState]);

  const handleExpand = () => {
    dispatch({
      type: "SET_INFOOTER",
      inFooter: false,
    });
  };
  const togglePlayPause = () => {
    const prevVal = isPlaying;
    dispatch({
      type: "SET_ISPLAYING",
      isPlaying: !prevVal,
    });
  };

  const handleProgress = (e) => {
    setCurrTime((e.target.value * duration) / 100);
    audioRef.current.currentTime = (e.target.value * duration) / 100;
  };

  const skipPrev = () => {
    if (prevSongs?.length === 0) {
      return;
    }

    dispatch({
      type: "SET_ISPLAYING",
      isPlaying: false,
    });

    setTimeout(() => {
      var temp = nextSongs;
      if (!temp) {
        temp = [currentSong];
      } else {
        temp.unshift(currentSong);
      }

      dispatch({
        type: "SET_NEXTSONGS",
        nextSongs: temp,
      });
      dispatch({
        type: "SET_CURRENTSONG",
        currentSong: prevSongs[prevSongs?.length - 1],
      });
      dispatch({
        type: "SET_PREVSONGS",
        prevSongs: prevSongs.slice(0, prevSongs?.length - 1),
      });
      dispatch({
        type: "SET_ISPLAYING",
        isPlaying: true,
      });
    }, 1000);
  };

  const skipNext = () => {
    if (!nextSongs) return;
    if (nextSongs.length === 0) {
      return;
    }

    dispatch({
      type: "SET_ISPLAYING",
      isPlaying: false,
    });

    setTimeout(() => {
      var temp = prevSongs;
      if (!temp) {
        temp = [currentSong];
      } else {
        temp.push(currentSong);
      }
      dispatch({
        type: "SET_PREVSONGS",
        prevSongs: temp,
      });
      dispatch({
        type: "SET_CURRENTSONG",
        currentSong: nextSongs[0],
      });
      dispatch({
        type: "SET_NEXTSONGS",
        nextSongs: nextSongs.slice(1),
      });

      dispatch({
        type: "SET_ISPLAYING",
        isPlaying: true,
      });
    }, 1000);
  };

  function shuffle(array) {
    let currentIndex = array.length,
      randomIndex;
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    return array;
  }
  const handleShuffle = () => {
    var temp;
    if (!nextSongs && !prevSongs) {
      return;
    }
    if (nextSongs) {
      temp = nextSongs;
      shuffle(temp);
      dispatch({
        type: "SET_NEXTSONGS",
        nextSongs: temp,
      });
    } else {
      temp = prevSongs;
      shuffle(temp);
      dispatch({
        type: "SET_NEXTSONGS",
        nextSongs: temp,
      });
      dispatch({
        type: "SET_PREVSONGS",
        prevSongs: temp.slice(1, 1),
      });
    }
  };

  const handleRepeat = () => {
    const flag = loopStatus;
    setLoopStatus((flag + 1) % 3);
  };
  const handleVolume = (e) => {
    setVolume(e.target.value / 100);
    audioRef.current.volume = e.target.value / 100;
  };
  return (
    <div className="footer">
      <div className="footer_left">
        <audio ref={audioRef} src={currentSong?.track?.preview_url} />
        <Slide direction="right" in={inFooter} mountOnEnter unmountOnExit>
          {currentSong ? (
            <div
              className="footer_cover"
              onClick={() => handleExpand()}
              onMouseEnter={() => setShow(true)}
              onMouseLeave={() => setShow(false)}
            >
              <ExpandLessOutlinedIcon
                className={`expand_icon ${show ? "show_expand" : ""}`}
              />
              <img
                className="song_cover"
                src={currentSong?.track?.album?.images[2]?.url}
                alt="song cover"
              ></img>
            </div>
          ) : (
            <div></div>
          )}
        </Slide>

        <div className="song_info">
          <h4>{currentSong?.track?.name}</h4>
          <p>
            {currentSong?.track?.artists?.map((artist, i) => {
              let str = "";
              if (i !== 0) str += ", ";
              str += artist.name;
              return str;
            })}
          </p>
        </div>
      </div>
      <div className="footer_center">
        <div className="control_buttons">
          <ShuffleOutlinedIcon
            className="footer_icon"
            onClick={() => handleShuffle()}
          />
          <SkipPreviousIcon
            className="footer_icon"
            onClick={() => skipPrev()}
          />
          {isPlaying ? (
            <PauseCircleOutlineRoundedIcon
              className="footer_icon"
              fontSize="large"
              onClick={() => togglePlayPause()}
            />
          ) : (
            <PlayCircleFilledWhiteOutlinedIcon
              className="footer_icon"
              fontSize="large"
              onClick={() => togglePlayPause()}
            />
          )}

          <SkipNextIcon className="footer_icon" onClick={() => skipNext()} />
          {loopStatus === 0 ? (
            <RepeatIcon
              className="footer_icon"
              onClick={() => handleRepeat()}
            />
          ) : loopStatus === 1 ? (
            <RepeatIcon
              className="footer_icon colored"
              onClick={() => handleRepeat()}
            />
          ) : (
            <RepeatOneIcon
              className="footer_icon colored"
              onClick={() => handleRepeat()}
            />
          )}
        </div>
        <div className="song_progress_container">
          <p>{msToHMS(currTime * 1000)}</p>

          <Slider
            className="song_progress_bar"
            size="small"
            value={currTime ? (currTime * 100) / duration : 0}
            onChange={handleProgress}
          />
          <p>{duration ? msToHMS(duration * 1000) : "00:00"}</p>
        </div>
      </div>

      <div className="footer_right">
        <Grid container spacing={2}>
          <Grid item>
            <PlaylistAddOutlinedIcon />
          </Grid>
          <Grid item>
            {volume === 0 ? (
              <VolumeOffOutlinedIcon
                onClick={() => {
                  setVolume(0.5);
                  audioRef.current.volume = 0.5;
                }}
              />
            ) : volume < 0.5 ? (
              <VolumeDownOutlinedIcon
                onClick={() => {
                  setVolume(0);
                  audioRef.current.volume = 0;
                }}
              />
            ) : (
              <VolumeUpOutlinedIcon
                onClick={() => {
                  setVolume(0);
                  audioRef.current.volume = 0;
                }}
              />
            )}
          </Grid>
          <Grid item xs>
            <Slider value={volume * 100} onChange={handleVolume} />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default Footer;
