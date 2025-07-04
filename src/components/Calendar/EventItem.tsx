import React from "react";
import { Event } from "../../Firebase/eventsService";

interface Props {
  event: Event;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export const EventItem: React.FC<Props> = ({ event, onEdit, onDelete }) => {
  return (
    <div className={`event-item importance-${event.importance}`}>
      <h3>{event.title}</h3>
      <p>{new Date(event.datetime).toLocaleString()}</p>
      <p>{event.description}</p>
      <p>Важливість: {event.importance}</p>
      <button onClick={() => onEdit(event.id)}>Редагувати</button>
      <button
        onClick={() => {
          if (window.confirm("Ви впевнені, що хочете видалити цю подію?")) {
            onDelete(event.id);
          }
        }}
      >
        Видалити
      </button>
    </div>
  );
};
