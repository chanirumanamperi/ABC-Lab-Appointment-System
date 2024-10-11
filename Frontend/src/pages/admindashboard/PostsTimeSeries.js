import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";
import { Container, Card, CardContent, Typography } from "@mui/material";

const PostsTimeSeries = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };
        const response = await axios.get(
          "http://localhost:8080/ABC/api/v1/appointment/all",
          config
        );
        const appointments = response.data.data;

        const counts = {};
        appointments.forEach((appointment) => {
          const date = new Date(appointment.dateTime)
            .toISOString()
            .split("T")[0];
          counts[date] = (counts[date] || 0) + 1;
        });

        const chartData = Object.keys(counts).map((date) => ({
          date,
          count: counts[date],
        }));
        setData(chartData);
      } catch (error) {
        console.error("Error fetching data: ", error);
        setData([]);
      }
    };
    fetchData();
  }, []);

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Posts Time Series
        </Typography>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
            <Line type="monotone" dataKey="count" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default PostsTimeSeries;
