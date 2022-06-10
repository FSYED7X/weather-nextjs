import {
  AppBar,
  Avatar,
  Button,
  LinearProgress,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Stack,
  Toolbar,
} from "@mui/material";
import { Container } from "@mui/system";
import axios from "axios";
import { find, isEmpty, map, omit } from "lodash";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useLayoutEffect } from "react";
import { useIsFetching } from "react-query";
import { useSelf } from "../adapters";
import CountryStateCity from "../components/CountryStateCity";
import Results from "../components/Results";
import useAuthStore from "../store/useAuthStore";
import useDataStore from "../store/useDataStore";
import useOptionsStore from "../store/useOptionsStore";
import { getAvatar } from "../utils";

export default function Home() {
  const { setOptions, options } = useOptionsStore();
  const { country, setData } = useDataStore();
  const isFetching = useIsFetching();
  const { logout, user } = useAuthStore();

  const { data: { data: selfData } = {} } = useSelf({
    options: {
      enabled: isEmpty(country) && !isEmpty(user),
      staleTime: Infinity,
    },
  });

  const router = useRouter();

  // useEffect(() => {
  //   router.push('/login', undefined, { shallow: true })
  //   // router.push("/login");
  // }, []);

  useEffect(() => {
    if (!isEmpty(selfData) && !isEmpty(options)) {
      setData(
        "country",
        omit(find(options, { name: selfData?.country_name }), ["states"])
      );
    }
  }, [selfData, options]);

  useEffect(() => {
    if (isEmpty(user)) {
      router.push("/login", undefined, { shallow: true });
    } else
      axios("/db.json").then((r) => {
        setOptions(
          map(
            r.data,
            ({ name, native, longitude, latitude, iso2, states }) => ({
              name,
              native,
              longitude,
              latitude,
              iso2,
              states: map(states, ({ name, latitude, longitude, cities }) => ({
                longitude,
                latitude,
                name,
                cities: map(cities, ({ name, latitude, longitude }) => ({
                  longitude,
                  latitude,
                  name,
                })),
              })),
            })
          )
        );
      });
  }, [user]);

  return (
    <div>
      <Head>
        <title>Weather Forecast</title>
        <meta name="description" content="Weather Forecast" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AppBar
        color="transparent"
        sx={{ background: "#fff", userSelect: "none" }}
        elevation={1}
      >
        <Toolbar variant="dense">
          <Stack
            direction={"row"}
            alignItems="center"
            justifyContent="space-between"
            width={"100%"}
          >
            <ListItem dense sx={{ px: 0 }}>
              <ListItemAvatar>
                <Avatar sx={{ background: "#fff", border: "1px solid #ccc" }}>
                  <Image
                    src={getAvatar(user?.email?.split("@")?.[0])}
                    alt={user?.email?.split("@")?.[0]}
                    layout="fill"
                  />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={user?.email?.split("@")?.[0]}
                secondary={user?.email}
              />
            </ListItem>

            <Button color="error" variant="contained" onClick={logout}>
              Logout
            </Button>
          </Stack>
        </Toolbar>
        {isFetching ? <LinearProgress sx={{ height: 3 }} /> : null}
      </AppBar>

      <Stack
        display="flex"
        height="100vh"
        alignItems={"center"}
        justifyContent="center"
      >
        <Container sx={{ py: 2 }}>
          <Paper
            sx={{
              p: 2,
              border: "1.5px dashed #ccc",
              borderRadius: 5,
              pb: 5,
            }}
            elevation={0}
          >
            <CountryStateCity />

            {/* {createElement(Results, {
              suppressHydrationWarning: true,
            })} */}
            <Results />
          </Paper>
        </Container>
      </Stack>
    </div>
  );
}
