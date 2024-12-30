import { useEffect, useMemo } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import usePlatforms from "../hooks/usePlatforms";

function PlatformsList({ platform, handlePlatformChange }) {
  const { platforms, isPendingPlatforms, errorPlatforms } = usePlatforms();

  const RAWGplatforms = useMemo(() => {
    return platforms.results || [];
  }, [platforms]);

  useEffect(() => {
    if (platforms) {
      console.log("Platforms Data:", platforms);
    }
  }, [platforms]);

  return (
    <FormControl sx={{ minWidth: 130 }}>
      <InputLabel>Piattaforma</InputLabel>
      <Select
        value={platform}
        onChange={handlePlatformChange}
        label="Piattaforma"
      >
        <MenuItem value="">Tutte</MenuItem>
        {RAWGplatforms.map((platformItem) => (
          <MenuItem key={platformItem.id} value={platformItem.id}>
            {platformItem.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default PlatformsList;
