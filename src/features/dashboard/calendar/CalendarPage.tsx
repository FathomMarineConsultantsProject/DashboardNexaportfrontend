import Calendar from "../../../components/Calendar";

const CalendarPage = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold leading-none tracking-wide mb-6">
        Inspection Schedule
      </h2>
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
        
        <Calendar />

      </div>
    </div>
  );
};

export default CalendarPage;
