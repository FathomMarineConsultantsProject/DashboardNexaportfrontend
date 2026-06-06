import {
  Pie,
  PieChart,
  Sector,
  type PieSectorDataItem,
  Tooltip,
  // type TooltipIndex,
  ResponsiveContainer,
  Cell,
} from "recharts";
// import { RechartsDevtools } from "@recharts/devtools";

const data = [
  { name: "Travel", value: 45, color: "cyan" },
  { name: "Accommodation", value: 25, color: "blue" },
  { name: "Meals", value: 15, color: "indigo" },
  { name: "Agency Fees", value: 15, color: "Purple" },
];

// #endregion
const renderActiveShape = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  startAngle,
  endAngle,
  fill,
  payload,
  // percent,
  value,
}: PieSectorDataItem) => {
  const RADIAN = Math.PI / 180;
  const sin = Math.sin(-RADIAN * (midAngle ?? 2));
  const cos = Math.cos(-RADIAN * (midAngle ?? 2));
  const sx = (cx ?? 0) + ((outerRadius ?? 0) + 10) * cos;
  const sy = (cy ?? 0) + ((outerRadius ?? 0) + 10) * sin;
  const mx = (cx ?? 0) + ((outerRadius ?? 0) + 20) * cos;
  const my = (cy ?? 0) + ((outerRadius ?? 0) + 20) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy} dy={20} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={(outerRadius ?? 0) + 6}
        outerRadius={(outerRadius ?? 0) + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={1} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >{`${value}`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={20}
        textAnchor={textAnchor}
        fill="#999"
      >
        {/* {`(Rate ${((percent ?? 1) * 100).toFixed()}%)`} */}
      </text>
    </g>
  );
};

const ExpensePie = ({isAnimationActive = true,}: {isAnimationActive?: boolean;}) =>{
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm h-full flex flex-col">
      <h3 className="font-black text-lg  mb-1">Expense Distribution</h3>
      
      {/* Chart Container - Fixed Height for the Pie itself */}
      <div className="h-62.5 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              activeShape={renderActiveShape}
              data={data}
              innerRadius={60}
              outerRadius={80}
              paddingAngle={1}
              isAnimationActive={isAnimationActive}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Labels List */}
      <div className="mt-6 space-y-3">
        {data.map((item) => (
          <div key={item.name} className="flex justify-between items-center text-sm">
            <div className="flex items-center gap-2 text-slate-500">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
              {item.name}
            </div>
            <span className="font-semibold text-slate-900">{item.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};
export default ExpensePie;



// 
      // <PieChart
      //   style={{
      //     width: "100%",
      //     maxWidth: "700px",
      //     maxHeight: "80vh",
      //     aspectRatio: 1,
      //   }}
      //   responsive
      //   margin={{
      //     top: 50,
      //     right: 120,
      //     bottom: 0,
      //     left: 120,
      //   }}
      // >
      //   <Pie
      //
      //     data={data}
      //     cx="60%"
      //     cy="40%"
      //     innerRadius="65%"
      //     outerRadius="8 0%"
      //     fill="#8884d8"
      //     dataKey="value"
      //     isAnimationActive={isAnimationActive}
      //   />
      //   <Tooltip content={() => null} defaultIndex={defaultIndex} />
      //   <RechartsDevtools />
      // </PieChart>