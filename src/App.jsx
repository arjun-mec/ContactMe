import React, { useState } from "react";
import Box from "@mui/material/Box";
import Snackbar from "@mui/material/Snackbar";
import Form from "./components/Form";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from "@mui/material/IconButton";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

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
  const [darkMode, setDarkMode] = useState(false);

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

  const lightPalette = {
    mode: "light",
    primary: {
      main: "#4a148c",
    },
    secondary: {
      main: "#f48fb1",
    },
    background: {
      default: "#f5f5f5",
      paper: "#ffffff",
    },
    text: {
      primary: "#212121",
      secondary: "#757575",
    },
  };

  const darkPalette = {
    mode: "dark",
    primary: {
      main: "#9c27b0",
    },
    secondary: {
      main: "#f06292",
    },
    background: {
      default: "#212121",
      paper: "#303030",
    },
    text: {
      primary: "#e0e0e0",
      secondary: "#bdbdbd",
    },
  };

  const theme = createTheme({
    palette: darkMode ? darkPalette : lightPalette,
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="xs" sx={{ padding: "10px 10px" }}>
        <Paper
          elevation={5}
          square={false}
          sx={{ backgroundColor: "background.paper" }}
        >
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
              backgroundColor: "background.default",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h4"
                align="center"
                sx={{ fontFamily: '"Montserrat", sans-serif', fontWeight: 600 }}
              >
                Contact Me
              </Typography>
              <IconButton
                sx={{ ml: 1 }}
                onClick={() => setDarkMode(!darkMode)}
                color="inherit"
              >
                {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>
            </Box>
            <Form
              formData={formData}
              setFormData={setFormData}
              checkEmail={checkEmail}
              setCheckEmail={setCheckEmail}
              handleFormSubmit={handleSubmit}
            />
          </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};
export default App;
