import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import PersonIcon from "@mui/icons-material/Person";
import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import SendIcon from "@mui/icons-material/Send";
import InputAdornment from "@mui/material/InputAdornment";
import Snackbar from "@mui/material/Snackbar";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Checkbox from "@mui/material/Checkbox";

const App = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    message: "",
  });

  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setOpen(true);

    console.log(
      `First Name : ${formData.firstName} \nLast Name : ${formData.lastName} \nEmail : ${formData.email} \nPhone Number : ${formData.phoneNumber} \nMessage : ${formData.message}`
    );

    setEmail(false)
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      message: "",
    });

    if (email) {
      try {
        const response = await fetch('/.netlify/functions/sendEmail', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          console.error('Error submitting form:', response.statusText);
          alert('An error occurred while submitting the form.');
        }
        
      } catch (error) {
        console.error('Error submitting form:', error);
        alert('An error occurred while submitting the form.');
      }
    }
  };



const handleClose = (event, reason) => {
  if (reason === "clickaway") {
    return;
  }

  setOpen(false);
};

const handleChange = (event) => {
  setFormData({
    ...formData,
    [event.target.name]: event.target.value,
  });
};

return (
  <>
    <Snackbar
      open={open}
      autoHideDuration={5000}
      onClose={handleClose}
      message="Form submitted successfully"
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
    />
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{ height: "100%", padding: "10px 0px" }}
    >
      <Grid item>
        <Box
          component="div"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            padding: "30px",
            backgroundColor: "#F4F4F6",
            borderRadius: 4,
          }}
        >
          <Typography
            variant="h3"
            align="center"
            sx={{ fontFamily: '"Montserrat", sans-serif', fontWeight: 600 }}
          >
            Contact Me
          </Typography>

          <TextField
            required
            id="firstName"
            name="firstName"
            label="First name"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon />
                </InputAdornment>
              ),
            }}
            value={formData.firstName}
            onChange={handleChange}
          />

          <TextField
            id="lastName"
            name="lastName"
            label="Last name"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon />
                </InputAdornment>
              ),
            }}
            value={formData.lastName}
            onChange={handleChange}
          />

          <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label">
              Gender
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel
                value="male"
                control={<Radio />}
                label="Male"
              />
              <FormControlLabel
                value="other"
                control={<Radio />}
                label="Other"
              />
            </RadioGroup>
          </FormControl>

          <TextField
            required
            id="email"
            name="email"
            label="Email"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon />
                </InputAdornment>
              ),
            }}
            value={formData.email}
            onChange={handleChange}
          />

          <TextField
            required
            id="phoneNumber"
            name="phoneNumber"
            label="Phone number"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CallIcon />
                </InputAdornment>
              ),
            }}
            value={formData.phoneNumber}
            onChange={handleChange}
          />

          <TextField
            id="message"
            name="message"
            label="Message"
            multiline
            rows={4}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <ChatBubbleIcon />
                </InputAdornment>
              ),
            }}
            value={formData.message}
            onChange={handleChange}
          />
          <FormControlLabel
            value="email_check"
            control={<Checkbox checked={email} onChange={()=> {setEmail(!email)}} inputProps={{ 'aria-label': 'controlled' }}/>}
            label="Send response to your email ?"
            labelPlacement="end"
          />

          <Button
            endIcon={<SendIcon />}
            variant="contained"
            onClick={handleSubmit}
            sx={{ justifyContent: "center", alignItems: "center" }}
          >
            <Typography
              variant="h4"
              sx={{
                fontFamily: '"Montserrat", sans-serif',
                fontWeight: 600,
                fontSize: "20px",
                padding: "10px 0px",
              }}
            >
              Submit
            </Typography>
          </Button>
        </Box>
      </Grid>
    </Grid>
  </>
);
}
export default App;
