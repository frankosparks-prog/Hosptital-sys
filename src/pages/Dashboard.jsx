// import React, { useState } from "react";
// import {
//   NavLink,
//   Routes,
//   Route,
//   Navigate,
//   useNavigate,
// } from "react-router-dom";
// import {
//   Menu,
//   X,
//   LayoutDashboard,
//   Users,
//   Pill,
//   CalendarDays,
//   UserCircle,
//   LogOut,
// } from "lucide-react";

// // 👉  REAL page components (implementations live in their own files)
// import Overview from "./Overview";
// import Patients from "./Patients";
// import Medicines from "./Medicines";
// import Appointments from "./Appointments";
// import Staff from "./Staff";

// export default function Dashboard() {
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     // TODO: clear auth tokens here (localStorage, cookies, etc.)
//     navigate("/login");
//   };

//   // ⬇️  Define sidebar navigation items
//   const navItems = [
//     { label: "Dashboard", to: "/dashboard", icon: LayoutDashboard },
//     { label: "Patients", to: "/dashboard/patients", icon: Users },
//     { label: "Medicines", to: "/dashboard/medicines", icon: Pill },
//     {
//       label: "Appointments",
//       to: "/dashboard/appointments",
//       icon: CalendarDays,
//     },
//     { label: "Staff", to: "/dashboard/staff", icon: UserCircle },
//   ];

//   const SidebarContent = () => (
//     <nav className="flex flex-col gap-4 mt-10 md:mt-0 space-y-1">
//       {navItems.map(({ label, to, icon: Icon }) => (
//         <NavLink
//           key={to}
//           to={to}
//           end
//           className={({ isActive }) =>
//             `flex items-center gap-3 px-4 py-3 rounded-md transition text-base ${
//               isActive
//                 ? "bg-blue-100 text-blue-600 font-semibold"
//                 : "text-gray-700 hover:bg-gray-100"
//             }`
//           }
//           onClick={() => setMobileOpen(false)}
//         >
//           <Icon size={18} />
//           {label}
//         </NavLink>
//       ))}
//       <button
//         onClick={handleLogout}
//         className="flex items-center gap-3 text-red-500 hover:text-red-600 mt-6 px-3 py-2 text-sm md:text-base"
//       >
//         <LogOut size={18} /> Logout
//       </button>
//     </nav>
//   );

//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       {/* ───────────────────── MOBILE TOP BAR ───────────────────── */}
//       <header className="md:hidden w-full flex items-center justify-between bg-white shadow px-4 py-3">
//         <button onClick={() => setMobileOpen(true)} aria-label="Open Menu">
//           <Menu />
//         </button>
//         <h1 className="text-lg font-bold text-blue-600">🏥 HospitalSys</h1>
//         <span /> {/* spacer */}
//       </header>

//       {/* ───────────────────── DESKTOP SIDEBAR ───────────────────── */}
//       <aside className="hidden md:block w-64 bg-white shadow-md h-screen p-6 sticky top-0">
//         <h2 className="text-2xl font-bold text-blue-600 mb-6">
//           🏥 HospitalSys
//         </h2>
//         <hr />
//         <SidebarContent />
//       </aside>

//       {/* ───────────────────── MOBILE DRAWER ───────────────────── */}
//       {mobileOpen && (
//         <div className="fixed inset-0 z-50 flex">
//           {/* overlay */}
//           <div
//             className="bg-black/50 w-full"
//             onClick={() => setMobileOpen(false)}
//           ></div>

//           {/* drawer */}
//           <aside className="relative w-64 bg-white shadow-md h-full p-6 transform transition-transform duration-300 ease-in-out translate-x-0">
//             <button
//               onClick={() => setMobileOpen(false)}
//               aria-label="Close Menu"
//               className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
//             >
//               <X />
//             </button>
//             <h2 className="text-2xl font-bold text-blue-600 mb-6 mt-2">
//               🏥 HospitalSys
//             </h2>
//             <SidebarContent />
//           </aside>
//         </div>
//       )}

//       {/* ───────────────────── MAIN CONTENT ───────────────────── */}
//       <main className="flex-1 p-6 md:p-8 overflow-y-auto w-full">
//         <Routes>
//           <Route index element={<Overview />} />
//           <Route path="patients" element={<Patients />} />
//           <Route path="medicines" element={<Medicines />} />
//           <Route path="appointments" element={<Appointments />} />
//           <Route path="staff" element={<Staff />} />
//           {/* Unknown paths inside dashboard redirect to home */}
//           <Route path="*" element={<Navigate to="/dashboard" replace />} />
//         </Routes>
//       </main>
//     </div>
//   );
// }

import React, { useState } from "react";
import {
  NavLink,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import {
  Menu,
  X,
  LayoutDashboard,
  Users,
  Pill,
  CalendarDays,
  UserCircle,
  LogOut,
} from "lucide-react";

import Overview from "./Overview";
import Patients from "./Patients";
import Medicines from "./Medicines";
import Appointments from "./Appointments";
import Staff from "./Staff";

export default function Dashboard() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // TODO: clear auth tokens here (localStorage, cookies, etc.)
    navigate("/login");
  };

  const navItems = [
    { label: "Dashboard", to: "/dashboard", icon: LayoutDashboard },
    { label: "Patients", to: "/dashboard/patients", icon: Users },
    { label: "Medicines", to: "/dashboard/medicines", icon: Pill },
    { label: "Appointments", to: "/dashboard/appointments", icon: CalendarDays },
    { label: "Staff", to: "/dashboard/staff", icon: UserCircle },
  ];

  const SidebarContent = () => (
    <nav className="flex flex-col gap-4 mt-10 md:mt-0 space-y-1">
      {navItems.map(({ label, to, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          end
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-md transition text-base ${
              isActive
                ? "bg-blue-100 text-blue-600 font-semibold"
                : "text-gray-700 hover:bg-gray-100"
            }`
          }
          onClick={() => setMobileOpen(false)}
        >
          <Icon size={18} />
          {label}
        </NavLink>
      ))}
      <button
        onClick={handleLogout}
        className="flex items-center gap-3 text-red-500 hover:text-red-600 mt-6 px-3 py-2 text-sm md:text-base"
      >
        <LogOut size={18} /> Logout
      </button>
    </nav>
  );

  return (
    <>
      {/* MOBILE TOP BAR */}
      <header className="md:hidden w-full flex items-center justify-between bg-white shadow px-4 py-3">
        <button onClick={() => setMobileOpen(true)} aria-label="Open Menu">
          <Menu />
        </button>
        <h1 className="text-lg font-bold text-blue-600">🏥 HospitalSys</h1>
        <span /> {/* spacer */}
      </header>

      {/* SIDEBAR + MAIN CONTENT */}
      <div className="flex min-h-screen bg-gray-100">
        {/* DESKTOP SIDEBAR */}
        <aside className="hidden md:block w-64 bg-white shadow-md h-screen p-6 sticky top-0">
          <h2 className="text-2xl font-bold text-blue-600 mb-6">🏥 HospitalSys</h2>
          <hr />
          <SidebarContent />
        </aside>

        {/* MOBILE DRAWER */}
        {mobileOpen && (
          <div className="fixed inset-0 z-50 flex">
            <div
              className="bg-black/50 w-full"
              onClick={() => setMobileOpen(false)}
            ></div>

            <aside className="relative w-64 bg-white shadow-md h-full p-6 transform transition-transform duration-300 ease-in-out translate-x-0">
              <button
                onClick={() => setMobileOpen(false)}
                aria-label="Close Menu"
                className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
              >
                <X />
              </button>
              <h2 className="text-2xl font-bold text-blue-600 mb-6 mt-2">
                🏥 HospitalSys
              </h2>
              <SidebarContent />
            </aside>
          </div>
        )}

        {/* MAIN CONTENT */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto w-full">
          <Routes>
            <Route index element={<Overview />} />
            <Route path="patients" element={<Patients />} />
            <Route path="medicines" element={<Medicines />} />
            <Route path="appointments" element={<Appointments />} />
            <Route path="staff" element={<Staff />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </main>
      </div>
    </>
  );
}
