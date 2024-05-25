import React from "react";
import HomePage from "./home/HomePage";
import "bootstrap/dist/css/bootstrap.min.css";
import { Outlet } from "react-router-dom";
import Header from "./header/Header";
import "./App";
import Container from "react-bootstrap/esm/Container";
export const App = () => {
  return (
    <>
      <Header></Header>
      <Outlet></Outlet> {/* === các Component con nằm dưới thằng App */}
    </>
  );
};
