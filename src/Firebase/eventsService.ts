import { db } from "./config";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  DocumentData,
  QuerySnapshot
} from "firebase/firestore";

export interface Event {
  id: string;
  title: string;
  datetime: string;
  description: string;
  importance: "normal" | "important" | "critical";
  userId: string;
}

const eventsCollection = collection(db, "events");

export const createEvent = async (event: Omit<Event, "id">): Promise<string> => {
  const docRef = await addDoc(eventsCollection, event);
  return docRef.id;
};

export const fetchEvents = async (userId: string): Promise<Event[]> => {
  const q = query(eventsCollection, where("userId", "==", userId));
  const snapshot: QuerySnapshot<DocumentData> = await getDocs(q);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...(doc.data() as Omit<Event, "id">)
  }));
};

export const updateEvent = async (id: string, event: Partial<Omit<Event, "id">>): Promise<void> => {
  const docRef = doc(db, "events", id);
  await updateDoc(docRef, event);
};

export const deleteEvent = async (id: string): Promise<void> => {
  const docRef = doc(db, "events", id);
  await deleteDoc(docRef);
};
