import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../pages/FireBaseConfig2";
import { Avatar, Button, Typography, Paper, Grid } from "@mui/material";
import UserImage from "../../../images/assets/images/avatars/avatar_4.jpg";
import axios from "axios";

Modal.setAppElement("#root");

function UserProfile({ isModalOpen, handleCloseModal, userEmail }) {
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const config = {
          headers: { Authorization: `Bearer ${token}` },
          params: { email: sessionStorage.getItem("email") },
        };

        const response = await axios.get(
          "http://localhost:8080/ABC/api/v1/register/profile",
          config
        );
        console.log(response.data.data);
        setUser(response.data.data[0]);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, [userEmail]);

  const userDetails = [
    { label: "User ID", value: user.systemid },
    { label: "Name", value: user.fullname },
    { label: "City", value: user.city },
    { label: "Address", value: user.addressLine1 },
    { label: "Phone Number", value: user.phoneNumber },
    { label: "Email", value: user.email },
    { label: "Status", value: user.status },
  ];

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={handleCloseModal}
      contentLabel="User Profile"
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        },
        content: {
          maxWidth: "600px",
          margin: "auto",
          padding: "60px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderRadius: "8px",
        },
      }}
    >
      <Paper
        elevation={3}
        style={{ padding: "20px", width: "100%", textAlign: "center" }}
      >
        {/* Add Avatar here */}
        <Avatar
          src={UserImage}
          alt={user.userName}
          style={{ width: "80px", height: "80px", margin: "0 auto 20px" }}
        />

        <Typography variant="h5" gutterBottom>
          User Profile
        </Typography>

        <Grid container spacing={2}>
          {userDetails.map(({ label, value }) => (
            <Grid item xs={12} key={label}>
              <Typography>
                <strong>{label}:</strong> {value}
              </Typography>
            </Grid>
          ))}
        </Grid>

        <Button
          variant="contained"
          color="primary"
          onClick={handleCloseModal}
          style={{ marginTop: "20px" }}
        >
          Close
        </Button>
      </Paper>
    </Modal>
  );
}

export default UserProfile;
