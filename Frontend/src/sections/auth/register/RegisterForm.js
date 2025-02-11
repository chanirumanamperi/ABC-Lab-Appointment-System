import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import Swal from "sweetalert2";
// @mui
import {
  Link,
  Stack,
  IconButton,
  InputAdornment,
  TextField,
  Checkbox,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
// components
import Iconify from "../../../components/iconify";
import Config from "../../../Config";
import { database } from "../../../pages/FireBaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { db } from "../../../pages/FireBaseConfig2";
import { collection, addDoc } from "firebase/firestore";
import emailjs from "emailjs-com";

// ----------------------------------------------------------------------

export default function RegisterForm() {
  const config = new Config();

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);

  const isAbove18 = (dob) => {
    return calculateAge(dob) >= 18;
  };

  const calculateAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    const age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      return age - 1;
    }
    return age;
  };

  const usersCollectionRef = collection(db, "users");
  const audittraceCollectionRef = collection(db, "audittrace");

  const randomID = Math.floor(Math.random() * 1000000);

  const currentTime = new Date().toISOString();

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await fetch(config.baseUrl + "api/v1/register/patient", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: data.username,
          fullname: data.firstName,
          email: data.email,
          phoneNumber: data.phoneNumber,
          addressLine1: data.address,
          city: data.city,
          password: data.password,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        Swal.fire({
          icon: "success",
          title: "Register Success",
          text: "Check The Email To Activate The Account",
        });
        reset();
        reset({
          username: "",
          firstName: "",
          address: "",
          city: "",
          postalCode: "",
          phoneNumber: "",
          email: "",
          password: "",
        });
      } else {
        const errorData = await response.json();
        console.error("Error:", errorData);
        Swal.fire({
          icon: "error",
          title: "Register Failed",
          text: errorData.data,
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // const onSubmit = async (data) => {
  //   setIsLoading(true);

  //   try {

  //     const userCredential = await createUserWithEmailAndPassword(
  //       database,
  //       data.email,
  //       data.password
  //     );

  //     await addDoc(usersCollectionRef, {
  //       userID: `user${randomID}`,
  //       userName: data.firstName + " " + data.lastName,
  //       phoneNumber: data.phoneNumber,
  //       address: data.address,
  //       city: data.city,
  //       postalCode: data.postalCode,
  //       email:data.email,
  //       userType: "USER",
  //       status: "ACTIVE",
  //       flag:0,
  //       lastUpdateUser: data.firstName + " " + data.lastName,
  //       createTime: currentTime,
  //       lastUpdateTime: currentTime,
  //     });

  //     const userIP = "0.0.0.0";

  //     await addDoc(audittraceCollectionRef, {
  //       AUDITTRACEID: `trace${randomID}`,
  //       CREATEDTIME: currentTime,
  //       DESCRIPTION: "User registered",
  //       IP: userIP,
  //       LASTUPDATEDTIME: currentTime,
  //       LASTUPDATEDUSER: data.firstName + " " + data.lastName,
  //       EMAIL: data.email
  //     });

  //     // Display success alert
  //     Swal.fire({
  //       title: "Success!",
  //       text: "Registration successful!",
  //       icon: "success",
  //       confirmButtonText: "OK",
  //     });

  //     reset({
  //       username: '',
  //       firstName: '',
  //       address: '',
  //       city: '',
  //       postalCode: '',
  //       phoneNumber: '',
  //       email: '',
  //       password: ''
  //     });

  //   } catch (error) {
  //     console.error("Error in user creation:", error.message);

  //     // Check error code and display relevant message
  //     let errorMessage = "An error occurred during registration.";
  //     if (error.code === "auth/email-already-in-use") {
  //       errorMessage = "This email is already registered.";
  //     }

  //     // Display error alert
  //     Swal.fire({
  //       title: "Error!",
  //       text: errorMessage,
  //       icon: "error",
  //       confirmButtonText: "OK",
  //     });
  //   } finally {
  //     setIsLoading(false); // Set loading to false after submitting
  //   }
  // };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          <Controller
            name="username"
            control={control}
            rules={{ required: "User Name is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="User Name"
                error={Boolean(errors.username)}
                helperText={errors.username?.message}
              />
            )}
          />
          <Controller
            name="firstName"
            control={control}
            rules={{ required: "Full Name is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Full Name"
                error={Boolean(errors.firstName)}
                helperText={errors.firstName?.message}
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
                error={Boolean(errors.city)}
                helperText={errors.city?.message}
              />
            )}
          />
          <Controller
            name="phoneNumber"
            control={control}
            rules={{ required: "Phone Number is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Phone Number"
                error={Boolean(errors.phoneNumber)}
                helperText={errors.phoneNumber?.message}
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            rules={{
              required: "Email Address is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "Invalid email address",
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Email"
                error={Boolean(errors.email)}
                helperText={errors.email?.message}
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
                type={showPassword ? "text" : "password"}
                error={Boolean(errors.password)}
                helperText={errors.password?.message}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        <Iconify
                          icon={
                            showPassword ? "eva:eye-fill" : "eva:eye-off-fill"
                          }
                        />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
        </Stack>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ my: 2 }}
        ></Stack>

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isLoading}
        >
          Register
        </LoadingButton>
      </form>
    </>
  );
}
