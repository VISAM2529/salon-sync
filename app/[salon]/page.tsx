import dbConnect from "@/lib/dbConnect";
import Salon from "@/models/Salon";
import Service from "@/models/Service";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Calendar,
  Scissors,
  Star,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

export default async function SalonPublicPage({ params }: any) {
  // ✅ FIX: unwrap params (Next.js 14 returns a Promise)
  const { salon } = await params;

  await dbConnect();

  // Fetch salon
 const salonDoc = (await Salon.findOne({ slug: salon }).lean()) as any;

  console.log("SalonDoc:", salonDoc); 
  // ❗ MUST check removal BEFORE using salonDoc._id
  if (!salonDoc) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Scissors className="w-8 h-8 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">
            Salon Not Found
          </h1>
          <p className="text-slate-600 mb-6">
            The salon you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <Link
            href="/"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors"
          >
            <span>Go to Homepage</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  // Fetch services safely
  const services = await Service.find({ salonId: salonDoc._id }).lean();

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header/Hero Section */}
      <header className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="max-w-6xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl mb-6">
              <Scissors className="w-10 h-10" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {salonDoc.name}
            </h1>
            <p className="text-xl text-purple-100 mb-8">
              Book your appointment online - Quick, Easy & Convenient
            </p>

            {/* Salon Info */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-purple-100">
              {salonDoc.address && (
                <div className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5" />
                  <span>{salonDoc.address}</span>
                </div>
              )}
              {salonDoc.phone && (
                <div className="flex items-center space-x-2">
                  <Phone className="w-5 h-5" />
                  <span>{salonDoc.phone}</span>
                </div>
              )}
              {salonDoc.email && (
                <div className="flex items-center space-x-2">
                  <Mail className="w-5 h-5" />
                  <span>{salonDoc.email}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        
        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-xl p-6 border border-slate-200 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-slate-900 mb-2">Instant Booking</h3>
            <p className="text-sm text-slate-600">
              Book your slot in seconds, no phone calls needed
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-slate-200 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-slate-900 mb-2">Real-Time Queue</h3>
            <p className="text-sm text-slate-600">
              Track your position and estimated wait time
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-slate-200 text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-slate-900 mb-2">Quality Service</h3>
            <p className="text-sm text-slate-600">
              Professional stylists and premium experience
            </p>
          </div>
        </div>

        {/* Services List */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-3">Our Services</h2>
            <p className="text-slate-600">
              Choose from our range of professional services
            </p>
          </div>

          {services.length === 0 ? (
            <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Scissors className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                No Services Available
              </h3>
              <p className="text-slate-600">
                This salon is setting up their services. Please check back soon!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service: any) => (
                <div
                  key={service._id.toString()}
                  className="bg-white rounded-xl border border-slate-200 p-6 hover:border-purple-300 hover:shadow-lg transition-all group"
                >
                  <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-purple-200 transition-colors">
                    <Scissors className="w-7 h-7 text-purple-600" />
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-3">
                    {service.name}
                  </h3>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-slate-600">
                      <Clock className="w-4 h-4 mr-2" />
                      <span className="text-sm">{service.duration} minutes</span>
                    </div>
                    <div className="flex items-center text-purple-600 font-semibold">
                      <span className="text-2xl">₹{service.price}</span>
                    </div>
                  </div>

                  {service.description && (
                    <p className="text-sm text-slate-600 mb-4">
                      {service.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 md:p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Book?</h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Schedule your appointment now and skip the wait. Get the perfect look you deserve!
          </p>

          <Link
            href={`/${salon}/book`}
            className="inline-flex items-center space-x-2 px-8 py-4 bg-white text-purple-600 font-bold text-lg rounded-lg hover:bg-purple-50 transition-colors shadow-lg"
          >
            <Calendar className="w-6 h-6" />
            <span>Book Your Appointment</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        {/* Extra Info */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h3 className="font-semibold text-slate-900 mb-4 flex items-center">
              <Clock className="w-5 h-5 mr-2 text-purple-600" />
              Opening Hours
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-600">Monday - Friday</span>
                <span className="font-medium text-slate-900">
                  9:00 AM - 8:00 PM
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Saturday</span>
                <span className="font-medium text-slate-900">
                  9:00 AM - 9:00 PM
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Sunday</span>
                <span className="font-medium text-slate-900">
                  10:00 AM - 6:00 PM
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h3 className="font-semibold text-slate-900 mb-4 flex items-center">
              <MapPin className="w-5 h-5 mr-2 text-purple-600" />
              Visit Us
            </h3>
            <div className="space-y-3 text-sm">
              <p className="text-slate-600">{salonDoc.address}</p>
              {salonDoc.phone && (
                <a
                  href={`tel:${salonDoc.phone}`}
                  className="flex items-center text-purple-600 hover:text-purple-700"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  {salonDoc.phone}
                </a>
              )}
              {salonDoc.email && (
                <a
                  href={`mailto:${salonDoc.email}`}
                  className="flex items-center text-purple-600 hover:text-purple-700"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  {salonDoc.email}
                </a>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-12">
        <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="text-center text-sm text-slate-600">
            <p className="mb-2">
              Powered by{" "}
              <Link
                href="/"
                className="font-semibold text-purple-600 hover:text-purple-700"
              >
                SalonSync
              </Link>
            </p>
            <p>© 2024 {salonDoc.name}. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
