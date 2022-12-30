import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loading from "../../utils/Loading";
import { APIKEY, getImageURL } from "../../utils";
import axios from "axios";
import CastsList from "../../components/CastsList";
import { Swiper, SwiperSlide } from "swiper/react";

function ShowInfo({ type }) {
  const { movieId, tvId } = useParams();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `https://api.themoviedb.org/3/${type}/${movieId || tvId}?api_key=${APIKEY}&language=en-US`
      )
      .then(({ data }) => {
        console.log(data);
        setData({
          backgroundImg: data.backdrop_path,
          poster: data.poster_path,
          genres: data.genres,
          title: data.title || data.name,
          overview: data.overview,
        });
      })
      .catch((err) => console.log(err));
    setLoading(false);
  }, [movieId, tvId]);

  if (loading) return <Loading />;
  const { backgroundImg, poster, genres, title, overview } = data;
  return (
    <div>
      <div
        className=" bg-top bg-cover"
        style={{
          backgroundImage: `linear-gradient(0deg, rgba(15, 15, 15, 1) 0%, rgba(15, 15, 15, 0.916) 49%, rgba(15, 15, 15, 0.281) 100%), url('${getImageURL(
            backgroundImg
          )}')`,
        }}
      >
        <div className=" container  flex flex-col py-20 lg:flex-row  ">
          <div className=" flex-1 md:flex justify-center items-center lg:grow-[0.7] hidden ">
            <img className=" rounded-3xl w-1/2 lg:w-2/3 " src={getImageURL(poster)} alt="" />
          </div>
          <div className=" flex-1">
            <h2 className=" text-5xl lg:text-6xl leading-[1.3] font-bold mb-7 lg:mb-10">{title}</h2>

            <Swiper
              spaceBetween={10}
              slidesPerView={"auto"}
              className=" flex justify-start gap-2 mb-4 max-w-[500px] ml-0"
            >
              {genres?.map((genre) => (
                <SwiperSlide
                  className=" border-2 border-white rounded-3xl py-1 px-6 whitespace-nowrap flex justify-center items-center w-fit"
                  key={genre.id}
                >
                  {genre.name}
                </SwiperSlide>
              ))}
            </Swiper>
            <p className=" mb-4 lg:text-lg lg:my-7 lg:leading-8">{overview}</p>

            <CastsList showId={movieId || tvId} type={type} />
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
}

export default ShowInfo;
