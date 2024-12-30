// hooks/useGenres.js
import { useEffect, useState } from "react";
import constant from "../constants";
import useGetApi from "./useGetApi";

function useGenres() {
  const API_URL_GENRES = constant.API_URL_GENRES;
  const API_KEY = constant.API_KEY;

  const [genres, setGenres] = useState({});

  const {
    data,
    isPending: isPendingGenres,
    error: errorGenres,
  } = useGetApi({
    url: `${API_URL_GENRES}?key=${API_KEY}`,
    type: "fetch",
    time: 0,
  });

  useEffect(() => {
    if (data) {
      setGenres(data);
    }
  }, [data]);

  return {
    genres,
    isPendingGenres,
    errorGenres,
  };
}

export default useGenres;
