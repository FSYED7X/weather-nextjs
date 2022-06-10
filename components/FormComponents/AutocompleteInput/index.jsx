import { Autocomplete, TextField } from "@mui/material";
import { produceWithPatches } from "immer";
import { uniqueId } from "lodash";
import React from "react";

export default function AutocompleteInput({
  value,
  setValue,
  options = [],
  label,
  ...props
}) {
  return (
    <Autocomplete
      id={uniqueId()}
      {...{ value, options }}
      autoHighlight
      getOptionLabel={(option) => option?.name || ""}
      openOnFocus={true}
      onChange={(event, newValue) => {
        setValue?.(newValue);
      }}
      {...props}
      renderInput={(params) => (
        <TextField
          {...params}
          {...{ label }}
          inputProps={{
            ...params.inputProps,
            autoComplete: "new-password", // disable autocomplete and autofill
          }}
        />
      )}
    />
  );
}
