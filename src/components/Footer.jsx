import React from "react";
import { Link } from "react-router-dom";
import footerBg from "../assets/footer-bg.jpg";
import logo from "../assets/tmovie.png";
export default function Footer() {
  const style = {
    background: `url('${footerBg}')`,
  };
  const liStyle =
    "hover:text-red-500 cursor-pointer first-letter:capitalize font-semibold lg:text-lg";
  return (
    <div className="bg-top flex justify-center items-center py-20" style={style}>
      <div className="w-[400px] md:w-[500px] lg:w-[700px]">
        <div className=" flex justify-center items-center gap-1 mb-10">
          <img className=" w-7 h-7" src={logo} alt="logo" />
          <h3 className=" first-letter:text-lg text-2xl font-bold select-none">tMovie</h3>
        </div>
        <div className=" grid grid-cols-3 grid-rows-4 gap-y-4 ">
          <Link to="/" className={`${liStyle} `}>
            home
          </Link>
          <h4 className={`${liStyle} `}>contact us</h4>
          <h4 className={`${liStyle} `}>term of services</h4>
          <h4 className={`${liStyle} `}>about us</h4>
          <h4 className={`${liStyle} `}>live</h4>
          <h4 className={`${liStyle} `}>FAQ</h4>
          <h4 className={`${liStyle} `}>premium</h4>
          <h4 className={`${liStyle} `}>privacy policy</h4>
          <h4 className={`${liStyle} `}>you must watch</h4>
          <h4 className={`${liStyle} `}>recent release</h4>
          <h4 className={`${liStyle} `}>top IMDP</h4>
        </div>
      </div>
    </div>
  );
}
