import React, { useState } from "react";
import { Event } from "../../Firebase/eventsService";

interface Props {
  event?: Event;
  onSave: (event: Omit<Event, "id">) => void;
  onCancel?: () => void;
  userId: string | null;
}

export const EventForm: React.FC<Props> = ({ event, onSave, onCancel, userId }) => {
  const [title, setTitle] = useState(event?.title || "");
  const [datetime, setDatetime] = useState(event?.datetime || "");
  const [description, setDescription] = useState(event?.description || "");
  const [importance, setImportance] = useState<Event["importance"]>(event?.importance || "normal");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !datetime) {
      alert("Введіть назву та дату події");
      return;
    }
    if (!userId) {
      alert("Користувач не авторизований");
      return;
    }
    onSave({ title, datetime, description, importance, userId });
  };

  return (
    <form onSubmit={handleSubmit} className="event-form">
      <input
        type="text"
        placeholder="Назва події"
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
      />
      <input
        type="datetime-local"
        value={datetime}
        onChange={e => setDatetime(e.target.value)}
        required
      />
      <textarea
        placeholder="Опис"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <select
        value={importance}
        onChange={e => setImportance(e.target.value as Event["importance"])}
      >
        <option value="normal">Звичайна</option>
        <option value="important">Важлива</option>
        <option value="critical">Критична</option>
      </select>
      <button type="submit">Зберегти</button>
      {onCancel && (
        <button type="button" onClick={onCancel}>
          Відмінити
        </button>
      )}
    </form>
  );
};
