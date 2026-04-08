# Calendar Canvas 

A modern, interactive 3D calendar application with an immersive visual experience. Calendar Canvas combines a fully functional calendar interface with stunning 3D animations and a notes management system.

##  Features

  - 3D animated background scene (floating rings, particles) via Three.js/R3F
  - Wall calendar aesthetic with hero image per month, spiral binding, blue chevron design
  - Month-to-month navigation with flip animation
  - Date range selector (click start → click end, visual highlight states)
  - Integrated notes system (per-day, per-range, per-month) with localStorage persistence
  - Selection info badge (days count, date range label)
  - Month quick-nav bar + year navigation
  - Light/dark theme toggle
  - Hover tilt effect on calendar card (CSS perspective)
  - Responsive layout (stacked on mobile, side-by-side on desktop)
  - WebGL with CSS fallback for environments without GPU support

##  Tech Stack

- **Frontend Framework**: React 18
- **Language**: TypeScript
- **3D Graphics**: Three.js with React Three Fiber
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Build Tool**: Vite
- **UI Components**: Radix UI primitives
- **Form Handling**: React Hook Form

## 📋 Prerequisites

- Node.js 18+ 
- npm/yarn

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone <https://github.com/apurv-sgh/Calendar-componentUI-React>
cd Calendar-Canvas
```

### 2. Navigate to the artifacts/calendar-3d directory:

```bash
cd artifacts/calendar-3d
```

### 3. Install dependencies

```bash
npm install
```

### 4. Run the app

```bash
npm run dev
```

The app will be available at `http://127.0.0.1:5173` (Vite default port)


## 📁 Project Structure

```
Calendar-Canvas/
├── artifacts/calendar-3d/          # Main application
│   ├── src/
│   │   ├── components/             # React components
│   │   │   ├── CalendarCard.tsx    # Calendar UI component
│   │   │   ├── ThreeDScene.tsx     # 3D background with Three.js
│   │   │   ├── NotesPanel.tsx      # Notes management
│   │   │   ├── TopBar.tsx          # Top navigation bar
│   │   │   └── ...                 # Other UI components
│   │   ├── hooks/                  # Custom React hooks
│   │   ├── store/                  # Zustand store (state management)
│   │   ├── App.tsx                 # Main application component
│   │   └── main.tsx                # Entry point
│   ├── vite.config.ts              # Vite configuration
│   └── package.json                # Project dependencies
└── README.md                        # This file
```

## 🎮 How to Use

1. **Navigate Months** - Use the left/right arrows in the mini month navigator to move between months
2. **Select Dates** - Click on calendar dates to select a single date or drag to select a range
3. **Add Notes** - Enter text in the notes panel for the selected date
4. **Toggle Theme** - Click the theme button in the top bar to switch between light/dark modes
5. **View Selection Info** - Selected dates are displayed with helpful information below the calendar


## 📱 Responsive Breakpoints

The application is fully responsive:
- **Mobile**: Single column layout (stacked calendar and notes)
- **Desktop (lg+)**: Side-by-side layout with calendar and notes panel


## 🎨 Customization

- **Colors**: Modify Tailwind classes in components or update `tailwind.config.js`
- **3D Effects**: Adjust Three.js parameters in `ThreeDScene.tsx`
- **State Logic**: Edit the store configuration in `store/calendarStore.ts`


## 📦 Dependencies

See `artifacts/calendar-3d/package.json` for a complete list. Key packages include:
- `react` & `react-dom` - UI library
- `three` & `@react-three/fiber` - 3D graphics
- `zustand` - State management
- `tailwindcss` - Utility-first CSS
- `@radix-ui/*` - Accessible UI primitives


## 🐛 Troubleshooting

**Dev server won't start:**
- Clear `node_modules` and reinstall: `rm -rf node_modules && pnpm install`
- Check Node.js version: `node --version`

**3D scene not rendering:**
- Ensure WebGL is enabled in your browser
- Check browser console for errors

**Notes not persisting:**
- Check localStorage is enabled in browser settings
- Clear browser cache and reload

**Happy scheduling! 🎉**





