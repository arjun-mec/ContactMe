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

import SubmitButton from "./SubmitButton";

const Form = ({
  formData,
  setFormData,
  checkEmail,
  setCheckEmail,
  handleFormSubmit,
}) => {
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });

    setErrors({ ...errors, [event.target.name]: false });
  };

  const validateForm = () => {
    const newErrors = {};

    if (formData.firstName.trim() === "") {
      newErrors.firstName = true;
    }
    if (formData.email.trim() === "") {
      newErrors.email = true;
    }
    if (formData.message.trim() === "") {
      newErrors.message = true;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      handleFormSubmit(event);
    }
  };

  return (
    <>
      <TextField
        fullWidth
        required
        id="firstName"
        name="firstName"
        label="First name"
        error={errors.firstName}
        helperText={errors.firstName && "First name is required"}
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
        fullWidth
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

      <FormControl fullWidth sx={{ alignItems: "center" }}>
        <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>

        <RadioGroup
          row
          name="gender"
          value={formData.gender}
          onChange={handleChange}
        >
          <FormControlLabel value="Male" control={<Radio />} label="Male" />
          <FormControlLabel value="Female" control={<Radio />} label="Female" />
          <FormControlLabel value="Other" control={<Radio />} label="Other" />
        </RadioGroup>
      </FormControl>

      <TextField
        fullWidth
        required
        id="email"
        name="email"
        label="Email"
        error={errors.email}
        helperText={errors.email && "Email is required"}
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
        fullWidth
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
        required
        fullWidth
        id="message"
        name="message"
        label="Message"
        multiline
        rows={3}
        error={errors.message}
        helperText={errors.message && "Message is required"}
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

      <SubmitButton handleSubmit={handleSubmit} />
    </>
  );
};

export default Form;
