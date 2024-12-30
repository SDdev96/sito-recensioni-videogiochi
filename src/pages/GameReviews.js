import React from "react";
import { useLocation } from "react-router-dom";
import { Layout, Typography, List, Rate } from "antd";
import { Box, Chip } from "@mui/material";

const { Content } = Layout;

const GameReviews = () => {
  const location = useLocation();
  const { gameName, backgroundImage, gameReviews, gamePlatforms, gameTags } =
    location.state || {};

  return (
    <Layout>
      <Content className="container my-5">
        <Box
          sx={{
            padding: 8,
            borderRadius: 2,
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.5)",
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.4)), url(${backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <Typography.Title style={{color: "rgba(255, 255, 255, 0.7)"}} level={2} className="text-center">
            {gameName}
          </Typography.Title>
          <Box
            display="flex"
            justifyContent="center"
            flexWrap="wrap"
            gap={1}
            marginBottom={2}
          >
            {gamePlatforms.length > 0 ? (
              gamePlatforms.map((platform, index) => (
                <Chip
                  key={index}
                  label={platform}
                  color="primary"
                  // variant="outlined"
                />
              ))
            ) : (
              <Typography variant="body1">N/A</Typography>
            )}
          </Box>
          <Box
            display="flex"
            justifyContent="center"
            flexWrap="wrap"
            gap={1}
            marginBottom={2}
          >
            {gameTags.length > 0 ? (
              gameTags.map((tag, index) => (
                <Chip
                  key={index}
                  label={tag}
                  color="secondary"
                  size={"small"}
                />
              ))
            ) : (
              <Typography variant="body1">N/A</Typography>
            )}
          </Box>
        </Box>

        <List
          locale={{
            emptyText: (
              <Typography.Text>
                No reviews available for this game. <br />
                Be the first to write a review!
              </Typography.Text>
            ),
          }}
          dataSource={gameReviews} // Sostituisci con i tuoi dati delle recensioni
          renderItem={(review) => (
            <List.Item>
              <List.Item.Meta
                title={
                  <span>
                    <strong>{review.name}</strong>{" "}
                    <Rate disabled value={Number(review.rating)} />
                  </span>
                }
                description={review.message}
              />
            </List.Item>
          )}
        />
      </Content>
    </Layout>
  );
};

export default GameReviews;
