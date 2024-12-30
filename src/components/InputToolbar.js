import React from "react";
import { Box, TextField } from "@mui/material";

import InputToolbarFilters from "./InputToolbarFilters";
import InputToolbarSorting from "./InputToolbarSorting";

const InputToolbar = ({
  searchQuery,
  handleSearch,
  isPending,
  genre,
  handleGenreChange,
  platform,
  handlePlatformChange,
  order,
  handleOrderingChange,
  isDescending,
  setIsDescending,
}) => {
  return (
    <Box
      sx={{
        marginY: 3,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 2,
        flexWrap: "wrap",
      }}
    >
      {/* Input Ricerca per Nome */}
      <TextField
        label="Cerca giochi..."
        variant="outlined"
        value={searchQuery}
        onChange={handleSearch}
        sx={{ width: 300 }}
        disabled={isPending}
      />

      <InputToolbarFilters
        genre={genre}
        handleGenreChange={handleGenreChange}
        platform={platform}
        handlePlatformChange={handlePlatformChange}
      />

      <InputToolbarSorting
        order={order}
        handleOrderingChange={handleOrderingChange}
        isDescending={isDescending}
        setIsDescending={setIsDescending}
      />
    </Box>
  );
};

export default InputToolbar;
