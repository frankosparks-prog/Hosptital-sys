import React from "react";
import { CalendarDays } from "lucide-react";
function Appointments() {
  return (
    <div className="text-3xl font-bold flex items-center gap-2 text-gray-800">
      <CalendarDays size={28} className="text-blue-600" />
      Appointments Coming Soon...
    </div>
  );
}

export default Appointments;
