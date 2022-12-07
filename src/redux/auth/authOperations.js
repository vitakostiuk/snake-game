import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

//Отправка токена в заголовке Authorization
const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = "";
  },
};

axios.defaults.baseURL = "https://snake-game-backend.onrender.com";
axios.defaults.headers.post["Content-Type"] = "application/json";

const signup = createAsyncThunk(
  "auth/signup",
  async (credentials, { rejectWithValue }) => {
    const userInfo = { ...credentials };

    try {
      const { data } = await axios.post(`/users/signup`, userInfo);
      token.set(data.token);

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export { signup };
