import React, { useState } from 'react';
import { NavLink } from 'react-router';
import { Home, Plus, Menu, X, LogOut } from 'lucide-react';
import logo from "../assets/Logo.png"

const Sidebar = ({ setIsAuthenticated }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('tokenExpiry');
    setIsAuthenticated(false);
  };

  const menuStructure = [
    { path: '/dashboard', name: 'Dashboard', icon: Home },
    { path: '/adduser', name: 'Add User', icon: Plus },
  ];

  return (
    <>
      {/* Hamburger Menu Button for Mobile */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="lg:hidden fixed top-4 right-4 z-50 p-2 text-black"
      >
        {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-40 w-72 h-screen bg-black text-gray-300 flex flex-col flex-shrink-0 text-sm transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Logo Section */}
        <div className="p-6 border-b border-gray-700 flex-shrink-0">
          <h1 className="text-2xl font-bold text-white flex items-center space-x-2">
            <img src={logo} alt="company logo" />
          </h1>
        </div>

        {/* Navigation Section */}
        <nav className="flex-grow overflow-y-auto p-4">
          <div className="mb-4 px-4 text-xs font-semibold text-gray-400 uppercase">
            Main Menu
          </div>
          <ul className="space-y-1">
            {menuStructure.map((item, index) => (
              <li key={index}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-150 ${
                      isActive
                        ? 'bg-gray-800 text-white font-medium'
                        : 'text-gray-300 hover:bg-gray-900'
                    }`
                  }
                  onClick={() => setIsSidebarOpen(false)} // Close sidebar on mobile
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* User Profile Section */}
        <div className="p-4 border-t border-gray-700 flex-shrink-0">
          <div className="flex items-center space-x-3 px-4 py-3 rounded-lg">
            <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center">
              <span className="text-sm font-medium text-white">CG</span>
            </div>
            <div className="flex-grow">
              <h3 className="text-sm font-medium text-white">Celagenex</h3>
              <p className="text-xs text-gray-400">Admin</p>
            </div>
            <button
              onClick={handleLogout}
              className="hover:bg-gray-900 p-2 rounded-md"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
