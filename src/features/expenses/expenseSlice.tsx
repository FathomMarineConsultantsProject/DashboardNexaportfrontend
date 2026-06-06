import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { type Expense } from "../../types/expense";

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

// 🌐 1. Fetch expenses from the PostgreSQL backend
export const fetchExpensesFromDb = createAsyncThunk<
  Expense[], 
  void, 
  { rejectValue: string }
>(
  "expenses/fetchExpenses",
  async (_, { rejectWithValue }) => {
    try {
      // 🌟 Aligned with backend mounting path standard
      const response = await fetch("http://localhost:5000/expenses");
      const json = await response.json();
      if (!json.success) throw new Error(json.message || "Failed to retrieve expense nodes.");
      return json.expense || []; 
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : "An unexpected server network issue occurred.";
      return rejectWithValue(errorMsg);
    }
  }
);

// 🌐 2. Save a new expense to the PostgreSQL backend
export const saveNewExpenseToDb = createAsyncThunk<
  Expense, 
  Omit<Expense, "id">, 
  { rejectValue: string }
>(
  "expenses/saveExpense",
  async (newExpense, { rejectWithValue }) => {
    try {
      // 🌟 Aligned with backend mounting path standard
      const response = await fetch("http://localhost:5000/expenses/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newExpense),
      });
      const json = await response.json();
      if (!json.success) throw new Error(json.message || "Database transaction rejected.");
      return json.expense; 
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : "An unexpected server network issue occurred.";
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
      .addCase(saveNewExpenseToDb.fulfilled, (state, action) => {
        state.expenses.unshift(action.payload); 
      });
  },
});

export default expensesSlice.reducer;