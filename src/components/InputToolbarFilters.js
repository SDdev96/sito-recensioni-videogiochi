import { Box } from "@mui/material";

import GenresList from "./GenresList";
import PlatformsList from "./PlatformsList";

function InputToolbarFilters({
  genre,
  handleGenreChange,
  platform,
  handlePlatformChange,
}) {
  return (
    <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
      <GenresList genre={genre} handleGenreChange={handleGenreChange} />
      <PlatformsList
        platform={platform}
        handlePlatformChange={handlePlatformChange}
      />
    </Box>
  );
}

export default InputToolbarFilters;
