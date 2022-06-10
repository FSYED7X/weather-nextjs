import {
  Avatar,
  Chip,
  CircularProgress,
  Container,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { isEmpty, map, upperCase } from "lodash";
import Image from "next/image";
import React, { Children, createElement, Fragment } from "react";
import { BsDroplet, BsThermometerHalf, BsWind } from "react-icons/bs";
import { GiSpeedometer, GiWindpump, GiWindsock } from "react-icons/gi";
import { getWeatherIcon } from "../../utils";
import engine from "./engine";

function Results({
  lat,
  lon,
  weatherData,
  isLoading,
  city,
  state,
  country,
  display,
}) {
  // if (isEmpty(weatherData) && isLoading) {
  //   return (
  // <Stack py={5} display="flex" alignItems="center" justifyContent="center">
  //   <CircularProgress />
  // </Stack>
  //   );
  // }

  // if (!Boolean(lat && lon)) {
  //   return null;
  // }

  return {
    none: "",
    loading: (
      <Stack py={5} display="flex" alignItems="center" justifyContent="center">
        <CircularProgress />
      </Stack>
    ),
    true: (
      <Fragment>
        <Container sx={{ pt: 10 }}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent={"space-between"}
          >
            <Typography>
              {weatherData?.sys?.country}, {weatherData?.base}
            </Typography>

            <Stack direction="row" spacing={2} alignItems="center">
              <Chip
                label={upperCase(weatherData?.weather?.[0]?.description)}
                variant="outlined"
                color="primary"
                // size="small"
                sx={{ fontWeight: 600 }}
              />
              <Avatar sx={{ background: "#fff", border: "1px solid #ccc" }}>
                <Image
                  src={getWeatherIcon(weatherData?.weather?.[0]?.icon)}
                  alt=""
                  layout="fill"
                />
              </Avatar>
            </Stack>
          </Stack>

          <Grid container spacing={3} sx={{ pt: 2 }}>
            {Children.toArray(
              map(
                [
                  {
                    label: "Temperature",
                    icon: BsThermometerHalf,
                    value: weatherData?.main?.temp,
                    unit: "K",
                  },
                  {
                    label: "Pressure",
                    icon: GiSpeedometer,
                    value: weatherData?.main?.pressure,
                    unit: "hPa",
                  },
                  {
                    label: "Humidity",
                    icon: BsDroplet,
                    value: weatherData?.main?.humidity,
                    unit: "%",
                  },
                  {
                    label: "Wind Speed",
                    icon: GiWindpump,
                    value: weatherData?.wind?.speed,
                    unit: "mph",
                  },
                  {
                    label: "Wind Deg",
                    icon: GiWindsock,
                    value: weatherData?.wind?.deg,
                    unit: "°",
                  },
                  {
                    label: "Wind Gust",
                    icon: BsWind,
                    value: weatherData?.wind?.gust,
                    unit: "m/s",
                  },
                ],
                ({ label, value, icon, unit }) => {
                  return (
                    <Grid item xs={4}>
                      <Paper
                        elevation={0}
                        sx={{
                          borderRadius: 3,
                          px: 3,
                          py: 2,
                          border: "2px dashed #d9d9d9",
                        }}
                      >
                        <Typography
                          variant="h4"
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                          color="GrayText"
                        >
                          {createElement(icon, {})}
                          {value} {unit}
                          {/* {`${value} ${unit}`} */}
                        </Typography>
                        <Typography
                          variant="body2"
                          align="right"
                          textTransform={"uppercase"}
                          color="CaptionText"
                        >
                          {label}
                        </Typography>
                      </Paper>
                    </Grid>
                  );
                }
              )
            )}
          </Grid>
        </Container>
      </Fragment>
    ),
  }[display];

  // return (

  // );
}

export default engine(Results);
