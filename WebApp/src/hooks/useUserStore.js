import { create } from "zustand";
import { setAuthToken } from "../api";

const localStorageUser = JSON.parse(localStorage.getItem("user"));

const useUserStore = create((set) => ({
  user: localStorageUser ? localStorageUser : null,
  setUser: (newUser) => {
    localStorage.setItem("user", JSON.stringify(newUser));
    setAuthToken(newUser.token);

    return set({ user: newUser });
  },
  logout: () => {
    localStorage.removeItem("user");
    setAuthToken(null);

    return set({ user: null });
  },
}));

export default useUserStore;
