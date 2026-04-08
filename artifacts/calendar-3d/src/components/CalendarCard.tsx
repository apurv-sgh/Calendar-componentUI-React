import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  useCalendarStore,
  getDaysInMonth,
  isSameDay,
  isInRange,
  formatDateKey,
  MONTH_NAMES,
  MONTH_IMAGES,
} from "../store/calendarStore";

const DAY_HEADERS = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

function getFirstDayOffset(year: number, month: number): number {
  const day = new Date(year, month, 1).getDay();
  return day === 0 ? 6 : day - 1;
}

interface DayCellProps {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  isStart: boolean;
  isEnd: boolean;
  isInSel: boolean;
  isWeekend: boolean;
  onClick: () => void;
}

function DayCell({ date, isCurrentMonth, isToday, isStart, isEnd, isInSel, isWeekend, onClick }: DayCellProps) {
  const isSelected = isStart || isEnd;
  
  return (
    <motion.button
      className={`
        relative flex items-center justify-center text-xs font-medium rounded-sm
        w-8 h-7 md:w-9 md:h-8 transition-all duration-150
        ${!isCurrentMonth ? "opacity-25 cursor-default" : "cursor-pointer date-cell"}
        ${isToday && !isSelected ? "ring-1 ring-blue-400" : ""}
        ${isStart ? "bg-blue-500 text-white rounded-l-full" : ""}
        ${isEnd ? "bg-blue-500 text-white rounded-r-full" : ""}
        ${isInSel ? "bg-blue-100 text-blue-800" : ""}
        ${!isSelected && !isInSel && isWeekend && isCurrentMonth ? "text-blue-500" : ""}
        ${!isSelected && !isInSel && !isWeekend && isCurrentMonth ? "text-gray-700 hover:bg-gray-100" : ""}
      `}
      whileHover={isCurrentMonth ? { scale: 1.15 } : {}}
      whileTap={isCurrentMonth ? { scale: 0.9 } : {}}
      onClick={isCurrentMonth ? onClick : undefined}
    >
      {date.getDate()}
      {isToday && (
        <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-blue-500 rounded-full" />
      )}
    </motion.button>
  );
}

export default function CalendarCard() {
  const {
    currentDate, selectedStart, selectedEnd,
    goNextMonth, goPrevMonth, selectDate, isFlipping, theme
  } = useCalendarStore();

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const days = getDaysInMonth(year, month);
  const offset = getFirstDayOffset(year, month);
  const today = new Date();
  const imgSrc = MONTH_IMAGES[month];

  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    setTilt({ x: dy * -8, y: dx * 8 });
  };

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  const prevDays = getDaysInMonth(year, month - 1);
  const leadingDays = prevDays.slice(-offset);
  const totalCells = Math.ceil((days.length + offset) / 7) * 7;
  const trailingCount = totalCells - days.length - offset;
  const trailingDays = Array.from({ length: trailingCount }, (_, i) => new Date(year, month + 1, i + 1));

  const allCells = [
    ...leadingDays.map(d => ({ date: d, current: false })),
    ...days.map(d => ({ date: d, current: true })),
    ...trailingDays.map(d => ({ date: d, current: false })),
  ];

  return (
    <motion.div
      ref={cardRef}
      className={`relative select-none rounded-2xl overflow-hidden shadow-2xl ${
        theme === "dark" ? "bg-gray-900" : "bg-white"
      }`}
      style={{
        width: "min(520px, 95vw)",
        transformStyle: "preserve-3d",
        transform: `perspective(1200px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: "transform 0.1s ease",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={isFlipping ? { rotateY: [0, -15, 0], opacity: [1, 0.7, 1] } : {}}
      transition={{ duration: 0.5 }}
    >
      {/* Spiral binding at top */}
      <div className="absolute top-0 left-0 right-0 z-10 flex justify-center gap-3 pt-1 pb-1 bg-transparent pointer-events-none">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="w-4 h-5 border-2 border-gray-400 rounded-full bg-transparent"
            style={{ borderBottomColor: "transparent" }}
          />
        ))}
      </div>

      {/* Hero image section */}
      <AnimatePresence mode="wait">
        <motion.div
          key={month}
          className="relative w-full overflow-hidden"
          style={{ height: "200px" }}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.4 }}
        >
          <img
            src={imgSrc}
            alt={MONTH_NAMES[month]}
            className="w-full h-full object-cover"
          />
          {/* Blue chevron decorations */}
          <div className="absolute bottom-0 left-0 right-0 flex">
            <div
              className="bg-blue-500 opacity-90"
              style={{
                width: "45%",
                height: "60px",
                clipPath: "polygon(0 100%, 100% 100%, 100% 0, 0 100%)",
              }}
            />
            <div
              className="bg-blue-500 opacity-90 ml-auto"
              style={{
                width: "45%",
                height: "60px",
                clipPath: "polygon(0 0, 100% 100%, 0 100%)",
              }}
            />
          </div>
          {/* Year + Month label */}
          <div className="absolute bottom-2 right-5 text-right z-10">
            <div className="text-white text-xs font-light tracking-widest opacity-90">{year}</div>
            <div className="text-white text-xl font-black tracking-widest">{MONTH_NAMES[month]}</div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Nav buttons over image */}
      <div className="absolute top-8 left-4 right-4 flex justify-between z-20">
        <motion.button
          className="w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm shadow flex items-center justify-center text-gray-700 hover:bg-white"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={goPrevMonth}
        >
          ‹
        </motion.button>
        <motion.button
          className="w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm shadow flex items-center justify-center text-gray-700 hover:bg-white"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={goNextMonth}
        >
          ›
        </motion.button>
      </div>

      {/* Calendar body */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${year}-${month}`}
          className={`p-4 ${theme === "dark" ? "bg-gray-900" : "bg-white"}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          {/* Day headers */}
          <div className="grid grid-cols-7 mb-1">
            {DAY_HEADERS.map((d) => (
              <div
                key={d}
                className={`text-center text-[10px] font-bold tracking-wider pb-1 ${
                  d === "SAT" || d === "SUN"
                    ? "text-blue-400"
                    : theme === "dark" ? "text-gray-400" : "text-gray-400"
                }`}
              >
                {d}
              </div>
            ))}
          </div>

          {/* Day cells */}
          <div className="grid grid-cols-7 gap-y-0.5">
            {allCells.map(({ date, current }, idx) => {
              const isToday = isSameDay(date, today);
              const isStart = selectedStart ? isSameDay(date, selectedStart) : false;
              const isEnd = selectedEnd ? isSameDay(date, selectedEnd) : false;
              const isInSel = isInRange(date, selectedStart, selectedEnd);
              const dow = date.getDay();
              const isWeekend = dow === 0 || dow === 6;

              return (
                <div key={idx} className="flex justify-center">
                  <DayCell
                    date={date}
                    isCurrentMonth={current}
                    isToday={isToday}
                    isStart={isStart}
                    isEnd={isEnd}
                    isInSel={isInSel}
                    isWeekend={isWeekend}
                    onClick={() => selectDate(date)}
                  />
                </div>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
