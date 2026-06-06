import { Book, File, Lock, Shield, Ship, Upload, User } from "lucide-react";
import type { ReactNode } from "react";

interface Card {
  Icon: ReactNode;
  Title: string;
  Subtitle: string;
  section: number;
  Atd: string;
  bgcolori: string;
  colori: string;
  colora: string;
  bgcolora: string;
}

const InspectionModule: React.FC = () => {
  const data: Card[] = [
    {
      Icon: <Ship />,
      Title: "Pre-Purchase Survey",
      Subtitle: "Condition assessment & risk evaluation",
      section: 12,
      Atd: "Active",
      bgcolori: "bg-blue-100",
      colori: "text-blue-400",
      colora: "text-green-400",
      bgcolora: "bg-green-100",
    },

    {
      Icon: <Shield />,
      Title: "ISM/SMS Audit",
      Subtitle: "Safety management system review",
      section: 8,
      Atd: "In-Active",
      bgcolori: "bg-green-100",
      colori: "text-green-400",
      bgcolora: "bg-red-100",
      colora: "text-red-400",
    },

    {
      Icon: <Lock />,
      Title: "ISPS Security",
      Subtitle: "Security compliance audit",
      section: 6,
      Atd: "Active",
      bgcolori: "bg-stone-100",
      colori: "text-stone-400",
      colora: "text-green-400",
      bgcolora: "bg-green-100",
    },

    {
      Icon: <User />,
      Title: "MLC Inspection",
      Subtitle: "Maritime Labour Convention",
      section: 10,
      Atd: "In-Active",
      bgcolori: "bg-purple-100",
      colori: "text-purple-400",
      bgcolora: "bg-red-100",
      colora: "text-red-400",
    },

    {
      Icon: <File />,
      Title: "SIRE 2.0 Vetting",
      Subtitle: "Oil major inspection protocols",
      section: 15,
      Atd: "Active",
      bgcolori: "bg-red-100",
      colori: "text-red-400",
      colora: "text-green-400",
      bgcolora: "bg-green-100",
    },

    {
      Icon: <Book />,
      Title: "Dry Dock Survey",
      Subtitle: "Hull & machinery inspection",
      section: 9,
      Atd: "Active",
      bgcolori: "bg-amber-100",
      colori: "text-amber-400",
      colora: "text-green-400",
      bgcolora: "bg-green-100",
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8 ">
      {/* Left part 75% */}

      <div className="lg:col-span-2  ">
        {/* Tile/Sub-Header */}

        <div className="rounded-2xl  bg-white  shadow-lg  shadow-slate-200 hover:scale-100">
          {/* Header/ Title */}

          <div className="p-7 space-y-1.5 flex flex-col ">
            <h1 className="text-2xl font-black  leading-none tracking-tight">
              Inspection Module Template
            </h1>
            <p className="text-sm text-stone-500 -mt-1">
              Pre Built and Customizable inspection templates
            </p>
          </div>

          {/* Border of Card Section */}

          <div className="p-6 pt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Card */}

              {data.map((card) => (
                <div key={card.Title} className="rounded-lg shadow-stone-200 shadow-md p-4 hover:scale-105 hover:border-stone-50 cursor-pointer">
                  {/* Card Upper Part with Icon */}

                  <div className="flex items-center space-x-3">
                    <div
                      className={`${card.bgcolori} ${card.colori} rounded-xl  p-2`}
                    >
                      {card.Icon}
                    </div>

                    <div>
                      <h4 className="font-semibold text-stone-800  ">
                        {card.Title}
                      </h4>

                      <p className="text-sm text-stone-600 ">{card.Subtitle}</p>
                    </div>
                  </div>

                  {/* Card Lower Part with its info */}

                  <div className="mt-3 flex items-center space-x-2">
                    <span className="bg-stone-100 text-xs text-stone-900 px-2 py-1 rounded-lg">
                      {card.section} Sections
                    </span>

                    <span
                      className={`${card.bgcolora} ${card.colora} text-xs  px-2 py-1 rounded-lg`}
                    >
                      {card.Atd}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right part 25% */}

      <div className="rounded-2xl shadow-md shadow-stone-100 bg-white">
        {/* Upper Part */}

        <div className="flex flex-col space-y-1.5 p-6">
          <div className="flex items-center justify-between">
            <div className="">
              <h1 className="font-bold text-2xl tracking-tight leading-none">
                Photo Documentation Interface
              </h1>

              <p className="text-sm text-stone-700 mt-0.5">
                AI-powered categorization and annotation tools
              </p>
            </div>

            <div className="flex space-x-2">
              <button className="inline-flex  bg-black text-white px-3 py-1 text-sm  rounded-2xl shadow shadow-stone-50 hover:shadow-stone-600 active:scale-95">
                <Upload /> Bulk Upload
              </button>

              <button className="inline-flex bg-gray-100 shadow text-sm   shadow-stone-300 text-black px-2.5 py-1 justify-center items-center rounded-2xl hover:shadow-stone-500 active:scale-95">
                Filter
              </button>
            </div>
          </div>
        </div>

        {/* Lower Part */}

        <div className="p-3 -mt-8">
          <div className="grid grid-cols-2 gap-1">
            {[
              {title: "All Photos",
                boderc: "boder-gray-200",
                textc: "text-gray-800",
                bg: "bg-gray-200",
                hbg: "hover:bg-gray-400",
                htextc: "text-gray-400"
              },
              {title: "Hull & Structure",
                boderc: "boder-amber-200",
                textc: "text-amber-800",
                bg: "bg-amber-200",
                hbg: "hover:bg-amber-400",
                htextc: "text-Amber-400"
              },
              {title: "Machinery",
                boderc: "boder-purple-200",
                textc: "text-purple-800",
                bg: "bg-purple-200",
                hbg: "hover:bg-purple-400",
                htextc: "text-purple-400"
              },
              {title: "Safety Equipment",
                boderc: "boder-blue-200",
                textc: "text-blue-800",
                bg: "bg-blue-200",
                hbg: "hover:bg-blue-400",
                htextc: "text-blue-400"
              },
              {title: "Critical Issues",
                boderc: "boder-cyan-200",
                textc: "text-cyan-800",
                bg: "bg-cyan-200",
                hbg: "hover:bg-cyan-400",
                htextc: "text-cyan-400"
              },
              {title: "Accomadation",
                boderc: "boder-red-200",
                textc: "text-red-800",
                bg: "bg-red-200",
                hbg: "hover:bg-red-400",
                htextc: "text-red-400"
              },].map((item, i) => (
              <span
                key={i}
                className={`px-2.5 py-0.5 text-sm hover:font-bold hover:scale-105 rounded-2xl ${item.bg} ${item.boderc} ${item.hbg} ${item.textc} ${item.htextc} `}
              >
                {item.title}
              </span>
            ))}
          </div>

          <div></div>

          <div></div>
        </div>
      </div>
    </div>
  );
};

export default InspectionModule;
