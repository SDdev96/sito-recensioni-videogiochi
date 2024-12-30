import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Layout, Row, Col, Card } from "antd";

import useGetApi from "../hooks/useGetApi";

import constant from "../constants";

import { arrayToString } from "../utilities/utils";

import GameHeader from "../components/GameHeader";
import GameAbout from "../components/GameAbout";
import GameDetails from "../components/GameDetails";
import GameMedia from "../components/GameMedia";
import GameForm from "../components/GameForm";
import GameReviewsPreview from "../components/GameReviewsPreview";

function GameDetailPage() {
  const { id } = useParams(); // Ottieni l'ID dalla URL
  const { Content } = Layout;

  const API_URL_GAMES = constant.API_URL_GAMES;
  const API_KEY = constant.API_KEY;
  const JSON_SERVER_URL = constant.JSON_SERVER_URL;

  const {
    data: gameDetails = {},
    isPending,
    error,
  } = useGetApi({
    url: `${API_URL_GAMES}/${id}?key=${API_KEY}`,
    time: 0,
    type: "fetch",
  });

  const {
    data: gameData = {},
    isPending: isPending2,
    error: error2,
  } = useGetApi({
    url: `${JSON_SERVER_URL}/${id}`,
    time: 0,
    type: "axios",
  });

  const [reviews, setReviews] = useState([]);
  const [platforms, setPlatforms] = useState([]);
  const [genres, setGenres] = useState([]);
  const [developers, setDevelopers] = useState([]);
  const [stores, setStores] = useState([]);
  const [tags, setTags] = useState([]);
  const [publishers, setPublishers] = useState([]);

  useEffect(() => {
    if (gameData) {
      if (gameData.review) setReviews(gameData.review.slice(0, 4));
    }
  }, [gameData]);

  useEffect(() => {
    if (gameDetails) {
      if (gameDetails.platforms) setPlatforms(gameDetails.platforms);
      if (gameDetails.genres) setGenres(gameDetails.genres);
      if (gameDetails.developers) setDevelopers(gameDetails.developers);
      if (gameDetails.stores) setStores(gameDetails.stores);
      if (gameDetails.tags) setTags(gameDetails.tags);
      if (gameDetails.publishers) setPublishers(gameDetails.publishers);
    }

    console.log(stores);
  }, [gameDetails]);

  if (error) return <div className="text-center text-danger mt-5">{error}</div>;

  return (
    <Layout>
      {/* Header */}
      <GameHeader
        backgroundImage={gameDetails?.background_image}
        isPending={isPending}
        gameTitle={gameDetails?.name}
      />

      {/* Contenuto */}
      <Content className="container my-5">
        {/* Riga delle informazioni del gioco */}
        <Row gutter={[24, 24]}>
          {/* Colonna principale */}
          <Col lg={16} md={24} style={{ width: "100%" }}>
            <GameAbout
              isPending={isPending}
              gameDescription={gameDetails?.description_raw}
              rating={gameDetails?.rating}
              ratingsCount={gameDetails?.ratings_count}
              releaseDate={gameDetails?.released}
              metacritic={gameDetails?.metacritic}
              metacriticUrl={gameDetails?.metacritic_url}
              platforms={
                platforms ? arrayToString(platforms, "platform.name") : "N/A"
              }
            />
          </Col>

          {/* Colonna laterale */}
          <Col lg={8} md={24} style={{ width: "100%" }}>
            <GameDetails
              isPending={isPending}
              stores={stores ? arrayToString(stores, "store.name") : "N/A"}
              genres={genres ? arrayToString(genres, "name") : "N/A"}
              tags={tags ? arrayToString(tags, "name") : "N/A"}
              developers={
                developers ? arrayToString(developers, "name") : "N/A"
              }
              publishers={
                publishers ? arrayToString(publishers, "name") : "N/A"
              }
            />

            <GameMedia
              isPending={isPending}
              backgroundImageAdditional={
                gameDetails?.background_image_additional
              }
              website={gameDetails?.website}
            />
          </Col>
        </Row>

        {/* Riga delle recensioni */}
        <Row className="mt-5" gutter={[16, 16]}>
          <Col xs={24} md={24}>
            <Card className="shadow-lg">
              <Row gutter={[48, 0]}>
                {/* Colonna del form recensioni */}
                <Col xs={24} md={12}>
                  <GameForm
                    isPending={isPending}
                    id={id}
                    name={gameDetails?.name}
                  />
                </Col>

                {/* Colonna della lista recensioni */}
                <Col xs={24} md={12}>
                  <GameReviewsPreview
                    id={id}
                    reviews={reviews}
                    isPending={isPending2}
                    error={error2}
                    gameId={id}
                    gameDetails={gameDetails}
                    platforms={platforms}
                    tags={tags}
                    gameData={gameData}
                  />
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}

export default GameDetailPage;
