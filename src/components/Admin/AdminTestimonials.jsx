import React, { useEffect, useState } from "react";
import axios from "axios";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

function AdminTestimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [form, setForm] = useState({ name: "", message: "", isVerified: false });
  const [editingId, setEditingId] = useState(null);

  // Fetch all testimonials
  const fetchTestimonials = async () => {
    try {
      const res = await axios.get(`${SERVER_URL}/api/testimonials`);
      setTestimonials(res.data);
    } catch (err) {
      console.error("Error fetching testimonials:", err);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`${SERVER_URL}/api/testimonials/${editingId}`, form);
      } else {
        await axios.post(`${SERVER_URL}/api/testimonials`, form);
      }
      setForm({ name: "", message: "", isVerified: false });
      setEditingId(null);
      fetchTestimonials();
    } catch (err) {
      console.error("Submit error:", err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this testimonial?")) {
      try {
        await axios.delete(`${SERVER_URL}/api/testimonials/${id}`);
        fetchTestimonials();
      } catch (err) {
        console.error("Delete error:", err);
      }
    }
  };

  const handleEdit = (testimonial) => {
    setForm({
      name: testimonial.name,
      message: testimonial.message,
      isVerified: testimonial.isVerified,
    });
    setEditingId(testimonial._id);
  };

  return (
    <div className="p-6 bg-white text-amber-900">
      <h2 className="text-2xl font-bold mb-4">Manage Testimonials</h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <input
          type="text"
          placeholder="Name"
          className="w-full p-2 border border-amber-300 rounded"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <textarea
          placeholder="Message"
          className="w-full p-2 border border-amber-300 rounded"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          required
        />
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={form.isVerified}
            onChange={(e) => setForm({ ...form, isVerified: e.target.checked })}
          />
          Verified?
        </label>
        <button
          type="submit"
          className="bg-amber-600 text-white px-4 py-2 rounded hover:bg-amber-700"
        >
          {editingId ? "Update" : "Add"} Testimonial
        </button>
      </form>

      {/* Testimonials List */}
      <ul className="space-y-6">
        {testimonials.map((t) => (
          <li
            key={t._id}
            className="border border-amber-300 rounded p-4 bg-amber-50"
          >
            <p className="font-semibold">{t.name}</p>
            <p className="italic mb-2">"{t.message}"</p>
            <p className="text-sm">
              Status:{" "}
              <span
                className={`font-bold ${
                  t.isVerified ? "text-green-600" : "text-red-500"
                }`}
              >
                {t.isVerified ? "Verified" : "Unverified"}
              </span>
            </p>
            <div className="mt-2 space-x-2">
              <button
                onClick={() => handleEdit(t)}
                className="text-blue-600 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(t._id)}
                className="text-red-600 hover:underline"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminTestimonials;
