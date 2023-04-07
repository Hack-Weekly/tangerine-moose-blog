import { useState } from "react";

const useCreateBlog = () => {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState("not_started");

  const fetchData = async (formData) => {
    setStatus("loading");

    try {
      const response = await fetch("/api/createBlog/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log("data in fetchData: ", data);
      setData(data);
      setStatus("loaded");
    } catch (err) {
      setData(err);
      setStatus("error");
    }
  };

  return [fetchData, status, data];
};

export default useCreateBlog;
