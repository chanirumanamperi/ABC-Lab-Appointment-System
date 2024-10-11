import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Container,
  CardActions,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
} from "@mui/material";
import axios from "axios";
import Swal from "sweetalert2";

export default function TestPage() {
  const [testData, setTestData] = useState([]);
  const [open, setOpen] = useState(false);
  const [newTest, setNewTest] = useState({
    name: "",
    description: "",
    cost: "",
    technicianId: "",
    doctorId: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const config = {
          headers: { Authorization: `Bearer ${token}` },
          params: { systemid: "11" },
        };
        const response = await axios.get(
          "http://localhost:8080/ABC/api/v1/test",
          config
        );
        if (response.data.code === "200") {
          setTestData(response.data.data);
        } else {
          console.error("Error fetching data: ", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTest((prevTest) => ({
      ...prevTest,
      [name]: value,
    }));
  };

  const handleAddTest = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const response = await axios.post(
        "http://localhost:8080/ABC/api/v1/test/create",
        {
          name: newTest.name,
          description: newTest.description,
          cost: newTest.cost,
          technicianDTO: {
            id: newTest.technicianId,
          },
          doctorDTO: {
            id: newTest.doctorId,
          },
        },
        config
      );
      if (response.data.code === "200") {
        // setTestData([...testData, response.data.data]);
        const fetchData = async () => {
          try {
            const token = sessionStorage.getItem("token");
            const config = {
              headers: { Authorization: `Bearer ${token}` },
              params: { systemid: "11" },
            };
            const response = await axios.get(
              "http://localhost:8080/ABC/api/v1/test",
              config
            );
            if (response.data.code === "200") {
              setTestData(response.data.data);
            } else {
              console.error("Error fetching data: ", response.data.message);
            }
          } catch (error) {
            console.error("Error fetching data: ", error);
          }
        };
        fetchData();
        setOpen(false);
        Swal.fire({
          icon: "success",
          title: "Test added successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        setNewTest({
          name: "",
          description: "",
          cost: "",
          technicianId: "",
          doctorId: "",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: response.data.message,
        });
      }
    } catch (error) {
      console.error("Error adding test: ", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to add test. Please try again later.",
      });
    }
  };

  return (
    <Container>
      <Grid item xs={12} sm={6} md={4}>
        <Card variant="outlined">
          <CardContent>
            <Button fullWidth onClick={() => setOpen(true)}>
              Add Test
            </Button>
          </CardContent>
        </Card>
      </Grid>
      <Grid container spacing={2}>
        {testData.map((test) => (
          <Grid item key={test.id} xs={12} sm={6} md={4}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Test ID: {test.id}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  Name: {test.name}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Description: {test.description}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Cost: {test.cost}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Technician: {test.technician ? test.technician.name : "N/A"}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Technician Contact:{" "}
                  {test.technician ? test.technician.contact : "N/A"}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Doctor: {test.doctor ? test.doctor.name : "N/A"}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Specialty: {test.doctor ? test.doctor.specialty : "N/A"}
                </Typography>
                <br></br>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  style={{
                    color: test.status === "ACTIVE" ? "green" : "red",
                  }}
                >
                  {test.status}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Edit</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add Test</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            name="name"
            value={newTest.name}
            onChange={handleInputChange}
          />
          <TextField
            label="Description"
            name="description"
            value={newTest.description}
            onChange={handleInputChange}
          />
          <TextField
            label="Cost"
            name="cost"
            value={newTest.cost}
            onChange={handleInputChange}
          />
          <TextField
            label="Technician ID"
            name="technicianId"
            value={newTest.technicianId}
            onChange={handleInputChange}
          />
          <TextField
            label="Doctor ID"
            name="doctorId"
            value={newTest.doctorId}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddTest}>Add</Button>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
