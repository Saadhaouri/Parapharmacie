import { create } from "zustand";

type State = {
  isAuth: boolean;
};

type Actions = {
  logIn: () => void;
  logOut: () => void;
};

const authStore = create<State & Actions>((set) => ({
  isAuth:
    !!localStorage.getItem("token") || !!localStorage.getItem("rememberMe"),
  logIn: () => set(() => ({ isAuth: true })),
  logOut: () =>
    set(() => {
      localStorage.removeItem("token");
      localStorage.removeItem("rememberMe");
      return { isAuth: false };
    }),
}));

export default authStore;
