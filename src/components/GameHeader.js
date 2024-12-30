import React from "react";
import { Layout, Typography, Skeleton } from "antd";

const GameHeader = ({ backgroundImage, isPending, gameTitle }) => {
  const { Header } = Layout;

  return (
    <Header
      className="d-flex align-items-center justify-content-center"
      style={{
        backgroundColor: "inherit",
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "400px",
        filter: "brightness(0.7)",
      }}
    >
      {isPending ? (
        <Skeleton.Image style={{ width: "100vw", height: "400px" }} active />
      ) : (
        <Typography.Title style={{ color: "white", textAlign: "center" }}>
          {gameTitle || "Game Title not found"}
        </Typography.Title>
      )}
    </Header>
  );
};

export default GameHeader;
