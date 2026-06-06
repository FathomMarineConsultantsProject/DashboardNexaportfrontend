import React from 'react';
import { X } from 'lucide-react';

interface AddExpenseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  formData: {
    itemName: string;
    category: string;
    amount: number;
    invoiceNumber: string;
    paymentDueDate: string;
  };
  setFormData: React.Dispatch<React.SetStateAction<{
    itemName: string;
    category: string;
    amount: number;
    invoiceNumber: string;
    paymentDueDate: string;
  }>>;
}

const AddExpenseModal: React.FC<AddExpenseModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  formData,
  setFormData,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 shadow-2xl shadow-amber-900  border-amber-900">
      <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold underline">Add Expense</h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full">
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={onSubmit} className="space-y-5  p-3 rounded-2xl ">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Item Name *</label>
            <input
              type="text"
              value={formData.itemName}
              onChange={(e) => setFormData({...formData, itemName: e.target.value})}
              placeholder="Surveyor travel, equipment, agency fee..."
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
            <select 
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="Travel">Travel</option>
              <option value="Accommodation">Accommodation</option>
              <option value="Meals & Allowance">Meals & Allowance</option>
              <option value="Equipment">Equipment & Tools</option>
            </select>
          </div>
          
          <div>
            <input
              type="number"
              value={formData.amount}
              onChange={(e) => setFormData({...formData, amount: parseFloat(e.target.value) || 0})}
              placeholder="0.00"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Invoice Number</label>
            <input
              type="text"
              value={formData.invoiceNumber}
              onChange={(e) => setFormData({...formData, invoiceNumber: e.target.value})}
              placeholder="INV-0001"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Payment Due Date</label>
            <input
              type="date"
              value={formData.paymentDueDate}
              onChange={(e) => setFormData({...formData, paymentDueDate: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              className="flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-md hover:bg-gray-200 font-medium transition-colors"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 font-medium transition-colors"
            >
              Add Expense
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddExpenseModal;
