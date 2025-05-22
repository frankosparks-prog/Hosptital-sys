import React, { useState } from "react";
import { PlusCircle, User, X } from "lucide-react";

const sampleStaff = [
  { id: 1, name: "John Doe", role: "Pharmacist", contact: "john@example.com" },
  { id: 2, name: "Jane Smith", role: "Assistant", contact: "jane@example.com" },
  { id: 3, name: "Alice Johnson", role: "Manager", contact: "alice@example.com" },
  { id: 4, name: "Bob Brown", role: "Technician", contact: "bob@example.com" },
  { id: 5, name: "Carol White", role: "Clerk", contact: "carol@example.com" },
  { id: 6, name: "David Black", role: "Security", contact: "david@example.com" },
  { id: 7, name: "Eva Green", role: "HR", contact: "eva@example.com" },
];

export default function Staff() {
  const [staff, setStaff] = useState(sampleStaff);
  const [showModal, setShowModal] = useState(false);
  const [newStaff, setNewStaff] = useState({ name: "", role: "", contact: "" });
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  // Filter staff by search term
  const filteredStaff = staff.filter((s) =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination calculations
  const totalPages = Math.ceil(filteredStaff.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedStaff = filteredStaff.slice(startIndex, startIndex + pageSize);

  const handleAdd = () => {
    if (!newStaff.name.trim()) {
      alert("Please enter a name");
      return;
    }
    const id = staff.length + 1;
    setStaff([...staff, { ...newStaff, id }]);
    setNewStaff({ name: "", role: "", contact: "" });
    setShowModal(false);
    setCurrentPage(totalPages); // Go to last page where new staff will appear
  };

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div className="max-w-5xl mx-auto px-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold flex items-center gap-2 text-gray-800">
          <User size={28} className="text-blue-600" /> Our Staff
        </h1>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md" 
        >
          <PlusCircle size={18} /> Add Staff
        </button>
      </div>

      {/* Search input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name..."
          className="w-full max-w-sm border border-gray-300 rounded-md px-3 py-2"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1); // reset to first page on search
          }}
        />
      </div>

      {/* Staff Table */}
      <div className="overflow-x-auto bg-white shadow rounded-md">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                Contact
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {paginatedStaff.length > 0 ? (
              paginatedStaff.map((s) => (
                <tr key={s.id}>
                  <td className="px-6 py-4 text-sm">{s.name}</td>
                  <td className="px-6 py-4 text-sm">{s.role}</td>
                  <td className="px-6 py-4 text-sm">{s.contact}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="text-center text-sm text-gray-500 py-6">
                  No staff members found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-3 mt-4">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded border border-gray-300 disabled:opacity-50"
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => goToPage(i + 1)}
              className={`px-3 py-1 rounded border ${
                currentPage === i + 1 ? "bg-blue-600 text-white" : "border-gray-300"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded border border-gray-300 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}

      {/* Add Staff Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white rounded-md shadow-lg p-6 w-full max-w-md relative">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
              onClick={() => setShowModal(false)}
            >
              <X />
            </button>
            <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
              <User size={20} /> Add New Staff
            </h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                value={newStaff.name}
                onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })}
              />
              <input
                type="text"
                placeholder="Role"
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                value={newStaff.role}
                onChange={(e) => setNewStaff({ ...newStaff, role: e.target.value })}
              />
              <input
                type="email"
                placeholder="Contact (Email or Phone)"
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                value={newStaff.contact}
                onChange={(e) => setNewStaff({ ...newStaff, contact: e.target.value })}
              />
              <button
                onClick={handleAdd}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
              >
                Save Staff
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
