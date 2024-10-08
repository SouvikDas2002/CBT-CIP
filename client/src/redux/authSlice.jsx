import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
// import {jwtDecode} from 'jwt-decode'
// import { useNavigate } from 'react-router-dom';

export const register = createAsyncThunk(
  'auth/register',
  async ({ username, email, password,contact }, { rejectWithValue }) => {
    try {
        const data={username,email,password,contact}
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/signup`,data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, { email, password });
      if(response.data){
        return response.data;
      }
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    loading: false,
    user: {
      id:null,
      username:null,
      email:null,
      profilePic:null,
      bio:null
    },
    error: null,
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem('token');
      state.token = null;
      state.isAuthenticated = false;
      state.user.id=null,
      state.user.username=null,
      state.user.email=null,
      state.user.profilePic=null,
      state.user.bio=null
    },
    localUpdate:(state,action)=>{
      state.user={
        ...state.user,
        ...action.payload
      }
      state.isAuthenticated=true
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.user.id =  action.payload.userId;
        state.user.username =  action.payload.username;
        state.user.email =  action.payload.email;
        state.user.bio =  action.payload.bio;
        state.user.profilePic =  action.payload.profilePic;
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        localStorage.removeItem('token');
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        console.log(action.payload);
        
        state.loading = false;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.user.id =  action.payload.userId;
        state.user.username =  action.payload.username;
        state.user.email =  action.payload.email;
        state.user.bio =  action.payload.bio;
        state.user.profilePic =  action.payload.profilePic;
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        localStorage.clear();
      });
  },
});

export const { logout,localUpdate } = authSlice.actions;
export default authSlice.reducer;
