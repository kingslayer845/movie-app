import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import ShowInfo from "./pages/showInfo/ShowInfo";
import ShowList from "./pages/showList/ShowList";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="movie" element={<ShowList type={"movie"} cardLink={"/show_info_movie"} />} />
          <Route path="tv" element={<ShowList type={"tv"} cardLink={"/show_info_series"} />} />

          <Route path="show_info_movie/:movieId" element={<ShowInfo type={"movie"} />} />
          <Route path="show_info_series/:tvId" element={<ShowInfo type={"tv"} />} />

          <Route
            path="*"
            element={
              <main style={{ padding: "1rem" }}>
                <p>There's nothing here!</p>
              </main>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
