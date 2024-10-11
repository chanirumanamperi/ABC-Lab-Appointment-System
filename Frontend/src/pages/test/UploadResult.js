import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import {
  Container,
  Typography,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  Button,
} from "@mui/material";
import { UploadFile } from "@mui/icons-material";
import axios from "axios";
import { makeStyles } from "@mui/styles";
import Swal from "sweetalert2";

const useStyles = makeStyles({
  greenRow: {
    backgroundColor: "#c8e6c9", // Green color
  },
});

// ...imports

export default function UploadResult() {
  const [appointments, setAppointments] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    const fetchData = async () => {
      const token = sessionStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
        params: { username: sessionStorage.getItem("name") },
      };
      try {
        const response = await axios.get(
          "http://localhost:8080/ABC/api/v1/appointment/allappointment",
          config
        );
        if (response.data.code === "200") {
          setAppointments(response.data.data);
        } else {
          console.error("Error fetching data: ", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  const handleFileUpload = async (appointmentId) => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "application/pdf";
    fileInput.addEventListener("change", async () => {
      const file = fileInput.files[0];
      const formData = new FormData();
      formData.append("resource", file);
      formData.append("appointmentId", appointmentId);
      try {
        const token = sessionStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        };
        const response = await axios.post(
          "http://localhost:8080/ABC/api/v1/appointment/upload",
          formData,
          config
        );
        console.log("File uploaded successfully:", response.data);
        // Show success message using SweetAlert
        Swal.fire({
          icon: "success",
          title: "File Uploaded",
          text: "The file has been uploaded successfully",
        });
        // Assuming the response contains the file URL
        const fileUrl = response.data.fileUrl;
        // Update the appointments state to include the file URL
        setAppointments((prevAppointments) =>
          prevAppointments.map((appointment) =>
            appointment.id === appointmentId
              ? { ...appointment, result: fileUrl }
              : appointment
          )
        );
      } catch (error) {
        console.error("Error uploading file:", error);
        // Show error message using SweetAlert
        Swal.fire({
          icon: "error",
          title: "Upload Failed",
          text: "An error occurred while uploading the file",
        });
      } finally {
        // Remove the file input from the DOM
        fileInput.remove();
      }
    });
    fileInput.click();
  };

  return (
    <>
      <Helmet>
        <title>Upload Result | Your App</title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Upload Result
        </Typography>

        <TableContainer sx={{ border: "1px solid #ddd" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Patient ID</TableCell>
                <TableCell>Patient Name</TableCell>
                <TableCell>Test Name</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Result</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {appointments.map((appointment) => (
                <TableRow
                  key={appointment.id}
                  className={appointment.result ? classes.greenRow : ""}
                >
                  <TableCell>{appointment.id}</TableCell>
                  <TableCell>{appointment.patient.id}</TableCell>
                  <TableCell>{appointment.patient.name}</TableCell>
                  <TableCell>{appointment.test.name}</TableCell>
                  <TableCell>
                    {new Date(appointment.dateTime).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {appointment.result ? (
                      <IconButton disabled>
                        <UploadFile />
                      </IconButton>
                    ) : (
                      <IconButton
                        onClick={() => handleFileUpload(appointment.id)}
                      >
                        <UploadFile />
                      </IconButton>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
}
