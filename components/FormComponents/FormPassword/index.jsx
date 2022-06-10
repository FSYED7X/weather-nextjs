// import { VisibilityOffRounded, VisibilityRounded } from "@mui/icons-material";
import { Box, IconButton, InputAdornment, TextField } from "@mui/material";
import { Field } from "formik";
import { repeat } from "lodash";
import React, { memo, useState } from "react";
// import { INPUT_STYLES } from "../../../CONSTANTS/Styles";

import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
function FormInput({ boxProps, name, label, placeholder, inputProps }) {
  const [show, setShow] = useState(false);
  return (
    <Box {...boxProps}>
      <Field name={name}>
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
            helperText={meta.touched && meta.error}
            error={meta.touched && meta.error}
            InputLabelProps={{ shrink: true }}
            type={show ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShow(!show)} tabIndex={-1}>
                    {show ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            placeholder={repeat("✱", 10)}
          />
        )}
      </Field>
    </Box>
  );
}

export default memo(FormInput);
