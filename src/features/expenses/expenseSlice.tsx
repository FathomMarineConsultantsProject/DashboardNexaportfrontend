import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { type Expense } from "../../types/expense";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

interface ExpensesState {
  expenses: Expense[];
  loading: boolean;
  error: string | null;
}

const initialState: ExpensesState = {
  expenses: [],
  loading: false,
  error: null,
};

export const fetchExpensesFromDb = createAsyncThunk<
  Expense[],
  void,
  { rejectValue: string }
>(
  "expenses/fetchExpenses",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/expenses`);
      const json = await response.json();

      if (!json.success) {
        throw new Error(json.message || "Failed to retrieve expenses.");
      }

      return json.expense || [];
    } catch (err: unknown) {
      const errorMsg =
        err instanceof Error
          ? err.message
          : "An unexpected server network issue occurred.";
      return rejectWithValue(errorMsg);
    }
  }
);

export const saveNewExpenseToDb = createAsyncThunk<
  Expense,
  Omit<Expense, "id">,
  { rejectValue: string }
>(
  "expenses/saveExpense",
  async (newExpense, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/expenses/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newExpense),
      });

      const json = await response.json();

      if (!json.success) {
        throw new Error(json.message || "Database transaction rejected.");
      }

      return json.expense;
    } catch (err: unknown) {
      const errorMsg =
        err instanceof Error
          ? err.message
          : "An unexpected server network issue occurred.";
      return rejectWithValue(errorMsg);
    }
  }
);

export const expensesSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchExpensesFromDb.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchExpensesFromDb.fulfilled, (state, action) => {
        state.loading = false;
        state.expenses = action.payload;
      })
      .addCase(fetchExpensesFromDb.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to resolve expense ledger state.";
      })
      .addCase(saveNewExpenseToDb.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveNewExpenseToDb.fulfilled, (state, action) => {
        state.loading = false;
        state.expenses.unshift(action.payload);
      })
      .addCase(saveNewExpenseToDb.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to save expense.";
      });
  },
});

export default expensesSlice.reducer;