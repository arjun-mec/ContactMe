import React, { useState } from "react";
import Box from "@mui/material/Box";
import Snackbar from "@mui/material/Snackbar";
import Form from "./components/Form";
import SubmitButton from "./components/SubmitButton";
import Container from "@mui/material/Container";

const App = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    email: "",
    phoneNumber: "",
    message: "",
  });
  const [checkEmail, setCheckEmail] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setOpen(true);
    setCheckEmail(false);
    console.log(
      `First Name : ${formData.firstName} \nLast Name : ${formData.lastName} \nGender : ${formData.gender} \nEmail : ${formData.email} \nPhone Number : ${formData.phoneNumber} \nMessage : ${formData.message}`
    );

    setFormData({
      firstName: "",
      lastName: "",
      gender: "",
      email: "",
      phoneNumber: "",
      message: "",
    });

    if (checkEmail) {
      console.log(JSON.stringify(formData));
      try {
        const response = await fetch("/.netlify/functions/sendEmail", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          console.error("Error submitting form:", response.statusText);
          alert("An error occurred while submitting the form.");
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        alert("An error occurred while submitting the form.");
      }
    }
  };

  return (
    <Container maxWidth="xs">
      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
        message="Form submitted successfully"
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      />

      <Box
        component="div"
        justifyContent="center"
        alignItems="center"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          padding: "30px",
          backgroundColor: "#F4F4F6",
          borderRadius: 4,
          // maxWidth: "350px",
        }}
      >
        <Form
          formData={formData}
          setFormData={setFormData}
          checkEmail={checkEmail}
          setCheckEmail={setCheckEmail}
        />
        <SubmitButton handleSubmit={handleSubmit} />
      </Box>
    </Container>
  );
};
export default App;
