import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock, AlertCircle, ShieldCheck } from 'lucide-react';

interface MarineEvent {
  dateStr: string;
  type: 'inspection' | 'drill' | 'compliance';
  title: string;
  time: string;
}

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date()); 
  const [events, setEvents] = useState<MarineEvent[]>([]);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Fetch active schedule tags directly from PostgreSQL backend server
  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const response = await axios.get('http://localhost:5000/schedules');
        setEvents(response.data);
      } catch (error) {
        console.error("Could not fetch calendar milestones from backend:", error);
      }
    };
    fetchSchedules();
  }, [currentDate]);

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  const changeMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(new Date(currentDate.getFullYear(), 
      currentDate.getMonth() + (direction === 'prev' ? -1 : 1), 1));
  };

  const changeYear = (yearOffset: number) => {
    setCurrentDate(new Date(currentDate.getFullYear() + yearOffset, currentDate.getMonth(), 1));
  };

  const daysInMonth = getDaysInMonth(currentDate);

  const getEventsForDay = (dayDate: Date) => {
    const localISO = `${dayDate.getFullYear()}-${String(dayDate.getMonth() + 1).padStart(2, '0')}-${String(dayDate.getDate()).padStart(2, '0')}`;
    return events.filter(e => e.dateStr === localISO);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 w-full mx-auto space-y-6 transition-all duration-300">
      
      {/* Header Controllers */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-50">
        <div className="flex gap-1.5 bg-gray-50 p-1.5 rounded-xl border border-gray-100/80">
          <button 
            onClick={() => changeYear(-1)}
            className="px-3 py-1 text-xs font-bold text-gray-400 hover:text-gray-700 hover:bg-white rounded-lg transition-all cursor-pointer"
          >
            {currentDate.getFullYear() - 1}
          </button>
          <button 
            onClick={() => changeMonth('prev')}
            className="p-1 hover:bg-white text-gray-600 rounded-lg transition-all cursor-pointer shadow-2xs"
          >
            <ChevronLeft size={16} />
          </button>
        </div>
        
        <div className="text-center">
          <h2 className="text-xl font-black text-gray-900 tracking-tight flex items-center justify-center gap-2">
            <CalendarIcon size={20} className="text-blue-600" />
            {months[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>
        </div>
        
        <div className="flex gap-1.5 bg-gray-50 p-1.5 rounded-xl border border-gray-100/80">
          <button 
            onClick={() => changeMonth('next')}
            className="p-1 hover:bg-white text-gray-600 rounded-lg transition-all cursor-pointer shadow-2xs"
          >
            <ChevronRight size={16} />
          </button>
          <button 
            onClick={() => changeYear(1)}
            className="px-3 py-1 text-xs font-bold text-gray-400 hover:text-gray-700 hover:bg-white rounded-lg transition-all cursor-pointer"
          >
            {currentDate.getFullYear() + 1}
          </button>
        </div>
      </div>

      {/* Weekdays Grid */}
      <div className="grid grid-cols-7 gap-2 text-center">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
          <div 
            key={day} 
            className={`text-xs font-bold uppercase tracking-wider py-2 rounded-lg ${
              index === 0 || index === 6 ? 'text-gray-400' : 'text-gray-500'
            }`}
          >
            {day}
          </div>
        ))}
      </div>

      {/* Days Matrix Grid */}
      <div className="grid grid-cols-7 gap-3">
        {Array(firstDayOfMonth).fill(0).map((_, i) => (
          <div key={`empty-${i}`} className="min-h-14 opacity-0 pointer-events-none" />
        ))}
        
        {Array(daysInMonth).fill(0).map((_, i) => {
          const day = i + 1;
          const dayDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
          const isSelected = selectedDate?.toDateString() === dayDate.toDateString();
          const isToday = dayDate.toDateString() === new Date().toDateString();
          const dayEvents = getEventsForDay(dayDate);

          return (
            <button
              key={day}
              type="button"
              onClick={() => setSelectedDate(dayDate)}
              className={`min-h-14 relative group rounded-xl font-bold text-base flex flex-col items-center justify-center transition-all cursor-pointer active:scale-95 p-2
                ${isSelected 
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-100' 
                  : isToday 
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-300 ring-2 ring-emerald-100/50' 
                  : 'bg-gray-50/60 text-gray-800 hover:bg-blue-50 hover:text-blue-600'
                }`}
            >
              <span className="mb-1">{day}</span>

              {/* Event indicators dots container */}
              <div className="h-1.5 flex gap-0.5 justify-center items-center">
                {dayEvents.length > 0 && dayEvents.map((ev, idx) => {
                  const dotColor = {
                    inspection: isSelected ? 'bg-white' : 'bg-blue-500',
                    drill: isSelected ? 'bg-white' : 'bg-amber-500',
                    compliance: isSelected ? 'bg-white' : 'bg-emerald-500',
                  }[ev.type] || 'bg-gray-400';
                  
                  return (
                    <span 
                      key={idx} 
                      className={`w-1.5 h-1.5 rounded-full ${dotColor}`} 
                    />
                  );
                })}
              </div>
            </button>
          );
        })}
      </div>

      {/* Dynamic Summary Dashboard Area */}
      <div className="pt-5 border-t border-gray-100 min-h-35">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-[11px] font-black uppercase text-gray-400 tracking-wider">
              Schedule Summary Nodes
            </span>
            {selectedDate && (
              <span className="text-xs font-bold text-gray-500 bg-gray-100 px-3 py-1 rounded-xl font-mono">
                {selectedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </span>
            )}
          </div>

          {selectedDate && getEventsForDay(selectedDate).length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {getEventsForDay(selectedDate).map((event, index) => {
                const theme = {
                  inspection: { icon: <AlertCircle size={14}/>, bg: 'bg-blue-50/60 border-blue-100 text-blue-800' },
                  drill: { icon: <Clock size={14}/>, bg: 'bg-amber-50/60 border-amber-100 text-amber-800' },
                  compliance: { icon: <ShieldCheck size={14}/>, bg: 'bg-emerald-50/60 border-emerald-100 text-emerald-800' },
                }[event.type] || { icon: <Clock size={14}/>, bg: 'bg-gray-50 border-gray-100 text-gray-800' };

                return (
                  <div 
                    key={index} 
                    className={`flex items-center justify-between p-3.5 border rounded-xl text-xs font-semibold ${theme.bg}`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="shrink-0">{theme.icon}</span>
                      <span className="font-bold tracking-tight">{event.title}</span>
                    </div>
                    <span className="font-mono text-[11px] bg-white/80 px-2 py-0.5 rounded-md border border-inherit shadow-2xs shrink-0 ml-2">
                      {event.time}
                    </span>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-6 bg-gray-50/70 border border-gray-100 rounded-xl text-center flex flex-col items-center justify-center">
              <p className="text-xs font-bold text-gray-400">No vetting inspections or operational slots mapped to this index slot.</p>
            </div>
          )}
        </div>
      </div>

    </div>
  );
};

export default Calendar;