// userSlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  loading: false,
  isAuth: false,
  user: {},
  error: null // Hata mesajını burada tutacağız
}

export const register = createAsyncThunk(
  "register",
  async (data) => {
    try {
      const response = await axios.post(`http://localhost:5000/register`, data);
      return response.data;
    } catch (error) {
     console.log(error) // Hata mesajını fırlat
    }
  }
)


export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.isAuth = false;
        state.error = null; // İşlem başladığında hata durumunu sıfırla
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuth = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message; // Hata mesajını Redux store'a kaydet
      });
  }
})

export default userSlice.reducer;
