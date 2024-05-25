import React from "react";
import Header from "../header/Header";
import videoHomePage from "../assets/hero.webm";
const HomePage = () => {
  return (
    <>
      <div className="homepage-container d-flex align-items-center justify-content-around">
        <div className="home-content">
          <h1>Trần văn kiên</h1>
          <p>
            anh kiên đẹp trai nhất thế giới <br />
            anh kiên đẹp trai nhất thế giới <br />
            anh kiên đẹp trai nhất thế giới <br />
          </p>
          <button className="btn btn-lg btn-primary">Nhấn vào sẽ đẹp trai</button>
        </div>
        <video autoPlay muted loop>
          <source src={videoHomePage} type="" />
        </video>
      </div>
    </>
  );
};

export default HomePage;
