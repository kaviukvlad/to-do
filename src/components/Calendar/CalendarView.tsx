import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Event } from "../../Firebase/eventsService";
import { useState, useEffect } from "react";

type Value = Date | null;

interface Props {
  events: Event[];
  onSelectDate: (date: Date | null) => void;
  userId: string;
}

export const CalendarView = ({ events, onSelectDate, userId }: Props) => {
  const [value, setValue] = useState<Value>(null);

  useEffect(() => {
    setValue(null);
    onSelectDate(null);
  }, [userId, onSelectDate]);

  const handleChange = (newValue: unknown, _event: React.MouseEvent<HTMLButtonElement>) => {
    const value = newValue as Value;
    if (value instanceof Date) {
      setValue(value);
      onSelectDate(value);
    } else {
      setValue(null);
      onSelectDate(null);
    }
  };

  return (
    <div className="max-w-md mx-auto my-4">
      <Calendar
        selectRange={false}
        onChange={handleChange}
        value={value}
        tileClassName={({ date, view }) => {
          if (
            view === "month" &&
            events.some(
              (ev) =>
                new Date(ev.datetime).toDateString() === date.toDateString()
            )
          ) {
            return "bg-blue-400 text-white font-bold rounded-full";
          }
          return null;
        }}
        tileContent={({ date, view }) => {
          if (
            view === "month" &&
            events.some(
              (ev) =>
                new Date(ev.datetime).toDateString() === date.toDateString()
            )
          ) {
            return (
              <div className="flex justify-center mt-1">
                <svg
                  className="text-blue-600"
                  height="6"
                  width="6"
                  viewBox="0 0 10 10"
                  fill="currentColor"
                >
                  <circle cx="5" cy="5" r="5" />
                </svg>
              </div>
            );
          }
          return null;
        }}
      />
    </div>
  );
};