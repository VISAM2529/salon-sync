"use client";

import { useState } from "react";
import {
    Megaphone,
    Send,
    Users,
    Calendar,
    MessageSquare,
    Mail,
    BarChart3,
    Plus
} from "lucide-react";

export default function MarketingPage() {
    const [campaignType, setCampaignType] = useState("sms");

    return (
        <div className="space-y-8 pb-10">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Campaign Creator</h1>
                    <p className="mt-1 text-sm text-slate-600 font-medium uppercase tracking-wider">Reach your customers with personalized offers</p>
                </div>
                <button className="bg-gradient-to-br from-indigo-600 to-violet-700 text-white px-8 py-3 rounded-2xl font-black shadow-lg shadow-indigo-100 hover:scale-105 transition-all flex items-center gap-2">
                    <Plus className="w-5 h-5" />
                    NEW CAMPAIGN
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-3xl border-2 border-slate-100 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center">
                        <Users className="w-6 h-6 text-indigo-600" />
                    </div>
                    <div>
                        <div className="text-2xl font-black text-slate-900">1,240</div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Reach Potential</div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-3xl border-2 border-slate-100 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center">
                        <Send className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                        <div className="text-2xl font-black text-slate-900">85%</div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Avg. Open Rate</div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-3xl border-2 border-slate-100 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 bg-violet-50 rounded-2xl flex items-center justify-center">
                        <BarChart3 className="w-6 h-6 text-violet-600" />
                    </div>
                    <div>
                        <div className="text-2xl font-black text-slate-900">₹12.4k</div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Campaign Revenue</div>
                    </div>
                </div>
            </div>

            {/* Campaign Builder (Draft) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white rounded-[40px] border-2 border-slate-100 p-8 shadow-sm space-y-6">
                    <h3 className="text-xl font-black text-slate-900 border-b border-slate-50 pb-4 uppercase tracking-tight">Step 1: Build Message</h3>

                    <div className="flex gap-2">
                        <button
                            onClick={() => setCampaignType("sms")}
                            className={`flex-1 p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-3 ${campaignType === 'sms' ? 'border-indigo-600 bg-indigo-50' : 'border-slate-50 hover:border-slate-200'}`}
                        >
                            <MessageSquare className={`w-6 h-6 ${campaignType === 'sms' ? 'text-indigo-600' : 'text-slate-400'}`} />
                            <span className={`text-[10px] font-black uppercase ${campaignType === 'sms' ? 'text-indigo-600' : 'text-slate-400'}`}>SMS</span>
                        </button>
                        <button
                            onClick={() => setCampaignType("whatsapp")}
                            className={`flex-1 p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-3 ${campaignType === 'whatsapp' ? 'border-emerald-600 bg-emerald-50' : 'border-slate-50 hover:border-slate-200'}`}
                        >
                            <Send className={`w-6 h-6 ${campaignType === 'whatsapp' ? 'text-emerald-600' : 'text-slate-400'}`} />
                            <span className={`text-[10px] font-black uppercase ${campaignType === 'whatsapp' ? 'text-emerald-600' : 'text-slate-400'}`}>WhatsApp</span>
                        </button>
                        <button
                            onClick={() => setCampaignType("email")}
                            className={`flex-1 p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-3 ${campaignType === 'email' ? 'border-violet-600 bg-violet-50' : 'border-slate-50 hover:border-slate-200'}`}
                        >
                            <Mail className={`w-6 h-6 ${campaignType === 'email' ? 'text-violet-600' : 'text-slate-400'}`} />
                            <span className={`text-[10px] font-black uppercase ${campaignType === 'email' ? 'text-violet-600' : 'text-slate-400'}`}>Email</span>
                        </button>
                    </div>

                    <div className="space-y-4 pt-4">
                        <div>
                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Campaign Name</label>
                            <input type="text" placeholder="e.g. New Year Special Discount" className="w-full px-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl font-bold focus:border-indigo-500 outline-none transition-all" />
                        </div>
                        <div>
                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Message Content</label>
                            <textarea rows={4} placeholder="Hi [Name], get 20% off on all services this week! Use code NY2024." className="w-full px-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl font-bold focus:border-indigo-500 outline-none transition-all" />
                            <p className="text-[10px] text-slate-400 mt-2 font-bold uppercase tracking-tighter">Credits: 1 SMS (130 chars left)</p>
                        </div>
                    </div>
                </div>

                <div className="bg-slate-900 rounded-[40px] p-8 text-white relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 p-8 opacity-10">
                        <Megaphone className="w-48 h-48 -rotate-12" />
                    </div>
                    <div className="relative z-10 h-full flex flex-col justify-between">
                        <div>
                            <h3 className="text-2xl font-black mb-6 uppercase tracking-tight">Campaign Preview</h3>
                            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/10">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 bg-indigo-500 rounded-xl flex items-center justify-center text-sm font-black">TSG</div>
                                    <div>
                                        <div className="font-black text-xs">TrimSetGo (via {campaignType.toUpperCase()})</div>
                                        <div className="text-[8px] text-white/50 font-bold uppercase">Today • 10:30 AM</div>
                                    </div>
                                </div>
                                <div className="text-xs font-medium leading-relaxed bg-white/5 p-4 rounded-2xl border border-white/5">
                                    Hi Sameer, get 20% off on all services this week! Use code NY2024. Tap here to book: trimsetgo.live/salon
                                </div>
                            </div>
                        </div>

                        <div className="pt-8 flex flex-col gap-4">
                            <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-white/40">
                                <span>Estimated Cost</span>
                                <span>₹0.25 / Message</span>
                            </div>
                            <button className="w-full py-5 bg-white text-slate-900 rounded-2xl font-black shadow-xl hover:scale-105 transition-all text-sm uppercase tracking-widest">
                                LAUNCH CAMPAIGN
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
