"use client";

import { useState } from "react";
import {
    CreditCard,
    Plus,
    CheckCircle2,
    Users,
    Clock,
    ShieldCheck,
    Star
} from "lucide-react";

export default function MembershipsPage() {
    return (
        <div className="space-y-8 pb-10">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Memberships & Packages</h1>
                    <p className="mt-1 text-sm text-slate-600 font-medium uppercase tracking-wider">Create subscription plans for your loyal clients</p>
                </div>
                <button className="bg-gradient-to-br from-amber-500 to-orange-600 text-white px-8 py-3 rounded-2xl font-black shadow-lg shadow-amber-100 hover:scale-105 transition-all flex items-center gap-2">
                    <Plus className="w-5 h-5" />
                    CREATE PLAN
                </button>
            </div>

            {/* Plans Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Silver Plan */}
                <div className="bg-white rounded-[40px] border-2 border-slate-100 p-8 shadow-sm hover:border-amber-200 transition-all relative overflow-hidden group">
                    <div className="absolute -right-4 -top-4 p-8 opacity-5 group-hover:rotate-12 transition-transform">
                        <Star className="w-24 h-24" />
                    </div>
                    <div className="relative z-10">
                        <div className="bg-slate-100 w-fit px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest mb-4">Silver Membership</div>
                        <h3 className="text-2xl font-black text-slate-900 mb-2">₹1,999 / yr</h3>
                        <p className="text-xs text-slate-500 font-bold mb-8 uppercase tracking-tighter">Perfect for regular visitors</p>

                        <div className="space-y-4 mb-8">
                            <div className="flex items-center gap-3 text-sm font-bold text-slate-700">
                                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                10% Off on All Services
                            </div>
                            <div className="flex items-center gap-3 text-sm font-bold text-slate-700">
                                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                Priority Booking
                            </div>
                            <div className="flex items-center gap-3 text-sm font-bold text-slate-700">
                                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                Birthday Special Offer
                            </div>
                        </div>

                        <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                            <div className="flex items-center gap-2 text-slate-400">
                                <Users className="w-4 h-4" />
                                <span className="text-[10px] font-black uppercase tracking-widest">42 Active Members</span>
                            </div>
                            <button className="text-amber-600 font-black text-[10px] uppercase tracking-widest hover:underline">Edit Plan</button>
                        </div>
                    </div>
                </div>

                {/* Gold Plan */}
                <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-[40px] p-8 text-white shadow-2xl shadow-amber-100 relative overflow-hidden group">
                    <div className="absolute -right-4 -top-4 p-8 opacity-20 group-hover:scale-125 transition-transform duration-700">
                        <Star className="w-32 h-32 fill-white" />
                    </div>
                    <div className="relative z-10 h-full flex flex-col justify-between">
                        <div>
                            <div className="bg-white/20 w-fit px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest mb-4 backdrop-blur-md">Gold Membership</div>
                            <h3 className="text-3xl font-black mb-2">₹4,999 / yr</h3>
                            <p className="text-xs text-white/70 font-bold mb-8 uppercase tracking-tighter italic">The Ultimate Salon Experience</p>

                            <div className="space-y-4 mb-8">
                                <div className="flex items-center gap-3 text-sm font-bold">
                                    <ShieldCheck className="w-4 h-4 text-white" />
                                    25% Off on All Services
                                </div>
                                <div className="flex items-center gap-3 text-sm font-bold">
                                    <ShieldCheck className="w-4 h-4 text-white" />
                                    Free Hair Spa once a month
                                </div>
                                <div className="flex items-center gap-3 text-sm font-bold">
                                    <ShieldCheck className="w-4 h-4 text-white" />
                                    Dedicated Stylist
                                </div>
                                <div className="flex items-center gap-3 text-sm font-bold text-white/60">
                                    <Clock className="w-4 h-4" />
                                    Wait time: 0 Mins
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between pt-6 border-t border-white/10">
                            <div className="flex items-center gap-2">
                                <Users className="w-4 h-4" />
                                <span className="text-[10px] font-black uppercase tracking-widest">12 Active Members</span>
                            </div>
                            <button className="bg-white text-orange-600 px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg">Manage</button>
                        </div>
                    </div>
                </div>

                {/* Add New */}
                <button className="bg-slate-50 rounded-[40px] border-4 border-dashed border-slate-200 p-8 flex flex-col items-center justify-center gap-4 hover:bg-slate-100 hover:border-slate-300 transition-all group">
                    <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                        <Plus className="w-8 h-8 text-slate-400" />
                    </div>
                    <span className="text-sm font-black text-slate-400 uppercase tracking-widest">Create New Tier</span>
                </button>
            </div>
        </div>
    );
}
