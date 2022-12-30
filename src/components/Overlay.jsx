import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { APIKEY } from "../utils";
import "animate.css";

export default function Overlay({ toggle, id, media_type }) {
  const [result, setResult] = useState();
  useEffect(() => {
    axios(
      `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${APIKEY}&language=en-US`
    ).then(({ data }) => {
      const { results } = data;
      setResult(() => {
        return results.find((el) => el.official && el.type === "Trailer");
      });
    });
  }, [id]);
  if (result)
    return (
      <div className={` fixed w-full h-screen top-0 right-0   z-50 `}>
        <div className=" w-full h-full bg-[#00000098]" onClick={() => toggle(false)} />
        <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[27rem] md:w-[35rem] lg:w-[46rem] xl:w-[60rem] xl:h-[600px] h-[400px] lg:h-[500px] p-5 pt-10 bg-[#181818]  animate__animated animate__fadeInDown animate__fast">
          <button className="  absolute top-2 right-2 cursor-pointer" onClick={() => toggle(false)}>
            <svg
              class="w-5 h-5 hover:text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
          <iframe
            src={`https://www.youtube.com/embed/${result.key}?autoplay=1`}
            frameBorder="0"
            allowFullscreen
            title="video"
            className="w-full h-full  "
          />
        </div>
      </div>
    );
}
