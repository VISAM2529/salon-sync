"use client";

import { useEffect, useState } from "react";
import {
    ShoppingBag,
    Search,
    Truck,
    Star,
    Filter,
    Package,
    ArrowRight,
    Info
} from "lucide-react";

export default function MarketplacePage() {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetchProducts();
    }, []);

    async function fetchProducts() {
        setLoading(true);
        try {
            const res = await fetch(`/api/marketplace/list`);
            const data = await res.json();
            if (data.success) {
                setProducts(data.products);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="space-y-8 pb-10">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Supplies Marketplace</h1>
                    <p className="mt-1 text-sm text-slate-600 font-medium uppercase tracking-wider">Order professional products directly from certified suppliers</p>
                </div>
                <button className="flex items-center justify-center gap-2 bg-white border-2 border-slate-200 text-slate-700 px-6 py-3 rounded-2xl font-black shadow-sm hover:bg-slate-50 transition-all active:scale-95">
                    <Truck className="w-5 h-5 text-indigo-600" />
                    MY ORDERS
                </button>
            </div>

            {/* Banner */}
            <div className="bg-gradient-to-br from-indigo-600 top to-blue-700 rounded-3xl p-8 text-white relative overflow-hidden shadow-xl">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                    <ShoppingBag className="w-48 h-48 -rotate-12" />
                </div>
                <div className="relative z-10 max-w-lg">
                    <div className="bg-white/20 w-fit px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-4 backdrop-blur-md">
                        New Arrivals
                    </div>
                    <h2 className="text-4xl font-black mb-4 leading-tight">Professional Salon Equipments & Kits</h2>
                    <p className="text-blue-100 font-medium mb-6">Exclusive B2B pricing for registered salons. Bulk discounts available on hair care kits.</p>
                    <button className="bg-white text-indigo-700 px-8 py-3 rounded-2xl font-black hover:scale-105 transition-all shadow-lg flex items-center gap-2">
                        EXPLORE KITS
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search for shampoos, kits, dryers, etc..."
                        className="w-full pl-12 pr-4 py-4 bg-white border-2 border-slate-100 rounded-2xl focus:border-indigo-500 outline-none font-medium transition-all shadow-sm"
                    />
                </div>
                <button className="px-6 py-4 bg-white border-2 border-slate-100 rounded-2xl text-slate-600 font-black flex items-center gap-2 shadow-sm hover:border-slate-300">
                    <Filter className="w-5 h-5" />
                    FILTERS
                </button>
            </div>

            {/* Product Grid */}
            {loading ? (
                <div className="py-32 flex justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-200 border-t-indigo-600"></div>
                </div>
            ) : products.length === 0 ? (
                <div className="py-32 text-center opacity-30">
                    <Package className="w-20 h-20 mx-auto mb-4" />
                    <p className="text-xl font-black uppercase tracking-widest">No supplies found</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {products.map(p => (
                        <div key={p._id} className="bg-white rounded-3xl border-2 border-slate-100 p-4 shadow-sm hover:border-indigo-300 transition-all group">
                            <div className="aspect-square bg-slate-50 rounded-2xl mb-4 relative overflow-hidden flex items-center justify-center text-slate-300">
                                {p.image ? (
                                    <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                ) : (
                                    <Package className="w-12 h-12" />
                                )}
                                <div className="absolute top-2 left-2 flex flex-col gap-1">
                                    <span className="px-2 py-1 bg-white/90 backdrop-blur rounded-lg text-[8px] font-black uppercase text-indigo-600 border border-indigo-100">
                                        {p.category}
                                    </span>
                                </div>
                            </div>

                            <div className="mb-4">
                                <div className="text-[10px] text-slate-400 font-bold uppercase mb-1">{p.brand || 'Professional'}</div>
                                <h3 className="font-black text-slate-900 leading-tight mb-2 uppercase tracking-tight">{p.name}</h3>
                                <div className="flex items-center gap-4">
                                    <div className="text-xl font-black text-indigo-600">₹{p.businessPrice || p.price}</div>
                                    {p.businessPrice && (
                                        <div className="text-xs text-slate-400 line-through font-bold">₹{p.price}</div>
                                    )}
                                </div>
                            </div>

                            <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
                                <div className="flex items-center gap-1">
                                    <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                                    <span className="text-[10px] font-black text-slate-700">4.8</span>
                                </div>
                                <button className="bg-indigo-600 text-white px-4 py-2 rounded-xl text-xs font-black shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-95">
                                    ORDER NOW
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
