import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CircularProgress,
  Divider,
} from "@mui/material";
import { AppWidgetSummary } from "../sections/@dashboard/app";
import axios from "axios";
import LoadingImage from "../images/assets/images/loading.gif";

export default function DashboardAppDoctor() {
  const [customerCount, setCustomerCount] = useState(0);
  const [ongoingAdsCount, setOngoingAdsCount] = useState(0);
  const [doctors, setDoctors] = useState([]);
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const config = {
          headers: { Authorization: `Bearer ${token}` },
          params: { username: sessionStorage.getItem("name") },
        };

        const customerCountResponse = await axios.get(
          "http://localhost:8080/ABC/api/v1/appointment/countdoc",
          config
        );
        setCustomerCount(customerCountResponse.data.data || "0");

        const ongoingAdsCountResponse = await axios.get(
          "http://localhost:8080/ABC/api/v1/appointment/countdoctoday",
          config
        );
        setOngoingAdsCount(ongoingAdsCountResponse.data.data || "0");

        const appointmentsResponse = await axios.get(
          "http://localhost:8080/ABC/api/v1/appointment/allappointmenttoday",
          config
        );
        setAppointments(appointmentsResponse.data.data || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data: ", error);
        setCustomerCount(0);
        setOngoingAdsCount(0);
        setAppointments([]);
        setDoctors([]);
        setTests([]);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const [appointments, setAppointments] = useState([]);

  return (
    <>
      <Helmet>
        <title>Dashboard | Your App</title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <AppWidgetSummary
              title="All Appointments"
              total={customerCount}
              icon="iconoir:post"
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <AppWidgetSummary
              title="Today Appointments"
              total={ongoingAdsCount}
              color="error"
              icon="ic:round-post-add"
            />
          </Grid>
        </Grid>
        <Divider sx={{ my: 3 }} />
        <Grid container spacing={3}>
          {appointments.map((appointment) => (
            <Grid item key={appointment.id} xs={12} sm={6} md={4}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Appointment ID: {appointment.id}
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom>
                    Patient: {appointment.patient.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Test: {appointment.test.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Technician: {appointment.test.technician.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Date and Time:{" "}
                    {new Date(appointment.dateTime).toLocaleString()}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {loading && (
        <Container maxWidth="xl">
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            sx={{ minHeight: "50vh" }}
          >
            <Grid item>
              <CircularProgress />
            </Grid>
          </Grid>
        </Container>
      )}
    </>
  );
}
