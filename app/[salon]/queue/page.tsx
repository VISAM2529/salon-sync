import dbConnect from "@/lib/dbConnect";
import Salon from "@/models/Salon";
import Queue from "@/models/Queue";
import Service from "@/models/Service";
import {
  Users,
  Clock,
  Scissors,
  TrendingUp,
  CheckCircle,
  ArrowLeft,
  Zap,
} from "lucide-react";
import Link from "next/link";

export default async function QueuePage({ params }: any) {
  await dbConnect();

  const { salon: slug } = await params;

const salon = (await Salon.findOne({ slug }).lean()) as any;

  if (!salon) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="w-8 h-8 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Salon Not Found</h1>
          <p className="text-slate-600">The salon you&apos;re looking for doesn&apos;t exist.</p>
        </div>
      </div>
    );
  }

  const queue = await Queue.find({ salonId: salon._id }).sort({ position: 1 }).lean();
  const services = await Service.find({ salonId: salon._id }).lean();

  const serviceMap: any = {};
  services.forEach((s: any) => (serviceMap[s._id.toString()] = s));

  // Calculate wait times
  const avgServiceTime = 30; // minutes
  const currentTime = new Date();

  function getEstimatedWaitTime(position: number) {
    if (position === 1) return "Now Serving";
    const waitMinutes = (position - 1) * avgServiceTime;
    if (waitMinutes < 60) return `~${waitMinutes} mins`;
    const hours = Math.floor(waitMinutes / 60);
    const mins = waitMinutes % 60;
    return `~${hours}h ${mins}m`;
  }

  function getEstimatedTime(position: number) {
    const waitMinutes = (position - 1) * avgServiceTime;
    const estimatedTime = new Date(currentTime.getTime() + waitMinutes * 60000);
    return estimatedTime.toLocaleTimeString('en-IN', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-6 sm:px-6">
          <Link
            href={`/`}
            className="inline-flex items-center space-x-2 text-slate-600 hover:text-slate-900 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to {salon.name}</span>
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Live Queue</h1>
              <p className="mt-1 text-slate-600">Real-time waiting queue at {salon.name}</p>
            </div>
            <div className="bg-purple-100 px-6 py-3 rounded-xl text-center">
              <div className="text-3xl font-bold text-purple-700">{queue.length}</div>
              <div className="text-sm text-purple-600">In Queue</div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 py-8 sm:px-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-slate-900">
              {queue.length > 0 ? getEstimatedWaitTime(queue.length + 1) : '0 min'}
            </h3>
            <p className="text-sm text-slate-600 mt-1">Estimated Wait Time</p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-slate-900">{queue.length}</h3>
            <p className="text-sm text-slate-600 mt-1">People Waiting</p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-slate-900">
              {queue.length > 0 ? getEstimatedTime(queue.length + 1) : 'Now'}
            </h3>
            <p className="text-sm text-slate-600 mt-1">Your Estimated Turn</p>
          </div>
        </div>

        {/* Queue Status */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-900">Current Queue</h2>
            <div className="flex items-center space-x-2 text-sm text-slate-600">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Live Updates</span>
            </div>
          </div>

          {queue.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">
                No Wait Time! 🎉
              </h3>
              <p className="text-slate-600 mb-6">
                The queue is empty. You can walk in right now!
              </p>
              <Link
                href={`/book`}
                className="inline-flex items-center space-x-2 px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors"
              >
                <span>Book Now</span>
                <TrendingUp className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {queue.map((item: any, index: number) => (
                <div
                  key={item._id.toString()}
                  className={`relative flex items-center justify-between p-5 rounded-lg border-2 transition-all ${
                    index === 0
                      ? 'bg-purple-50 border-purple-300 shadow-md'
                      : 'bg-slate-50 border-slate-200'
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
                        <span className={`font-semibold text-sm ${
                          index === 0 ? 'text-purple-700' : 'text-slate-700'
                        }`}>
                          {item.customerName?.charAt(0).toUpperCase() || '?'}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-slate-900">
                          {item.customerName || 'Customer'}
                        </h3>
                        <div className="flex items-center space-x-2 text-sm text-slate-600">
                          <Scissors className="w-3 h-3" />
                          <span>{serviceMap[item.serviceId?.toString()]?.name || 'Service'}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Status & Wait Time */}
                  <div className="text-right ml-4">
                    {index === 0 ? (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-700 border border-green-200">
                        <Clock className="w-4 h-4 mr-1" />
                        Now Serving
                      </span>
                    ) : (
                      <div>
                        <div className="text-sm font-semibold text-slate-900">
                          {getEstimatedWaitTime(item.position)}
                        </div>
                        <div className="text-xs text-slate-500">
                          Est. {getEstimatedTime(item.position)}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* How It Works */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
            <h3 className="font-semibold text-blue-900 mb-4 flex items-center">
              <Users className="w-5 h-5 mr-2" />
              How the Queue Works
            </h3>
            <ul className="text-sm text-blue-800 space-y-2">
              <li className="flex items-start">
                <span className="mr-2">1.</span>
                <span>Join the queue by booking an appointment</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">2.</span>
                <span>Track your position in real-time on this page</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">3.</span>
                <span>Arrive at the salon when your turn is near</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">4.</span>
                <span>Get served without the wait!</span>
              </li>
            </ul>
          </div>

          {/* Quick Actions */}
          <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
            <h3 className="font-semibold text-purple-900 mb-4 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              Quick Actions
            </h3>
            <div className="space-y-3">
              <Link
                href={`/${slug}/book`}
                className="block w-full px-4 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors text-center"
              >
                Book an Appointment
              </Link>
              <Link
                href={`/${slug}`}
                className="block w-full px-4 py-3 bg-white text-purple-600 font-semibold rounded-lg hover:bg-purple-50 transition-colors text-center border border-purple-200"
              >
                View Services
              </Link>
            </div>
          </div>
        </div>

        {/* Auto Refresh Notice */}
        <div className="mt-8 bg-slate-100 border border-slate-200 rounded-lg p-4 text-center">
          <p className="text-sm text-slate-600">
            <span className="font-semibold">💡 Tip:</span> This page updates in real-time. 
            Refresh to see the latest queue status.
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-12">
        <div className="max-w-5xl mx-auto px-4 py-6 sm:px-6">
          <p className="text-center text-sm text-slate-600">
            Powered by{" "}
            <Link href="/" className="font-semibold text-purple-600 hover:text-purple-700">
              TrimSetGo
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}