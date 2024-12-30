import React from "react";
import { Typography, Skeleton } from "antd";

const GameDescription = ({ isPending, gameDescription }) => {
  return (
    <>
      <Typography.Title level={3}>About the Game</Typography.Title>
      {isPending ? (
        <div>
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
        </div>
      ) : (
        <Typography.Paragraph>
          {gameDescription || "No description available"}
        </Typography.Paragraph>
      )}
    </>
  );
};

export default GameDescription;
