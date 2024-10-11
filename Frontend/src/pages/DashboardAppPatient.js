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

export default function DashboardAppPage() {
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
          params: { systemid: sessionStorage.getItem("systemid") },
        };

        const customerCountResponse = await axios.get(
          "http://localhost:8080/ABC/api/v1/appointment/count",
          config
        );
        setCustomerCount(customerCountResponse.data.data || 0);

        const ongoingAdsCountResponse = await axios.get(
          "http://localhost:8080/ABC/api/v1/appointment/ongoingcount",
          config
        );
        setOngoingAdsCount(ongoingAdsCountResponse.data.data || 0);

        const doctorsResponse = await axios.get(
          "http://localhost:8080/ABC/api/v1/doctor",
          config
        );
        setDoctors(doctorsResponse.data.data);

        const testResponse = await axios.get(
          "http://localhost:8080/ABC/api/v1/test",
          config
        );
        console.log(testResponse.data.data);
        setTests(testResponse.data.data);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data: ", error);
        setCustomerCount(0);
        setOngoingAdsCount(0);
        setDoctors([]);
        setTests([]);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
              title="On Going Appointments"
              total={ongoingAdsCount}
              color="error"
              icon="ic:round-post-add"
            />
          </Grid>
        </Grid>
      </Container>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mt: 5, mb: 3 }}>
          Doctors
        </Typography>

        <Grid container spacing={3}>
          {doctors.map((doctor) => (
            <Grid item xs={12} sm={6} md={4} key={doctor.id}>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="div">
                    {doctor.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Specialty: {doctor.specialty}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Status:{" "}
                    <span
                      style={{
                        color: doctor.status === "ACTIVE" ? "green" : "red",
                      }}
                    >
                      {doctor.status}
                    </span>
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Divider sx={{ my: 3 }} />

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mt: 3, mb: 3 }}>
          Tests
        </Typography>

        <Grid container spacing={3}>
          {tests.map((test) => (
            <Grid item xs={12} sm={6} md={4} key={test.id}>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="div">
                    {test.name}
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
