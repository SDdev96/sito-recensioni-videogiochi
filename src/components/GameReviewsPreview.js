import React from "react";
import { List, Rate, Skeleton, Typography, Button } from "antd";
import { useNavigate } from "react-router-dom";

function GameReviewsPreview({
  isPending,
  error,
  reviews,
  id,
  gameDetails,
  gameData,
  platforms,
  tags,
}) {
  const navigate = useNavigate();

  return (
    <>
      {isPending ? (
        <>
          <Skeleton active />
          <Skeleton active />
        </>
      ) : error ? (
        <Typography.Text
          type="danger"
          className="d-flex justify-content-center"
        >
          {error}
        </Typography.Text>
      ) : (
        <>
          <List
            locale={{
              emptyText: (
                <Typography.Text>
                  No reviews available for this game. <br />
                  Be the first to write a review!
                </Typography.Text>
              ),
            }}
            dataSource={reviews}
            renderItem={(review) => (
              <List.Item>
                <List.Item.Meta
                  title={
                    <span>
                      <Rate disabled value={Number(review.rating)} />
                      <br />
                      <strong>{review.name}</strong>
                    </span>
                  }
                  description={review.message}
                />
              </List.Item>
            )}
          />
          {/* Pulsante per accedere alla pagina "AllReviews" */}
          {reviews.length > 0 && (
            <div className="d-flex justify-content-center mt-3">
              <Button
                type="primary"
                onClick={() =>
                  navigate(`/game/reviews/${id}`, {
                    state: {
                      gameName: gameDetails?.name,
                      backgroundImage: gameDetails?.background_image,
                      gameReviews: gameData?.review,
                      gamePlatforms: platforms
                        ? platforms.map((p) => p.platform.name)
                        : "N/A",
                      gameTags: tags ? tags.map((t) => t.name) : "N/A",
                    },
                  })
                }
              >
                View All Reviews
              </Button>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default GameReviewsPreview;
