import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  ShoppingBag, Smile, Star, MapPin, Trash2, LogOut, ChevronRight, Menu, X
} from "lucide-react";
import Orders from "./Orders";
import Support from "./Support";
import Reviews from "./Reviews";

import Addresses from "./Addresses";
import DeleteAccount from "./DeleteAccount";
import SignInPage from "../pages/auth/SignInPage";

const TABS = [
  { key: "orders", label: "Orders", short: "Orders", icon: ShoppingBag },
  { key: "addresses", label: "Addresses", short: "Address", icon: MapPin },
  { key: "support", label: "Support", short: "Support", icon: Smile },
  { key: "reviews", label: "Reviews", short: "Reviews", icon: Star },
  { key: "delete", label: "Delete Account", short: "Delete", icon: Trash2 },
];

function tabComponent(key) {
  switch (key) {
    case "orders": return <Orders />;
    case "support": return <Support />;
    case "reviews": return <Reviews />;
    case "addresses": return <Addresses />;
    case "delete": return <DeleteAccount />;
    default: return null;
  }
}

export default function ProfilePage() {
  const { user, logout, loading } = useAuth();
  const [activeKey, setActiveKey] = useState("orders");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 rounded-full border-4 border-primary-500 border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!user) return <SignInPage />;

  const activeTab = TABS.find((t) => t.key === activeKey);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">

      {/* ── Mobile Sidebar Backdrop ─────────────────────── */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden" 
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* ── Sidebar ─────────────────────────────── */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-brand-bg border-r border-gray-100 h-screen flex flex-col transform transition-transform duration-300 md:relative md:translate-x-0 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:flex`}>
        {/* User info */}
        <div className="p-6 border-b border-gray-50 relative">
          <button 
            onClick={() => setIsSidebarOpen(false)}
            className="absolute top-4 right-4 md:hidden text-gray-400 hover:text-gray-600"
          >
            <X size={20} />
          </button>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-black text-lg flex-shrink-0">
              {(user.name || user.username || "U")[0].toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="font-bold text-brand-text truncate">{user.name || user.username}</p>
              <p className="text-xs text-gray-400 truncate">{user.email || user.phone}</p>
            </div>
          </div>
        </div>

        {/* Nav links */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {TABS.filter(t => t.key !== "delete").map((tab) => {
            const Icon = tab.icon;
            const isActive = activeKey === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => {
                  setActiveKey(tab.key);
                  setIsSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${isActive
                    ? "bg-primary-50 text-primary-600 border border-primary-100"
                    : "text-gray-600 hover:bg-gray-50"
                  }`}
              >
                <Icon size={18} className={isActive ? "text-primary-500" : "text-gray-400"} />
                {tab.label}
                {isActive && <ChevronRight size={14} className="ml-auto text-primary-400" />}
              </button>
            );
          })}
        </nav>

        {/* Bottom: logout + delete */}
        <div className="p-4 border-t border-gray-100 space-y-2">
          <button
            onClick={() => {
              setActiveKey("delete");
              setIsSidebarOpen(false);
            }}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${activeKey === "delete"
                ? "bg-red-50 text-red-600 border border-red-100"
                : "text-gray-400 hover:text-red-500 hover:bg-red-50"
              }`}
          >
            <Trash2 size={16} />
            Delete Account
          </button>
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold bg-primary-500 text-white hover:bg-primary-600 transition-all"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </aside>

      {/* ── Mobile Header ───────────────────────────────── */}
      <div className="md:hidden bg-brand-bg border-b border-gray-100 px-4 py-3 sticky top-0 z-20 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="p-1 -ml-1 text-gray-500 hover:text-primary-500 transition-colors"
          >
            <Menu size={24} />
          </button>
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-black text-sm">
            {(user.name || user.username || "U")[0].toUpperCase()}
          </div>
          <div className="min-w-0">
            <p className="font-bold text-brand-text text-sm truncate max-w-[180px]">{user.name || user.username}</p>
            <p className="text-[10px] text-gray-400">{activeTab?.label}</p>
          </div>
        </div>
        <button
          onClick={logout}
          className="flex items-center gap-1.5 text-xs font-bold text-gray-400 hover:text-primary-500 transition-colors"
        >
          <LogOut size={16} />
        </button>
      </div>

      {/* ── Main content ────────────────────────────────── */}
      <main className="flex-1 p-4 md:p-8 min-h-screen">
        {tabComponent(activeKey)}
      </main>

    </div>
  );
}
