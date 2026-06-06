import React from "react";
import { type Expense } from "../types/expense";

interface ExpenseTableProps {
  expenses: Expense[];
}

const ExpenseTable: React.FC<ExpenseTableProps> = ({ expenses }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm shadow-gray-300 overflow-hidden">
      {/* Your existing table JSX */}
      <div className="overflow-x-auto ">
        <table className="w-full">
          <thead className="border-b">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Due Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Item / Invoice
              </th>
            </tr>
          </thead>
          <tbody className="divide-y-0 divide-gray-200 bg-white">
            {expenses.map((expense) => (
              <tr key={expense.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {expense.paymentDueDate || "Not set"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {expense.category}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                  ${expense.amount.toLocaleString()}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900 max-w-md truncate">
                  {expense.itemName}
                  {expense.invoiceNumber ? ` (${expense.invoiceNumber})` : ""}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExpenseTable;
