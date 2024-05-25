import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Admin from "./admin/Admin";
import User from "./user/User";
import HomePage from "./home/HomePage";
import ManageUser from "./admin/content/ManageUser";
import DashBoar from "./admin/content/DashBoar";
import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />}></Route>
        <Route path="/user" element={<User />}></Route>
      </Route>
      {/* Admin */}
      <Route path="/admin" element={<Admin />}>
        <Route index element={<DashBoar></DashBoar>}></Route>
        <Route
          path="/admin/manage-user"
          element={<ManageUser></ManageUser>}
        ></Route>
      </Route>
    </Routes>
  </BrowserRouter>
);
