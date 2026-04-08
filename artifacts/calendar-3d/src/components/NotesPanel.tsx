import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCalendarStore, formatDateKey, MONTH_NAMES } from "../store/calendarStore";

export default function NotesPanel() {
  const {
    selectedStart, selectedEnd, notes, setNote, currentDate, theme, clearSelection
  } = useCalendarStore();

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const noteKey = selectedStart
    ? selectedEnd
      ? `range:${formatDateKey(selectedStart)}:${formatDateKey(selectedEnd)}`
      : formatDateKey(selectedStart)
    : `month:${year}-${month}`;

  const [text, setText] = useState(notes[noteKey] ?? "");

  useEffect(() => {
    setText(notes[noteKey] ?? "");
  }, [noteKey, notes]);

  const handleChange = (val: string) => {
    setText(val);
    setNote(noteKey, val);
  };

  const formatLabel = () => {
    if (!selectedStart) return `Notes for ${MONTH_NAMES[month]} ${year}`;
    if (!selectedEnd) {
      return `Note for ${selectedStart.toLocaleDateString("en-US", { month: "long", day: "numeric" })}`;
    }
    return `Notes: ${selectedStart.toLocaleDateString("en-US", { month: "short", day: "numeric" })} – ${selectedEnd.toLocaleDateString("en-US", { month: "short", day: "numeric" })}`;
  };

  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;

  return (
    <motion.div
      className={`rounded-2xl overflow-hidden shadow-xl border ${
        theme === "dark"
          ? "bg-gray-900 border-gray-700"
          : "bg-white border-gray-100"
      }`}
      style={{ width: "min(340px, 95vw)" }}
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      {/* Header */}
      <div
        className="px-5 py-4 flex items-center justify-between"
        style={{ background: "linear-gradient(135deg, #1e88e5 0%, #26c6da 100%)" }}
      >
        <div>
          <div className="text-white text-[10px] font-bold tracking-widest uppercase opacity-75">
            NOTES
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={noteKey}
              className="text-white text-sm font-semibold mt-0.5"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              transition={{ duration: 0.2 }}
            >
              {formatLabel()}
            </motion.div>
          </AnimatePresence>
        </div>
        {(selectedStart || selectedEnd) && (
          <motion.button
            className="w-7 h-7 rounded-full bg-white/20 hover:bg-white/30 text-white text-xs flex items-center justify-center"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={clearSelection}
            title="Clear selection"
          >
            ✕
          </motion.button>
        )}
      </div>

      {/* Lines background decoration */}
      <div className="relative px-5 pt-4 pb-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className={`absolute left-5 right-5 h-px ${
              theme === "dark" ? "bg-gray-700" : "bg-gray-100"
            }`}
            style={{ top: `${4 + i * 28 + 20}px` }}
          />
        ))}

        <AnimatePresence mode="wait">
          <motion.textarea
            key={noteKey}
            className={`relative w-full resize-none bg-transparent text-sm leading-7 outline-none placeholder-gray-300 z-10 ${
              theme === "dark" ? "text-gray-200 placeholder-gray-600" : "text-gray-700"
            }`}
            style={{ minHeight: "168px", fontFamily: "inherit" }}
            value={text}
            onChange={(e) => handleChange(e.target.value)}
            placeholder="Write your notes here..."
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          />
        </AnimatePresence>
      </div>

      {/* Footer */}
      <div
        className={`px-5 py-3 flex items-center justify-between border-t text-xs ${
          theme === "dark"
            ? "border-gray-700 text-gray-500"
            : "border-gray-100 text-gray-400"
        }`}
      >
        <span>{wordCount} word{wordCount !== 1 ? "s" : ""}</span>
        {text && (
          <motion.button
            className="text-blue-400 hover:text-blue-500 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleChange("")}
          >
            Clear
          </motion.button>
        )}
      </div>

      {/* Selection hint */}
      {!selectedStart && (
        <div
          className={`px-5 pb-3 text-xs ${
            theme === "dark" ? "text-gray-600" : "text-gray-300"
          }`}
        >
          Click a date to add a specific note
        </div>
      )}
    </motion.div>
  );
}
