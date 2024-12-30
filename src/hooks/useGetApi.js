import { useState, useEffect } from "react";
import axios from "axios";

// Usa Fetch se:
//    Vuoi una soluzione leggera e non hai bisogno di funzionalità avanzate.
//    Stai costruendo un'app che deve funzionare solo in browser moderni.
// Usa Axios se:
//    Ti servono funzionalità avanzate come timeout, intercettori o supporto completo per Node.js.
//    Vuoi una sintassi più pulita e semplice per configurazioni complesse.

const useGetApi = ({ url = "", type = "", time = 0 }) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url) {
      setError("URL is required");
      setIsPending(false);
      return;
    }

    let isMounted = true; // Per gestire lo smontaggio del componente
    const controller = type === "fetch" ? new AbortController() : null;

    const fetchData = async () => {
      try {
        let responseData = {};

        switch (type.toLowerCase()) {
          case "fetch": {
            const response = await fetch(url, {
              signal: controller?.signal,
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            });

            if (!response.ok) {
              throw new Error(
                `Fetch error: ${response.status} ${response.statusText}`
              );
            }
            responseData = await response.json();
            break;
          }

          case "axios": {
            const source = axios.CancelToken.source();

            const response = await axios
              .get(url, {
                cancelToken: source.token,
                validateStatus: function (status) {
                  return status >= 200 && status <= 300;
                },
              })
              .catch(function (error) {
                // console.log(error);
                if (error.response) {
                  if (error.response.data === "Not Found") {
                    // console.log("errore 404");
                    throw new Error("Game has not been found.");
                  }
                } else {
                  throw new Error(error.message);
                }
              });

            responseData = response.data;
            console.log(responseData);

            break;
          }

          default:
            throw new Error(
              "Invalid type. Use 'fetch' or 'axios' for the API call."
            );
        }

        if (isMounted) {
          setData(responseData);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message);
          setData(null);
        }
      } finally {
        if (isMounted) {
          setIsPending(false);
        }
      }
    };

    const timer = setTimeout(fetchData, time * 1000);

    return () => {
      isMounted = false;
      clearTimeout(timer);
      if (controller) controller.abort();
    };
  }, [url, time, type]);

  return { data, isPending, error };
};

export default useGetApi;
