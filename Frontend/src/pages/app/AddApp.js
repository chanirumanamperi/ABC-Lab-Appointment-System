import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import LoadingImage from "../../images/assets/images/loading.gif";
import Card from "react-credit-cards";
import "./styless.css";
import Swal from "sweetalert2";

import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate,
} from "./utils";
import "react-credit-cards/es/styles-compiled.css";

import {
  Stack,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Button,
  Card as MuiCard,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import axios from "axios";

export default function AddApp() {
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
  } = useForm();

  const [number, setNumber] = useState("");
  const [name, setName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [issuer, setIssuer] = useState("");
  const [focused, setFocused] = useState("");
  const [formData, setFormData] = useState(null);

  const [paymentState, setPaymentState] = useState({
    number: "",
    name: "",
    expiry: "",
    cvc: "",
    issuer: "",
    focused: "",
    formData: null,
  });

  const handleCallback = ({ issuer }, isValid) => {
    if (isValid) {
      setIssuer(issuer);
    }
  };

  const handleInputFocus = ({ target }) => {
    setFocused(target.name);
  };

  const handleInputChange = ({ target }) => {
    let value = target.value;

    if (target.name === "number") {
      value = formatCreditCardNumber(value);
      setNumber(value);
    } else if (target.name === "expiry") {
      value = formatExpirationDate(value);
      setExpiry(value);
    } else if (target.name === "cvc") {
      value = formatCVC(value);
      setCvc(value);
    } else if (target.name === "name") {
      setName(value);
    }
  };

  const handleSubmit1 = async (e) => {
    e.preventDefault();
    try {
      const token = sessionStorage.getItem("token");
      const appointmentData = {
        patientDTO: {
          id: systemid, // Replace with actual patient ID
        },
        testDTO: {
          id: selectedTest.id, // Assuming selectedTest is defined and has an id
          cost: cost,
        },
        dateTime: dateTime,
      };
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const response = await axios.post(
        "http://localhost:8080/ABC/api/v1/appointment/add",
        appointmentData,
        config
      );
      console.log("Appointment added:", response.data);
      setNumber("");
      setName("");
      setExpiry("");
      setCvc("");
      setIssuer("");
      Swal.fire({
        icon: "success",
        title: "Appointment Confirmed",
        text: "Your appointment has been successfully scheduled.",
      });
      setShowPaymentModal(false);
      reset(); // Reset the form
      setSelectedTest(null); // Reset selected test
      setDateTime([]); // Reset date and time
      reset({
        dateTime: "",
      });
    } catch (error) {
      console.error("Error processing payment:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to schedule appointment. Please try again.",
      });
    }
  };

  const [tests, setTests] = useState([]);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const [selectedTest, setSelectedTest] = useState(null);
  const systemid = sessionStorage.getItem("systemid");
  const [cost, setCost] = useState(0);
  const [dateTime, setDateTime] = useState([]);

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const config = {
          headers: { Authorization: `Bearer ${token}` },
          params: { systemid: systemid },
        };
        const response = await axios.get(
          "http://localhost:8080/ABC/api/v1/test",
          config
        );
        setTests(response.data.data);
      } catch (error) {
        console.error("Error fetching tests:", error);
      }
    };
    fetchTests();
  }, [systemid]);

  const handleTestSelect = (testId) => {
    const selectedTest = tests.find((test) => test.id === testId);
    setSelectedTest(selectedTest);
    setValue("cost", selectedTest.cost);
    setCost(selectedTest.cost);
  };

  const onSubmit = (data) => {
    console.log(data); // Replace with your submission logic
    setDateTime(data.dateTime);
    setShowPaymentModal(true);
  };

  const handlePayment = async (data) => {
    console.log("Payment successful:");
    // try {
    //   console.log("Payment successful:", data);
    //   const token = sessionStorage.getItem("token");
    //   const appointmentData = {
    //     patientDTO: {
    //       id: systemid, // Replace with actual patient ID
    //     },
    //     testDTO: {
    //       id: selectedTest.id, // Assuming selectedTest is defined and has an id
    //     },
    //     dateTime: data.dateTime,
    //   };
    //   const config = {
    //     headers: { Authorization: `Bearer ${token}` },
    //   };
    //   const response = await axios.post(
    //     "http://localhost:8080/ABC/api/v1/appointment/add",
    //     appointmentData,
    //     config
    //   );
    //   console.log("Appointment added:", response.data);
    // } catch (error) {
    //   console.error("Error processing payment:", error);
    // }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          <TextField
            label="Patient ID"
            value={systemid}
            InputProps={{
              readOnly: true,
            }}
          />
          <FormControl fullWidth>
            <InputLabel>Select Test</InputLabel>
            <Select
              value={selectedTest ? selectedTest.id : ""}
              onChange={(e) => handleTestSelect(e.target.value)}
            >
              {tests.map((test) => (
                <MenuItem key={test.id} value={test.id}>
                  {test.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {selectedTest && (
            <MuiCard className="test-card">
              <CardContent className="test-card-content">
                <h2>{selectedTest.name}</h2>
                <p>Description: {selectedTest.description}</p>
                <p>Doctor: {selectedTest.doctor.name}</p>
                <p>Specialty: {selectedTest.doctor.specialty}</p>
                <p>Technician: {selectedTest.technician.name}</p>
                <p style={{ color: "red" }}>Cost: {selectedTest.cost}</p>
              </CardContent>
            </MuiCard>
          )}
          <Controller
            name="dateTime"
            control={control}
            rules={{ required: "Date and Time is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Date and Time"
                type="datetime-local"
                error={Boolean(errors.dateTime)}
                helperText={errors.dateTime?.message}
              />
            )}
          />
        </Stack>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "20px",
          }}
        >
          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
          >
            Submit
          </LoadingButton>
        </div>
      </form>
      <Dialog
        open={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
      >
        <div key="Payment">
          <div className="App-payment">
            <h1>Enter your payment details</h1>
            <h4>please input your information below</h4>
            <Card
              number={number}
              name={name}
              expiry={expiry}
              cvc={cvc}
              focused={focused}
              callback={handleCallback}
            />
            <form onSubmit={handleSubmit1}>
              <div className="form-group">
                <small>Name on card:</small>

                <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="Name"
                  pattern="[a-z A-Z-]+"
                  required
                  value={name}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                />
              </div>
              <div className="form-group">
                <small>Card Number:</small>

                <input
                  type="tel"
                  name="number"
                  className="form-control"
                  placeholder="Card Number"
                  pattern="[\d| ]{16,22}"
                  maxLength="19"
                  required
                  value={number}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                />
              </div>

              <div className="form-group">
                <small>Expiration Date:</small>

                <input
                  type="tel"
                  name="expiry"
                  className="form-control"
                  placeholder="Valid Thru"
                  pattern="\d\d/\d\d"
                  required
                  value={expiry}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                />
              </div>
              <div className="form-group">
                <small>CVC:</small>

                <input
                  type="tel"
                  name="cvc"
                  className="form-control"
                  placeholder="CVC"
                  pattern="\d{3}"
                  required
                  value={cvc}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                />
              </div>
              <input type="hidden" name="issuer" value={issuer} />
              <div className="form-actions">
                <button>Submit</button>
              </div>
            </form>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
