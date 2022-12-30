import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { APIKEY, getImageURL } from "../../utils/index";
import { Link } from "react-router-dom";
import Spinner from "../../components/Spinner";
import ImageOverlay from "../../components/ImageOverlay";
const defaultMovieLink = `https://api.themoviedb.org/3/movie/upcoming?api_key=${APIKEY}&language=en-US`;
const searchMovieLink = `https://api.themoviedb.org/3/search/movie?api_key=${APIKEY}&language=en-US&include_adult=false`;
const defaultTvLink = `https://api.themoviedb.org/3/tv/on_the_air?api_key=${APIKEY}&language=en-US`;
const searchTvLink = `https://api.themoviedb.org/3/search/tv?api_key=${APIKEY}&language=en-US&page=1&include_adult=false`;
function ShowList({ type, cardLink }) {
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState([]);
  const page = useRef(1);
  const fetch = useRef("default");
  const [search, setSearch] = useState("");
  const [noMoreData, setNoMoreData] = useState(false);
  console.log(loading);
  useEffect(() => {
    const link = type === "movie" ? defaultMovieLink : defaultTvLink;
    setLoading(true);
    axios
      .get(`${link}${page.current}`)
      .then(({ data }) => {
        setShow(() => {
          return data.results.map((el) => {
            const { poster_path: poster, title, name, id } = el;
            return { poster, id, name, title };
          });
        });
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [type]);

  async function handleLoadMore() {
    const searchLink = type === "movie" ? searchMovieLink : searchTvLink;
    const link = type === "movie" ? defaultMovieLink : defaultTvLink;
    page.current++;
    setLoading(true);
    try {
      const data = await customFetch(
        `${fetch.current === "search" ? searchLink + `&query=${search}` : link}&page=${
          page.current
        }`
      );
      if (data.results.length === 0) setNoMoreData(true);
      setShow((prev) => {
        const newSet = data.results.map((el) => {
          const { poster_path: poster, name, title, id } = el;
          return { poster, title, id, name };
        });
        return [...prev, ...newSet];
      });
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (!search.trim()) return;
    page.current = 1;
    fetch.current = "search";
    setNoMoreData(false);
    const searchLink = type === "movie" ? searchMovieLink : searchTvLink;
    try {
      setLoading(true);
      const data = await customFetch(`${searchLink}&query=${search}&page=${page.current}`);
      if (data.results.length === 0) setNoMoreData(true);
      setShow(() => {
        const newSet = data.results.map((el) => {
          const { poster_path: poster, title, name, id } = el;
          return { poster, name, title, id };
        });
        return newSet;
      });
      setLoading(false);
      page.current++;
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className="container py-20 flex flex-col items-center">
      <h2 className=" text-center font-bold text-xl mb-10">
        {type === "movie" ? "Movies" : "Series"}
      </h2>
      <form onSubmit={handleSubmit} className=" bg-black rounded-3xl  pl-3 flex justify-between ">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className=" bg-transparent outline-none"
          type="text"
        />
        <button className=" bg-red-600 px-5 py-1 rounded-3xl hover:shadow-[0_0_10px_red]">
          search
        </button>
      </form>
      <div className="grid grid-cols-2 lg:grid-cols-5 xl:grid-cols-6 gap-5 my-10 mt-16">
        {show.map(({ poster, id, title, name }) => {
          return (
            <Link key={id} to={`${cardLink}/${id}`} className="">
              <div className=" group">
                <div className=" relative">
                  <ImageOverlay />
                  <img className="rounded-xl" src={getImageURL(poster)} alt="" />
                </div>
                <h4 className=" font-semibold mt-2 px-2">{title || name}</h4>
              </div>
            </Link>
          );
        })}
      </div>
      {loading && <Spinner />}
      {noMoreData ? (
        <p>There is no results!</p>
      ) : (
        <button
          className=" border-2 rounded-3xl py-1 px-6 hover:text-red-600 hover:bg-white hover:shadow-[0_0_10px_#ffffff5a]"
          onClick={handleLoadMore}
        >
          Load more
        </button>
      )}
    </div>
  );
}

export default ShowList;
async function customFetch(URL) {
  const { data } = await axios.get(URL);
  return data;
}
