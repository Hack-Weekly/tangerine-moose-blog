import { useState } from "react";

export default function useFetch(url, { onSuccess, onError }) {
  const [data, setData] = useState(null);
  const [errors, setErrors] = useState(null);
  const [status, setStatus] = useState("idle");

  const fetchData = async ({ method, headers = { "Content-Type": "application/json" }, init }) => {
    setErrors(null);
    setData(null);
    setStatus("loading");
    try {
      const response = await fetch(url, {
        method,
        headers,
        ...init,
      });
      const data = await response.json();
      if (response.ok) {
        setStatus("done");
        setData(data);
        onSuccess && onSuccess(data);
      } else {
        setStatus("error");
        setErrors(data);
        onError && onError(data);
      }
    } catch (err) {
      setStatus("error");
      setErrors(err);
      onError && onError(err);
    }
  };

  const get = async (init) => await fetchData({ method: "GET", init });
  const post = async (init) => await fetchData({ method: "POST", init });
  const put = async (init) => await fetchData({ method: "PUT", init });
  const del = async (init) => await fetchData({ method: "DELETE", init });

  return { get, post, del, put, data, errors, status };
}
