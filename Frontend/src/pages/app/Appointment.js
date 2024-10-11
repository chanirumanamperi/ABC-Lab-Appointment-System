import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import { CloudDownload } from "@mui/icons-material";
import DateTimePicker from 'react-datetime-picker';

export default function Appointment() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const config = {
          headers: { Authorization: `Bearer ${token}` },
          params: { systemid: sessionStorage.getItem("systemid") },
        };
        const response = await axios.get(
          "http://localhost:8080/ABC/api/v1/appointment",
          config
        );
        setAppointments(response.data.data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };
    fetchAppointments();
  }, []);

  const a = "http://localhost:3000/index.html";

  const handleDownload = async (filePath) => {
    const fileName = filePath.split("/").pop();
    const aTag = document.createElement("a");
    aTag.href = filePath;
    aTag.setAttribute("download", fileName);
    document.body.appendChild(aTag);
    aTag.click();
    aTag.remove();
  };

  return (
    <TableContainer component={Paper} sx={{ border: "1px solid #ddd" }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Appointment Time</TableCell>
            <TableCell>Test Name</TableCell>
            <TableCell>Doctor Name</TableCell>
            <TableCell>Technician Contact</TableCell>
            <TableCell>Result</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {appointments.map((appointment) => (
            <TableRow
              key={appointment.id}
              style={{
                backgroundColor: appointment.result ? "lightgreen" : "white",
              }}
            >
              <TableCell>
                {new Date(appointment.dateTime).toLocaleString()}
              </TableCell>
              <TableCell>{appointment.test.name}</TableCell>
              <TableCell>{appointment.test.doctor.name}</TableCell>
              <TableCell>{appointment.test.technician.contact}</TableCell>
              <TableCell>
                {appointment.result ? (
                  <IconButton
                    onClick={() => handleDownload(appointment.result)}
                    disabled={!appointment.result}
                  >
                    <CloudDownload />
                  </IconButton>
                ) : (
                  "No result"
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
