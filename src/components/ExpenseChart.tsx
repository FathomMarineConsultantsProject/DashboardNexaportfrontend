import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface ExpenseData {
  month: string;
  budget: number;
  expenses: number;
}



const ExpenseChart = () => {
  const data: ExpenseData[] = [
    { month: "Jul", budget: 120000, expenses: 110000 },
    { month: "Aug", budget: 120000, expenses: 100000 },
    { month: "Sep", budget: 120000, expenses: 126000 },
    { month: "Oct", budget: 120000, expenses: 110000 },
    { month: "Nov", budget: 120000, expenses: 128000 },
    { month: "Dec", budget: 120000, expenses: 135000 },
    { month: "Jan", budget: 120000, expenses: 115000 },
  ];

  
  return (
   
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h3 className="font-black mb-4">Monthly Expense Trends</h3>
      <ResponsiveContainer width="100%" height={300} >
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="month" axisLine={false} tickLine={false} />

          <YAxis axisLine={false} tickLine={false} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="budget"
            stroke="#3B82F6"
            strokeWidth={3}
            name="Budget"
          />
          <Line
            type="monotone"
            dataKey="expenses"
            stroke="#EF4444"
            strokeWidth={3}
            name="Total Expenses"
          />
        </LineChart>
      </ResponsiveContainer>

    </div>
    
 


  );
};

export default ExpenseChart;
