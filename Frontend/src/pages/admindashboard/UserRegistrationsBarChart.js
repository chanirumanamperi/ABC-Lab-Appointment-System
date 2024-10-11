import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import axios from "axios";
import { Card, CardContent, Typography } from "@mui/material";

const UserRegistrationsBarChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const config = {
          headers: { Authorization: `Bearer ${token}` },
          params: { userrole: "PATIENT" },
        };
        const response = await axios.get(
          "http://localhost:8080/ABC/api/v1/register/user",
          config
        );

        if (response.data.code === "200") {
          const usersData = response.data.data;

          const counts = {};
          usersData.forEach((user) => {
            const date = new Date(user.createdtime).toISOString().split("T")[0];
            counts[date] = (counts[date] || 0) + 1;
          });

          const chartData = Object.keys(counts).map((date) => ({
            date,
            count: counts[date],
          }));
          setData(chartData);
        } else {
          console.error("Error fetching data: ", response.data.message);
          setData([]);
        }
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
          Patients Registrations Over Time
        </Typography>
        <BarChart width={600} height={300} data={data}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
      </CardContent>
    </Card>
  );
};

export default UserRegistrationsBarChart;
