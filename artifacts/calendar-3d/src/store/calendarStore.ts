import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface DateNote {
  date: string;
  text: string;
}

export interface CalendarState {
  currentDate: Date;
  selectedStart: Date | null;
  selectedEnd: Date | null;
  notes: Record<string, string>;
  isFlipping: boolean;
  theme: "light" | "dark";

  setCurrentDate: (date: Date) => void;
  goNextMonth: () => void;
  goPrevMonth: () => void;
  selectDate: (date: Date) => void;
  clearSelection: () => void;
  setNote: (dateKey: string, text: string) => void;
  setFlipping: (val: boolean) => void;
  toggleTheme: () => void;
}

export const useCalendarStore = create<CalendarState>()(
  persist(
    (set, get) => ({
      currentDate: new Date(),
      selectedStart: null,
      selectedEnd: null,
      notes: {},
      isFlipping: false,
      theme: "light",

      setCurrentDate: (date) => set({ currentDate: date }),

      goNextMonth: () => {
        const { currentDate } = get();
        const next = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
        set({ isFlipping: true });
        setTimeout(() => {
          set({ currentDate: next, isFlipping: false, selectedStart: null, selectedEnd: null });
        }, 500);
      },

      goPrevMonth: () => {
        const { currentDate } = get();
        const prev = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
        set({ isFlipping: true });
        setTimeout(() => {
          set({ currentDate: prev, isFlipping: false, selectedStart: null, selectedEnd: null });
        }, 500);
      },

      selectDate: (date) => {
        const { selectedStart, selectedEnd } = get();
        if (!selectedStart || (selectedStart && selectedEnd)) {
          set({ selectedStart: date, selectedEnd: null });
        } else {
          if (date < selectedStart) {
            set({ selectedStart: date, selectedEnd: selectedStart });
          } else {
            set({ selectedEnd: date });
          }
        }
      },

      clearSelection: () => set({ selectedStart: null, selectedEnd: null }),

      setNote: (dateKey, text) =>
        set((state) => ({
          notes: { ...state.notes, [dateKey]: text },
        })),

      setFlipping: (val) => set({ isFlipping: val }),

      toggleTheme: () =>
        set((state) => ({ theme: state.theme === "light" ? "dark" : "light" })),
    }),
    {
      name: "calendar-3d-store",
      partialize: (state) => ({ notes: state.notes, theme: state.theme }),
    }
  )
);

export function formatDateKey(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

export function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function isInRange(date: Date, start: Date | null, end: Date | null): boolean {
  if (!start || !end) return false;
  const d = date.getTime();
  const s = start.getTime();
  const e = end.getTime();
  return d > Math.min(s, e) && d < Math.max(s, e);
}

export function getDaysInMonth(year: number, month: number): Date[] {
  const days: Date[] = [];
  const total = new Date(year, month + 1, 0).getDate();
  for (let i = 1; i <= total; i++) {
    days.push(new Date(year, month, i));
  }
  return days;
}

export const MONTH_NAMES = [
  "JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE",
  "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER",
];

export const MONTH_IMAGES = [
  "https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=800&q=80",
  "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=800&q=80",
  "https://images.unsplash.com/photo-1490750967868-88df5691cc33?w=800&q=80",
  "https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?w=800&q=80",
  "https://images.unsplash.com/photo-1490750967868-88df5691cc33?w=800&q=80",
  "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80",
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
  "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=800&q=80",
  "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
  "https://images.unsplash.com/photo-1477601263568-180e2c6d046e?w=800&q=80",
  "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=800&q=80",
];
