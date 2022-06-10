import swal from "sweetalert";
import create from "zustand";
import { persist } from "zustand/middleware";
import useDataStore from "./useDataStore";

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: {},
      setUser: (val) => set({ user: val }),
      logout: () => {
        swal({
          title: "Confirm to logout?",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        }).then((willDelete) => {
          if (willDelete) {
            set({ user: {} });
            useDataStore.setState({
              lat: "",
              lon: "",
              country: "",
              state: "",
              city: "",
            });
          }
        });
      },
    }),
    { name: "USER-STORE" }
  )
);

export default useAuthStore;
