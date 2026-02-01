'use client';

import Link from 'next/link';

export default function Navbar() {
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

          {/* Mobile Menu Icon */}
          <button className="md:hidden p-2">
            <div className="w-6 h-0.5 bg-slate-700 mb-1.5"></div>
            <div className="w-6 h-0.5 bg-slate-700 mb-1.5"></div>
            <div className="w-6 h-0.5 bg-slate-700"></div>
          </button>

        </div>
      </div>
    </nav>
  );
}
