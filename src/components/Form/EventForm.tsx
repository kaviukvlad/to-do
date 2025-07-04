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
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-gradient-to-br from-white to-gray-50 p-8 rounded-2xl shadow-xl ring-1 ring-gray-200 space-y-6"
    >
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Нова подія</h2>

      <input
        type="text"
        placeholder="Назва події"
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
        className="w-full px-5 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-indigo-300 focus:border-indigo-500 transition"
      />

      <input
        type="datetime-local"
        value={datetime}
        onChange={e => setDatetime(e.target.value)}
        required
        className="w-full px-5 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-indigo-300 focus:border-indigo-500 transition"
      />

      <textarea
        placeholder="Опис"
        value={description}
        onChange={e => setDescription(e.target.value)}
        rows={5}
        className="w-full px-5 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 resize-y focus:outline-none focus:ring-4 focus:ring-indigo-300 focus:border-indigo-500 transition"
      />

      <select
        value={importance}
        onChange={e => setImportance(e.target.value as Event["importance"])}
        className="w-full px-5 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-4 focus:ring-indigo-300 focus:border-indigo-500 transition"
      >
        <option value="normal">Звичайна</option>
        <option value="important">Важлива</option>
        <option value="critical">Критична</option>
      </select>

      <div className="flex gap-4">
        <button
          type="submit"
          className="flex-1 bg-indigo-600 text-white font-semibold py-3 rounded-lg shadow-md hover:bg-indigo-700 active:bg-indigo-800 transition"
        >
          Зберегти
        </button>

        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-white border border-gray-300 text-gray-700 font-semibold py-3 rounded-lg shadow-sm hover:bg-gray-100 active:bg-gray-200 transition"
          >
            Відмінити
          </button>
        )}
      </div>
    </form>
  );
};
