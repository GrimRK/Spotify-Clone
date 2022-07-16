import React, { useEffect, useState } from "react";
import { useStateProviderValue } from "../StateProvider";
import "./css/Row.css";
import Panel from "./Panel";
function Row({ name, id }) {
  const [list, setList] = useState();
  const [{ spotify }, dispatch] = useStateProviderValue();
  useEffect(() => {
    spotify
      ?.getCategoryPlaylists(id)
      .then((res) => setList(res.playlists.items))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="row">
      <div
        className="row_header"
        onClick={() =>
          dispatch({
            type: "SET_VIEWCATEGORY",
            viewCategory: { name: name, list: list },
          })
        }
      >
        <h4>{name}</h4>
      </div>
      <div className="panel_container">
        {list?.map((item, i) => {
          if (i >= 5) return;
          return <Panel key={i} item={item} />;
        })}
      </div>
    </div>
  );
}

export default Row;
