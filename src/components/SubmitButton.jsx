import React from "react";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import Typography from "@mui/material/Typography";

const SubmitButton = ({ handleSubmit }) => {
  return (
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
  );
};

export default SubmitButton;
