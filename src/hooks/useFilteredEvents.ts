import { useMemo, useState } from "react";
import { Event } from "../Firebase/eventsService";

export const useFilteredEvents = (events: Event[]) => {
  const [search, setSearch] = useState("");
  const [importance, setImportance] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      const matchesSearch =
        event.title.toLowerCase().includes(search.toLowerCase()) ||
        event.description.toLowerCase().includes(search.toLowerCase());

      const matchesImportance = importance ? event.importance === importance : true;

      const matchesDate = selectedDate
        ? new Date(event.datetime).toDateString() === selectedDate.toDateString()
        : true;

      return matchesSearch && matchesImportance && matchesDate;
    });
  }, [events, search, importance, selectedDate]);

  return {
    search,
    setSearch,
    importance,
    setImportance,
    selectedDate,
    setSelectedDate,
    filteredEvents,
  };
};
