import axios from "axios";
import { identity, pickBy } from "lodash";

export const http = (method, config) => {
  const {
    url,
    queryParams,
    headers = {},
    data = {},
    paramsSerializer,
  } = config;

  const paramsKey = method === "get" ? "params" : "data";

  const queryParameters = new URLSearchParams(
    pickBy(queryParams, identity)
  ).toString();

  const requestHeaders = {
    "Content-Type": "application/json",
    Accept: "application/json",
    ...headers,
  };

  const axioOptions = {
    method,
    url: `${url}${queryParameters && "?" + queryParameters}`,
    headers: requestHeaders,
    [paramsKey]: data,
  };

  if (paramsSerializer) {
    axioOptions.paramsSerializer = paramsSerializer;
  }

  return new Promise((resolve, reject) => {
    axios(axioOptions)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        const { response } = err;
        if (response) {
          reject(response.data);
        } else {
          reject(new Error("Something went wrong"));
        }
      });
  });
};

export const getRequest = (config) => http("get", config);

export const postRequest = (config) => http("post", config);

export const putRequest = (config) => http("put", config);

export const patchRequest = (config) => http("patch", config);

export const deleteRequest = (config) => http("delete", config);
