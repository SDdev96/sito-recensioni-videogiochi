import React from "react";
import { Typography, Skeleton, Space } from "antd";

const GameInfo = ({
  isPending,
  rating,
  ratingsCount,
  releaseDate,
  metacritic,
  metacriticUrl,
  platforms,
}) => {
  return (
    <>
      <Typography.Title level={4}>Game Info</Typography.Title>
      {isPending ? (
        <Skeleton active />
      ) : (
        <Space direction="vertical" size="small">
          <Typography.Text>
            <strong>Rating:</strong> {rating || "N/A"} ({ratingsCount || 0}{" "}
            votes)
          </Typography.Text>
          <Typography.Text>
            <strong>Release Date:</strong> {releaseDate || "N/A"}
          </Typography.Text>
          <Typography.Text>
            <strong>Metacritic:</strong> {metacritic || "N/A"}
            {metacriticUrl && (
              <span>
                {" "}
                (
                <a
                  href={metacriticUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary"
                >
                  View on Metacritic
                </a>
                )
              </span>
            )}
          </Typography.Text>
          <Typography.Text>
            <strong>Platforms:</strong> {platforms || "N/A"}
          </Typography.Text>
        </Space>
      )}
    </>
  );
};

export default GameInfo;
