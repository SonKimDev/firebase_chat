import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    userId: null,
    name: "",
    email: "",
    address: "",
    createAt: "",
    phoneNumber: "",
    avatar: "",
  },
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    removeUser: (state) => {
      state.user = { ...initialState.user };
      state.isAuthenticated = false;
    },
    updateUser: (state, action) => {
      if (action.payload.name !== undefined)
        state.user.name = action.payload.name;
      if (action.payload.address !== undefined)
        state.user.address = action.payload.address;
      if (action.payload.phoneNumber !== undefined)
        state.user.phoneNumber = action.payload.phoneNumber;
    },
    updateAvatar: (state, action) => {
      state.user.avatar = action.payload;
    },
  },
});

export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectUser = (state) => state.auth.user;

export const { setUser, removeUser, updateUser, updateEmail, updateAvatar } =
  authSlice.actions;
export default authSlice.reducer;
