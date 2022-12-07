import { createSlice } from "@reduxjs/toolkit";
import { signup } from "./authOperations";

const initialState = {
  user: { name: null },
  token: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // REDUCER FOR SIGN_UP
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, { payload }) => {
        // console.log(payload);
        state.loading = false;
        state.user.name = payload.user.name;
        state.token = payload.token;
      })
      .addCase(signup.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export default authSlice.reducer;
