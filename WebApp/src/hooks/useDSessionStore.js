import { create } from "zustand";

const useDSessionStore = create((set) => ({
  sessionDetails: null,
  setSessionDetails: (d) => set({ sessionDetails: d }),
}));

export default useDSessionStore;
