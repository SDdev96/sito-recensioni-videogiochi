// hooks/useGenres.js
import { useEffect, useState } from "react";
import constant from "../constants";
import useGetApi from "./useGetApi";

function usePlatforms() {
  const API_URL_PLATFORMS = constant.API_URL_PLATFORMS;
  const API_KEY = constant.API_KEY;

  const [platforms, setPlatforms] = useState({});

  const {
    data,
    isPending: isPendingPlatforms,
    error: errorPlatforms,
  } = useGetApi({
    url: `${API_URL_PLATFORMS}?key=${API_KEY}`,
    type: "fetch",
    time: 0,
  });

  useEffect(() => {
    if (data) {
      setPlatforms(data);
    }
  }, [data]);

  return {
    platforms,
    isPendingPlatforms,
    errorPlatforms,
  };
}

export default usePlatforms;
