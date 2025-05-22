import React, { useState } from "react";
import {
  PlusCircle,
  Pill,
  Search,
  X,
  ShoppingCart,
} from "lucide-react";

const sampleMedicines = [
  { id: 1, name: "Paracetamol", type: "Tablet", quantity: 50, expiry: "2025-11-12" },
  { id: 2, name: "Amoxicillin", type: "Capsule", quantity: 30, expiry: "2025-08-25" },
  { id: 3, name: "Ibuprofen", type: "Tablet", quantity: 80, expiry: "2026-02-01" },
  { id: 4, name: "Ciprofloxacin", type: "Tablet", quantity: 60, expiry: "2025-10-10" },
  { id: 5, name: "Metronidazole", type: "Tablet", quantity: 40, expiry: "2026-01-01" },
  { id: 6, name: "Aspirin", type: "Tablet", quantity: 90, expiry: "2025-09-18" },
  { id: 7, name: "Cetirizine", type: "Tablet", quantity: 100, expiry: "2026-06-30" },
];

export default function Medicines() {
  const [medicines, setMedicines] = useState(sampleMedicines);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [newMed, setNewMed] = useState({ name: "", type: "", quantity: "", expiry: "" });

  const [showSellModal, setShowSellModal] = useState(false);
  const [sellQty, setSellQty] = useState("");
  const [selectedMed, setSelectedMed] = useState(null);
  const [soldMedicines, setSoldMedicines] = useState([]);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleAddMedicine = () => {
    const id = medicines.length + 1;
    setMedicines([...medicines, { ...newMed, id, quantity: Number(newMed.quantity) }]);
    setNewMed({ name: "", type: "", quantity: "", expiry: "" });
    setShowAddModal(false);
  };

  const openSellModal = (med) => {
    setSelectedMed(med);
    setSellQty("");
    setShowSellModal(true);
  };

  const handleSell = () => {
    const qty = parseInt(sellQty);
    if (!qty || qty <= 0) return alert("Enter a valid quantity");
    if (qty > selectedMed.quantity) return alert("Not enough stock!");

    const updated = medicines.map((m) =>
      m.id === selectedMed.id ? { ...m, quantity: m.quantity - qty } : m
    );

    setMedicines(updated);
    setSoldMedicines([
      ...soldMedicines,
      {
        ...selectedMed,
        soldQuantity: qty,
        soldAt: new Date().toISOString(),
      },
    ]);
    setShowSellModal(false);
  };

  const filtered = medicines.filter((m) =>
    m.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination calculations
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = filtered.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div className="max-w-5xl mx-auto px-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold flex items-center gap-2 text-gray-800">
          <Pill size={28} className="text-green-600" /> Medicines
        </h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
        >
          <PlusCircle size={18} /> Add Medicine
        </button>
      </div>

      {/* Search Input */}
      <div className="mb-4 max-w-md relative">
        <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Search medicine by name..."
          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1); // reset to first page on search
          }}
        />
      </div>

      {/* Medicine Table */}
      <div className="overflow-x-auto shadow rounded-md bg-white">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Type</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Quantity</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Expiry Date</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Sell Out</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentItems.length > 0 ? (
              currentItems.map((med) => (
                <tr key={med.id}>
                  <td className="px-6 py-4 text-sm">{med.name}</td>
                  <td className="px-6 py-4 text-sm">{med.type}</td>
                  <td className="px-6 py-4 text-sm">{med.quantity}</td>
                  <td className="px-6 py-4 text-sm">
                    {new Date(med.expiry).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => openSellModal(med)}
                      className="flex items-center gap-1 text-sm text-blue-600 hover:underline"
                    >
                      <ShoppingCart size={16} /> Sell
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center text-sm text-gray-500 py-6">
                  No medicines found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {filtered.length > itemsPerPage && (
        <div className="flex justify-center items-center gap-2 mt-6">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-100 text-sm rounded disabled:opacity-50"
          >
            Prev
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              className={`px-3 py-1 rounded text-sm ${
                currentPage === i + 1
                  ? "bg-green-600 text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-gray-100 text-sm rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}

      {/* Sold Medicines Log */}
      {soldMedicines.length > 0 && (
        <div className="mt-10">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Sold Medicines</h2>
          <ul className="text-sm space-y-2">
            {soldMedicines.map((s, idx) => (
              <li key={idx} className="text-gray-700">
                <span className="font-medium">{s.name}</span> – {s.soldQuantity} sold on{" "}
                {new Date(s.soldAt).toLocaleString()}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white rounded-md shadow-lg p-6 w-full max-w-md relative">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
              onClick={() => setShowAddModal(false)}
            >
              <X />
            </button>
            <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
              <Pill size={20} /> Add New Medicine
            </h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Medicine Name"
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                value={newMed.name}
                onChange={(e) => setNewMed({ ...newMed, name: e.target.value })}
              />
              <input
                type="text"
                placeholder="Type (e.g., Tablet)"
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                value={newMed.type}
                onChange={(e) => setNewMed({ ...newMed, type: e.target.value })}
              />
              <input
                type="number"
                placeholder="Quantity"
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                value={newMed.quantity}
                onChange={(e) => setNewMed({ ...newMed, quantity: e.target.value })}
              />
              <input
                type="date"
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                value={newMed.expiry}
                onChange={(e) => setNewMed({ ...newMed, expiry: e.target.value })}
              />
              <button
                onClick={handleAddMedicine}
                className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
              >
                Save Medicine
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sell Modal */}
      {showSellModal && selectedMed && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white rounded-md shadow-lg p-6 w-full max-w-sm relative">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
              onClick={() => setShowSellModal(false)}
            >
              <X />
            </button>
            <h2 className="text-lg font-semibold mb-4 text-gray-800">
              Sell <span className="text-green-600">{selectedMed.name}</span>
            </h2>
            <input
              type="number"
              placeholder="Quantity to sell"
              className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4"
              value={sellQty}
              onChange={(e) => setSellQty(e.target.value)}
            />
            <button
              onClick={handleSell}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
            >
              Confirm Sale
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
