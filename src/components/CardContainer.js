import { useState, useEffect, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { Typography, Box, Pagination } from "@mui/material";
import InputToolbar from "./InputToolbar";
import MasonryBox from "./MasonryBox";
import useGetApi from "../hooks/useGetApi";
import constant from "../constants";

function CardContainer() {
  const API_URL_GAMES = constant.API_URL_GAMES;
  const API_KEY = constant.API_KEY;

  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [genre, setGenre] = useState("");
  const [platform, setPlatform] = useState("");
  const [order, setOrder] = useState("");
  const [isDescending, setIsDescending] = useState(false);
  const [randomHeights, setRandomHeights] = useState([]);

  useEffect(() => {
    // Altezza tra 100 e 300px
    const heights = Array.from({ length: 20 }).map(
      () => Math.floor(Math.random() * (300 - 100 + 1)) + 100
    );
    setRandomHeights(heights);
  }, []);

  const finalUrl = useMemo(() => {
    let url = API_URL_GAMES + `?key=${API_KEY}` + `&page=${currentPage}`;

    if (searchQuery) url += `&search=${searchQuery}&search_precise`;
    if (genre) url += `&genres=${genre}`;
    if (platform) url += `&platforms=${platform}`;
    if (order) url += `&ordering=${isDescending ? "-" : ""}${order}`;

    return url;
  }, [
    API_URL_GAMES,
    API_KEY,
    currentPage,
    searchQuery,
    genre,
    platform,
    order,
    isDescending,
  ]);

  const {
    data: games = {},
    isPending,
    error,
  } = useGetApi({
    url: finalUrl,
    type: "fetch",
    time: 0,
  });

  const RAWGgames = useMemo(() => {
    return (
      games?.results?.filter((game) =>
        game.name.toLowerCase().includes(searchQuery.toLowerCase())
      ) || []
    );
  }, [games, searchQuery]);

  const changePage = useCallback((newPage) => {
    setCurrentPage(newPage);
  }, []);
  const handleCardClick = useCallback(
    (gameId) => {
      navigate(`/game/${gameId}`);
    },
    [navigate]
  );
  const handleSearch = useCallback((e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  }, []);
  const handleGenreChange = useCallback((e) => {
    setGenre(e.target.value);
  }, []);
  const handlePlatformChange = useCallback((e) => {
    setPlatform(e.target.value);
  }, []);
  const handleOrderingChange = useCallback((e) => {
    setOrder(e.target.value);
  }, []);

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Pagina {currentPage}
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: 3,
        }}
      >
        <Pagination
          count={Math.ceil((games?.count || 0) / 20)}
          page={currentPage}
          onChange={(event, value) => changePage(value)}
          color="primary"
          shape="rounded"
          siblingCount={1}
          boundaryCount={1}
          disabled={isPending}
        />
      </Box>

      <InputToolbar
        searchQuery={searchQuery}
        handleSearch={handleSearch}
        genre={genre}
        handleGenreChange={handleGenreChange}
        platform={platform}
        handlePlatformChange={handlePlatformChange}
        order={order}
        handleOrderingChange={handleOrderingChange}
        isDescending={isDescending}
        setIsDescending={setIsDescending}
        isPending={isPending}
      />

      {error && (
        <Typography align="center" color="error">
          {error}
        </Typography>
      )}
      <MasonryBox
        randomHeights={randomHeights}
        RAWGgames={RAWGgames}
        handleCardClick={handleCardClick}
        isPending={isPending}
      />
    </Box>
  );
}

export default CardContainer;
