import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export type WorkflowTab =
  | 'Overview'
  | 'Quote'
  | 'Confirm'
  | 'Surveyor'
  | 'Preparation'
  | 'Checklist';

export interface InspectionPayload {
  vessel: string;
  client: string;
  inspectionType: string;
  priority: string;
  shipToInspect: string;
  port: string;
  shipManager: string;
  shipOwner: string;
  agentDetails: {
    name: string;
    contact: string;
    email: string;
    phone: string;
    whatsApp: string;
    telegram: string;
    outlookEmail: string;
  };
  picDetails: {
    name: string;
    contact: string;
    whatsApp: string;
    telegram: string;
    outlookEmail: string;
  };
  superintendentDetails: {
    name: string;
    contact: string;
    whatsApp: string;
    telegram: string;
    outlookEmail: string;
  };
  scheduledDate: string;
  location: string;
  scopeOfWork: string;
}

const defaultChecklistItems = [
  { id: 'hull', title: 'Hull Structure', status: 'Pending', comments: '' },
  { id: 'engine', title: 'Engine Room', status: 'Pending', comments: '' },
  { id: 'safety', title: 'Safety Equipment', status: 'Pending', comments: '' },
  { id: 'navigation', title: 'Navigation Systems', status: 'Pending', comments: '' },
  { id: 'certificates', title: 'Certificates & Documents', status: 'Pending', comments: '' },
];

interface InspectionsState {
  inspections: any[];
  checklistItems: any[];
  showCreationForm: boolean;
  activeWorkflowTab: WorkflowTab;
  loading: boolean;
  error: string | null;
}

const initialState: InspectionsState = {
  inspections: [],
  checklistItems: defaultChecklistItems,
  showCreationForm: false,
  activeWorkflowTab: 'Overview',
  loading: false,
  error: null,
};

export const fetchInspectionsFromDb = createAsyncThunk<any[], void, { rejectValue: string }>(
  'inspections/fetchInspections',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:5000/inspections');
      const json = await response.json();

      if (!json.success) {
        throw new Error(json.message || 'Failed to fetch inspections.');
      }

      return json.inspections || [];
    } catch (error: any) {
      return rejectWithValue(error.message || 'Network error fetching inspections.');
    }
  }
);

export const submitNewInspection = createAsyncThunk<any, InspectionPayload, { rejectValue: string }>(
  'inspections/submitNewInspection',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:5000/inspections/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const json = await response.json();

      if (!json.success) {
        throw new Error(json.message || 'Failed to create inspection.');
      }

      return json.inspection;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Network error creating inspection.');
    }
  }
);

const inspectionsSlice = createSlice({
  name: 'inspections',
  initialState,
  reducers: {
    toggleCreationForm: (state, action) => {
      state.showCreationForm = action.payload;
    },

    setWorkflowTab: (state, action) => {
      state.activeWorkflowTab = action.payload;
    },

    updateItemStatus: (state, action) => {
      const { itemId, status } = action.payload;

      state.checklistItems = state.checklistItems.map((item) =>
        item.id === itemId ? { ...item, status } : item
      );

      state.inspections = state.inspections.map((inspection) => ({
        ...inspection,
        checklistItems: inspection.checklistItems?.map((item: any) =>
          item.id === itemId ? { ...item, status } : item
        ),
      }));
    },

    updateItemComments: (state, action) => {
      const { itemId, comments } = action.payload;

      state.checklistItems = state.checklistItems.map((item) =>
        item.id === itemId ? { ...item, comments } : item
      );

      state.inspections = state.inspections.map((inspection) => ({
        ...inspection,
        checklistItems: inspection.checklistItems?.map((item: any) =>
          item.id === itemId ? { ...item, comments } : item
        ),
      }));
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchInspectionsFromDb.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInspectionsFromDb.fulfilled, (state, action) => {
        state.loading = false;
        state.inspections = action.payload;
      })
      .addCase(fetchInspectionsFromDb.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch inspections.';
      })
      .addCase(submitNewInspection.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitNewInspection.fulfilled, (state, action) => {
        state.loading = false;
        state.inspections.unshift({
          ...action.payload,
          checklistItems: defaultChecklistItems,
        });
        state.showCreationForm = false;
      })
      .addCase(submitNewInspection.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to create inspection.';
      });
  },
});

export const {
  toggleCreationForm,
  setWorkflowTab,
  updateItemStatus,
  updateItemComments,
} = inspectionsSlice.actions;

export default inspectionsSlice.reducer;