"use client";

import { useEffect, useState } from "react";
import { 
  Users, 
  Plus, 
  Check, 
  Clock, 
  User,
  ChevronRight,
  AlertCircle,
  Trash2
} from "lucide-react";

interface Service {
  _id: string;
  name: string;
  duration: number;
  price: number;
}

interface QueueItem {
  _id: string;
  position: number;
  customerName: string;
  serviceId: string;
  serviceName?: string;
  createdAt: string;
}

export default function QueueManagement() {
  const [salon, setSalon] = useState<any>(null);
  const [queue, setQueue] = useState<QueueItem[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(false);

  const [customerName, setCustomerName] = useState("");
  const [serviceId, setServiceId] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("salon");
    if (saved) {
      const s = JSON.parse(saved);
      setSalon(s);
      loadQueue(s._id);
      loadServices(s._id);
    }
  }, []);

  async function loadQueue(id: string) {
    try {
      const res = await fetch(`/api/queue/list?id=${id}`);
      const data = await res.json();
      setQueue(data.queue || []);
    } catch (error) {
      console.error("Error loading queue:", error);
    }
  }

  async function loadServices(id: string) {
    try {
      const res = await fetch(`/api/salon/services/list?id=${id}`);
      const data = await res.json();
      setServices(data.services || []);
    } catch (error) {
      console.error("Error loading services:", error);
    }
  }

  async function addToQueue(e: React.FormEvent) {
    e.preventDefault();
    if (!customerName || !serviceId) return;

    setLoading(true);
    try {
      await fetch(`/api/queue/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          salonId: salon._id,
          customerName,
          serviceId,
        }),
      });

      await loadQueue(salon._id);
      setCustomerName("");
      setServiceId("");
    } catch (error) {
      console.error("Error adding to queue:", error);
    } finally {
      setLoading(false);
    }
  }

  async function removeItem(id: string, customerName: string) {
    if (!confirm(`Mark ${customerName} as completed?`)) return;

    try {
      await fetch(`/api/queue/remove`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      loadQueue(salon._id);
    } catch (error) {
      console.error("Error removing from queue:", error);
    }
  }

  function getServiceName(serviceId: string) {
    const service = services.find(s => s._id === serviceId);
    return service?.name || "Unknown Service";
  }

  function getEstimatedWait(position: number) {
    if (position === 1) return "Now serving";
    const avgTime = 30; // Average service time in minutes
    const waitTime = (position - 1) * avgTime;
    if (waitTime < 60) return `~${waitTime} mins`;
    const hours = Math.floor(waitTime / 60);
    const mins = waitTime % 60;
    return `~${hours}h ${mins}m`;
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
      {/* Header with Stats */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Queue Management</h1>
          <p className="mt-2 text-slate-600">
            Manage your customer queue in real-time
          </p>
        </div>
        <div className="bg-purple-100 px-6 py-3 rounded-xl">
          <div className="text-3xl font-bold text-purple-700">{queue.length}</div>
          <div className="text-sm text-purple-600">In Queue</div>
        </div>
      </div>

      {/* Add to Queue Form */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
            <Plus className="w-5 h-5 text-purple-600" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">Add Customer to Queue</h2>
        </div>

        <form onSubmit={addToQueue} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Customer Name */}
            <div>
              <label htmlFor="customerName" className="block text-sm font-semibold text-slate-700 mb-2">
                Customer Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  id="customerName"
                  type="text"
                  placeholder="Enter customer name"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  required
                  className="block w-full pl-10 pr-3 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-colors"
                />
              </div>
            </div>

            {/* Service Selection */}
            <div>
              <label htmlFor="service" className="block text-sm font-semibold text-slate-700 mb-2">
                Select Service
              </label>
              <select
                id="service"
                value={serviceId}
                onChange={(e) => setServiceId(e.target.value)}
                required
                className="block w-full px-3 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-colors bg-white"
              >
                <option value="">Choose a service</option>
                {services.map((service) => (
                  <option key={service._id} value={service._id}>
                    {service.name} - ₹{service.price} ({service.duration} mins)
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || !customerName || !serviceId}
            className="flex items-center space-x-2 px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Plus className="w-5 h-5" />
            <span>{loading ? "Adding..." : "Add to Queue"}</span>
          </button>
        </form>

        {services.length === 0 && (
          <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-yellow-900">No services available</p>
                <p className="text-sm text-yellow-800 mt-1">
                  Please add services first before managing the queue.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Active Queue */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-900">Active Queue</h2>
          {queue.length > 0 && (
            <span className="text-sm text-slate-600">
              Next estimated wait: {getEstimatedWait(queue.length + 1)}
            </span>
          )}
        </div>

        {queue.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Queue is empty</h3>
            <p className="text-slate-600">Add customers to the queue using the form above</p>
          </div>
        ) : (
          <div className="space-y-3">
            {queue.map((item, index) => (
              <div
                key={item._id}
                className={`relative flex items-center justify-between p-5 rounded-lg border-2 transition-all ${
                  index === 0
                    ? 'bg-purple-50 border-purple-300 shadow-md'
                    : 'bg-slate-50 border-slate-200 hover:border-purple-200'
                }`}
              >
                {/* Position Badge */}
                <div className="absolute -left-3 -top-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shadow-lg ${
                    index === 0
                      ? 'bg-purple-600 text-white'
                      : 'bg-white text-slate-700 border-2 border-slate-200'
                  }`}>
                    #{item.position}
                  </div>
                </div>

                {/* Customer Info */}
                <div className="flex-1 ml-4">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      index === 0 ? 'bg-purple-200' : 'bg-slate-200'
                    }`}>
                      <span className={`font-semibold ${
                        index === 0 ? 'text-purple-700' : 'text-slate-700'
                      }`}>
                        {item.customerName.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900">{item.customerName}</h3>
                      <p className="text-sm text-slate-600">{getServiceName(item.serviceId)}</p>
                    </div>
                  </div>
                </div>

                {/* Status & Actions */}
                <div className="flex items-center space-x-4">
                  <div className="text-right hidden sm:block">
                    {index === 0 ? (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-700">
                        <Clock className="w-4 h-4 mr-1" />
                        Now Serving
                      </span>
                    ) : (
                      <div>
                        <div className="text-sm font-semibold text-slate-900">
                          {getEstimatedWait(item.position)}
                        </div>
                        <div className="text-xs text-slate-500">Est. wait</div>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => removeItem(item._id, item.customerName)}
                    className={`p-2 rounded-lg transition-colors ${
                      index === 0
                        ? 'bg-green-600 text-white hover:bg-green-700'
                        : 'text-slate-600 hover:bg-slate-200'
                    }`}
                    title={index === 0 ? "Mark as completed" : "Remove from queue"}
                  >
                    {index === 0 ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <Trash2 className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Queue Stats */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Queue Statistics</h3>
              <div className="text-sm text-blue-800 space-y-1">
                <p>• Total in queue: <span className="font-semibold">{queue.length}</span></p>
                <p>• Currently serving: <span className="font-semibold">{queue.length > 0 ? queue[0].customerName : 'None'}</span></p>
                <p>• Estimated total wait: <span className="font-semibold">{queue.length > 0 ? getEstimatedWait(queue.length) : 'N/A'}</span></p>
              </div>
            </div>
          </div>
        </div>

        {/* Tips */}
        <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <ChevronRight className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h3 className="font-semibold text-purple-900 mb-1">Queue Management Tips</h3>
              <ul className="text-sm text-purple-800 space-y-1">
                <li>• Mark customers as done when service is complete</li>
                <li>• Queue updates automatically for all users</li>
                <li>• Customers can track their position in real-time</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}