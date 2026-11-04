import React, { useState } from 'react';
import Calendar from '../../components/shared/Calendar';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';

const SchoolCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  const formatMonthYear = (date) => {
    return format(date, 'MMMM yyyy', { locale: es });
  };

  return (
    <div className="bg-white rounded-xl  overflow-x-auto p-4  items-center">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Calendario escolar</h3>
        <div className="flex items-center space-x-2 cursor-pointer">
          <span className="text-sm font-medium">{formatMonthYear(currentMonth)}</span>
        </div>
      </div>
      
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={setSelectedDate}
        onMonthChange={setCurrentMonth}
        className="w-full pointer-events-auto text-sm  items-center justify-center"
        components={{
          PreviousMonthButton: ({ ...props }) => (
            <button {...props} className="h-8 w-8 bg-transparent p-0 hover:opacity-100 text-blue-900 hover:text-blue-500">
              <ChevronLeft className="h-6 w-6" />
            </button>
          ),
          NextMonthButton: ({ ...props }) => (
            <button {...props} className="h-8 w-8 bg-transparent p-0 hover:opacity-100  text-blue-900  hover:text-blue-500">
              <ChevronRight className="h-6 w-6" />
            </button>
          ),
          DayButton: (props) => {
            const isSelected = props.selected;
            const isToday = props.today;
            return (
              <button
              {...props}
              className={
                "h-12 w-12 sm:h-11 sm:w-11 md:h-10 md:w-10 max-w-6  xs:w-12 rounded-full transition-all duration-200 flex items-center justify-center " +
                (isSelected
                  ? "bg-gradient-to-tr from-blue-500 to-purple-500 text-white font-bold shadow-lg scale-110 border-2 border-white ring-2 ring-blue-300"
                  : isToday
                  ? "bg-gray-200 text-gray-900 font-medium"
                  : "hover:bg-gray-100")
              }
            >
              {props.children}
            </button>
            );
          },
        }}
        classNames={{
          months: "flex flex-col justify-center    ",
          month: "-space-y-10 w-full pl-12  ",
          caption: " hidden flex justify-center pt-1 relative items-center",
          caption_label: "hidden text-sm font-medium",
          nav: "space-x-1 flex items-center justify-between ",
          table: "w-full space-y-0",
          head_row: "flex",
          head_cell: "text-gray-500 rounded-md w-8 font-normal text-xs",
          row: "flex w-full mt-2",
          cell: "h-8 w-8 text-center text-sm p-0 relative hover:bg-gray-100 rounded",
          day: "h-8 w-8 p-0  hover:bg-gray-100 rounded-full",
          day_range_end: "day-range-end",
          day_selected: "bg-gradient-to-tr from-blue-500 to-purple-500 text-white font-bold shadow-lg scale-110 border-2 border-white ring-2 ring-blue-300 transition-all duration-200",
          day_today: "bg-gray-200 text-gray-900  ",
          day_outside: "text-gray-300 opacity-50",
          day_disabled: "text-gray-300 opacity-50",
          day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
          day_hidden: "invisible",
        }}
      />
    </div>
  );
};

export default SchoolCalendar; 