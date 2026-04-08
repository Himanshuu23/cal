import { useState, useCallback, useEffect } from "react";

export interface DateRange {
  start: Date | null;
  end: Date | null;
}

export interface NoteEntry {
  id: string;
  text: string;
  date: string; // ISO key "YYYY-MM-DD"
  createdAt: number;
}

const NOTES_KEY = "calendar-notes";
const RANGE_KEY = "calendar-range";

function loadNotes(): NoteEntry[] {
  try {
    return JSON.parse(localStorage.getItem(NOTES_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveNotes(notes: NoteEntry[]) {
  localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
}

export function useCalendar() {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [range, setRange] = useState<DateRange>({ start: null, end: null });
  const [selecting, setSelecting] = useState(false);
  const [notes, setNotes] = useState<NoteEntry[]>(loadNotes);
  const [isFlipping, setIsFlipping] = useState(false);

  useEffect(() => { saveNotes(notes); }, [notes]);

  const goToMonth = useCallback((dir: -1 | 1) => {
    setIsFlipping(true);
    setTimeout(() => {
      setMonth((prev) => {
        const next = prev + dir;
        if (next < 0) { setYear((y) => y - 1); return 11; }
        if (next > 11) { setYear((y) => y + 1); return 0; }
        return next;
      });
      setTimeout(() => setIsFlipping(false), 50);
    }, 300);
  }, []);

  const handleDayClick = useCallback((date: Date) => {
    if (!selecting || !range.start) {
      setRange({ start: date, end: null });
      setSelecting(true);
    } else {
      setRange((prev) => ({ ...prev, end: date }));
      setSelecting(false);
    }
  }, [selecting, range.start]);

  const clearRange = useCallback(() => {
    setRange({ start: null, end: null });
    setSelecting(false);
  }, []);

  const addNote = useCallback((text: string, dateKey: string) => {
    const entry: NoteEntry = {
      id: crypto.randomUUID(),
      text,
      date: dateKey,
      createdAt: Date.now(),
    };
    setNotes((prev) => [...prev, entry]);
  }, []);

  const deleteNote = useCallback((id: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const getNotesForDate = useCallback((dateKey: string) => {
    return notes.filter((n) => n.date === dateKey);
  }, [notes]);

  const getNotesForMonth = useCallback((y: number, m: number) => {
    const prefix = `${y}-${String(m + 1).padStart(2, "0")}`;
    return notes.filter((n) => n.date.startsWith(prefix));
  }, [notes]);

  return {
    year, month, range, selecting, isFlipping, notes,
    goToMonth, handleDayClick, clearRange,
    addNote, deleteNote, getNotesForDate, getNotesForMonth,
    setYear, setMonth,
  };
}
