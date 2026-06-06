import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import API from '../../api/axiosInstance';

// 📋 TypeScript Types Definition
export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  location: string;
  avatar?: string | null; // Support added for profile avatar syncing strings
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  lastActivity: string; // Made required to guarantee clear type definition tracking loops
}

// Interface for API response contracts to safely eliminate 'any' type references
interface AuthResponse {
  success: boolean;
  token: string;
  user: User;
  message?: string;
}

// 💾 LocalStorage se purana login session check karo (Refresh backup)
const savedToken = localStorage.getItem('token');
const savedUser = localStorage.getItem('user');

// Safe JSON parser to avoid crash loops if string values are corrupt
const getInitialUser = (): User | null => {
  if (!savedUser) return null;
  try {
    return JSON.parse(savedUser) as User;
  } catch {
    localStorage.removeItem('user');
    return null;
  }
};

const initialState: AuthState = {
  user: getInitialUser(),
  token: savedToken || null,
  isAuthenticated: !!savedToken,
  loading: false,
  error: null,
  lastActivity: new Date().toISOString(), // Default current timestamp
};

// 🔑 1. LOGIN ACTION PIPELINE (Express Backend Hit)
export const loginUser = createAsyncThunk<
  AuthResponse, // Fulfilled return type contract
  { email: string; password: string }, // Input payload type contract
  { rejectValue: string } // Reject value payload contract
>(
  'auth/loginUser',
  async (credentials, thunkAPI) => {
    try {
      const response = await API.post<AuthResponse>('/auth/login', credentials);
      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        return response.data; 
      }
      return thunkAPI.rejectWithValue(response.data.message || 'Login operational verification routine rejected.');
    } catch (error: unknown) {
      const axiosError = error as { response?: { data?: { message?: string } } };
      return thunkAPI.rejectWithValue(
        axiosError.response?.data?.message || 'Invalid Email or Password'
      );
    }
  }
);

// 📝 2. REGISTER ACTION PIPELINE (Express Backend Hit)
export const registerUser = createAsyncThunk<
  AuthResponse, // Fulfilled return type contract
  { name: string; email: string; password: string; role?: string; location?: string }, // Input type contract
  { rejectValue: string } // Reject value payload contract
>(
  'auth/registerUser',
  async (userData, thunkAPI) => {
    try {
      const response = await API.post<AuthResponse>('/auth/register', userData);
      return response.data;
    } catch (error: unknown) {
      const axiosError = error as { response?: { data?: { message?: string } } };
      return thunkAPI.rejectWithValue(
        axiosError.response?.data?.message || 'Registration failed'
      );
    }
  }
);

// 🎬 SLICE DESIGN CONTAINER
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
    updateLocalUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    // ⏳ Inactivity hook isko call karta hai mouse move par
    updateActivityTimestamp: (state) => {
      state.lastActivity = new Date().toISOString();
    }
  },
  extraReducers: (builder) => {
    builder
      // ⏳ Login Execution Status
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true; 
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'An unexpected authentication disruption occurred.';
        state.isAuthenticated = false;
      })

      // ⏳ Register Execution Status
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'An unexpected registration error occurred.';
      });
  },
});

// 🚀 Export components globally for integration maps
export const { logout, updateLocalUser, updateActivityTimestamp } = authSlice.actions;
export default authSlice.reducer;