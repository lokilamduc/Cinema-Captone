import React from "react";
import Banner from "./Banner/Banner";
import Movies from "./Movies/Movies";
import Showtimes from "./Showtimes/Showtimes";

function Home() {
  return (
    <>
      <Banner />

      <Movies />

      <Showtimes />
    </>
  );
}

export default Home;
