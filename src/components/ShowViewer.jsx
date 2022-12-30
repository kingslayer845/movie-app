import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import noImage from "../assets/no-image.jpg";
import axios from "axios";
import Loading from "../utils/Loading";
import { APIKEY, getImageURL } from "../utils/index";
import { Link } from "react-router-dom";
import Spinner from "./Spinner";
import "animate.css";
import ImageOverlay from "./ImageOverlay";

function ShowViewer({ type, category, title }) {
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState([]);
  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `https://api.themoviedb.org/3/${type}/${category}?api_key=${APIKEY}&language=en-US&page=1`
      )
      .then(({ data }) => {
        setShow(data.results);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);
  if (loading) return <Spinner />;
  return (
    <div>
      <div className=" flex justify-between items-center mb-7">
        <h2 className="capitalize font-semibold text-xl lg:text-3xl">{title}</h2>
        <Link
          className=" border-white border-2 rounded-3xl py-1 px-6 transition hover:text-red-600 hover:bg-white hover:shadow-[0_0_10px_#ffffff5a]"
          to={type}
        >
          View more
        </Link>
      </div>
      <Swiper spaceBetween={20} slidesPerView={"auto"}>
        {show.map(({ id, original_title, poster_path, original_name }, index) => {
          const title = type === "movie" ? original_title : original_name;
          return (
            <SwiperSlide className=" w-1/2 md:w-1/3 lg:w-1/5" key={index}>
              <Link to={`show_info_${type === "movie" ? "movie" : "series"}/${id}`}>
                <div className=" group">
                  <div className="relative">
                    <ImageOverlay />
                    <img className=" rounded-2xl" src={getImageURL(poster_path)} />
                  </div>

                  <h3 className=" p-2 px-4 font-semibold">{title}</h3>
                </div>
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}

export default ShowViewer;
