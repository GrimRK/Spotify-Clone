import React, { useState } from "react";
import "./css/Header.css";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import { Avatar, Menu, MenuItem } from "@mui/material";
import { useStateProviderValue } from "../StateProvider";
function Header() {
  const [{ currentPlaylist, viewCategory, user }, dispatch] =
    useStateProviderValue();
  const [show, setShow] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="header">
      <div className="header_buttons">
        {currentPlaylist || viewCategory ? (
          <ArrowBackIosOutlinedIcon
            className="header_icon"
            onClick={() => {
              dispatch({ type: "SET_CURRENTPLAYLIST", currentPlaylist: null });
              dispatch({ type: "SET_VIEWCATEGORY", viewCategory: null });
            }}
          />
        ) : (
          ""
        )}
      </div>
      <div
        className="header_user"
        onClick={handleClick}
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
      >
        <Avatar className="header_avatar" src={user?.images[0]?.url} />
        <p>{user?.display_name}</p>
        <ExpandMoreOutlinedIcon
          className={`menu_drop_icon ${show ? "show_menu_drop" : ""}`}
        />
      </div>
      <Menu
        id="basic-menu"
        className="nav_menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem
          className="menu_item"
          onClick={() => {
            dispatch({
              type: "SET_TOKEN",
              token: null,
            });
          }}
        >
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
}

export default Header;
