import axios from "axios";
import type { LoginForm, RegisterForm } from "../types/forms.type";
import api from "./client";

export const login = async (_key: string, { arg }: { arg: LoginForm }) => {
  try {
    const { data: response } = await api.post("/login", arg);

    localStorage.setItem("token", response.data.token);
    localStorage.setItem("refreshToken", response.data.refreshToken);

    return response.data;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};

export const signup = async (_key: string, { arg }: { arg: RegisterForm }) => {
  try {
    const data = await api.post("/register", {
      name: arg.fullName,
      email: arg.email,
      password: arg.password,
    });

    return data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem("refreshToken");
  const token = await axios.post(
    `${import.meta.env.VITE_API_URL}/token/refresh`,
    { refreshToken },
  );
  return token;
};
