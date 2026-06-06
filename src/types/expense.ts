export interface Expense {
  id: string
  itemName: string
  category: string
  amount: number
  invoiceNumber: string
  paymentDueDate: string
  status?: string
}

export interface ExpenseCategory {
  label: string
  value: string
}
