"use client";

import { useEffect, useState } from "react";
import { 
  Scissors, 
  Plus, 
  Trash2, 
  Clock, 
  IndianRupee,
  Edit,
  X,
  Save
} from "lucide-react";

interface Service {
  _id: string;
  name: string;
  duration: number;
  price: number;
}

export default function ManageServices() {
  const [salon, setSalon] = useState<any>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(false);

  // Add service form
  const [name, setName] = useState("");
  const [duration, setDuration] = useState("");
  const [price, setPrice] = useState("");

  // Edit mode
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editDuration, setEditDuration] = useState("");
  const [editPrice, setEditPrice] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("salon");
    if (saved) {
      const s = JSON.parse(saved);
      setSalon(s);
      loadServices(s._id);
    }
  }, []);

  async function loadServices(id: string) {
    try {
      const res = await fetch(`/api/salon/services/list?id=${id}`);
      const data = await res.json();
      setServices(data.services || []);
    } catch (error) {
      console.error("Error loading services:", error);
    }
  }

  async function addService(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`/api/salon/services`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          salonId: salon._id,
          name,
          duration: parseInt(duration),
          price: parseInt(price),
        }),
      });

      if (res.ok) {
        await loadServices(salon._id);
        setName("");
        setDuration("");
        setPrice("");
      }
    } catch (error) {
      console.error("Error adding service:", error);
    } finally {
      setLoading(false);
    }
  }

  async function deleteService(id: string) {
    if (!confirm("Are you sure you want to delete this service?")) return;

    try {
      await fetch(`/api/salon/services`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      loadServices(salon._id);
    } catch (error) {
      console.error("Error deleting service:", error);
    }
  }

  function startEdit(service: Service) {
    setEditingId(service._id);
    setEditName(service.name);
    setEditDuration(service.duration.toString());
    setEditPrice(service.price.toString());
  }

  function cancelEdit() {
    setEditingId(null);
    setEditName("");
    setEditDuration("");
    setEditPrice("");
  }

  async function saveEdit(id: string) {
    try {
      const res = await fetch(`/api/salon/services`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          name: editName,
          duration: parseInt(editDuration),
          price: parseInt(editPrice),
        }),
      });

      if (res.ok) {
        await loadServices(salon._id);
        cancelEdit();
      }
    } catch (error) {
      console.error("Error updating service:", error);
    }
  }

  if (!salon) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-slate-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Manage Services</h1>
        <p className="mt-2 text-slate-600">
          Add and manage the services offered at {salon.name}
        </p>
      </div>

      {/* Add New Service Form */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
            <Plus className="w-5 h-5 text-purple-600" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">Add New Service</h2>
        </div>

        <form onSubmit={addService} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Service Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-2">
                Service Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Scissors className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  id="name"
                  type="text"
                  placeholder="e.g., Haircut"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="block w-full pl-10 pr-3 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-colors"
                />
              </div>
            </div>

            {/* Duration */}
            <div>
              <label htmlFor="duration" className="block text-sm font-semibold text-slate-700 mb-2">
                Duration (minutes)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Clock className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  id="duration"
                  type="number"
                  placeholder="30"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  required
                  min="1"
                  className="block w-full pl-10 pr-3 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-colors"
                />
              </div>
            </div>

            {/* Price */}
            <div>
              <label htmlFor="price" className="block text-sm font-semibold text-slate-700 mb-2">
                Price (₹)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <IndianRupee className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  id="price"
                  type="number"
                  placeholder="500"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                  min="0"
                  className="block w-full pl-10 pr-3 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-colors"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex items-center space-x-2 px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Plus className="w-5 h-5" />
            <span>{loading ? "Adding..." : "Add Service"}</span>
          </button>
        </form>
      </div>

      {/* Services List */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-900">Your Services</h2>
          <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-semibold">
            {services.length} {services.length === 1 ? 'Service' : 'Services'}
          </span>
        </div>

        {services.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Scissors className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">No services yet</h3>
            <p className="text-slate-600">Add your first service using the form above</p>
          </div>
        ) : (
          <div className="space-y-3">
            {services.map((service) => (
              <div
                key={service._id}
                className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200 hover:border-purple-200 transition-colors"
              >
                {editingId === service._id ? (
                  // Edit Mode
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                    />
                    <input
                      type="number"
                      value={editDuration}
                      onChange={(e) => setEditDuration(e.target.value)}
                      className="px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                    />
                    <input
                      type="number"
                      value={editPrice}
                      onChange={(e) => setEditPrice(e.target.value)}
                      className="px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                    />
                  </div>
                ) : (
                  // View Mode
                  <div className="flex-1 flex items-center space-x-6">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Scissors className="w-5 h-5 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-900">{service.name}</h3>
                      <div className="flex items-center space-x-4 mt-1 text-sm text-slate-600">
                        <span className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{service.duration} mins</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <IndianRupee className="w-4 h-4" />
                          <span>{service.price}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex items-center space-x-2 ml-4">
                  {editingId === service._id ? (
                    <>
                      <button
                        onClick={() => saveEdit(service._id)}
                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        title="Save"
                      >
                        <Save className="w-5 h-5" />
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                        title="Cancel"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => startEdit(service)}
                        className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => deleteService(service._id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Info Card */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <div className="flex items-start space-x-3">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <Scissors className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold text-blue-900 mb-1">Service Management Tips</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Services are shown to customers on your public booking page</li>
              <li>• Set realistic durations to manage your schedule effectively</li>
              <li>• Update prices regularly to reflect current market rates</li>
              <li>• Use clear, descriptive names so customers know exactly what they&apos;re booking</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}