"use client";

import { useEffect, useState } from "react";
import {
    Package,
    Plus,
    Search,
    AlertTriangle,
    Edit3,
    Trash2,
    TrendingDown,
    Filter,
    ArrowUpDown,
    Archive
} from "lucide-react";

export default function InventoryPage() {
    const [salon, setSalon] = useState<any>(null);
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [showAddModal, setShowAddModal] = useState(false);

    // Form state
    const [formData, setFormData] = useState({
        name: "",
        category: "Hair Care",
        price: 0,
        costPrice: 0,
        stockCount: 0,
        minStockAlert: 5,
        unit: "pcs"
    });

    useEffect(() => {
        const saved = localStorage.getItem("salon");
        if (saved) {
            const s = JSON.parse(saved);
            setSalon(s);
            fetchInventory(s._id);
        }
    }, []);

    async function fetchInventory(salonId: string) {
        setLoading(true);
        try {
            const res = await fetch(`/api/inventory/list?salonId=${salonId}`);
            const data = await res.json();
            if (data.success) {
                setProducts(data.products);
            }
        } catch (error) {
            console.error("Error fetching inventory:", error);
        } finally {
            setLoading(false);
        }
    }

    async function handleAddProduct(e: React.FormEvent) {
        e.preventDefault();
        try {
            const res = await fetch(`/api/inventory/add`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...formData, salonId: salon._id })
            });
            const data = await res.json();
            if (data.success) {
                setShowAddModal(false);
                setFormData({ name: "", category: "Hair Care", price: 0, costPrice: 0, stockCount: 0, minStockAlert: 5, unit: "pcs" });
                fetchInventory(salon._id);
            }
        } catch (error) {
            console.error("Error adding product:", error);
        }
    }

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return (
        <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-200 border-t-purple-600"></div>
        </div>
    );

    return (
        <div className="space-y-8 pb-10">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Inventory</h1>
                    <p className="mt-1 text-sm text-slate-600 font-medium">Manage your products and stock levels</p>
                </div>
                <button
                    onClick={() => setShowAddModal(true)}
                    className="flex items-center justify-center gap-2 bg-gradient-to-br from-purple-600 to-purple-800 text-white px-6 py-3 rounded-2xl font-black shadow-lg shadow-purple-200 hover:scale-105 transition-all active:scale-95"
                >
                    <Plus className="w-5 h-5" />
                    ADD PRODUCT
                </button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-3xl border-2 border-slate-100 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center">
                        <Archive className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                        <div className="text-2xl font-black text-slate-900">{products.length}</div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Products</div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-3xl border-2 border-slate-100 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center">
                        <AlertTriangle className="w-6 h-6 text-red-600" />
                    </div>
                    <div>
                        <div className="text-2xl font-black text-slate-900">
                            {products.filter(p => p.stockCount <= p.minStockAlert).length}
                        </div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Low Stock Alerts</div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-3xl border-2 border-slate-100 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center">
                        <TrendingDown className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                        <div className="text-2xl font-black text-slate-900">
                            ₹{products.reduce((acc, p) => acc + (p.costPrice * p.stockCount), 0).toLocaleString()}
                        </div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Stock Value (Cost)</div>
                    </div>
                </div>
            </div>

            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between pb-2">
                <div className="relative w-full sm:w-96">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-white border-2 border-slate-100 rounded-2xl focus:border-purple-500 outline-none font-medium transition-all shadow-sm"
                    />
                </div>
                <div className="flex items-center gap-2">
                    <button className="p-3 bg-white border-2 border-slate-100 rounded-xl text-slate-600 hover:bg-slate-50 transition-all">
                        <Filter className="w-5 h-5" />
                    </button>
                    <button className="p-3 bg-white border-2 border-slate-100 rounded-xl text-slate-600 hover:bg-slate-50 transition-all">
                        <ArrowUpDown className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-3xl border-2 border-slate-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50/50 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                <th className="px-6 py-4">Product Name</th>
                                <th className="px-6 py-4">Category</th>
                                <th className="px-6 py-4">Stock</th>
                                <th className="px-6 py-4 text-right">Price</th>
                                <th className="px-6 py-4 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filteredProducts.map((p) => (
                                <tr key={p._id} className="hover:bg-slate-50/30 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="font-bold text-slate-900">{p.name}</div>
                                        <div className="text-[10px] text-slate-400 font-bold uppercase">{p.sku || 'No SKU'}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-bold border border-slate-200 uppercase">
                                            {p.category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className={`text-sm font-black ${p.stockCount <= p.minStockAlert ? 'text-red-500' : 'text-slate-700'}`}>
                                            {p.stockCount} {p.unit}
                                        </div>
                                        {p.stockCount <= p.minStockAlert && (
                                            <div className="text-[9px] font-black text-red-500 uppercase tracking-tighter">Low Stock</div>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-right font-black text-slate-900">
                                        ₹{p.price}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-center gap-2">
                                            <button className="p-2 text-slate-400 hover:text-purple-600 transition-colors">
                                                <Edit3 className="w-4 h-4" />
                                            </button>
                                            <button className="p-2 text-slate-400 hover:text-red-600 transition-colors">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {filteredProducts.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="py-20 text-center">
                                        <div className="flex flex-col items-center gap-2 opacity-30">
                                            <Package className="w-12 h-12" />
                                            <p className="font-black uppercase tracking-widest text-sm">No products found</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add Product Modal */}
            {showAddModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
                    <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 border border-slate-200">
                        <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-6 text-white flex justify-between items-center">
                            <h3 className="text-xl font-black">Add New Product</h3>
                            <button onClick={() => setShowAddModal(false)} className="p-2 hover:bg-white/10 rounded-xl transition-colors">
                                <Plus className="w-6 h-6 rotate-45" />
                            </button>
                        </div>
                        <form onSubmit={handleAddProduct} className="p-6 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="col-span-2">
                                    <label className="block text-xs font-black text-slate-700 mb-2 uppercase tracking-wide">Product Name</label>
                                    <input
                                        required
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-xl focus:border-purple-500 outline-none font-medium"
                                        placeholder="e.g. Argan Oil Shampoo"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-black text-slate-700 mb-2 uppercase tracking-wide">Category</label>
                                    <select
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-xl focus:border-purple-500 outline-none font-medium"
                                    >
                                        <option>Hair Care</option>
                                        <option>Skin Care</option>
                                        <option>Coloring</option>
                                        <option>Tools</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-black text-slate-700 mb-2 uppercase tracking-wide">Unit</label>
                                    <select
                                        value={formData.unit}
                                        onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                                        className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-xl focus:border-purple-500 outline-none font-medium"
                                    >
                                        <option>pcs</option>
                                        <option>ml</option>
                                        <option>grams</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-black text-slate-700 mb-2 uppercase tracking-wide">Buying Price (Cost)</label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">₹</span>
                                        <input
                                            type="number"
                                            value={formData.costPrice || ''}
                                            onChange={(e) => setFormData({ ...formData, costPrice: Number(e.target.value) })}
                                            className="w-full pl-8 pr-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-xl focus:border-purple-500 outline-none font-medium"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-black text-slate-700 mb-2 uppercase tracking-wide">Selling Price</label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">₹</span>
                                        <input
                                            type="number"
                                            value={formData.price || ''}
                                            onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                                            className="w-full pl-8 pr-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-xl focus:border-purple-500 outline-none font-medium"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-black text-slate-700 mb-2 uppercase tracking-wide">Initial Stock</label>
                                    <input
                                        type="number"
                                        value={formData.stockCount || ''}
                                        onChange={(e) => setFormData({ ...formData, stockCount: Number(e.target.value) })}
                                        className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-xl focus:border-purple-500 outline-none font-medium"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-black text-slate-700 mb-2 uppercase tracking-wide">Min Stock Alert</label>
                                    <input
                                        type="number"
                                        value={formData.minStockAlert || ''}
                                        onChange={(e) => setFormData({ ...formData, minStockAlert: Number(e.target.value) })}
                                        className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-xl focus:border-purple-500 outline-none font-medium"
                                    />
                                </div>
                            </div>
                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setShowAddModal(false)}
                                    className="flex-1 py-4 bg-slate-100 text-slate-600 font-bold rounded-2xl hover:bg-slate-200 transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 py-4 bg-purple-600 text-white font-black rounded-2xl hover:bg-purple-700 shadow-lg shadow-purple-100 transition-all"
                                >
                                    SAVE PRODUCT
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
