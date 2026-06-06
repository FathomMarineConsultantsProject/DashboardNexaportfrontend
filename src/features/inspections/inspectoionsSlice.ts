import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export type WorkflowTab =
  | 'Overview'
  | 'Quote'
  | 'Confirm'
  | 'Surveyor'
  | 'Preparation'
  | 'Checklist';

export type InspectionStatus = 'Compliant' | 'Non-Compliant' | 'Pending' | 'N/A';

export interface InspectionItem {
  id: string;
  question: string;
  status: InspectionStatus;
  comments: string;
}

export interface InspectionSection {
  id: string;
  title: string;
  items: InspectionItem[];
}

export interface InspectionProgress {
  compliant: number;
  nonCompliant: number;
  pending: number;
  na: number;
}

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

const defaultTemplate: InspectionSection[] = [
  {
    id: 'vessel-condition',
    title: 'Vessel Condition',
    items: [
      { id: 'hull', question: 'Hull structure condition inspected and verified?', status: 'Pending', comments: '' },
      { id: 'deck', question: 'Deck area, rails, and access points are safe?', status: 'Pending', comments: '' },
      { id: 'engine', question: 'Engine room condition meets inspection requirements?', status: 'Pending', comments: '' },
    ],
  },
  {
    id: 'safety-compliance',
    title: 'Safety Compliance',
    items: [
      { id: 'safety-equipment', question: 'Safety equipment is present and operational?', status: 'Pending', comments: '' },
      { id: 'fire-system', question: 'Fire fighting system is available and compliant?', status: 'Pending', comments: '' },
      { id: 'lifeboats', question: 'Lifeboats and rescue boats are inspected?', status: 'Pending', comments: '' },
    ],
  },
  {
    id: 'documentation',
    title: 'Documentation',
    items: [
      { id: 'certificates', question: 'Vessel certificates and documents are valid?', status: 'Pending', comments: '' },
      { id: 'navigation', question: 'Navigation systems and records are verified?', status: 'Pending', comments: '' },
    ],
  },
];

const calculateProgress = (template: InspectionSection[]): InspectionProgress => {
  const items = template.flatMap((section) => section.items);

  return {
    compliant: items.filter((item) => item.status === 'Compliant').length,
    nonCompliant: items.filter((item) => item.status === 'Non-Compliant').length,
    pending: items.filter((item) => item.status === 'Pending').length,
    na: items.filter((item) => item.status === 'N/A').length,
  };
};

interface InspectionsState {
  inspections: any[];
  currentTemplate: InspectionSection[];
  progress: InspectionProgress;
  showCreationForm: boolean;
  activeWorkflowTab: WorkflowTab;
  loading: boolean;
  error: string | null;
}

const initialState: InspectionsState = {
  inspections: [],
  currentTemplate: defaultTemplate,
  progress: calculateProgress(defaultTemplate),
  showCreationForm: false,
  activeWorkflowTab: 'Overview',
  loading: false,
  error: null,
};

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export const fetchInspectionsFromDb = createAsyncThunk<any[], void, { rejectValue: string }>(
  'inspections/fetchInspections',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/inspections`);
      const json = await response.json();

      if (!json.success) throw new Error(json.message || 'Failed to fetch inspections.');

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
      const response = await fetch(`${API_BASE_URL}/inspections/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const json = await response.json();

      if (!json.success) throw new Error(json.message || 'Failed to create inspection.');

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
      const { itemId, status } = action.payload as {
        itemId: string;
        status: InspectionStatus;
      };

      state.currentTemplate = state.currentTemplate.map((section) => ({
        ...section,
        items: section.items.map((item) =>
          item.id === itemId ? { ...item, status } : item
        ),
      }));

      state.progress = calculateProgress(state.currentTemplate);
    },

    updateItemComments: (state, action) => {
      const { itemId, comments } = action.payload as {
        itemId: string;
        comments: string;
      };

      state.currentTemplate = state.currentTemplate.map((section) => ({
        ...section,
        items: section.items.map((item) =>
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
        state.inspections.unshift(action.payload);
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