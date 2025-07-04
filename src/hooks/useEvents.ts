import { useState, useEffect, useContext } from "react";
import {
  Event,
  createEvent,
  fetchEvents,
  updateEvent,
  deleteEvent,
} from "../Firebase/eventsService";
import { AuthContext } from "../context/authContext";

export const useEvents = () => {
  const { userId } = useContext(AuthContext);

  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadEvents = async () => {
    if (!userId) return;
    setLoading(true);
    setError(null);
    try {
      const data = await fetchEvents(userId);
      setEvents(data);
    } catch (e) {
      setError("Помилка завантаження подій");
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEvents();
  }, [userId]);

  const addEvent = async (event: Omit<Event, "id">) => {
    if (!userId) return;
    setError(null);
    try {
      const id = await createEvent({ ...event, userId });
      setEvents(prev => [...prev, { ...event, id, userId }]);
    } catch (e) {
      setError("Помилка додавання події");
      console.error(e);
    }
  };

  const editEvent = async (id: string, event: Partial<Omit<Event, "id">>) => {
    setError(null);
    try {
      await updateEvent(id, event);
      setEvents(prev => prev.map(ev => (ev.id === id ? { ...ev, ...event } : ev)));
    } catch (e) {
      setError("Помилка оновлення події");
      console.error(e);
    }
  };

  const removeEvent = async (id: string) => {
    setError(null);
    try {
      await deleteEvent(id);
      setEvents(prev => prev.filter(ev => ev.id !== id));
    } catch (e) {
      setError("Помилка видалення події");
      console.error(e);
    }
  };

  return {
    events,
    loading,
    error,
    addEvent,
    editEvent,
    removeEvent,
    reload: loadEvents,
  };
};
