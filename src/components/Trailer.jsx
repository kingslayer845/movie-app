import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loading from "../../utils/Loading";
import { APIKEY } from "../../utils";
import axios from "axios";
function Trailer() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  console.log(data);
  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${APIKEY}&language=en-US`)
      .then(({ results }) => setData(results))
      .catch((err) => console.log(err));
    setLoading(false);
  }, [id]);

  if (loading) return <Loading />;
  return (
    <div>
      <div></div>
    </div>
  );
}

export default Trailer;

// https://api.themoviedb.org/3/movie/{movie_id}/videos?api_key=<<api_key>>&language=en-US
