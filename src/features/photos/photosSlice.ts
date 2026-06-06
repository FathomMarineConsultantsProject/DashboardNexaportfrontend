import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface Photo {
  id: string;
  filename: string;
  filepath: string; // 🌟 Added to match backend schema path
  category: 'hull' | 'machinery' | 'safety' | 'critical';
  status: 'ok' | 'minor' | 'major' | 'critical'; // 🌟 Added status field
  uploadedAt: string;
  size: string;
}

interface PhotosState {
  photos: Photo[];
  stats: {
    total: number;
    ok: number;
    minor: number;
    major: number;
    critical: number;
  };
  currentFilter: string;
  uploading: boolean;
}

const initialState: PhotosState = {
  photos: [],
  // 🌟 Start at 0 so the numbers reflect your real database state
  stats: { total: 0, ok: 0, minor: 0, major: 0, critical: 0 },
  currentFilter: 'all',
  uploading: false,
};

export const photosSlice = createSlice({
  name: 'photos',
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<string>) => {
      state.currentFilter = action.payload;
    },
    startUpload: (state) => {
      state.uploading = true;
    },
    // 🌟 Update this to process both the array of photos and the new stats counter sent by the backend
    completeUpload: (state, action: PayloadAction<{ photos: Photo[]; stats?: PhotosState['stats'] }>) => {
      state.photos.unshift(...action.payload.photos);
      state.uploading = false;
      if (action.payload.stats) {
        state.stats = action.payload.stats;
      } else {
        state.stats.total += action.payload.photos.length;
      }
    },
    // 🌟 Call this when you fetch all photos on page load
    setPhotosAndStats: (state, action: PayloadAction<{ photos: Photo[]; stats: PhotosState['stats'] }>) => {
      state.photos = action.payload.photos;
      state.stats = action.payload.stats;
    }
  },
});

export const { setFilter, startUpload, completeUpload, setPhotosAndStats } = photosSlice.actions;
export default photosSlice.reducer;