import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Stack,
  TextField,
  MenuItem, // Import MenuItem for dropdown list
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import Swal from "sweetalert2";
import { db } from "../FireBaseConfig2";
import { collection, addDoc } from "firebase/firestore";
import Config from "../../Config";

// Define common specialist options
const commonSpecialists = [
  "Cardiologist",
  "Dermatologist",
  "Endocrinologist",
  "Gastroenterologist",
  "Neurologist",
  "Oncologist",
  "Pediatrician",
  "Psychiatrist",
  "Rheumatologist",
  "Urologist",
];

export default function AddDocForm({ onClose }) {
  const config = new Config();

  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await fetch(config.baseUrl + "api/v1/register/doctor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: data.username,
          fullname: data.fullname,
          email: data.email,
          phoneNumber: data.phoneNumber,
          addressLine1: data.address,
          city: data.city,
          password: data.password,
          specialty: data.specialist,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        Swal.fire({
          icon: "success",
          title: "Doctor added successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        reset();
        onClose();
      } else {
        const errorData = await response.json();
        console.error("Error:", errorData);
        Swal.fire({
          icon: "error",
          title: "Failed to add Doctor",
          text: errorData.message,
        });
      }
    } catch (error) {
      console.error("Error adding Doctor: ", error);
      Swal.fire({
        icon: "error",
        title: "Failed to add Doctor",
        text: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <DialogTitle>Add Doctor</DialogTitle>
      <DialogContent>
        <Stack spacing={2}>
          <Controller
            name="username"
            control={control}
            rules={{ required: "Username is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Username"
                fullWidth
                error={Boolean(errors.username)}
                helperText={errors.username?.message}
              />
            )}
          />
          {/* Other form fields */}
          <Controller
            name="specialist"
            control={control}
            rules={{ required: "Specialist is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                select
                label="Specialist"
                fullWidth
                error={Boolean(errors.specialist)}
                helperText={errors.specialist?.message}
              >
                {commonSpecialists.map((specialist) => (
                  <MenuItem key={specialist} value={specialist}>
                    {specialist}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
          <Controller
            name="fullname"
            control={control}
            rules={{ required: "Fullname is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="fullname"
                fullWidth
                error={Boolean(errors.fullname)}
                helperText={errors.fullname?.message}
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            rules={{
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "Invalid email address",
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Email"
                fullWidth
                error={Boolean(errors.email)}
                helperText={errors.email?.message}
              />
            )}
          />
          <Controller
            name="phoneNumber"
            control={control}
            rules={{ required: "Phone number is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Phone Number"
                fullWidth
                error={Boolean(errors.phoneNumber)}
                helperText={errors.phoneNumber?.message}
              />
            )}
          />
          <Controller
            name="address"
            control={control}
            rules={{ required: "Address is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Address"
                fullWidth
                error={Boolean(errors.address)}
                helperText={errors.address?.message}
              />
            )}
          />
          <Controller
            name="city"
            control={control}
            rules={{ required: "City is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="City"
                fullWidth
                error={Boolean(errors.city)}
                helperText={errors.city?.message}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            rules={{ required: "Password is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Password"
                type="password"
                fullWidth
                error={Boolean(errors.password)}
                helperText={errors.password?.message}
              />
            )}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Adding..." : "Add"}
        </Button>
      </DialogActions>
    </form>
  );
}
