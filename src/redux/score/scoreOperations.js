import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = "https://snake-game-backend.onrender.com";
axios.defaults.headers.post["Content-Type"] = "application/json";

const getAllScores = createAsyncThunk(
  "score/getAll",
  async (_, { rejectWithValue, getState }) => {
    const persistedToken = getState().auth.token;

    if (!persistedToken) {
      return rejectWithValue();
    }

    axios.defaults.headers.common.Authorization = `Bearer ${persistedToken}`;

    try {
      const { data } = await axios.get(`api/scores`);

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export { getAllScores };
