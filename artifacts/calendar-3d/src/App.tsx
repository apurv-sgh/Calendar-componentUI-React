import { useEffect } from "react";
import { useCalendarStore } from "./store/calendarStore";
import ThreeDScene from "./components/ThreeDScene";
import CalendarCard from "./components/CalendarCard";
import NotesPanel from "./components/NotesPanel";
import SelectionInfo from "./components/SelectionInfo";
import TopBar from "./components/TopBar";
import MiniMonthNav from "./components/MiniMonthNav";

export default function App() {
  const { theme } = useCalendarStore();

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <div className={`relative w-screen h-screen overflow-hidden ${theme === "dark" ? "dark bg-gray-950" : "bg-slate-100"}`}>
      {/* 3D Background Scene */}
      <ThreeDScene />

      {/* Overlay UI */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-start gap-4 p-4 overflow-y-auto"
        style={{ zIndex: 10 }}
      >
        {/* Top bar */}
        <TopBar />

        {/* Month quick-nav */}
        <MiniMonthNav />

        {/* Main content - calendar + notes side by side */}
        <div className="flex flex-col lg:flex-row items-start justify-center gap-6 w-full max-w-4xl">
          {/* Calendar card */}
          <div className="flex flex-col items-center gap-4">
            <CalendarCard />
            <SelectionInfo />
          </div>

          {/* Notes panel */}
          <NotesPanel />
        </div>

        {/* Footer hint */}
        <div
          className={`text-center text-xs pb-2 ${
            theme === "dark" ? "text-gray-600" : "text-gray-400"
          }`}
        >
          Click once to set start date · click again to set end date
        </div>
      </div>
    </div>
  );
}
