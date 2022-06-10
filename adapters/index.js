import { values } from "lodash";
import { useTheQuery } from "../hooks";
import { ApiUrls } from "../utils/constants";
import { getRequest } from "./http";

export const useWeather = ({ queryParams, options }) => {
  return useTheQuery(
    ["weather", values(queryParams)],
    () =>
      getRequest({
        url: `${ApiUrls.weather}`,
        queryParams: {
          ...queryParams,
          appid: "25e80bc4f7aa1b8a36e47cff67e878a8",
        },
      }),
    options
  );
};

export const useSelf = ({ options }) => {
  return useTheQuery(
    "self",
    () =>
      getRequest({
        url: `${ApiUrls.self}`,
      }),
    options
  );
};
