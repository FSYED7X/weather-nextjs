import { Alert, Avatar, Grid } from "@mui/material";
import { Box } from "@mui/system";
import { find, isEmpty, map, omit } from "lodash";
import React, { Fragment } from "react";
import Fade from "react-reveal/Fade";
import useDataStore from "../../store/useDataStore";
import useOptionsStore from "../../store/useOptionsStore";
import { getFlag } from "../../utils";
import { AutocompleteInput } from "../FormComponents";
import engine from "./engine";
import Image from "next/image";

function CountryStateCity() {
  const { country, state, city, setData } = useDataStore();
  const { options } = useOptionsStore();

  return (
    <Fragment>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          "&:before, &:after": {
            content: '""',
            flex: "1 1",
            borderBottom: "2px dashed #ccc",
            margin: "auto",
          },
          "&:before": { marginRight: "10px" },
          "&:after": { marginLeft: "10px" },
          "& img": {
            border: "1px solid #ccc!important",
          },
        }}
      >
        <Image src={getFlag(country?.iso2)} alt="" height={44} width={70} />
      </Box>

      <Box p={3}>
        <Fade bottom>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={4}>
              <AutocompleteInput
                value={country || ""}
                setValue={(val) => setData("country", val)}
                options={map(options, (option) => omit(option, ["states"]))}
                label="Select Country"
              />
            </Grid>

            {!isEmpty(find(options, { iso2: country?.iso2 })?.states) && (
              <Grid
                item
                xs={4}
              >
                <AutocompleteInput
                  value={state || ""}
                  setValue={(val) => setData("state", val)}
                  options={map(
                    find(options, { iso2: country?.iso2 })?.states,
                    (option) => omit(option, ["cities"])
                  )}
                  label="Select State"
                />
              </Grid>
            )}

            {!isEmpty(
              find(find(options, { iso2: country?.iso2 })?.states, {
                name: state?.name,
              })?.cities
            ) && (
              <Grid
                item
                xs={4}
              >
                <AutocompleteInput
                  value={city || ""}
                  setValue={(val) => setData("city", val)}
                  options={
                    find(find(options, { iso2: country?.iso2 })?.states, {
                      name: state?.name,
                    })?.cities
                  }
                  label="Select City"
                />
              </Grid>
            )}

            {/* {isEmpty(find(options, { iso2: country?.iso2 })?.states) && (
              <Grid item hidden={state}>
                <Alert severity="error">
                  Selected country is an island with no states!
                  &nbsp;&nbsp;&nbsp;
                </Alert>
              </Grid>
            )}

            {!isEmpty(find(options, { iso2: country?.iso2 })?.states) &&
              isEmpty(
                find(find(options, { iso2: country?.iso2 })?.states, {
                  name: state?.name,
                })?.cities
              ) && (
                <Grid item hidden={state && city}>
                  <Alert severity="error">
                    No cities found! &nbsp;&nbsp;&nbsp;
                  </Alert>
                </Grid>
              )} */}
          </Grid>
        </Fade>
      </Box>
    </Fragment>
  );
}

export default engine(CountryStateCity);
