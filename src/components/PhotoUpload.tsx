import React, { useState, useCallback, type DragEvent } from 'react';
import axios from 'axios'; // ✅ Fixed: Added missing axios import
import { Upload, Image, X } from 'lucide-react';
import { useAppDispatch } from '../hooks/reduxHooks';
import { startUpload, completeUpload } from '../features/photos/photosSlice';

// Define explicit types matching your data structures
interface LocalPhoto {
  file: File;
  preview: string;
  name: string;
}

const PhotoUpload: React.FC = () => {
  // ✅ Fixed: Inside the component scope now
  const dispatch = useAppDispatch(); 
  
  const [photos, setPhotos] = useState<LocalPhoto[]>([]);
  const [dragging, setDragging] = useState<boolean>(false);
  const [uploading, setUploading] = useState<boolean>(false);

  const onDrop = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    
    const files = Array.from(e.dataTransfer.files).filter(file => file.type.startsWith('image/'));
    const newPhotos: LocalPhoto[] = files.map(file => ({
      file,
      preview: URL.createObjectURL(file),
      name: file.name,
    }));
    setPhotos(prev => [...prev, ...newPhotos]);
  }, []);

  const onDragOver = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(true);
  }, []);

  const onDragLeave = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
  }, []);

  const removePhoto = (index: number) => {
    const photo = photos[index];
    if (photo) {
      URL.revokeObjectURL(photo.preview);
    }
    setPhotos(prev => prev.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (photos.length === 0) return;
    
    setUploading(true);
    dispatch(startUpload()); 
    
    const formData = new FormData();
    
    photos.forEach((photo) => {
      formData.append('files', photo.file);
    });

    formData.append('category', 'hull'); 
    formData.append('status', 'ok');

    try {
      // ✅ Explicitly defined base URL to communicate with your backend port
      const response = await axios.post('http://localhost:5000/files/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // ✅ Dispatches the payload format expected by your updated slice
      dispatch(completeUpload({ photos: response.data.photos }));

      alert(`${photos.length} photos uploaded at once successfully!`);
      photos.forEach(p => URL.revokeObjectURL(p.preview));
      setPhotos([]);
    } catch (error: unknown) {
      console.error(error);
      alert('Upload failed.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <div
        className={`relative border border-dashed rounded-xl p-4 text-center transition-all cursor-pointer hover:shadow-md group ${
          dragging
            ? 'border-blue-400 bg-blue-50 shadow-2xl scale-105'
            : 'border-gray-400 bg-gray-50 hover:border-blue-400 hover:bg-blue-50'
        }`}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
      >
        <div className="inset-0 flex items-center justify-center pointer-events-none">
          <Upload size={48} className="text-gray-400 group-hover:text-blue-500" />
        </div>
        
        <div className="justify-items-center">
          <h3 className="text-xl font-bold text-gray-900 mb-2">Drop photos here</h3>
          <p className="text-gray-600 mb-4">or click to browse (Max 10MB, JPG/PNG)</p>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => {
              const files = Array.from(e.target.files || []);
              const newPhotos: LocalPhoto[] = files.map(file => ({
                file,
                preview: URL.createObjectURL(file),
                name: file.name,
              }));
              setPhotos(prev => [...prev, ...newPhotos]);
            }}
            className="hidden"
            id="photo-file-input"
          />
          <label 
            htmlFor="photo-file-input" 
            className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:bg-blue-700 cursor-pointer transition-all inline-block scale-95"
          >
            Select Files
          </label>
        </div>
      </div>

      {/* Preview */}
      {photos.length > 0 && (
        <div>
          <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Image size={24} />
            Preview ({photos.length} files)
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {photos.map((photo, index) => (
              <div key={index} className="relative group bg-gray-50 rounded-xl p-2 hover:shadow-lg transition-all">
                <img 
                  src={photo.preview} 
                  alt={photo.name}
                  className="w-full h-32 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => removePhoto(index)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 cursor-pointer hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-all border-none"
                >
                  <X size={16} />
                </button>
                <p className="text-xs text-gray-600 mt-2 truncate">{photo.name}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Upload Button */}
      {photos.length > 0 && (
        <button
          onClick={handleUpload}
          disabled={uploading}
          className="w-full bg-linear-to-r from-emerald-500 to-teal-600 text-white p-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl hover:from-emerald-600 hover:to-teal-700 transform hover:-translate-y-1 transition-all disabled:opacity-50 flex items-center justify-center gap-3"
        >
          {uploading ? (
            <>
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Uploading...
            </>
          ) : (
            <>
              <Upload size={24} />
              Upload {photos.length} Photo{photos.length !== 1 ? 's' : ''}
            </>
          )}
        </button>
      )}
    </div>
  );
};

export default PhotoUpload;
