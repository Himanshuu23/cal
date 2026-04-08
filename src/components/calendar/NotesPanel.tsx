import { useState, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, StickyNote } from "lucide-react";
import type { DateRange, NoteEntry } from "@/hooks/useCalendar";
import { formatDate, isSameDay } from "@/lib/calendar-utils";
import { cn } from "@/lib/utils";

interface NotesPanelProps {
  range: DateRange;
  notes: NoteEntry[];
  onAddNote: (text: string, dateKey: string) => void;
  onDeleteNote: (id: string) => void;
  onClearRange: () => void;
  year: number;
  month: number;
}

function getDateKey(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

const NotesPanel = memo(function NotesPanel({
  range, notes, onAddNote, onDeleteNote, onClearRange, year, month,
}: NotesPanelProps) {
  const [text, setText] = useState("");

  const dateKey = range.start ? getDateKey(range.start) : `${year}-${String(month + 1).padStart(2, "0")}-general`;

  const relevantNotes = notes.filter((n) => {
    const prefix = `${year}-${String(month + 1).padStart(2, "0")}`;
    return n.date.startsWith(prefix);
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    onAddNote(text.trim(), dateKey);
    setText("");
  };

  return (
    <div className="bg-background rounded-lg p-4 sm:p-5 min-h-[200px] max-h-[350px] flex flex-col border border-border overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between mb-3 pb-2 border-b border-border">
        <div className="flex items-center gap-2">
          <StickyNote className="w-4 h-4 text-muted-foreground" />
          <h3 className="font-display text-lg font-semibold text-foreground">Notes</h3>
        </div>
        {range.start && (
          <button
            onClick={onClearRange}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors font-sans"
          >
            Clear selection
          </button>
        )}
      </div>

      {/* Range info */}
      {range.start && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs font-sans text-muted-foreground mb-3 bg-muted px-3 py-1.5 rounded-md inline-flex gap-1 w-fit"
        >
          <span className="font-medium text-foreground">{formatDate(range.start)}</span>
          {range.end && !isSameDay(range.start, range.end) && (
            <>
              <span>→</span>
              <span className="font-medium text-foreground">{formatDate(range.end)}</span>
            </>
          )}
        </motion.div>
      )}

      {/* Add note form */}
      <form onSubmit={handleSubmit} className="flex gap-2 mb-3 flex-shrink-0">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={range.start ? `Note for ${formatDate(range.start)}...` : "Add a note for this month..."}
          className="flex-1 px-3 py-2 rounded-md bg-muted border border-border text-sm font-sans text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
        <button
          type="submit"
          disabled={!text.trim()}
          className="p-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-40 transition-all flex-shrink-0"
        >
          <Plus className="w-4 h-4" />
        </button>
      </form>

      {/* Notes list */}
      <div className="flex-1 overflow-y-auto space-y-1.5 scrollbar-stable">
        <AnimatePresence initial={false}>
          {relevantNotes.length === 0 ? (
            <p className="text-xs text-muted-foreground font-sans italic text-center py-4">
              No notes yet. Select a date and jot something down!
            </p>
          ) : (
            relevantNotes.map((note) => (
              <motion.div
                key={note.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10, height: 0 }}
                layout
                className="flex items-start gap-2 group py-1.5 px-2 rounded hover:bg-muted transition-colors"
              >
                <span className="text-xs text-muted-foreground font-sans whitespace-nowrap mt-0.5">
                  {note.date.split("-").slice(1).join("/")}
                </span>
                <p className="text-sm font-sans text-foreground flex-1 leading-snug">{note.text}</p>
                <button
                  onClick={() => onDeleteNote(note.id)}
                  className="opacity-0 group-hover:opacity-100 p-1 text-destructive hover:bg-destructive/10 rounded transition-all flex-shrink-0"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
});

export default NotesPanel;
