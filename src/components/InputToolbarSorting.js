import React from "react";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  FormControlLabel,
  Switch,
} from "@mui/material";

const InputToolbarSorting = ({
  order,
  handleOrderingChange,
  isDescending,
  setIsDescending,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        gap: 2,
      }}
    >
      {/* Filtro Ordinamento */}
      <FormControl sx={{ minWidth: 130 }}>
        <InputLabel>Ordina per:</InputLabel>
        <Select
          value={order}
          onChange={handleOrderingChange}
          label="Ordina per:"
        >
          <MenuItem value="">Default</MenuItem>
          <MenuItem value="name">Nome</MenuItem>
          <MenuItem value="released">Data di rilascio</MenuItem>
          <MenuItem value="added">Data di aggiunta</MenuItem>
          <MenuItem value="rating">Rating</MenuItem>
          <MenuItem value="metacritic">Metacritic</MenuItem>
        </Select>
      </FormControl>

      {/* Switch per invertire ordine */}
      <FormControlLabel
        control={
          <Switch
            checked={isDescending}
            onChange={(e) => setIsDescending(e.target.checked)}
            color="primary"
          />
        }
        label="Inverti l'ordine"
      />
    </Box>
  );
};

export default InputToolbarSorting;
