import React, { useEffect } from 'react';
import axios from 'axios';
import { useAppSelector, useAppDispatch } from '../../hooks/reduxHooks';
import { setFilter, setPhotosAndStats } from './photosSlice';
import PhotoUpload from '../../components/PhotoUpload';
import PhotoStats from '../../components/PhotoStats';

const Photos: React.FC = () => {
  const dispatch = useAppDispatch();
  const { stats, currentFilter } = useAppSelector((state) => state.photos);

  // Fetch photos and statistics from the backend when the component mounts or filter changes
  useEffect(() => {
    const fetchPhotosData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/files?category=${currentFilter}`);
        dispatch(setPhotosAndStats({
          photos: response.data.photos,
          stats: response.data.stats
        }));
      } catch (error) {
        console.error("Failed to load photos from backend:", error);
      }
    };

    fetchPhotosData();
  }, [currentFilter, dispatch]);

  const handleFilterChange = (filter: string) => {
    dispatch(setFilter(filter));
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-900">Photo Documentation</h2>
        <div className="flex flex-wrap gap-2">
          <button 
            onClick={() => handleFilterChange('all')}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
              currentFilter === 'all' 
                ? 'bg-blue-600 text-white shadow-md' 
                : 'bg-white text-gray-700 border border-gray-200 hover:shadow-sm hover:bg-gray-50'
            }`}
          >
            All Photos ({stats.total})
          </button>
          <button 
            onClick={() => handleFilterChange('hull')}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
              currentFilter === 'hull' 
                ? 'bg-emerald-600 text-white shadow-md' 
                : 'bg-white text-gray-700 border border-gray-200 hover:shadow-sm hover:bg-gray-50'
            }`}
          >
            Hull & Structural
          </button>
          <button 
            onClick={() => handleFilterChange('machinery')}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
              currentFilter === 'machinery' 
                ? 'bg-orange-600 text-white shadow-md' 
                : 'bg-white text-gray-700 border border-gray-200 hover:shadow-sm hover:bg-gray-50'
            }`}
          >
            Machinery
          </button>
        </div>
      </div>

      {/* Stats */}
      <PhotoStats stats={stats} />

      {/* Upload */}
      <PhotoUpload />
    </div>
  );
};

export default Photos;