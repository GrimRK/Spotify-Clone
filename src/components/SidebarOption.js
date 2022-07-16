import React from "react";
import "./css/SidebarOption.css";
function SidebarOption({ title, Icon }) {
  return (
    <div className="sidebar_option">
      {Icon && <Icon className="option_icon" />}
      {Icon ? <h3>{title}</h3> : <p>{title}</p>}
    </div>
  );
}

export default SidebarOption;
