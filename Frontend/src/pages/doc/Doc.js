import React, { useEffect, useState } from "react";
import {
  Card,
  Table,
  Stack,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  TableHead,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TableSortLabel,
} from "@mui/material";
import { sentenceCase } from "change-case";
import { Helmet } from "react-helmet-async";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../FireBaseConfig2";
import axios from "axios";
import Swal from "sweetalert2";
import AddDocForm from "./AddDocForm";

const TABLE_HEAD = [
  { id: "id", label: "User ID" },
  { id: "username", label: "User Name" },
  { id: "email", label: "Email" },
  { id: "phoneNumber", label: "Phone Number" },
  { id: "addressLine1", label: "Address" },
  { id: "city", label: "City" },
  { id: "status", label: "Status" },
  { id: "createdtime", label: "Create Time" },
  { id: "lastupdatedtime", label: "Last Update" },
];

export default function Doc() {
  const [patients, setPatients] = useState([]);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("userName");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isAddTechnicianDialogOpen, setIsAddTechnicianDialogOpen] =
    useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [technicians, setTechnicians] = useState([]);

  const handleClose = () => {
    setDialogOpen(false);
    const fetchData = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const config = {
          headers: { Authorization: `Bearer ${token}` },
          params: { userrole: "DOCTOR" },
        };
        const response = await axios.get(
          "http://localhost:8080/ABC/api/v1/register/user",
          config
        );
        if (response.data.code === "200") {
          const patientsData = response.data.data.map((patient) => ({
            ...patient,
            createdtime: new Date(patient.createdtime).toLocaleString(),
            lastupdatedtime: new Date(patient.lastupdatedtime).toLocaleString(),
          }));
          setPatients(patientsData);
        } else {
          console.error("Error fetching data: ", response.data.message);
          setPatients([]);
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
        setPatients([]);
      }
    };
    fetchData();
  };

  const handleOpen = () => {
    setDialogOpen(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const config = {
          headers: { Authorization: `Bearer ${token}` },
          params: { userrole: "DOCTOR" },
        };
        const response = await axios.get(
          "http://localhost:8080/ABC/api/v1/register/user",
          config
        );
        console.log("111" + response.data.code);
        if (response.data.code === "200") {
          const patientsData = response.data.data.map((patient) => ({
            ...patient,
            createdtime: new Date(patient.createdtime).toLocaleString(),
            lastupdatedtime: new Date(patient.lastupdatedtime).toLocaleString(),
          }));
          setPatients(patientsData);
        } else {
          console.error("Error fetching data: ", response.data.message);
          setPatients([]);
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
        setPatients([]);
      }
    };
    fetchData();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleStatusChange = async (userId, currentStatus) => {
    const newStatus = currentStatus === "ACTIVE" ? "DEACTIVE" : "ACTIVE";

    const result = await Swal.fire({
      title: `Do you want to ${newStatus.toLowerCase()} this user?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: `Yes, ${newStatus.toLowerCase()} it`,
      cancelButtonText: "No, keep it",
    });

    if (result.isConfirmed) {
      try {
        const token = sessionStorage.getItem("token");
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };
        const response = await axios.put(
          "http://localhost:8080/ABC/api/v1/register/updateStatus",
          {
            id: userId,
            status: newStatus,
          },
          config
        );

        console.log(response);
        console.log(response.data.code);
        if (response.data.code == 200) {
          // Update the status in the local state
          const updatedPatients = patients.map((patient) =>
            patient.id === userId ? { ...patient, status: newStatus } : patient
          );
          setPatients(updatedPatients);

          // Show success message
          Swal.fire(`${newStatus}d!`, "", "success");
        } else {
          // Show error message
          Swal.fire("Failed to update status", response.data.message, "error");
        }
      } catch (error) {
        console.error("Error updating status: ", error);
        // Show error message
        Swal.fire("Failed to update status", error.message, "error");
      }
    }
  };

  const handleAddTechnician = () => {
    setIsAddTechnicianDialogOpen(true);
  };

  const handleCloseAddTechnicianDialog = () => {
    setIsAddTechnicianDialogOpen(false);
    handleClose(); // Call the onClose function from Techicianspage
  };
  return (
    <>
      <Helmet>
        <title>Doctor | YourApp</title>
      </Helmet>
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Doctors
          </Typography>
          <Button variant="contained" onClick={handleAddTechnician}>
            Add Doctor
          </Button>
        </Stack>

        <Card>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  {TABLE_HEAD.map((headCell) => (
                    <TableCell key={headCell.id}>{headCell.label}</TableCell>
                  ))}
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {patients.map((patient) => (
                  <TableRow key={patient.id}>
                    {TABLE_HEAD.map((headCell) => (
                      <TableCell key={headCell.id}>
                        {headCell.id === "status" ? (
                          <Typography
                            style={{
                              fontWeight: "bold",
                              color:
                                patient[headCell.id] === "ACTIVE"
                                  ? "green"
                                  : "red",
                            }}
                          >
                            {sentenceCase(patient[headCell.id])}
                          </Typography>
                        ) : headCell.id === "userType" ? (
                          <Typography
                            style={{
                              fontWeight: "bold",
                              color: "blue",
                            }}
                          >
                            {sentenceCase(patient[headCell.id])}
                          </Typography>
                        ) : (
                          patient[headCell.id]
                        )}
                      </TableCell>
                    ))}
                    <TableCell>
                      <button
                        onClick={() =>
                          handleStatusChange(patient.id, patient.status)
                        }
                      >
                        {patient.status === "ACTIVE" ? "DEACTIVE" : "ACTIVE"}
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={patients.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
        <Dialog
          open={isAddTechnicianDialogOpen}
          onClose={handleCloseAddTechnicianDialog}
        >
          <DialogContent>
            <AddDocForm onClose={handleCloseAddTechnicianDialog} />
          </DialogContent>
        </Dialog>
      </Container>
    </>
  );
}
