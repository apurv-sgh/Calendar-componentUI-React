import { motion, AnimatePresence } from "framer-motion";
import { useCalendarStore } from "../store/calendarStore";

function getDaysBetween(start: Date, end: Date): number {
  const ms = Math.abs(end.getTime() - start.getTime());
  return Math.round(ms / (1000 * 60 * 60 * 24)) + 1;
}

export default function SelectionInfo() {
  const { selectedStart, selectedEnd, theme } = useCalendarStore();

  const show = selectedStart && selectedEnd;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className={`rounded-xl px-5 py-3 shadow-lg border text-sm flex items-center gap-3 ${
            theme === "dark"
              ? "bg-blue-950/80 border-blue-800 text-blue-100"
              : "bg-blue-50 border-blue-200 text-blue-800"
          }`}
          style={{ width: "min(340px, 95vw)" }}
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.3 }}
        >
          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
            {getDaysBetween(selectedStart!, selectedEnd!)}
          </div>
          <div>
            <div className="font-semibold">
              {selectedStart!.toLocaleDateString("en-US", { month: "short", day: "numeric" })} –{" "}
              {selectedEnd!.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
            </div>
            <div className={`text-xs mt-0.5 ${theme === "dark" ? "text-blue-300" : "text-blue-500"}`}>
              {getDaysBetween(selectedStart!, selectedEnd!)} day{getDaysBetween(selectedStart!, selectedEnd!) !== 1 ? "s" : ""} selected
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
