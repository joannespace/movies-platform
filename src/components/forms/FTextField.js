import { TextField } from "@mui/material";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

function FTextField({ name, label, ...other }) {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <TextField
          label={label}
          variant="filled"
          fullWidth
          error={!!error}
          helperText={error?.message}
          {...other}
          {...field}
        />
      )}
    />
  );
}

export default FTextField;
