import { useContext, useState } from "react";
import { Event } from "../../Firebase/eventsService";
import { EventItem } from "./EventItem";
import { EventForm } from "../Form/EventForm";
import { AuthContext } from "../../context/authContext";

interface Props {
  events: Event[];
  onEdit: (id: string, event: Omit<Event, "id">) => void;
  onDelete: (id: string) => void;
  search: string;
  setSearch: (s: string) => void;
  importance: string;
  setImportance: (i: string) => void;
}

export const EventList = ({
  events,
  onEdit,
  onDelete,
  search,
  setSearch,
  importance,
  setImportance,
}: Props) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const { userId } = useContext(AuthContext);

  const editingEvent = events.find(e => e.id === editingId);

  return (
    <div className="event-list space-y-4">
      <div className="flex flex-col md:flex-row gap-2 mb-4">
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Пошук подій"
          className="border px-2 py-1 rounded w-full md:w-1/2"
        />
        <select
          value={importance}
          onChange={e => setImportance(e.target.value)}
          className="border px-2 py-1 rounded"
        >
          <option value="">Усі важливості</option>
          <option value="normal">Звичайна</option>
          <option value="important">Важлива</option>
          <option value="critical">Критична</option>
        </select>
      </div>

      {editingId && editingEvent ? (
        <EventForm
          userId={userId}
          event={editingEvent}
          onSave={data => {
            onEdit(editingId, data);
            setEditingId(null);
          }}
          onCancel={() => setEditingId(null)}
        />
      ) : events.length === 0 ? (
        <p>Подій не знайдено</p>
      ) : (
        events.map(event => (
          <EventItem
            key={event.id}
            event={event}
            onEdit={setEditingId}
            onDelete={onDelete}
          />
        ))
      )}
    </div>
  );
};
