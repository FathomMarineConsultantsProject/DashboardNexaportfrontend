import React, { useState } from 'react';
import { Shield, FileText, Upload, CheckCircle, Clock } from 'lucide-react';
import axios from 'axios';

const InspectorDashboard: React.FC = () => {
  const [uploadStatus, setUploadStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const files = Array.from(e.target.files);
    const formData = new FormData();

    files.forEach((file) => {
      formData.append('files', file);
    });

    setLoading(true);
    setUploadStatus('');

    try {
      await axios.post('/api/files/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });
      setUploadStatus('Files uploaded successfully to the database.');
    } catch (err: unknown) {
      const message = axios.isAxiosError<{ message?: string }>(err)
        ? err.response?.data?.message || err.message
        : 'Unknown upload error';
      setUploadStatus('Upload failed: ' + message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 text-slate-100">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Inspector Command Terminal</h1>
          <p className="text-slate-400 text-sm mt-1">Manage physical ship audits, upload certifications, and verify vessel safety reports.</p>
        </div>
        <div className="flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 px-4 py-2 rounded-xl text-blue-400 text-sm font-medium">
          <Shield className="h-4 w-4" /> Credentials Verified
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl flex items-center gap-4">
          <div className="p-3 bg-blue-500/10 rounded-lg text-blue-400"><FileText className="h-6 w-6" /></div>
          <div>
            <div className="text-2xl font-bold">14</div>
            <div className="text-slate-400 text-xs">Total Assigned Audits</div>
          </div>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl flex items-center gap-4">
          <div className="p-3 bg-emerald-500/10 rounded-lg text-emerald-400"><CheckCircle className="h-6 w-6" /></div>
          <div>
            <div className="text-2xl font-bold">9</div>
            <div className="text-slate-400 text-xs">Completed Inspections</div>
          </div>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl flex items-center gap-4">
          <div className="p-3 bg-amber-500/10 rounded-lg text-amber-400"><Clock className="h-6 w-6" /></div>
          <div>
            <div className="text-2xl font-bold">5</div>
            <div className="text-slate-400 text-xs">Pending Clearances</div>
          </div>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
          <Upload className="h-5 w-5 text-blue-400" /> Marine Document Repository
        </h2>
        <p className="text-slate-400 text-sm mb-4">Upload survey images, hull thickness reports, or official certification files directly to your secure server.</p>

        <div className="border-2 border-dashed border-slate-700 hover:border-blue-500/50 bg-slate-950/40 p-8 rounded-xl text-center cursor-pointer transition-colors relative">
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            disabled={loading}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <Upload className="h-8 w-8 mx-auto text-slate-500 mb-2 animate-pulse" />
          <p className="text-sm font-medium text-slate-300">
            {loading ? 'Processing Documents...' : 'Click or drag files here to upload'}
          </p>
          <p className="text-xs text-slate-500 mt-1">Supports multi-upload matching up to 10MB per file</p>
        </div>

        {uploadStatus && (
          <div className="mt-4 p-3 rounded-lg bg-slate-950 border border-slate-800 text-sm font-medium text-center">
            {uploadStatus}
          </div>
        )}
      </div>
    </div>
  );
};

export default InspectorDashboard;
