import React from "react";
import { Box, Skeleton, Typography } from "@mui/material";
import Masonry from "@mui/lab/Masonry";
import { styled } from "@mui/system";

const Item = styled(Box)({
  background: "#fff",
  borderRadius: "8px",
  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
  position: "relative",
  overflow: "hidden",
});

const MasonryBox = ({
  randomHeights,
  RAWGgames,
  handleCardClick,
  isPending,
}) => {
  return (
    <Box sx={{ width: "100%", minHeight: "400px", marginTop: 4 }}>
      <Masonry columns={{ xs: 1, sm: 2, md: 4 }} spacing={3}>
        {isPending
          ? randomHeights.map((height, index) => (
              <Item key={`skeleton-${index}`} sx={{ height: height }}>
                <Skeleton variant="rectangular" height={height} />
              </Item>
            ))
          : RAWGgames.map((game, index) => {
              const height = randomHeights[index];
              return (
                <Item
                  key={index}
                  sx={{
                    position: "relative",
                    overflow: "hidden",
                    borderRadius: "8px",
                    cursor: "pointer",
                    "&:hover .overlay": {
                      opacity: 1,
                    },
                    height: height,
                  }}
                  onClick={() => handleCardClick(game.id)}
                >
                  <img
                    src={game.background_image}
                    alt={game.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transform: "scale(1.5)",
                      backgroundSize: "200%",
                    }}
                  />
                  {/* Riquadro Metacritic */}
                  <Box
                    sx={{
                      position: "absolute",
                      top: 8,
                      right: 8,
                      backgroundColor:
                        game.metacritic > 90
                          ? "green"
                          : game.metacritic > 60
                          ? "#FFD700"
                          : "red",
                      color: "#000",
                      padding: "4px 8px",
                      borderRadius: "8px",
                      fontWeight: "bold",
                      fontSize: "0.875rem",
                      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                    }}
                  >
                    {game.metacritic ? game.metacritic : "N/A"}
                  </Box>
                  {/* Overlay */}
                  <Box
                    className="overlay"
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      backgroundColor: "rgba(0, 0, 0, 0.7)",
                      color: "white",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      opacity: 0,
                      transition: "opacity 0.3s ease",
                    }}
                  >
                    <Typography variant="h6">{game.name}</Typography>
                    <Typography>Rating: {game.rating}</Typography>
                    <Typography variant="body2">
                      Released: {game.released}
                    </Typography>
                  </Box>
                </Item>
              );
            })}
      </Masonry>
    </Box>
  );
};

export default MasonryBox;
