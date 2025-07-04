import React, { useState, useEffect, useRef } from "react";
import { Calendar, momentLocalizer, View } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Event } from "../../Firebase/eventsService";

interface Props {
  events: Event[];
  onSelectDate: (date: Date | null) => void;
  userId: string;
}

const localizer = momentLocalizer(moment);

type CustomToolbarProps = {
  label: string;
  onNavigate: (action: "PREV" | "NEXT" | "TODAY") => void;
  onView: (view: View) => void;
  views: View[];
  view: View;
};

const CustomEvent = ({ event }: { event: any }) => {
  return (
    <div
      className="overflow-hidden whitespace-nowrap text-ellipsis
                 px-2 py-1 rounded-md shadow cursor-pointer
                 hover:bg-opacity-90 transition select-none"
      title={event.title}
      style={{ fontWeight: 600, fontSize: "0.85rem" }}
    >
      {event.title}
    </div>
  );
};

export const CalendarView: React.FC<Props> = ({ events, onSelectDate, userId }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [currentView, setCurrentView] = useState<View>("month");
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  const calendarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSelectedDate(null);
    onSelectDate(null);
    setCurrentDate(new Date());
    setCurrentView("month");
  }, [userId, onSelectDate]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node)
      ) {
        setSelectedDate(null);
        onSelectDate(null);
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [onSelectDate]);

  const rbcEvents = events.map((ev) => ({
    title: ev.title || "Подія",
    start: new Date(ev.datetime),
    end: new Date(ev.datetime),
    allDay: true,
    resource: ev,
  }));

  const handleSelectSlot = ({ start }: { start: Date }) => {
    setSelectedDate(start);
    onSelectDate(start);
    setCurrentDate(start);
  };

  const handleSelectEvent = (event: { start: Date }) => {
    setSelectedDate(event.start);
    onSelectDate(event.start);
    setCurrentDate(event.start);
  };

  const handleNavigate = (date: Date) => {
    setCurrentDate(date);
  };

  return (
    <div
      ref={calendarRef}
      className="max-w-6xl mx-auto my-8 p-6 bg-white rounded-xl shadow-lg"
    >
      <Calendar
        localizer={localizer}
        events={rbcEvents}
        startAccessor="start"
        endAccessor="end"
        selectable
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectEvent}
        onNavigate={handleNavigate}
        date={currentDate}
        view={currentView}
        onView={setCurrentView}
        views={["month", "week", "day"]}
        style={{ height: 650 }}
        dayPropGetter={(date: Date) => {
          if (selectedDate && date.toDateString() === selectedDate.toDateString()) {
            return {
              className:
                "bg-indigo-300 rounded-lg border border-indigo-500 shadow-md",
            };
          }
          return {};
        }}
        eventPropGetter={(event) => {
          let backgroundColor = "#22c55e";
          if (event.resource.importance === "critical") backgroundColor = "#dc2626";
          else if (event.resource.importance === "important") backgroundColor = "#ca8a04";

          return {
            style: {
              backgroundColor,
              color: "white",
              borderRadius: 6,
              padding: "2px 6px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
              border: "none",
            },
          };
        }}
        components={{
          event: CustomEvent,
          toolbar: (toolbar: CustomToolbarProps) => (
            <div className="flex items-center justify-between mb-4 px-4">
              <div className="flex items-center space-x-3">
                <button
                  className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-md hover:bg-indigo-200 transition"
                  onClick={() => toolbar.onNavigate("PREV")}
                >
                  ←
                </button>
                <button
                  className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-md hover:bg-indigo-200 transition"
                  onClick={() => toolbar.onNavigate("TODAY")}
                >
                  Сьогодні
                </button>
                <button
                  className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-md hover:bg-indigo-200 transition"
                  onClick={() => toolbar.onNavigate("NEXT")}
                >
                  →
                </button>
              </div>
              <h2 className="text-xl font-semibold text-gray-900">
                {toolbar.label}
              </h2>
              <div className="flex items-center space-x-2">
                {toolbar.views.map((view) => (
                  <button
                    key={view}
                    className={`px-3 py-1 rounded-md font-medium transition ${
                      toolbar.view === view
                        ? "bg-indigo-600 text-white"
                        : "bg-indigo-100 text-indigo-700 hover:bg-indigo-200"
                    }`}
                    onClick={() => toolbar.onView(view)}
                  >
                    {view.charAt(0).toUpperCase() + view.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          ),
        }}
      />
    </div>
  );
};