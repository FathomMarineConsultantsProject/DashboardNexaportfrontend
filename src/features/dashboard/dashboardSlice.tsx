import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

const BACKEND_URL = 'http://localhost:5000/api';

export interface NotificationItem {
  id: string;
  message: string;
}

interface TopPerformer {
  id: string;
  name: string;
  score?: number;
}

interface DashboardState {
  activeInspections: number;
  availableSurveyors: number;
  assignedSurveyors: number;
  standBySurveyors: number;
  topPerformers: TopPerformer[];
  notifications: NotificationItem[];
  loading: boolean;
}

const initialState: DashboardState = {
  activeInspections: 0,
  availableSurveyors: 0,
  assignedSurveyors: 0,
  standBySurveyors: 0,
  topPerformers: [],
  notifications: [
    { id: 'init-1', message: 'System communication link active.' }
  ],
  loading: false
};

// 🚀 ASYNC THUNK: Fetch Real-Time Aggregated Network Data from Server
export const fetchLiveDashboardData = createAsyncThunk(
  'dashboard/fetchLiveDashboardData',
  async (_, { rejectWithValue }) => {
    try {
      // 1. Fetch live calculations summaries & inspection records length
      const statsRes = await axios.get(`${BACKEND_URL}/surveyors/network-summary`);
      const inspectionRes = await axios.get(`${BACKEND_URL}/inspections/all`);
      
      return {
        activeInspectionsCount: inspectionRes.data.count,
        surveyorCounts: statsRes.data.counts,
        topPerformers: statsRes.data.topPerformers
      };
    } catch (err: unknown) {
      const message = axios.isAxiosError<{ message?: string }>(err)
        ? err.response?.data?.message
        : undefined;
      return rejectWithValue(message || 'Failed to sync with operations deck');
    }
  }
);

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    addNotification: (state, action: PayloadAction<string>) => {
      state.notifications.unshift({
        id: `notify-${Date.now()}`,
        message: action.payload
      });
    },
    setActiveInspections: (state, action: PayloadAction<number>) => {
      state.activeInspections = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLiveDashboardData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLiveDashboardData.fulfilled, (state, action) => {
        state.loading = false;
        state.activeInspections = action.payload.activeInspectionsCount;
        state.availableSurveyors = action.payload.surveyorCounts.available;
        state.assignedSurveyors = action.payload.surveyorCounts.assigned;
        state.standBySurveyors = action.payload.surveyorCounts.standby;
        state.topPerformers = action.payload.topPerformers;
      })
      .addCase(fetchLiveDashboardData.rejected, (state) => {
        state.loading = false;
      });
  }
});

export const { addNotification, setActiveInspections } = dashboardSlice.actions;
export default dashboardSlice.reducer;
