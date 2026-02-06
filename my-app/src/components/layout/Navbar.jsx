'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export default function Navbar() {
  const { user, signOut } = useAuth();
  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-slate-200/60 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">

          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-[#1A56DB] to-[#7E3AF2] rounded-lg flex items-center justify-center transform rotate-45">
              <div className="transform -rotate-45 text-white font-bold text-lg">R</div>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-[#1A56DB] to-[#7E3AF2] bg-clip-text text-transparent">
              RelocateRight
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            {['Home', 'Explore', 'Areas', 'Methodology', 'Resources'].map((item) => (
              <Link
                key={item}
                href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                className="text-slate-700 hover:text-[#1A56DB] font-medium transition-colors duration-200 relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#1A56DB] to-[#7E3AF2] group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
          </div>

          {/* Auth Section */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4 ml-4">
                <div className="hidden md:block text-right">
                  <p className="text-sm font-medium text-gray-900">{user.user_metadata?.full_name || 'User'}</p>
                </div>
                <div className="relative group">
                  <button className="h-10 w-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold overflow-hidden border-2 border-transparent group-hover:border-indigo-500 transition-all">
                    {user.user_metadata?.avatar_url ? (
                      <img src={user.user_metadata.avatar_url} alt="Profile" className="h-full w-full object-cover" />
                    ) : (
                      (user.user_metadata?.full_name || 'U')[0].toUpperCase()
                    )}
                  </button>
                  {/* Dropdown */}
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right">
                    <button
                      onClick={() => signOut()}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Link
                href="/login"
                className="hidden md:inline-flex items-center justify-center px-6 py-2 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-gradient-to-r from-[#1A56DB] to-[#7E3AF2] hover:opacity-90 transition-all duration-200 ml-4"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile Menu Icon */}
          <button className="md:hidden p-2 ml-4">
            <div className="w-6 h-0.5 bg-slate-700 mb-1.5"></div>
            <div className="w-6 h-0.5 bg-slate-700 mb-1.5"></div>
            <div className="w-6 h-0.5 bg-slate-700"></div>
          </button>

        </div>
      </div>
    </nav>
  );
}
