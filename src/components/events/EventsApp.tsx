import { useContext, useState } from "react";
import { useEvents } from "../../hooks/useEvents";
import { useFilteredEvents } from "../../hooks/useFilteredEvents";
import { EventForm } from "../Form/EventForm";
import { EventList } from "../Calendar/EventList";
import { CalendarView } from "../Calendar/CalendarView";
import { AuthContext } from "../../context/authContext";

export const EventsApp = () => {
  const { events, loading, error, addEvent, editEvent, removeEvent } = useEvents();
  const { userId, handleLogOut } = useContext(AuthContext);
  const [adding, setAdding] = useState(false);

  const {
    search,
    setSearch,
    importance,
    setImportance,
    selectedDate,
    setSelectedDate,
    filteredEvents,
  } = useFilteredEvents(events);

  if (!userId) {
    return <p>Завантаження користувача...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Календар подій</h1>
        <button
          onClick={handleLogOut}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Вийти
        </button>
      </div>

      <CalendarView
        events={events}
        onSelectDate={setSelectedDate}
        userId={userId}
      />

      {adding ? (
        <EventForm
          userId={userId}
          onSave={async (data) => {
            await addEvent(data);
            setAdding(false);
          }}
          onCancel={() => setAdding(false)}
        />
      ) : (
        <button
          onClick={() => setAdding(true)}
          className="bg-green-500 text-white px-4 py-2 rounded mb-4"
        >
          Додати подію
        </button>
      )}

      {error && <p className="text-red-600">{error}</p>}
      {loading && <p>Завантаження...</p>}

      <EventList
        events={filteredEvents}
        onEdit={editEvent}
        onDelete={removeEvent}
        search={search}
        setSearch={setSearch}
        importance={importance}
        setImportance={setImportance}
      />
    </div>
  );
};
