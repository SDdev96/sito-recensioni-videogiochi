import React from "react";
import { Typography, Skeleton, Space, Card, Tag } from "antd";

const GameDetails = ({
  isPending,
  stores,
  genres,
  tags,
  developers,
  publishers,
}) => {
  return (
    <Card className="shadow-sm" title="Details">
      {isPending ? (
        <Skeleton active />
      ) : (
        <Space direction="vertical" size="small">
          <Typography.Text>
            <strong>Stores:</strong> {stores || "N/A"}
          </Typography.Text>
          <Typography.Text>
            <strong>Genres:</strong> {genres || "N/A"}
          </Typography.Text>
          <Typography.Text>
            <strong>Tags:</strong> {tags || "N/A"}
          </Typography.Text>
          <Typography.Text>
            <strong>Developers:</strong> {developers || "N/A"}
          </Typography.Text>
          <Typography.Text>
            <strong>Publishers:</strong> {publishers || "N/A"}
          </Typography.Text>
        </Space>
      )}
    </Card>
  );
};

export default GameDetails;
