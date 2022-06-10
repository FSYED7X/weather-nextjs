/* eslint-disable react/display-name */
import { isEmpty } from "lodash";
import { useEffect, useState } from "react";
import { useWeather } from "../../adapters";
import useAuthStore from "../../store/useAuthStore";
import useDataStore from "../../store/useDataStore";

const engine =
  (Component) =>
  ({ ...props }) => {
    const { lat, lon, city, state, country } = useDataStore();
    const { user } = useAuthStore();
    const { data: { data: weatherData } = {}, isLoading } = useWeather({
      queryParams: { lat, lon },
      options: {
        enabled: Boolean(lat && lon && country) && !isEmpty(user),
        // keepPreviousData: true,
      },
    });

    const [display, setDisplay] = useState("loading");

    useEffect(() => {
      if (isEmpty(weatherData) && isLoading) {
        setDisplay("loading");
      } else {
        if (!(lat && lon)) {
          setDisplay("none");
        } else {
          setDisplay(true);
        }
      }
    }, [lat, lon, weatherData]);

    return (
      <Component
        {...props}
        {...{ lat, lon, weatherData, isLoading, city, state, country, display }}
      />
    );
  };

export default engine;
