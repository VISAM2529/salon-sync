"use client";

import { useState } from "react";
import {
    Star,
    MessageCircle,
    Filter,
    Search,
    TrendingUp,
    AlertCircle
} from "lucide-react";

export default function FeedbackPage() {
    return (
        <div className="space-y-8 pb-10">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Customer Feedback</h1>
                    <p className="mt-1 text-sm text-slate-600 font-medium uppercase tracking-wider">Analyze customer satisfaction and reviews</p>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-3xl border-2 border-slate-100 shadow-sm">
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Avg. Rating</div>
                    <div className="flex items-center gap-2">
                        <div className="text-3xl font-black text-slate-900">4.8</div>
                        <div className="flex text-amber-500">
                            {[1, 2, 3, 4].map(i => <Star key={i} className="w-4 h-4 fill-amber-500" />)}
                            <Star className="w-4 h-4 fill-amber-200 text-amber-200" />
                        </div>
                    </div>
                </div>
                {/* ... other stats ... */}
                <div className="bg-white p-6 rounded-3xl border-2 border-slate-100 shadow-sm">
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Reviews</div>
                    <div className="text-3xl font-black text-slate-900">142</div>
                </div>
                <div className="bg-white p-6 rounded-3xl border-2 border-slate-100 shadow-sm">
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Positive</div>
                    <div className="text-3xl font-black text-emerald-600">92%</div>
                </div>
                <div className="bg-white p-6 rounded-3xl border-2 border-slate-100 shadow-sm">
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Negative</div>
                    <div className="text-3xl font-black text-red-600">8%</div>
                </div>
            </div>

            {/* Reviews List */}
            <div className="bg-white rounded-[40px] border-2 border-slate-100 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row justify-between gap-4">
                    <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                        <MessageCircle className="w-5 h-5 text-indigo-600" />
                        LATEST REVIEWS
                    </h3>
                    <div className="flex gap-2">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input type="text" placeholder="Search comments..." className="pl-10 pr-4 py-2 bg-slate-50 border-2 border-slate-100 rounded-xl text-sm focus:border-indigo-500 outline-none transition-all" />
                        </div>
                        <button className="p-2 border-2 border-slate-100 rounded-xl text-slate-400 hover:border-slate-300 transition-all">
                            <Filter className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <div className="divide-y divide-slate-100">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="p-6 hover:bg-slate-50/50 transition-colors">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center font-black text-slate-400">J</div>
                                    <div>
                                        <div className="font-black text-slate-900 uppercase tracking-tight text-sm">John Doe</div>
                                        <div className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Haircut • 2 hours ago</div>
                                    </div>
                                </div>
                                <div className="flex gap-0.5">
                                    {[1, 2, 3, 4, 5].map(s => <Star key={s} className="w-3 h-3 fill-amber-500 text-amber-500" />)}
                                </div>
                            </div>
                            <p className="text-sm font-medium text-slate-600 leading-relaxed italic">
                                "Amazing service! The stylist really understood what I wanted. Definitely coming back."
                            </p>
                            <div className="mt-4 flex gap-2">
                                <span className="px-2 py-1 bg-emerald-50 text-emerald-600 text-[8px] font-black uppercase rounded-md">Positive</span>
                                <span className="px-2 py-1 bg-slate-50 text-slate-400 text-[8px] font-black uppercase rounded-md border border-slate-100">Verified Visit</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
