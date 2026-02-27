import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  BarChart3,
  Users,
  Wrench,
  ClipboardList,
  CreditCard,
  FileText,
  LogOut,
  Menu,
} from 'lucide-react';

const menuItems = [
  { href: '/', label: 'Dashboard', icon: BarChart3 },
  { href: '/technicians', label: 'Técnicos', icon: Wrench },
  { href: '/inspections', label: 'Inspecciones', icon: ClipboardList },
  { href: '/payments', label: 'Pagos', icon: CreditCard },
  { href: '/clients', label: 'Clientes', icon: Users },
  { href: '/reports', label: 'Reportes', icon: FileText },
];

export default function Sidebar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = React.useState(true);

  return (
    <aside
      className={`${
        isOpen ? 'w-64' : 'w-20'
      } bg-gradient-to-b from-slate-900 to-slate-800 text-white transition-all duration-300 flex flex-col shadow-lg`}
    >
      {/* Logo */}
      <div className="p-6 flex items-center justify-between">
        {isOpen && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center font-bold">
              BC
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-sm">BoatCheckPro</span>
              <span className="text-xs text-gray-400">Admin</span>
            </div>
          </div>
        )}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-1 hover:bg-slate-700 rounded"
        >
          <Menu size={20} />
        </button>
      </div>

      {/* Menu */}
      <nav className="flex-1 px-3 py-6 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = router.pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-300 hover:bg-slate-700'
              }`}
            >
              <Icon size={20} />
              {isOpen && <span className="text-sm font-medium">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-slate-700">
        <button className="flex items-center gap-3 px-4 py-3 rounded-lg w-full text-gray-300 hover:bg-slate-700 transition-colors">
          <LogOut size={20} />
          {isOpen && <span className="text-sm font-medium">Salir</span>}
        </button>
      </div>
    </aside>
  );
}
