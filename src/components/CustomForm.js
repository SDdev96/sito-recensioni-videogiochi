import { useForm, Controller } from "react-hook-form";
import { Input, Button, Rate, Radio, Card, Typography, message } from "antd";

export default function CustomForm({ id, name }) {
  const gameID = id;
  const gameName = name;
  const defaultValues = {
    name: "",
    radio: "like",
    rating: 0,
    review: "",
    // category: "",
    // checkbox: [],
  };
  const { TextArea } = Input;
  const { Title, Text } = Typography;
  const [messageApi, contextHolder] = message.useMessage();
  const info = () => {
    messageApi.info("Grazie per la recensione!");
  };

  const {
    // register, //non si può usare con antd (sostituirlo con control)
    control, // Per implementare il tutto con antd, react-select e mui
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: defaultValues,
    mode: "onSubmit",
  });

  const onSubmit = async (data, e) => {
    console.log(data, e);

    const newReview = {
      name: data.name,
      like: data.radio,
      rating: data.rating,
      message: data.review,
    };

    try {
      const response = await fetch("http://localhost:8000/games");
      const games = await response.json();

      const existingGame = games.find((game) => game.id === gameID);

      if (existingGame) {
        const updatedGame = {
          ...existingGame,
          review: [...existingGame.review, newReview],
        };

        //ATTENZIONE: ammette solo il tipo stringa per l'id
        const putResponse = await fetch(
          `http://localhost:8000/games/${existingGame.id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedGame),
          }
        );
        if (!putResponse.ok) {
          let errorMessage = "La richiesta non è andata a buon fine: ";
          if (putResponse.status === 404)
            errorMessage += "L'ID" + existingGame.id + " non è stato trovato";
          if (putResponse.status >= 400 && putResponse.status < 500)
            errorMessage +=
              "Errore nella richiesta, la sintassi è errata o mancanza di dati";
          if (putResponse.status >= 500)
            errorMessage +=
              "Errore del server: il server non è riuscito a processare la richiesta.";
          throw new Error(errorMessage);
        }

        console.log("Recensione aggiornata per gioco esistente");
      } else {
        const newGame = {
          id: gameID,
          gameName,
          review: [newReview],
        };

        await fetch("http://localhost:8000/games", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newGame),
        });

        console.log("Nuovo gioco aggiunto con recensione");
      }
      info();
      reset();
    } catch (error) {
      console.error(error);
    }
  };

  const onError = (errors, e) => {
    console.log(errors, e);
  };

  return (
    <div>
      <Card
        // title="Lascia una Recensione"
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          marginBottom: "40px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)",
        }}
      >
        <Title level={2} className="mb-4">
          Lascia una recensione
        </Title>
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          {/* Nome */}
          <div style={{ marginBottom: "20px" }}>
            <label className="d-block">
              <Controller
                name="name"
                control={control}
                rules={{
                  required: "Il nome è obbligatorio",
                  maxLength: {
                    value: 20,
                    message: "Il nome deve avere meno di 20 caratteri",
                  },
                }}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Inserisci il tuo nome"
                    status={errors.name ? "error" : ""}
                  />
                )}
              />
              {errors.name && <Text type="danger">{errors.name.message}</Text>}
            </label>
          </div>

          {/* Valutazione */}
          <div style={{ marginBottom: "20px" }}>
            <Controller
              name="rating"
              control={control}
              rules={
                {
                  // required: "La valutazione è obbligatoria",
                }
              }
              render={({ field }) => (
                <Rate
                  {...field}
                  allowHalf
                  tooltips={["terrible", "bad", "normal", "good", "wonderful"]}
                />
              )}
            />
            {errors.rating && (
              <Text type="danger">{errors.rating.message}</Text>
            )}
          </div>

          {/* Mi piace / Non mi piace */}
          <div style={{ marginBottom: "20px" }}>
            <Controller
              name="radio"
              control={control}
              rules={{
                required: "Seleziona una delle due opzioni",
              }}
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <Radio.Group onChange={onChange} selected={value}>
                  <Radio value="like">👍 Mi piace</Radio>
                  <Radio value="dislike">👎 Non mi piace</Radio>
                </Radio.Group>
              )}
            />
            {errors.radio && <Text type="danger">{errors.radio.message}</Text>}
          </div>

          {/* Messaggio */}
          <div style={{ marginBottom: "20px" }}>
            {/* <label>Recensione</label> */}
            <Controller
              name="review"
              control={control}
              rules={{
                maxLength: {
                  value: 200,
                  message: "La recensione deve avere massimo 200 caratteri",
                },
              }}
              render={({ field }) => (
                <TextArea
                  {...field}
                  rows={4}
                  placeholder="Scrivi la tua recensione"
                />
              )}
            />
            {errors.review && (
              <Text type="danger">{errors.review.message}</Text>
            )}
          </div>

          {/* Pulsante di invio */}
          {contextHolder}
          <Button type="primary" htmlType="submit" block>
            Invia Recensione
          </Button>
        </form>
      </Card>
    </div>
  );
}
