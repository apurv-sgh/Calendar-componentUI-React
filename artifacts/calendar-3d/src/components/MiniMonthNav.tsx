import { motion } from "framer-motion";
import { useCalendarStore, MONTH_NAMES } from "../store/calendarStore";

export default function MiniMonthNav() {
  const { currentDate, setCurrentDate, theme } = useCalendarStore();
  const now = new Date();
  const activeMonth = currentDate.getMonth();
  const activeYear = currentDate.getFullYear();

  return (
    <motion.div
      className={`rounded-2xl px-4 py-3 shadow-lg border backdrop-blur-md ${
        theme === "dark"
          ? "bg-gray-900/80 border-gray-700"
          : "bg-white/80 border-gray-100"
      }`}
      style={{ width: "min(880px, 95vw)" }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
    >
      <div className="flex items-center gap-1 overflow-x-auto scrollbar-none">
        {MONTH_NAMES.map((name, i) => {
          const isActive = i === activeMonth;
          const isCurrent = i === now.getMonth() && activeYear === now.getFullYear();
          return (
            <motion.button
              key={name}
              className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-[10px] font-bold tracking-wider transition-colors ${
                isActive
                  ? "bg-blue-500 text-white shadow-sm"
                  : isCurrent
                  ? `border border-blue-300 ${theme === "dark" ? "text-blue-300" : "text-blue-500"}`
                  : theme === "dark"
                  ? "text-gray-500 hover:text-gray-300 hover:bg-gray-800"
                  : "text-gray-400 hover:text-gray-700 hover:bg-gray-50"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentDate(new Date(activeYear, i, 1))}
            >
              {name.slice(0, 3)}
            </motion.button>
          );
        })}
        {/* Year navigation */}
        <div className={`ml-auto flex items-center gap-1 flex-shrink-0 pl-2 border-l ${
          theme === "dark" ? "border-gray-700" : "border-gray-200"
        }`}>
          <motion.button
            className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs ${
              theme === "dark" ? "text-gray-400 hover:bg-gray-800" : "text-gray-400 hover:bg-gray-100"
            }`}
            whileTap={{ scale: 0.9 }}
            onClick={() => setCurrentDate(new Date(activeYear - 1, activeMonth, 1))}
          >‹</motion.button>
          <span className={`text-xs font-semibold w-10 text-center ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
            {activeYear}
          </span>
          <motion.button
            className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs ${
              theme === "dark" ? "text-gray-400 hover:bg-gray-800" : "text-gray-400 hover:bg-gray-100"
            }`}
            whileTap={{ scale: 0.9 }}
            onClick={() => setCurrentDate(new Date(activeYear + 1, activeMonth, 1))}
          >›</motion.button>
        </div>
      </div>
    </motion.div>
  );
}
