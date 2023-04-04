"use client";

import { useEffect, useState } from "react";
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";

import styles from "../dashboard.module.css";

const data = [
  {
    name: "Monday",
    views: 2400,
  },
  {
    name: "Tuesday",
    views: 1398,
  },
  {
    name: "Wednesday",
    views: 9800,
  },
  {
    name: "Thursday",
    views: 3908,
  },
  {
    name: "Friday",
    views: 4800,
  },
  {
    name: "Saturday",
    views: 3800,
  },
  {
    name: "Sunday",
    views: 4300,
  },
];

export default function ViewsChart() {
  const [isSSR, setIsSSR] = useState(true);

  useEffect(() => {
    setIsSSR(false);
  }, []);

  return (
    <>
      {!isSSR && (
        <LineChart
          className={styles.chart}
          width={730}
          height={250}
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="views" stroke="#000000" />
        </LineChart>
      )}
    </>
  );
}
