import { motion } from "framer-motion";
import { useCalendarStore } from "../store/calendarStore";

export default function TopBar() {
  const { theme, toggleTheme, currentDate, goNextMonth, goPrevMonth } = useCalendarStore();
  const isDark = theme === "dark";

  return (
    <motion.div
      className={`flex items-center justify-between px-6 py-3 rounded-2xl shadow-lg border backdrop-blur-md ${
        isDark
          ? "bg-gray-900/80 border-gray-700 text-white"
          : "bg-white/80 border-gray-100 text-gray-800"
      }`}
      style={{ width: "min(880px, 95vw)" }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white text-xs font-black">
          VU
        </div>
        <span className={`font-bold text-sm tracking-tight ${isDark ? "text-white" : "text-gray-800"}`}>
          Calendar
        </span>
      </div>

      {/* Month display */}
      <div className={`text-sm font-semibold ${isDark ? "text-gray-300" : "text-gray-500"}`}>
        {currentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
      </div>

      {/* Controls */}
      <div className="flex items-center gap-2">
        {/* Theme toggle */}
        <motion.button
          className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm transition-colors ${
            isDark
              ? "bg-gray-800 hover:bg-gray-700 text-yellow-400"
              : "bg-gray-100 hover:bg-gray-200 text-gray-600"
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleTheme}
          title="Toggle theme"
        >
          {isDark ? "Day" : "Night"}
        </motion.button>
      </div>
    </motion.div>
  );
}
