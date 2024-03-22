// userSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  isAuth: false,
  user: {},
  error: null, // Hata mesajını burada tutacağız
};

export const register = createAsyncThunk("register", async (data) => {
  try {
    const response = await axios.post(`http://localhost:5000/register`, data);
    return response.data;
  } catch (error) {
    console.log(error); // Hata mesajını fırlat
    throw error; // Hata durumunda hatayı yeniden fırlat
  }
});

export const login = createAsyncThunk("login", async (data) => {
  try {
    const response = await axios.post(`http://localhost:5000/login`, data);
    return response.data;
  } catch (error) {
    console.log(error); // Hata mesajını fırlat
    throw error; // Hata durumunda hatayı yeniden fırlat
  }
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logoutSuccess: (state) => {
      // Kullanıcı durumunu temizle
      return {
        ...state,
        isAuth: false,
        user: {},
      };
    },
    loginSuccess: (state, action) => {
      // Kullanıcı giriş yaptığında yapılacak işlemler
      return {
        ...state,
        isAuth: true,
        user: action.payload, // Kullanıcı bilgilerini set et
      };
    },
    registerSuccess: (state, action) => {
      // Kullanıcı kayıt olduğunda yapılacak işlemler
      return {
        ...state,
        isAuth: true,
        user: action.payload, // Kullanıcı bilgilerini set et
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.isAuth = false;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuth = true;
        state.user = action.payload; // Kullanıcı bilgilerini set et
        state.user.avatar = action.payload.avatar; // Kullanıcı avatarını set et
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.isAuth = false;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuth = true;
        state.user = action.payload; // Kullanıcı bilgilerini set et
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { logoutSuccess, loginSuccess, registerSuccess } =
  userSlice.actions;

export default userSlice.reducer;
