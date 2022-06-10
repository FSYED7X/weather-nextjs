import { Box, TextField } from "@mui/material";
import { FastField } from "formik";
import React, { memo } from "react";
// import { INPUT_STYLES } from "../../../CONSTANTS/Styles";

function FormInput({ boxProps, name, label, placeholder, inputProps }) {
  return (
    <Box {...boxProps}>
      <FastField name={name}>
        {({
          field, // { name, value, onChange, onBlur }
          form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
          meta,
        }) => (
          <TextField
            {...{ name, label, placeholder }}
            variant={"outlined"}
            fullWidth
            {...field}
            // sx={INPUT_STYLES}
            {...inputProps}
            helperText={(meta.touched && meta.error) }
            error={meta.touched && meta.error}
            InputLabelProps={{ shrink: true }}
          />
        )}
      </FastField>
    </Box>
  );
}

export default memo(FormInput);
