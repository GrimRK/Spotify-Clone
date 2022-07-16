import React, { useEffect } from "react";
import { useStateProviderValue } from "../StateProvider";
import "./css/ViewCategory.css";
import Panel from "./Panel";
function ViewCategory() {
  const [{ viewCategory }] = useStateProviderValue();

  return (
    <div className="view_category">
      <div className="view_category_name">
        <h4>{viewCategory?.name}</h4>
      </div>
      <div className="playlist_container">
        {viewCategory?.list?.map((item, i) => {
          return <Panel key={i} item={item} />;
        })}
      </div>
      <hr></hr>
    </div>
  );
}

export default ViewCategory;
