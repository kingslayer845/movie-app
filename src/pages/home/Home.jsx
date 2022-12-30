import axios from "axios";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide, useSwiperSlide } from "swiper/react";
import "swiper/css";
import "animate.css";
import { APIKEY } from "../../utils/index";
import ShowViewer from "../../components/ShowViewer";
import { Link } from "react-router-dom";
import Spinner from "../../components/Spinner";
import Overlay from "../../components/Overlay";
("https://api.themoviedb.org/3/trending/all/day?api_key=<<api_key>>");
function Home() {
  const [trend, setTrend] = useState([]);
  const [loading, setLoading] = useState(false);
  const [toggleOverlay, setToggleOverlay] = useState(false);
  const [overlayId, setOverlayId] = useState();
  const [mediaType, setmediaType] = useState();
  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://api.themoviedb.org/3/trending/all/day?api_key=${APIKEY}`)
      .then(({ data }) => setTrend(data.results))
      .catch((err) => console.log(err));
    setLoading(false);
  }, []);
  function handleOpenOverlay(id, type) {
    setToggleOverlay(true);
    setOverlayId(id);
    setmediaType(type);
  }
  if (loading) return <Spinner />;
  return (
    <div className="relative">
      <Swiper slidesPerView={1} className=" h-full">
        {trend.map(
          (
            { original_title, name, media_type, id, overview, backdrop_path, poster_path },
            index
          ) => {
            return (
              <SwiperSlide
                key={index}
                className=" bg-cover bg-no-repeat bg-center flex  justify-center items-center h-screen w-screen"
                style={{
                  backgroundImage: `linear-gradient(0deg, rgba(15, 15, 15, 1) 0%, rgba(15, 15, 15, 0.916) 49%, rgba(15, 15, 15, 0.482) 100%), url("https://image.tmdb.org/t/p/original${backdrop_path}")`,
                }}
              >
                {({ isActive }) => {
                  return (
                    <div
                      className={`container flex flex-col-reverse justify-center lg:h-[80%] h-[50%]  lg:flex-row opacity-0 ${
                        isActive ? "opacity-100" : ""
                      }`}
                    >
                      <div className=" flex-1 text-center lg:text-start mt-10">
                        <h1
                          className={` text-3xl mb-6 lg:mb-14 lg:text-7xl lg:font-bold ${
                            isActive ? "animate__animated animate__fadeInDown" : ""
                          }`}
                        >
                          {original_title || name}
                        </h1>

                        <p
                          className={`text-base leading-7 lg:text-xl lg:leading-normal ${
                            isActive ? "animate__animated animate__fadeInDown" : ""
                          }`}
                        >
                          {overview}
                        </p>
                        <div
                          className={` mt-7 space-x-5 ${
                            isActive ? "animate__animated animate__fadeInDown" : ""
                          }`}
                        >
                          <Link
                            to={`show_info_${media_type === "movie" ? "movie" : "series"}/${id}`}
                            className=" bg-red-600 rounded-full py-2 px-6 tracking-wide shadow-[_0_0_10px_red] font-semibold transition hover:bg-red-500 hover:shadow-[_0_0_16px_red] hover:translate-y-2 translate-y-0"
                          >
                            Watch now
                          </Link>
                          <button
                            className=" rounded-full py-2 px-6 border-2 transition hover:text-red-600 hover:bg-white hover:shadow-[0_0_10px_#ffffff93]"
                            onClick={() => handleOpenOverlay(id, media_type)}
                          >
                            Watch trailer
                          </button>
                        </div>
                      </div>
                      <div className=" flex-1 flex  justify-center items-center h-full">
                        <img
                          className={`rounded-3xl max-h-full object-cover opacity-0 ${
                            isActive ? "opacity-100 animate__animated animate__zoomIn" : ""
                          }`}
                          src={`https://image.tmdb.org/t/p/original${poster_path}`}
                          alt=""
                        />
                      </div>
                    </div>
                  );
                }}
              </SwiperSlide>
            );
          }
        )}
      </Swiper>
      <div className="container flex flex-col gap-14 my-20">
        <ShowViewer type={"movie"} category={"upcoming"} title={"upcoming movies"} />
        <ShowViewer type={"movie"} category={"top_rated"} title={"Top rated movies"} />
        <ShowViewer type={"tv"} category={"popular"} title={"Popular TV"} />
        <ShowViewer type={"tv"} category={"top_rated"} title={"Top rated TV"} />
      </div>
      {toggleOverlay && (
        <Overlay
          toggle={setToggleOverlay}
          overlay={toggleOverlay}
          id={overlayId}
          media_type={mediaType}
        />
      )}
    </div>
  );
}

export default Home;
