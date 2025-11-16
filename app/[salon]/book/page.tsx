"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  ArrowRight,
  Loader2,
  CheckCircle,
  Scissors,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";

interface Service {
  _id: string;
  name: string;
  duration: number;
  price: number;
}

interface Salon {
  _id: string;
  name: string;
  slug: string;
}

export default function BookingPage() {
  const params = useParams();
  const router = useRouter();
  const salonSlug = params.salon as string;

  const [salon, setSalon] = useState<Salon | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // Form data
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  useEffect(() => {
    loadSalonData();
  }, [salonSlug]);

  async function loadSalonData() {
    try {
      const res = await fetch(`/api/public/salon/${salonSlug}`);
      const data = await res.json();
        console.log("Salon data fetched:", data);   
      if (data.success) {
        setSalon(data.salon);
        setServices(data.services || []);
      }
    } catch (error) {
      console.error("Error loading salon:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch("/api/public/book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          salonId: salon?._id,
          customerName,
          customerEmail,
          customerPhone,
          serviceId: selectedService,
          date: `${selectedDate}T${selectedTime}:00`,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setSuccess(true);
      } else {
        alert(data.message || "Booking failed. Please try again.");
      }
    } catch (error) {
      console.error("Error booking:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  // Generate time slots
  const timeSlots = [
    "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
    "15:00", "15:30", "16:00", "16:30", "17:00", "17:30",
    "18:00", "18:30", "19:00", "19:30", "20:00"
  ];

  // Get minimum date (today)
  const today = new Date().toISOString().split('T')[0];

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-slate-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-slate-200 p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-4">
            Booking Confirmed! 🎉
          </h1>
          <p className="text-slate-600 mb-8">
            Your appointment at <span className="font-semibold text-purple-600">{salon?.name}</span> has been confirmed.
            We've sent a confirmation to your email.
          </p>
          <div className="bg-slate-50 rounded-lg p-4 mb-6 text-left">
            <h3 className="font-semibold text-slate-900 mb-3">Booking Details:</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-600">Name:</span>
                <span className="font-medium text-slate-900">{customerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Date:</span>
                <span className="font-medium text-slate-900">
                  {new Date(selectedDate).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Time:</span>
                <span className="font-medium text-slate-900">{selectedTime}</span>
              </div>
            </div>
          </div>
          <Link
            href={`/${salonSlug}`}
            className="inline-flex items-center space-x-2 px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Salon</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 py-6 sm:px-6">
          <Link
            href={`/${salonSlug}`}
            className="inline-flex items-center space-x-2 text-slate-600 hover:text-slate-900 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to {salon?.name}</span>
          </Link>
          <h1 className="text-3xl font-bold text-slate-900">Book Your Appointment</h1>
          <p className="mt-2 text-slate-600">Fill in your details to secure your slot</p>
        </div>
      </header>

      {/* Main Form */}
      <main className="max-w-4xl mx-auto px-4 py-12 sm:px-6">
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Information */}
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
                <User className="w-5 h-5 mr-2 text-purple-600" />
                Personal Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    required
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-slate-700 mb-2">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    required
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                  />
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Service Selection */}
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
                <Scissors className="w-5 h-5 mr-2 text-purple-600" />
                Select Service
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {services.map((service) => (
                  <label
                    key={service._id}
                    className={`relative flex items-start p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      selectedService === service._id
                        ? "border-purple-600 bg-purple-50"
                        : "border-slate-200 hover:border-purple-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="service"
                      value={service._id}
                      checked={selectedService === service._id}
                      onChange={(e) => setSelectedService(e.target.value)}
                      required
                      className="sr-only"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-900 mb-1">{service.name}</h3>
                      <div className="flex items-center space-x-4 text-sm text-slate-600">
                        <span className="flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {service.duration} min
                        </span>
                        <span className="text-purple-600 font-semibold">₹{service.price}</span>
                      </div>
                    </div>
                    {selectedService === service._id && (
                      <CheckCircle className="w-6 h-6 text-purple-600 flex-shrink-0" />
                    )}
                  </label>
                ))}
              </div>
            </div>

            {/* Date & Time Selection */}
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-purple-600" />
                Choose Date & Time
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="date" className="block text-sm font-semibold text-slate-700 mb-2">
                    Select Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="date"
                    type="date"
                    min={today}
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    required
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="time" className="block text-sm font-semibold text-slate-700 mb-2">
                    Select Time <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="time"
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    required
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none bg-white"
                  >
                    <option value="">Choose a time</option>
                    {timeSlots.map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                disabled={submitting}
                className="w-full flex items-center justify-center space-x-2 px-6 py-4 bg-purple-600 text-white font-semibold text-lg rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <span>Confirm Booking</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Info Card */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="font-semibold text-blue-900 mb-2">Important Information</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Please arrive 10 minutes before your appointment time</li>
            <li>• You'll receive a confirmation email shortly</li>
            <li>• For any changes, please contact the salon directly</li>
            <li>• Cancellations must be made at least 24 hours in advance</li>
          </ul>
        </div>
      </main>
    </div>
  );
}