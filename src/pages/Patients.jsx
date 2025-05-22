import React, { useState, useMemo, useRef } from "react";
import {
  Search,
  User,
  CalendarDays,
  Info,
  ChevronDown,
  ChevronUp,
  Printer,
  FileText,
  PlusCircle,
  X,
} from "lucide-react";

const initialPatients = [
  { id: 1, name: "John Doe", age: 32, gender: "Male", lastVisit: "2025-05-18" },
  { id: 2, name: "Jane Smith", age: 29, gender: "Female", lastVisit: "2025-05-15" },
  { id: 3, name: "Samuel Green", age: 45, gender: "Male", lastVisit: "2025-05-20" },
  { id: 4, name: "Emma Brown", age: 38, gender: "Female", lastVisit: "2025-05-10" },
  { id: 5, name: "Lucas White", age: 26, gender: "Male", lastVisit: "2025-05-19" },
  { id: 6, name: "Olivia Black", age: 34, gender: "Female", lastVisit: "2025-05-13" },
  { id: 7, name: "Mia Blue", age: 40, gender: "Female", lastVisit: "2025-05-11" },
  { id: 8, name: "Noah Red", age: 31, gender: "Male", lastVisit: "2025-05-14" },
  { id: 9, name: "Liam Gray", age: 37, gender: "Male", lastVisit: "2025-05-12" },
  { id: 10, name: "Sophia Violet", age: 28, gender: "Female", lastVisit: "2025-05-16" },
];

const PAGE_SIZE = 5;

export default function Patients() {
  const [patients, setPatients] = useState(initialPatients);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "name", direction: "asc" });
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "Male",
    lastVisit: "",
  });

  const printRef = useRef();

  const filteredPatients = useMemo(() => {
    return patients.filter((p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, patients]);

  const sortedPatients = useMemo(() => {
    const sorted = [...filteredPatients];
    sorted.sort((a, b) => {
      let aValue = a[sortConfig.key];
      let bValue = b[sortConfig.key];
      if (sortConfig.key === "lastVisit") {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }
      if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
    return sorted;
  }, [filteredPatients, sortConfig]);

  const paginatedPatients = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return sortedPatients.slice(start, start + PAGE_SIZE);
  }, [sortedPatients, currentPage]);

  const totalPages = Math.ceil(sortedPatients.length / PAGE_SIZE);

  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const generateCSV = () => {
    const headers = ["Name", "Age", "Gender", "Last Visit"];
    const rows = sortedPatients.map((p) => [
      p.name,
      p.age,
      p.gender,
      new Date(p.lastVisit).toLocaleDateString(),
    ]);
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map((e) => e.join(",")).join("\n");
    return encodeURI(csvContent);
  };

  const handlePrint = () => {
    if (!printRef.current) return;
    const printContents = printRef.current.innerHTML;
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload();
  };

  const handleAddPatient = () => {
    const newPatient = {
      ...form,
      id: patients.length + 1,
    };
    setPatients((prev) => [newPatient, ...prev]);
    setShowModal(false);
    setForm({ name: "", age: "", gender: "Male", lastVisit: "" });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 select-none">
      <h1 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
        <User size={28} className="text-blue-600" /> Patients
      </h1>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div className="relative max-w-md w-full">
          <div className="relative text-gray-400 focus-within:text-gray-600">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search size={18} />
            </div>
            <input
              type="search"
              placeholder="Search patients by name..."
              className="block w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-3 text-sm placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 focus:outline-none focus:ring-1 transition"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center gap-2 rounded-md bg-indigo-600 px-4 py-2 text-white text-sm font-semibold hover:bg-indigo-700 transition"
          >
            <PlusCircle size={18} /> Add Patient
          </button>

          <a
            href={generateCSV()}
            download="patients.csv"
            className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-white text-sm font-semibold hover:bg-blue-700 transition"
          >
            <FileText size={18} /> Export CSV
          </a>

          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-2 rounded-md bg-green-600 px-4 py-2 text-white text-sm font-semibold hover:bg-green-700 transition"
          >
            <Printer size={18} /> Print
          </button>
        </div>
      </div>

      {/* Patient Table */}
      <div ref={printRef} className="overflow-x-auto rounded-lg shadow-md bg-white">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {[
                { label: "Name", key: "name", icon: User },
                { label: "Age", key: "age" },
                { label: "Gender", key: "gender" },
                { label: "Last Visit", key: "lastVisit", icon: CalendarDays },
                { label: "Details", key: null },
              ].map(({ label, key, icon: Icon }) => (
                <th
                  key={label}
                  onClick={() => key && requestSort(key)}
                  className={`px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider ${
                    key ? "hover:text-blue-600 cursor-pointer" : ""
                  }`}
                >
                  <div className="flex items-center gap-1">
                    {Icon && <Icon size={16} />}
                    {label}
                    {sortConfig.key === key ? (
                      sortConfig.direction === "asc" ? (
                        <ChevronUp size={14} />
                      ) : (
                        <ChevronDown size={14} />
                      )
                    ) : null}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {paginatedPatients.length > 0 ? (
              paginatedPatients.map(({ id, name, age, gender, lastVisit }) => (
                <tr key={id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 text-sm text-gray-900 font-medium">{name}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{age}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{gender}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {new Date(lastVisit).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-blue-600 flex items-center gap-1">
                    <Info size={16} />
                    Details
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                  No patients found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center py-4">
        <button
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-sm text-gray-600">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-md p-6 shadow-lg relative">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
              onClick={() => setShowModal(false)}
            >
              <X size={20} />
            </button>
            <h2 className="text-lg font-bold mb-4">Add New Patient</h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Name"
                className="w-full border p-2 rounded"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              <input
                type="number"
                placeholder="Age"
                className="w-full border p-2 rounded"
                value={form.age}
                onChange={(e) => setForm({ ...form, age: e.target.value })}
              />
              <select
                className="w-full border p-2 rounded"
                value={form.gender}
                onChange={(e) => setForm({ ...form, gender: e.target.value })}
              >
                <option>Male</option>
                <option>Female</option>
              </select>
              <input
                type="date"
                className="w-full border p-2 rounded"
                value={form.lastVisit}
                onChange={(e) => setForm({ ...form, lastVisit: e.target.value })}
              />
              <div className="flex justify-end gap-3 mt-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-200 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddPatient}
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                  Add Patient
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
