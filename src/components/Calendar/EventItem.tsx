import React from "react";
import { Event } from "../../Firebase/eventsService";

interface Props {
  event: Event;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export const EventItem: React.FC<Props> = ({ event, onEdit, onDelete }) => {
  return (
    <div
      className="transition flex flex-col md:flex-row md:justify-between md:items-center gap-4">
      <div className="flex flex-col space-y-1">
        <h3 className="text-xl font-semibold text-gray-800">{event.title}</h3>
        <p className="text-sm text-gray-500">
          {new Date(event.datetime).toLocaleString()}
        </p>
        <p className="text-gray-700">{event.description}</p>
        <p className="text-sm font-medium text-gray-600">
          Важливість:{" "}
          <span className="capitalize font-semibold text-gray-900">
            {event.importance}
          </span>
        </p>
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => onEdit(event.id)}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md shadow hover:bg-indigo-700 transition focus:outline-none focus:ring-2 focus:ring-indigo-400"
          aria-label="Редагувати подію"
        >
          Редагувати
        </button>
        <button
          onClick={() => {
            if (window.confirm("Ви впевнені, що хочете видалити цю подію?")) {
              onDelete(event.id);
            }
          }}
          className="px-4 py-2 bg-red-600 text-white rounded-md shadow hover:bg-red-700 transition focus:outline-none focus:ring-2 focus:ring-red-400"
          aria-label="Видалити подію"
        >
          Видалити
        </button>
      </div>
    </div>
  );
};
