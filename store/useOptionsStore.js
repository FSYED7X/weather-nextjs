import create from "zustand";

const useOptionsStore = create((set, get) => ({
  options: [],
  setOptions: (data) => set({ options: data }),
}));

export default useOptionsStore;
