import React from "react";
import { TextField, Typography } from "@mui/material";

const Input = ({ name, label, type, autoFocus, register, errors }) => {
  return (
    <div className="input" style={{ padding: "12px 0" }}>
      <TextField
        {...register(name)}
        error={errors[name] ? true : false}
        label={label}
        variant="outlined"
        required
        fullWidth
        autoFocus={autoFocus}
        type={type}
      />
      <Typography variant="inherit" color="secondary">
        {errors[name]?.message}
      </Typography>
    </div>
  );
};

export default Input;
