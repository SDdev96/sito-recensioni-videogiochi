import React from "react";
import { Card, Skeleton, Typography } from "antd";

const GameMedia = ({ isPending, backgroundImageAdditional, website }) => {
  return (
    <Card
      className="shadow-sm mt-4"
      cover={
        isPending ? (
          <Skeleton.Image
            style={{
              width: "100%",
              height: "200px",
            }}
            active
          />
        ) : (
          <img
            src={backgroundImageAdditional}
            alt="Additional Background"
            className="img-fluid"
          />
        )
      }
    >
      {isPending ? (
        <Skeleton.Input
          active
          size="small"
          style={{
            width: "100%",
            marginTop: "10px",
          }}
        />
      ) : (
        <Typography.Text>
          <a href={website} target="_blank" rel="noopener noreferrer">
            Visit Official Website
          </a>
        </Typography.Text>
      )}
    </Card>
  );
};

export default GameMedia;
