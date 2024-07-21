import React, { useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Checkbox from "@mui/material/Checkbox";
import PersonIcon from "@mui/icons-material/Person";
import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import InputAdornment from "@mui/material/InputAdornment";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

const Form = ({ formData, setFormData, checkEmail, setCheckEmail }) => {
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <>
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
        <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>

        <RadioGroup
          row
          name="gender"
          value={formData.gender}
          onChange={handleChange}
        >
          <FormControlLabel value="Female" control={<Radio />} label="Female" />
          <FormControlLabel value="Male" control={<Radio />} label="Male" />
          <FormControlLabel value="Other" control={<Radio />} label="Other" />
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
        control={
          <Checkbox
            checked={checkEmail}
            onChange={() => {
              setCheckEmail(!checkEmail);
            }}
            inputProps={{ "aria-label": "controlled" }}
          />
        }
        label="Send response to your email ?"
        labelPlacement="end"
      />
    </>
  );
};

export default Form;
