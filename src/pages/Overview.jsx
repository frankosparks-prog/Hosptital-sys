import React from "react";
import {
  Users,
  Pill,
  CalendarDays,
  UserCheck,
  Activity,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Overview() {
  // Sample stats data
  const stats = [
    {
      label: "Total Patients",
      value: 1245,
      icon: Users,
      iconColor: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      label: "Medicines in Stock",
      value: 378,
      icon: Pill,
      iconColor: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      label: "Appointments Today",
      value: 36,
      icon: CalendarDays,
      iconColor: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      label: "Staff On Duty",
      value: 52,
      icon: UserCheck,
      iconColor: "text-yellow-600",
      bgColor: "bg-yellow-100",
    },
  ];

  // Weekly patients data for the chart
  const weeklyPatients = [
    { day: "Mon", patients: 24 },
    { day: "Tue", patients: 32 },
    { day: "Wed", patients: 28 },
    { day: "Thu", patients: 40 },
    { day: "Fri", patients: 35 },
    { day: "Sat", patients: 20 },
    { day: "Sun", patients: 18 },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-6 select-none">
        🏥 HospitalSys Overview
      </h1>

      <p className="text-gray-700 mb-8 max-w-xl">
        Welcome to HospitalSys — your comprehensive hospital management dashboard.  
        Monitor key metrics in real-time and keep your hospital running smoothly.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map(({ label, value, icon: Icon, iconColor, bgColor }) => (
          <div
            key={label}
            className="bg-white rounded-lg shadow-md p-6 flex items-center space-x-4 hover:shadow-lg transition"
          >
            <div
              className={`p-3 rounded-full ${bgColor} ${iconColor} flex items-center justify-center`}
              style={{ width: 48, height: 48 }}
            >
              <Icon size={28} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">{label}</p>
              <p className="text-2xl font-semibold text-gray-900">{value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Chart Section */}
      <section className="bg-white p-6 rounded-lg shadow-md mb-12">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Weekly Patients
        </h2>

        <ResponsiveContainer width="100%" height={250}>
          <LineChart
            data={weeklyPatients}
            margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="day" stroke="#4b5563" />
            <YAxis stroke="#4b5563" />
            <Tooltip
              contentStyle={{ backgroundColor: "#f9fafb", borderRadius: 6 }}
              cursor={{ stroke: "#3b82f6", strokeWidth: 2 }}
            />
            <Line
              type="monotone"
              dataKey="patients"
              stroke="#3b82f6"
              strokeWidth={3}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </section>

      <section className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
        <ul className="divide-y divide-gray-200">
          <li className="py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Activity className="text-blue-600" size={20} />
              <p className="text-gray-700">New patient registration: John Doe</p>
            </div>
            <time className="text-sm text-gray-400">10 min ago</time>
          </li>
          <li className="py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Activity className="text-green-600" size={20} />
              <p className="text-gray-700">Medicine stock updated: Paracetamol</p>
            </div>
            <time className="text-sm text-gray-400">30 min ago</time>
          </li>
          <li className="py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Activity className="text-purple-600" size={20} />
              <p className="text-gray-700">Appointment scheduled: Dr. Smith</p>
            </div>
            <time className="text-sm text-gray-400">1 hr ago</time>
          </li>
        </ul>
      </section>
    </div>
  );
}
