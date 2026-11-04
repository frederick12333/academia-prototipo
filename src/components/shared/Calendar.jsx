import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";
import { es } from "date-fns/locale";
import "react-day-picker/dist/style.css";

const Calendar = ({
  className,
  showOutsideDays = true,
  ...props
}) => {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      locale={es}
      weekStartsOn={1}
      className={`p-3 ${className}`}
    
      components={{
        DayButton: (props) => {
            const isSelected = props.selected;
            const isToday = props.today;
            return (
              <button
                {...props}
                className={
                  "h-8 w-8 rounded-full transition-all duration-200 " +
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
        IconLeft: () => <ChevronLeft className="h-2 w-2 text-gray-500" />,
        IconRight: () => <ChevronRight className="h-2 w-2 text-gray-500" />,
      }}
      {...props}
    />
  );
};

export default Calendar;
