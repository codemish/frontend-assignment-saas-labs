import { useEffect, useState } from "react";

const useQueryHook = ({ query, method, payload, headers }) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  const fetchApi = async () => {
    try {
      var appendedQuery = query;
      const methodOptions = {
        method,
        headers,
        body: payload,
      };

      if (method === "GET") {
        delete methodOptions.body;
        const params = Object.keys(payload).length
          ? new URLSearchParams(payload).toString()
          : null;

        if (params) {
          appendedQuery = `${appendedQuery}?${params}`;
        }
      }
      const res = await fetch(appendedQuery, methodOptions);
      const resJson = await res.json();
      setData(resJson);
      setIsLoading(false);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    fetchApi(data);
  }, []);

  return { data, isLoading, error };
};

export default useQueryHook;
