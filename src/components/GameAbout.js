import React from "react";
import { Card, Divider } from "antd";
import GameDescription from "./GameDescription";
import GameInfo from "./GameInfo";

const GameAbout = ({
  isPending,
  gameDescription,
  rating,
  ratingsCount,
  releaseDate,
  metacritic,
  metacriticUrl,
  platforms,
}) => {
  return (
    <Card className="shadow-sm">
      <GameDescription
        isPending={isPending}
        gameDescription={gameDescription}
      />

      <Divider />

      <GameInfo
        isPending={isPending}
        rating={rating}
        ratingsCount={ratingsCount}
        releaseDate={releaseDate}
        metacritic={metacritic}
        metacriticUrl={metacriticUrl}
        platforms={platforms}
      />
    </Card>
  );
};

export default GameAbout;
