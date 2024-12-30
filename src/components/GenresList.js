import { useEffect, useMemo } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import useGenres from "../hooks/useGenres";

function GenresList({ genre, handleGenreChange }) {
  const { genres, isPendingGenres, errorGenres } = useGenres();

  const RAWGgenres = useMemo(() => {
    return genres.results || [];
  }, [genres]);

  useEffect(() => {
    if (genres) {
      console.log("Genres Data:", genres);
    }
  }, [genres]);

  return (
    <FormControl sx={{ minWidth: 120 }}>
      <InputLabel>Genere</InputLabel>
      <Select value={genre} onChange={handleGenreChange} label="Genere">
        <MenuItem value="">Tutti</MenuItem>
        {RAWGgenres.map((genreItem) => (
          <MenuItem key={genreItem.id} value={genreItem.id}>
            {genreItem.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default GenresList;
