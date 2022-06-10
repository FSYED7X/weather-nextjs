import { find, isEmpty } from "lodash";
import create from "zustand";
import { persist } from "zustand/middleware";
import useOptionsStore from "./useOptionsStore";

const useDataStore = create(
  persist(
    (set, get) => ({
      lat: "",
      lon: "",
      country: "",
      state: "",
      city: "",
      setData: (key, val) => {

        var temp = {
          [key]: val,
          ...{
            country: { state: "", city: "" },
            state: { city: "" },
            city: { lat: val?.latitude, lon: val?.longitude },
          }[key],
        };

        if (key === "country") {
          
          if (
            isEmpty(
              find(useOptionsStore.getState()?.options, { name: val?.name })?.states
            )
          ) {
            temp.lat = val?.latitude;
            temp.lon = val?.longitude;
          } else {
            temp.lat = "";
            temp.lon = "";
          }
        }

        set(temp);
      },
    }),
    { name: "DATA-STORE" }
  )
);

export default useDataStore;
