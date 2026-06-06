import React, { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../hooks/reduxHooks";
import { saveNewExpenseToDb, fetchExpensesFromDb } from "./expenseSlice";
import ExpenseChart from "../../components/ExpenseChart";
import ExpenseTable from "../../components/ExpenseTable";
import AddExpenseModal from "../../components/AddExpenseModal";
import ExpensePie from "../../components/ExpensePie";
import Calender2 from "../../components/Calender2";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

import {
  Podcast,
  TrendingUp,
  Globe,
  CheckCircle,
  DollarSign,
  ArrowDownWideNarrow,
  Shell,
  AlertTriangle,
  Target,
  BarChart3,
  Sparkles,
  Zap,
} from "lucide-react";

interface FormData {
  itemName: string;    // 🌟 Matches the payload key expected by your Express backend router
  amount: number;
  category: string;
  invoiceNumber: string;
  paymentDueDate: string;
}

const forecastData = [
  { name: "Nov 2024", historical: 105000, forecast: null, upperBound: null, lowerBound: null },
  { name: "Dec 2024", historical: 98000, forecast: null, upperBound: null, lowerBound: null },
  { name: "Jan 2025", historical: 112000, forecast: 112000, upperBound: 112000, lowerBound: 112000 },
  { name: "Feb 2025", historical: null, forecast: 116000, upperBound: 122000, lowerBound: 109000 },
  { name: "Mar 2025", historical: null, forecast: 120000, upperBound: 128000, lowerBound: 111000 },
  { name: "May 2025", historical: null, forecast: 124000, upperBound: 133000, lowerBound: 114000 },
];

const categoryStackedData = [
  { name: "Jul 2024", "Surveyor Costs": 45000, "Travel Expenses": 25000, "Equipment Costs": 15000 },
  { name: "Aug 2024", "Surveyor Costs": 48000, "Travel Expenses": 28000, "Equipment Costs": 16000 },
  { name: "Sep 2024", "Surveyor Costs": 46000, "Travel Expenses": 26000, "Equipment Costs": 16000 },
  { name: "Oct 2024", "Surveyor Costs": 50000, "Travel Expenses": 29000, "Equipment Costs": 16000 },
  { name: "Nov 2024", "Surveyor Costs": 55000, "Travel Expenses": 32000, "Equipment Costs": 18000 },
  { name: "Dec 2024", "Surveyor Costs": 52000, "Travel Expenses": 28000, "Equipment Costs": 18000 },
  { name: "Jan 2025", "Surveyor Costs": 58000, "Travel Expenses": 35000, "Equipment Costs": 20000 },
];

const regionalData = [
  { name: "Asia Pacific", value: 45000, inspections: 28, avgCost: 1607, efficiency: "High" },
  { name: "Europe", value: 38000, inspections: 22, avgCost: 1727, efficiency: "Standard" },
  { name: "Americas", value: 29000, inspections: 18, avgCost: 1611, efficiency: "High" },
  { name: "Middle East", value: 25000, inspections: 15, avgCost: 1667, efficiency: "Standard" },
];

const budgetPerformanceData = [
  { name: "Marine Surveys", percentage: 94.7, spent: 142000, total: 150000, color: "bg-amber-500" },
  { name: "Technical Inspections", percentage: 90.0, spent: 108000, total: 120000, color: "bg-amber-500" },
  { name: "Compliance Audits", percentage: 85.0, spent: 68000, total: 80000, color: "bg-emerald-500" },
  { name: "Emergency Response", percentage: 64.0, spent: 32000, total: 50000, color: "bg-emerald-500" },
];

const Expenses = () => {
  const dispatch = useAppDispatch();
  const reduxExpenses = useAppSelector((state) => state.expenses.expenses);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [formData, setFormData] = useState<FormData>({
    itemName: "",
    amount: 0,
    category: "Travel",
    invoiceNumber: "",
    paymentDueDate: "",
  });

  const [prevmonths, setPrevmonths] = useState("Last 3 Months");
  const [activeTab, setActiveTab] = useState<string>("Expense Trends");

  // 🌟 Synchronize with the database on component mount
  useEffect(() => {
    dispatch(fetchExpensesFromDb());
  }, [dispatch]);

  const handleSubmitExpense = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Explicit format transformation for structural safety guarantees
    dispatch(saveNewExpenseToDb({
      ...formData,
      amount: Number(formData.amount)
    }));

    setFormData({
      itemName: "",
      amount: 0,
      category: "Travel",
      invoiceNumber: "",
      paymentDueDate: "",
    });
    setIsModalOpen(false);
  };

  const months = ["Last 3 Months", "Last 6 Months", "Last 12 Months", "Last 18 Months", "Year to Date"];
  const weeks = ["December 2025", "January 2026", "February 2026", "March 2026", "April 2026", "May 2026"];

  const Cards = [
    { title: "Total Expense", amount: "112,000", tagline: "14.3% vs last month", icon: <DollarSign size={15} />, taglineTextCol: "text-blue-600", conclude: "Budget: 111,000" },
    { title: "Total Expense", amount: "101.8%", tagline: "Within budget", icon: <Shell size={15} />, taglineTextCol: "text-green-600", conclude: "-2,000 remaining" },
    { title: "Total Expense", amount: "1,462", tagline: "3.2% improvement", icon: <ArrowDownWideNarrow size={15} />, taglineTextCol: "text-red-600", conclude: "68 inspection this month" },
    { title: "Total Expense", amount: "355K", tagline: "Within +8.5% projected growth", icon: <AlertTriangle size={15} />, taglineTextCol: "text-yellow-600", conclude: "85% confidence interval" },
  ];

  const tabNames = ["Expense Trends", "Budget Forecasting", "Category Analysis", "Regional Insights", "Cost Optimization", "Budget Management"];

  const renderTabContent = () => {
    switch (activeTab) {
      case "Expense Trends":
        return (
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-6 transition-all duration-300 ease-in-out">
            <div className="w-full bg-white p-5 rounded-2xl border border-gray-100 shadow-xs"><ExpenseChart /></div>
            <div className="w-full bg-white p-5 rounded-2xl border border-gray-100 shadow-xs"><ExpensePie /></div>
          </div>
        );

      case "Budget Forecasting":
        return (
          <div className="space-y-6 transition-all duration-300 ease-in-out">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs space-y-2">
              <div className="flex items-center gap-2 text-indigo-600 font-black text-base">
                <TrendingUp size={20} />
                <h3>Predictive Financial Forecasting (Next Quarter Evaluation)</h3>
              </div>
              <p className="text-gray-500 text-xs leading-relaxed">
                Based on your current transaction velocity, maritime fuel surcharges, and agency fee graphs, the system forecasts a <span className="font-bold text-gray-800">4.5% decrease</span> in operational overheads for the upcoming 30 days.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs flex flex-col">
                <div className="mb-4">
                  <div className="flex items-center gap-2 text-purple-600">
                    <TrendingUp size={16} />
                    <h4 className="text-sm font-black text-gray-900 tracking-tight">Expense Forecast Model</h4>
                  </div>
                  <p className="text-[11px] text-gray-400 mt-0.5">Predictive analytics with confidence intervals</p>
                </div>
                <div className="w-full h-64 text-[10px] font-bold">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={forecastData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                      <XAxis dataKey="name" stroke="#94a3b8" tickLine={false} />
                      <YAxis stroke="#94a3b8" domain={[0, 140000]} ticks={[0, 35000, 70000, 105000, 140000]} tickLine={false} />
                      <Tooltip />
                      <Legend iconSize={8} iconType="circle" wrapperStyle={{ paddingTop: '10px' }} />
                      <Line type="monotone" dataKey="historical" name="Historical" stroke="#3b82f6" strokeWidth={2.5} dot={{ r: 4, stroke: '#3b82f6', strokeWidth: 2, fill: '#fff' }} connectNulls animationDuration={800} />
                      <Line type="monotone" dataKey="forecast" name="Forecast" stroke="#8b5cf6" strokeWidth={2.5} strokeDasharray="4 4" dot={{ r: 4, stroke: '#8b5cf6', strokeWidth: 2, fill: '#fff' }} connectNulls animationDuration={800} />
                      <Line type="monotone" dataKey="upperBound" name="Upper Bound" stroke="#cbd5e1" strokeWidth={1} dot={{ r: 2 }} connectNulls />
                      <Line type="monotone" dataKey="lowerBound" name="Lower Bound" stroke="#cbd5e1" strokeWidth={1} dot={{ r: 2 }} connectNulls />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs flex flex-col justify-between">
                <div className="mb-4">
                  <div className="flex items-center gap-2 text-blue-600">
                    <Target size={16} />
                    <h4 className="text-sm font-black text-gray-900 tracking-tight">Budget Performance</h4>
                  </div>
                  <p className="text-[11px] text-gray-400 mt-0.5">Department-wise budget utilization tracking matrix</p>
                </div>
                <div className="space-y-4.5 flex-1 flex flex-col justify-center">
                  {budgetPerformanceData.map((item, idx) => (
                    <div key={idx} className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-black text-gray-800">{item.name}</span>
                        <span className="font-bold text-gray-500">
                          <span className="text-gray-900 font-black">{item.percentage}%</span> (${item.spent.toLocaleString()} / ${item.total.toLocaleString()})
                        </span>
                      </div>
                      <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                        <div className={`h-full ${item.color} rounded-full transition-all duration-1000`} style={{ width: `${item.percentage}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case "Category Analysis":
        return (
          <div className="space-y-6 transition-all duration-300 ease-in-out">
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs flex flex-col">
              <div className="mb-4">
                <div className="flex items-center gap-2 text-blue-600">
                  <BarChart3 size={18} />
                  <h4 className="text-sm font-black text-gray-900 tracking-tight">Detailed Expense Breakdown</h4>
                </div>
                <p className="text-[11px] text-gray-400 mt-0.5">Multi-category expense analysis over time</p>
              </div>

              <div className="w-full h-80 text-[10px] font-bold">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={categoryStackedData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                    <XAxis dataKey="name" stroke="#94a3b8" tickLine={false} />
                    <YAxis stroke="#94a3b8" domain={[0, 120000]} ticks={[0, 30000, 60000, 90000, 120000]} tickLine={false} />
                    <Tooltip formatter={(value) => `$${Number(value).toLocaleString()}`} />
                    <Legend iconSize={10} iconType="square" wrapperStyle={{ paddingTop: '15px' }} />
                    <Bar dataKey="Surveyor Costs" stackId="expenses" fill="#3b82f6" maxBarSize={50} animationDuration={1000} />
                    <Bar dataKey="Travel Expenses" stackId="expenses" fill="#10b981" maxBarSize={50} animationDuration={1000} />
                    <Bar dataKey="Equipment Costs" stackId="expenses" fill="#f59e0b" maxBarSize={50} animationDuration={1000} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 grid-cols-1 gap-6">
              <div className="w-full bg-white p-5 rounded-2xl border border-gray-100 shadow-xs"><ExpensePie /></div>
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs flex flex-col justify-center">
                <h3 className="font-black text-sm text-gray-900 tracking-tight mb-2">Operational Breakdown Insights</h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Travel and Port Accommodation currently represent the highest spikes on your ledger grid. Streamlining vendor contracts in frequent destinations could recover up to <span className="font-bold text-gray-800">12% of leakage funds</span>.
                </p>
              </div>
            </div>
          </div>
        );

      case "Regional Insights":
        return (
          <div className="space-y-6 transition-all duration-300 ease-in-out">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs">
              <div className="mb-5">
                <div className="flex items-center gap-2 text-blue-600">
                  <Globe size={18} />
                  <h4 className="text-sm font-black text-gray-900 tracking-tight">Regional Expense Analysis</h4>
                </div>
                <p className="text-[11px] text-gray-400 mt-0.5">Cost efficiency across geographical regions</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-5 w-full h-64 text-[10px] font-bold">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={regionalData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                      <XAxis dataKey="name" stroke="#94a3b8" tickLine={false} />
                      <YAxis stroke="#94a3b8" domain={[0, 60000]} ticks={[0, 15000, 30000, 45000, 60000]} tickLine={false} />
                      <Tooltip formatter={(value) => `$${Number(value).toLocaleString()}`} />
                      <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} maxBarSize={55} animationDuration={900} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="lg:col-span-7 space-y-3">
                  <span className="text-[10px] font-black uppercase tracking-wider text-gray-400 block mb-1">Regional Performance Metrics</span>
                  {regionalData.map((region, idx) => (
                    <div key={idx} className="p-4 border border-gray-100 bg-white rounded-xl hover:shadow-xs transition-all flex justify-between items-center">
                      <div className="space-y-0.5">
                        <h5 className="text-xs font-black text-gray-900">{region.name}</h5>
                        <p className="text-[11px] text-gray-400 font-medium">
                          Total Expenses: <span className="text-gray-700 font-bold">${region.value.toLocaleString()}</span> &bull; Avg Cost/Inspection: <span className="text-gray-700 font-bold">${region.avgCost}</span>
                        </p>
                        <p className="text-[10px] font-bold text-gray-400">Efficiency: <span className={region.efficiency === "High" ? "text-emerald-600" : "text-blue-600"}>{region.efficiency}</span></p>
                      </div>
                      <span className="text-[10px] font-bold bg-gray-50 border border-gray-200 text-gray-600 px-2.5 py-1 rounded-lg">
                        {region.inspections} inspections
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case "Cost Optimization":
        return (
          <div className="space-y-6 transition-all duration-300 ease-in-out">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 bg-white p-5 rounded-2xl border border-gray-100 shadow-xs space-y-4">
                <div>
                  <div className="flex items-center gap-2 text-emerald-600">
                    <Sparkles size={16} />
                    <h4 className="text-sm font-black text-gray-900 tracking-tight">Cost Optimization Opportunities</h4>
                  </div>
                  <p className="text-[11px] text-gray-400 mt-0.5">AI-powered recommendations for expense reduction</p>
                </div>

                <div className="space-y-3">
                  <div className="p-4 bg-emerald-50/40 border border-emerald-100 rounded-xl space-y-1">
                    <div className="flex items-center gap-2 text-emerald-700 text-xs font-black">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      High Impact
                    </div>
                    <h5 className="text-xs font-black text-gray-900">Regional Surveyor Optimization</h5>
                    <p className="text-[11px] text-gray-500 leading-relaxed">Deploy local surveyors for 85% of inspections to reduce travel costs by $18K/month</p>
                    <span className="inline-block text-[10px] font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md mt-1">Potential savings: $216K/year</span>
                  </div>

                  <div className="p-4 bg-blue-50/40 border border-blue-100 rounded-xl space-y-1">
                    <div className="flex items-center gap-2 text-blue-700 text-xs font-black">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      Medium Impact
                    </div>
                    <h5 className="text-xs font-black text-gray-900">Equipment Standardization</h5>
                    <p className="text-[11px] text-gray-500 leading-relaxed">Standardize inspection equipment across regions for bulk purchasing discounts</p>
                    <span className="inline-block text-[10px] font-black text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md mt-1">Potential savings: $48K/year</span>
                  </div>

                  <div className="p-4 bg-amber-50/40 border border-amber-100 rounded-xl space-y-1">
                    <div className="flex items-center gap-2 text-amber-700 text-xs font-black">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                      Quick Win
                    </div>
                    <h5 className="text-xs font-black text-gray-900">Digital Documentation</h5>
                    <p className="text-[11px] text-gray-500 leading-relaxed">Reduce printing and shipping costs through digital report delivery</p>
                    <span className="inline-block text-[10px] font-black text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md mt-1">Potential savings: $12K/year</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 bg-white p-5 rounded-2xl border border-gray-100 shadow-xs space-y-4 flex flex-col">
                <div>
                  <div className="flex items-center gap-2 text-blue-600">
                    <Zap size={16} />
                    <h4 className="text-sm font-black text-gray-900 tracking-tight">Cost Efficiency Metrics</h4>
                  </div>
                  <p className="text-[11px] text-gray-400 mt-0.5">Key performance indicators for cost management</p>
                </div>

                <div className="space-y-4 flex-1 flex flex-col justify-center">
                  <div className="p-4 bg-gray-50/50 border border-gray-100 rounded-xl flex items-center justify-between">
                    <div>
                      <h5 className="text-xs font-black text-gray-900">Cost per Inspection</h5>
                      <p className="text-[10px] text-gray-400 mt-0.5">Average across all regions</p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-black text-gray-900">$1,642</div>
                      <div className="text-[10px] font-bold text-emerald-600 flex items-center gap-0.5 justify-end">🏆 3.2% ↓</div>
                    </div>
                  </div>

                  <div className="p-4 bg-gray-50/50 border border-gray-100 rounded-xl flex items-center justify-between">
                    <div>
                      <h5 className="text-xs font-black text-gray-900">Travel Cost Ratio</h5>
                      <p className="text-[10px] text-gray-400 mt-0.5">Travel expenses vs total costs</p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-black text-gray-900">31.2%</div>
                      <div className="text-[10px] font-bold text-amber-600">📈 1.8% ↑</div>
                    </div>
                  </div>

                  <div className="p-4 bg-gray-50/50 border border-gray-100 rounded-xl flex items-center justify-between">
                    <div>
                      <h5 className="text-xs font-black text-gray-900">Budget Variance</h5>
                      <p className="text-[10px] text-gray-400 mt-0.5">Actual vs planned spending</p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-black text-gray-900">+1.8%</div>
                      <div className="text-[9px] font-black bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded-md mt-0.5">Within target</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "Budget Management":
        return (
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-xl font-black tracking-tight text-gray-900">Budget Management</h1>
                <h4 className="text-gray-400 text-xs mt-0.5">Monitor and control financial allocations across departments</h4>
              </div>
              <div className="flex space-x-2.5 items-center w-full sm:w-auto justify-end">
                <div className="bg-slate-100 text-black px-2 py-1 rounded-xl border border-gray-200">
                  <select className="bg-transparent text-xs font-bold outline-none cursor-pointer p-1" value={prevmonths} onChange={(e) => setPrevmonths(e.target.value)}>
                    {weeks.map((week) => <option key={week} value={week}>{week}</option>)}
                  </select>
                </div>
                <button type="button" onClick={() => setIsModalOpen(true)} className="bg-blue-600 text-white text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-blue-700 transition-all cursor-pointer">Add Expense</button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
              {Cards.map((card, idx) => (
                <div key={idx} className="p-5 border border-gray-100 bg-white rounded-2xl hover:bg-gray-50/50 transition-all flex flex-col justify-between min-h-32 shadow-2xs hover:shadow-md">
                  <h1 className="text-[10px] text-gray-400 font-black uppercase tracking-wider">{card.title}</h1>
                  <div className="flex items-center my-1">
                    <span className="text-xl font-black text-gray-900">${card.amount}</span>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] font-bold">
                    <div className={card.taglineTextCol}>{card.icon}</div>
                    <p className={card.taglineTextCol}>{card.tagline}</p>
                  </div>
                  <p className="text-[10px] font-medium text-gray-400 mt-1">{card.conclude}</p>
                </div>
              ))}
            </div>

            <div className="pt-4 space-y-2">
              <div className="flex items-center gap-2 text-rose-600 font-semibold text-sm">
                <CheckCircle size={18} />
                <h3>CapEx vs OpEx Threshold Limits</h3>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">
                Set hard spending locks on variable disbursements. Current utilization stands at <span className="font-bold text-gray-800">78%</span> of the sanctioned operational threshold limits for this quarter.
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="p-6 max-w-400 mx-auto space-y-6 antialiased text-gray-800">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gray-100 pb-5">
        <div>
          <h2 className="text-2xl font-black tracking-tight text-gray-900">Expense Analytics & Budget Forecasting</h2>
          <h4 className="text-xs text-gray-400 mt-0.5">Advanced financial insights engine optimized for global maritime deployments</h4>
        </div>

        <div className="flex space-x-2.5 items-center w-full sm:w-auto justify-end">
          <div className="bg-slate-100 text-black px-2 py-1 rounded-xl border border-gray-200">
            <select className="bg-transparent text-xs font-bold outline-none cursor-pointer p-1" value={prevmonths} onChange={(e) => setPrevmonths(e.target.value)}>
              {months.map((month) => <option key={month} value={month}>{month}</option>)}
            </select>
          </div>
          <button type="button" onClick={() => setIsModalOpen(true)} className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs transition-all active:scale-98 cursor-pointer">
            Add Expense
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Cards.map((card, index) => (
          <div key={index} className="p-5 bg-white border border-gray-100 rounded-2xl shadow-xs hover:border-gray-200 transition-all flex flex-col justify-between min-h-32">
            <h1 className="text-[10px] font-black text-gray-400 uppercase tracking-wider">{card.title}</h1>
            <div className="flex items-center my-1">
              <span className="text-2xl font-black text-gray-900 tracking-tight">${card.amount}</span>
            </div>
            <div className="flex items-center gap-1 text-[11px] font-bold">
              <div className={card.taglineTextCol}>{card.icon}</div>
              <p className={card.taglineTextCol}>{card.tagline}</p>
            </div>
            <p className="text-[10px] text-gray-400 mt-1 font-medium">{card.conclude}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-2 border-b border-gray-100 pb-2">
        {tabNames.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all duration-150 cursor-pointer ${
              activeTab === tab
                ? "bg-blue-600 text-white shadow-xs"
                : "text-gray-500 hover:bg-gray-100"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-2 text-xs font-bold text-gray-500 bg-gray-50 border border-gray-100 px-3 py-1.5 rounded-xl w-fit">
        <Podcast size={14} className="text-blue-500 animate-pulse" />
        <span>Current Active View Pipeline: <span className="text-gray-900 font-black">{activeTab}</span></span>
      </div>

      <div className="min-h-64">{renderTabContent()}</div>

      <div className="w-full border-t border-gray-100 pt-6">
        <h3 className="font-black mb-4 text-sm tracking-tight text-gray-900">Recent Transactions Ledger</h3>
        <ExpenseTable expenses={reduxExpenses} />
      </div>

      <Calender2 />

      <AddExpenseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmitExpense}
        formData={formData}
        setFormData={setFormData}
      />
    </div>
  );
};

export default Expenses;
