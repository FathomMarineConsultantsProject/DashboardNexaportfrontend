import { configureStore } from '@reduxjs/toolkit';
import dashboardReducer from '../features/dashboard/dashboardSlice';
import expensesReducer from '../features/expenses/expenseSlice';
import inspectionsReducer from '../features/inspections/inspectoionsSlice';
import photosReducer from '../features/photos/photosSlice';
import authReducer from '../features/auth/authSlice';
import rsicReducer from '../features/rsmc/rsmcSlice';

export const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
    expenses: expensesReducer,
    inspections: inspectionsReducer,
    photos: photosReducer,
    auth: authReducer,
    rsic: rsicReducer,
  },
});

// ✅ PROPER TYPE DEFINITIONS - NO 'any' NEEDED
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;