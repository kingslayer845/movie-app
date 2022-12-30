import React, { useEffect } from "react";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Logo from "../assets/tmovie.png";
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  let activeStyle = {
    borderBottom: "2px solid red",
    fontWeight: "bolder",
  };
  useEffect(() => {
    function handleScroll() {
      if (window.scrollY) return setScrolled(true);
      setScrolled(false);
    }
    document.addEventListener("scroll", handleScroll);
    return () => document.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <nav className={` fixed w-full  z-50 ${scrolled ? "bg-[#000000f1]" : ""} `}>
      <div className="container flex justify-between items-center py-4">
        <div className=" flex items-center gap-3">
          <img className="w-10 " src={Logo} alt="" />
          <h2 className=" first-letter:text-md text-lg select-none">tMovies</h2>
        </div>
        <div className="flex gap-6 md:gap-10">
          <NavLink
            className=" py-1 lg:text-xl"
            to="/"
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            Home
          </NavLink>
          <NavLink
            className=" py-1 lg:text-xl"
            to="/movie"
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            Movies
          </NavLink>
          <NavLink
            className=" py-1 lg:text-xl"
            to="/tv"
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            Tv Series
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
