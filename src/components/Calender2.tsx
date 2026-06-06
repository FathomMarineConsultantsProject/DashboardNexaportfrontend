import { Building, ForkKnife, Plane } from "lucide-react";

const Calender2 = () => {
  const boxs = [
    {
      icon: <Plane />,
      iconbg: "bg-blue-100",
      icontext:"text-blue-400",
      title: "Travel- Singapore",
      Substitle: "Alan Fu - MV Atlantic Survey",
      Amt: 349,
      Atd: "pending",
      Atdcoloram: "text-amber-600",
      Atdbg: "bg-amber-100",
    },
    {
      icon: <Building/>,
      iconbg: "bg-emerald-100",
      icontext:"text-emerald-400",
      title: "Accommodation",
      Substitle: "Abhishek Singh - Hong Kong",
      Amt: 300,
      Atd: "approved",
      Atdcolor: "text-emerald-600",
      Atdbg: "bg-emerald-100",
    },
    {
      icon: <ForkKnife />,
      iconbg: "bg-stone-100",
      icontext:"text-stone-400",
      title: 'Meals & Allowance',
      Substitle: 'Maria Rodriguez - Dubai ',
      Amt:180 , 
      Atd: 'approved' ,
      Atdcolor: "text-emerald-600",
      Atdbg: "bg-emerald-100",
      
    },
  ];

  return (
    <div className="rounded-2xl  border-gray-200 p-3 bg-white shadow-sm">
      <div className="flex flex-col space-y-1.5 p-5 border-b-2 mb-2 border-stone-200">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-semibold leading-none tracking-tight">
            Expense Management
          </div>
          <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium transition-colors bg-blue-500 hover:bg-blue-600 p-3 text-white active:scale-90">
            Add Expense
          </button>
        </div>
      </div>
      <div className="p-3 pt-0 py-30">
        <div className="space-y-4">
          {boxs.map((box, id) => (
            <div
            key={id}
              className="flex justify-between items-center p-4 rounded-2xl bg-stone-50 hover:bg-stone-100"
            >
              <div className="flex items-center space-x-3">
                <div className={`p-3 rounded-lg ${box.iconbg} ${box.icontext}`}>
                  {box.icon}
                </div>
                <div className="">
                  <h4 className="font-semibold text-stone-900">
                    {box.title}
                    </h4>
                  <p className="text-sm text-stone-600">
                    {box.Substitle}
                  </p>
                </div>
              </div>
              <div className="">
                <p className="font-semibold text-stone-900">$349</p>
                <span
                  className={`text-xs font-semibold px-2  py-1 rounded-2xl ${box.Atdbg} ${box.Atdcolor}`}
                >{box.Atd}
                </span>
              </div>
            </div>
          ))}
          
        </div>
        <div className="mt-6 border-t p-4 border-stone-200">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-stone-600">
              Total Pending
            </span>
            <span className="font-bold text-lg">$1,209</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-stone-600">
              Monthly Total
            </span>
            <span className="font-bold text-lg">$1,726</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calender2;
