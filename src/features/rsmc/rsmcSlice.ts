import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

// Types Declarations
export interface QuestionResponse {
  status: "Compliant" | "Non-Compliant" | "N/A" | null;
  comment: string;
}

export interface RSICState {
  responses: Record<string, QuestionResponse>;
  loading: boolean;
  saving: boolean;
  error: string | null;
}

const initialState: RSICState = {
  responses: {},
  loading: false,
  saving: false,
  error: null,
};

const API_BASE_URL = 'http://localhost:5000/rightship';

/**
 * Thunk: Fetch saved responses asynchronously from the PostgreSQL database
 */
export const fetchRsicResponses = createAsyncThunk(
  'rsic/fetchResponses',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/responses`);
      return response.data;
    } catch (error: unknown) {
      const message = axios.isAxiosError<{ error?: string }>(error)
        ? error.response?.data?.error
        : undefined;
      return rejectWithValue(message || 'Failed loading vetting data.');
    }
  }
);

/**
 * Thunk: Save current state responses to the server database
 */
export const saveRsicProgress = createAsyncThunk(
  'rsic/saveProgress',
  async (responses: Record<string, QuestionResponse>, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/save`, { responses });
      return response.data;
    } catch (error: unknown) {
      const message = axios.isAxiosError<{ error?: string }>(error)
        ? error.response?.data?.error
        : undefined;
      return rejectWithValue(message || 'Failed syncing to database.');
    }
  }
);

export const rsicSlice = createSlice({
  name: 'rsic',
  initialState,
  reducers: {
    // Update individual compliance option state cleanly matching your radio button action toggles
    updateStatus: (
      state, 
      action: PayloadAction<{ questionId: string; status: "Compliant" | "Non-Compliant" | "N/A" }>
    ) => {
      const { questionId, status } = action.payload;
      const current = state.responses[questionId] || { status: null, comment: "" };
      
      state.responses[questionId] = {
        status: current.status === status ? null : status, // Toggle off if clicked again
        comment: current.comment,
      };
    },
    // Update input remarks text instantly as the user types
    updateComment: (
      state, 
      action: PayloadAction<{ questionId: string; comment: string }>
    ) => {
      const { questionId, comment } = action.payload;
      const current = state.responses[questionId] || { status: null, comment: "" };
      
      state.responses[questionId] = {
        status: current.status,
        comment: comment,
      };
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Handlers
      .addCase(fetchRsicResponses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRsicResponses.fulfilled, (state, action) => {
        state.loading = false;
        state.responses = action.payload || {};
      })
      .addCase(fetchRsicResponses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Save Handlers
      .addCase(saveRsicProgress.pending, (state) => {
        state.saving = true;
      })
      .addCase(saveRsicProgress.fulfilled, (state) => {
        state.saving = false;
      })
      .addCase(saveRsicProgress.rejected, (state, action) => {
        state.saving = false;
        state.error = action.payload as string;
      });
  },
});

export const { updateStatus, updateComment } = rsicSlice.actions;
export default rsicSlice.reducer;
