import React, { useEffect, useState } from "react";
import { useStateProviderValue } from "../StateProvider";
import "./css/Home.css";
import Row from "./Row";
function Home() {
  const [{ categories, spotify }] = useStateProviderValue();

  return (
    <div className="home">
      {categories?.map((category) => {
        return <Row key={category.id} name={category.name} id={category.id} />;
      })}
      <hr></hr>
    </div>
  );
}

export default Home;
