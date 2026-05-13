import { Link, useNavigate, Outlet } from "react-router-dom";
import { useState } from "react";
import { 
  LayoutDashboard, 
  FolderOpen, 
  Users, 
  LogOut, 
  Menu, 
  X 
} from "lucide-react";

export default function AppLayout() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const navLinks = [
    { to: "/dashboard", label: "Tasks", icon: LayoutDashboard },
    { to: "/dashboard/projects", label: "Projects", icon: FolderOpen },
    { to: "/dashboard/team", label: "Team", icon: Users },
  ];

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar */}
      <aside className={`bg-slate-900 text-white flex flex-col transition-all duration-300 ${sidebarOpen ? 'w-72' : 'w-20'}`}>
        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-pink-500 to-violet-500 rounded-2xl flex items-center justify-center">
              <span className="font-bold text-lg">E</span>
            </div>
            {sidebarOpen && (
              <div>
                <span className="font-bold text-2xl tracking-tight text-white">EduCollab</span>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-6 space-y-1">
          {navLinks.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all hover:bg-slate-800 group
                ${location.pathname === to ? 'bg-slate-800 text-pink-400' : 'text-slate-300 hover:text-white'}`}
            >
              <Icon size={22} className="transition-transform group-hover:scale-110" />
              {sidebarOpen && <span className="font-medium">{label}</span>}
            </Link>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-slate-800">
          <button
            onClick={logout}
            className="flex items-center gap-3 w-full px-4 py-3 text-slate-300 hover:text-red-400 hover:bg-slate-800 rounded-2xl transition-all"
          >
            <LogOut size={22} />
            {sidebarOpen && <span className="font-medium">Se déconnecter</span>}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navbar */}
        <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-slate-100 rounded-xl text-slate-600 hover:text-slate-900 transition-colors"
            >
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <h1 className="text-xl font-semibold text-slate-800">
              Tableau de bord
            </h1>
          </div>

          <div className="flex items-center gap-6">
            <div className="text-right">
              <p className="font-medium text-slate-700 text-sm">John Doe</p>
              <p className="text-xs text-slate-500">john@educollab.com</p>
            </div>
            
            <div className="w-9 h-9 bg-gradient-to-br from-pink-500 to-rose-500 text-white rounded-2xl flex items-center justify-center font-semibold ring-2 ring-white shadow">
              JD
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-8 bg-slate-50">
          <Outlet /> {/* Remplace {children} par <Outlet /> pour React Router v6 */}
        </main>
      </div>
    </div>
  );
}