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

  const editingEvent = events.find((e) => e.id === editingId);

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center gap-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Пошук подій"
          className="flex-1 bg-gray-50 border border-gray-300 rounded-lg px-5 py-3 text-gray-700 placeholder-gray-400 shadow-sm
            focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
        />
        <select
          value={importance}
          onChange={(e) => setImportance(e.target.value)}
          className="w-56 bg-gray-50 border border-gray-300 rounded-lg px-5 py-3 text-gray-700 shadow-sm
            focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
        >
          <option value="">Усі важливості</option>
          <option value="normal">Звичайна</option>
          <option value="important">Важлива</option>
          <option value="critical">Критична</option>
        </select>
      </div>

      {editingId && editingEvent ? (
        <div className="bg-white rounded-xl shadow-xl border border-gray-100 p-8">
          <EventForm
            userId={userId}
            event={editingEvent}
            onSave={(data) => {
              onEdit(editingId, data);
              setEditingId(null);
            }}
            onCancel={() => setEditingId(null)}
          />
        </div>
      ) : events.length === 0 ? (
        <p className="text-center text-gray-400 italic text-lg select-none">
          Подій не знайдено
        </p>
      ) : (
        <ul className="space-y-5">
          {events.map((event) => {
            let importanceColor = "";
            switch (event.importance) {
              case "critical":
                importanceColor = "border-red-400 bg-red-50";
                break;
              case "important":
                importanceColor = "border-yellow-400 bg-yellow-50";
                break;
              case "normal":
              default:
                importanceColor = "border-green-400 bg-green-50";
                break;
            }

            return (
              <li
                key={event.id}
                className={`rounded-xl shadow-md border-l-8 p-6 hover:shadow-xl transition
                  ${importanceColor} cursor-pointer select-none`}
              >
                <EventItem
                  event={event}
                  onEdit={setEditingId}
                  onDelete={onDelete}
                />
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
