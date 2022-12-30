import React, { useState, useEffect, Fragment } from "react";
import Loading from "../utils/Loading";
import { APIKEY, getImageURL } from "../utils/index";
import { Swiper, SwiperSlide } from "swiper/react";
import axios from "axios";
function CastsList({ showId, type }) {
  const [casts, setCasts] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://api.themoviedb.org/3/${type}/${showId}/credits?api_key=${APIKEY}`)
      .then(({ data }) =>
        setCasts(() => {
          return data.cast.map((cast) => {
            const { name, profile_path: profilePic } = cast;
            return { name, profilePic };
          });
        })
      )
      .catch((err) => console.log(err));
    setLoading(false);
  }, []);

  if (loading) return <Loading />;
  return (
    <Fragment>
      <h3 className=" font-semibold text-lg mb-2">casts</h3>
      <Swiper spaceBetween={20} slidesPerView={3} className="max-w-[500px] ml-0">
        {casts.map(({ profilePic, name }, index) => (
          <SwiperSlide key={name + index}>
            <img
              className=""
              src={
                profilePic
                  ? getImageURL(profilePic)
                  : "https://m.media-amazon.com/images/G/01/IMDbPro/images/default_name._V142442227_UY289_CR46,0,196,289_.png"
              }
              alt=""
            />
            <h4 className=" mt-1">{name}</h4>
          </SwiperSlide>
        ))}
      </Swiper>
    </Fragment>
  );
}

export default CastsList;
