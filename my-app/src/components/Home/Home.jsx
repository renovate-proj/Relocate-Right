// 'use client';
// import React, { useState, useEffect } from 'react';
// import { Search, MapPin, DollarSign, Briefcase, GraduationCap, Heart, Building, Star, ArrowRight, Globe, TrendingUp, Users, Shield } from 'lucide-react';

// const HomePage = () => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [isVisible, setIsVisible] = useState(false);
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
//   useEffect(() => {
//     setIsVisible(true);
//     const handleMouseMove = (e) => {
//       setMousePosition({ x: e.clientX, y: e.clientY });
//     };
//     window.addEventListener('mousemove', handleMouseMove);
//     return () => window.removeEventListener('mousemove', handleMouseMove);
//   }, []);
  
//   const handleSearch = (e) => {
//     e.preventDefault();
//     alert(`Searching for: ${searchQuery}`);
//   };

//   const floatingCities = [
//     { name: 'Tokyo', x: '10%', y: '20%', delay: '0s' },
//     { name: 'London', x: '80%', y: '15%', delay: '2s' },
//     { name: 'NYC', x: '15%', y: '70%', delay: '1s' },
//     { name: 'Dubai', x: '85%', y: '60%', delay: '3s' },
//     { name: 'Paris', x: '60%', y: '25%', delay: '1.5s' },
//   ];

//   const features = [
//     { 
//       title: 'Living Costs', 
//       icon: DollarSign, 
//       desc: 'Housing, groceries, transportation & utilities',
//       color: 'from-emerald-400 to-cyan-400',
//       bgColor: 'bg-emerald-50'
//     },
//     { 
//       title: 'Job Prospects', 
//       icon: Briefcase, 
//       desc: 'Employment rates, salaries & career growth',
//       color: 'from-blue-400 to-indigo-400',
//       bgColor: 'bg-blue-50'
//     },
//     { 
//       title: 'Education', 
//       icon: GraduationCap, 
//       desc: 'Schools, universities & learning quality',
//       color: 'from-purple-400 to-pink-400',
//       bgColor: 'bg-purple-50'
//     },
//     { 
//       title: 'Healthcare', 
//       icon: Heart, 
//       desc: 'Hospitals, insurance & medical quality',
//       color: 'from-red-400 to-orange-400',
//       bgColor: 'bg-red-50'
//     },
//     { 
//       title: 'Infrastructure', 
//       icon: Building, 
//       desc: 'Transport, internet & city facilities',
//       color: 'from-yellow-400 to-orange-400',
//       bgColor: 'bg-yellow-50'
//     },
//   ];

//   const stats = [
//     { icon: Globe, number: '500+', label: 'Cities Covered' },
//     { icon: Users, number: '10K+', label: 'Happy Relocators' },
//     { icon: TrendingUp, number: '98%', label: 'Success Rate' },
//     { icon: Shield, number: '24/7', label: 'Support' },
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
//       {/* Animated Background Elements */}
//       <div className="absolute inset-0 overflow-hidden">
//         <div 
//           className="absolute w-96 h-96 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"
//           style={{
//             left: mousePosition.x / 10,
//             top: mousePosition.y / 10,
//           }}
//         />
//         <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-pink-400/10 to-red-400/10 rounded-full blur-2xl animate-bounce"></div>
//         <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-cyan-400/10 to-blue-400/10 rounded-full blur-2xl animate-pulse"></div>
//       </div>

//       {/* Floating City Names */}
//       {floatingCities.map((city, index) => (
//         <div
//           key={index}
//           className="absolute text-white/20 font-bold text-4xl animate-float"
//           style={{
//             left: city.x,
//             top: city.y,
//             animationDelay: city.delay,
//             animationDuration: '6s',
//           }}
//         >
//           {city.name}
//         </div>
//       ))}

//       {/* Navigation */}
//       <nav className="relative z-50 backdrop-blur-md bg-white/10 border-b border-white/20">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between h-16">
//             <div className="flex items-center">
//               <div className="flex-shrink-0 flex items-center">
//                 <div className="bg-gradient-to-r from-blue-500 to-purple-600 w-10 h-10 rounded-xl shadow-lg"></div>
//                 <span className="ml-3 text-2xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
//                   RelocateRight
//                 </span>
//               </div>
//             </div>
//             <div className="hidden md:flex items-center space-x-8">
//               <a href="#" className="text-white/80 hover:text-white transition-all hover:scale-105">Features</a>
//               <a href="#" className="text-white/80 hover:text-white transition-all hover:scale-105">Locations</a>
//               <a href="#" className="text-white/80 hover:text-white transition-all hover:scale-105">Resources</a>
//               <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300 font-semibold">
//                 Compare Cities
//               </button>
//             </div>
//           </div>
//         </div>
//       </nav>

//       {/* Hero Section */}
//       <div className={`relative z-40 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
//         <div className="mb-6">
//           <span className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-white/20 text-white/90 text-sm font-medium backdrop-blur-sm">
//             <Star className="w-4 h-4 mr-2 text-yellow-400" />
//             #1 Relocation Decision Platform
//           </span>
//         </div>
        
//         <h1 className="text-5xl md:text-7xl font-extrabold mb-8 leading-tight">
//           <span className="bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
//             Find Your Perfect
//           </span>
//           <br />
//           <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
//             Dream Destination
//           </span>
//         </h1>
        
//         <p className="text-xl md:text-2xl text-white/80 max-w-4xl mx-auto mb-12 leading-relaxed">
//           Make data-driven relocation decisions with our comprehensive city comparison platform. 
//           Compare living costs, opportunities, and quality of life across 500+ global destinations.
//         </p>
        
//         <div className="max-w-3xl mx-auto mb-12">
//           <form onSubmit={handleSearch} className="relative">
//             <div className="relative group">
//               <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
//               <input
//                 type="text"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 placeholder="Search cities, countries, or regions..."
//                 className="w-full pl-16 pr-32 py-6 text-lg rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-4 focus:ring-blue-500/50 focus:border-white/40 transition-all duration-300"
//               />
//               <button 
//                 type="submit"
//                 className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-xl hover:shadow-xl hover:scale-105 transition-all duration-300 font-semibold flex items-center"
//               >
//                 Search
//                 <ArrowRight className="ml-2 w-5 h-5" />
//               </button>
//             </div>
//           </form>
          
//           <div className="mt-6 flex flex-wrap justify-center gap-3">
//             <span className="text-white/60">Trending:</span>
//             {['Berlin', 'Austin', 'Singapore', 'Toronto', 'Amsterdam'].map((city) => (
//               <button 
//                 key={city}
//                 className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/80 hover:bg-white/20 hover:scale-105 transition-all duration-300 text-sm"
//               >
//                 {city}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Stats Section */}
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
//           {stats.map((stat, index) => (
//             <div key={index} className="text-center group">
//               <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
//                 <stat.icon className="w-8 h-8 mx-auto mb-3 text-blue-400 group-hover:scale-110 transition-transform" />
//                 <div className="text-2xl font-bold text-white mb-1">{stat.number}</div>
//                 <div className="text-white/60 text-sm">{stat.label}</div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Features Section */}
//       <div className="relative z-30 bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-sm py-20 border-y border-white/20">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent mb-4">
//               Compare What Matters Most
//             </h2>
//             <p className="text-xl text-white/70 max-w-3xl mx-auto">
//               Our AI-powered platform analyzes thousands of data points to give you insights that matter
//             </p>
//           </div>
          
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
//             {features.map((feature, index) => (
//               <div 
//                 key={index} 
//                 className="group cursor-pointer"
//                 style={{ animationDelay: `${index * 0.1}s` }}
//               >
//                 <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-500 hover:scale-105 hover:rotate-1 h-full">
//                   <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 mx-auto`}>
//                     <feature.icon className="w-8 h-8 text-white" />
//                   </div>
//                   <h3 className="text-xl font-bold text-white mb-4 text-center">{feature.title}</h3>
//                   <p className="text-white/70 text-center leading-relaxed">{feature.desc}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* CTA Section */}
//       <div className="relative z-30 py-20">
//         <div className="max-w-5xl mx-auto text-center px-4">
//           <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-md rounded-3xl p-12 border border-white/20">
//             <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
//               Ready to Find Your Ideal City?
//             </h2>
//             <p className="text-xl text-white/80 mb-10 max-w-3xl mx-auto leading-relaxed">
//               Join thousands of successful relocators who made informed decisions with our platform. 
//               Start your journey to the perfect destination today.
//             </p>
//             <div className="flex flex-col sm:flex-row gap-4 justify-center">
//               <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold px-10 py-4 rounded-2xl text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center">
//                 Start Comparing Now
//                 <ArrowRight className="ml-3 w-6 h-6" />
//               </button>
//               <button className="bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold px-10 py-4 rounded-2xl text-lg hover:bg-white/20 hover:scale-105 transition-all duration-300">
//                 Watch Demo
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Footer */}
//       <footer className="relative z-30 bg-black/20 backdrop-blur-md border-t border-white/20 py-16">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
//             <div className="md:col-span-2">
//               <div className="flex items-center mb-6">
//                 <div className="bg-gradient-to-r from-blue-500 to-purple-600 w-10 h-10 rounded-xl"></div>
//                 <span className="ml-3 text-2xl font-bold text-white">RelocateRight</span>
//               </div>
//               <p className="text-white/70 text-lg leading-relaxed max-w-md">
//                 Making relocation decisions easier through data-driven comparisons and AI-powered insights.
//               </p>
//             </div>
//             <div>
//               <h4 className="font-bold text-white mb-6 text-lg">Features</h4>
//               <ul className="space-y-4 text-white/70">
//                 <li><a href="#" className="hover:text-white transition-colors">City Comparison</a></li>
//                 <li><a href="#" className="hover:text-white transition-colors">Cost Calculator</a></li>
//                 <li><a href="#" className="hover:text-white transition-colors">Relocation Guides</a></li>
//                 <li><a href="#" className="hover:text-white transition-colors">AI Recommendations</a></li>
//               </ul>
//             </div>
//             <div>
//               <h4 className="font-bold text-white mb-6 text-lg">Support</h4>
//               <ul className="space-y-4 text-white/70">
//                 <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
//                 <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
//                 <li><a href="#" className="hover:text-white transition-colors">Feedback</a></li>
//                 <li><a href="#" className="hover:text-white transition-colors">Report Issues</a></li>
//               </ul>
//             </div>
//           </div>
//           <div className="mt-12 pt-8 border-t border-white/20 text-center">
//             <p className="text-white/60">© 2024 RelocateRight. Final Year Project - Built with ❤️</p>
//           </div>
//         </div>
//       </footer>

//       <style jsx>{`
//         @keyframes float {
//           0%, 100% { transform: translateY(0px) rotate(0deg); }
//           25% { transform: translateY(-10px) rotate(1deg); }
//           50% { transform: translateY(-20px) rotate(0deg); }
//           75% { transform: translateY(-10px) rotate(-1deg); }
//         }
//         .animate-float {
//           animation: float 6s ease-in-out infinite;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default HomePage;


// 'use client';
// import React from 'react';
// import { useState } from 'react';

// const HomePage = () => {
//   const [searchQuery, setSearchQuery] = useState('');
  
//   const handleSearch = (e) => {
//     e.preventDefault();
//     // Search functionality would go here
//     alert(`Searching for: ${searchQuery}`);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
//       {/* Navigation */}
//       <nav className="bg-white shadow-sm">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between h-16">
//             <div className="flex items-center">
//               <div className="flex-shrink-0 flex items-center">
//                 <div className="bg-indigo-600 w-8 h-8 rounded-lg"></div>
//                 <span className="ml-2 text-xl font-bold text-gray-900">RelocateRight</span>
//               </div>
//             </div>
//             <div className="hidden md:flex items-center space-x-8">
//               <a href="#" className="text-gray-700 hover:text-indigo-600">Features</a>
//               <a href="#" className="text-gray-700 hover:text-indigo-600">Locations</a>
//               <a href="#" className="text-gray-700 hover:text-indigo-600">Resources</a>
//               <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
//               onClick={() => window.location.href = '/comparecities'}
//               >
//                 Compare Cities
//               </button>
//             </div>
//           </div>
//         </div>
//       </nav>

//       {/* Hero Section */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 text-center">
//         <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6">
//           Find Your Perfect <span className="text-indigo-600">Relocation</span> Destination
//         </h1>
//         <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto mb-10">
//           Compare cities worldwide based on cost of living, job opportunities, education quality, healthcare, and infrastructure
//         </p>
        
//         <div className="max-w-2xl mx-auto">
//           <form onSubmit={handleSearch} className="flex">
//             <input
//               type="text"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               placeholder="Search cities or countries..."
//               className="flex-grow px-4 py-3 rounded-l-lg border-2 border-r-0 border-gray-300 focus:outline-none focus:border-indigo-500"
//             />
//             <button 
//               type="submit"
//               className="bg-indigo-600 text-white px-6 py-3 rounded-r-lg hover:bg-indigo-700 transition"
//             >
//               Search
//             </button>
//           </form>
//           <div className="mt-4 flex flex-wrap justify-center gap-2">
//             <span className="text-sm text-gray-600">Popular searches:</span>
//             <button className="text-sm text-indigo-600 hover:underline">Berlin</button>
//             <button className="text-sm text-indigo-600 hover:underline">Austin</button>
//             <button className="text-sm text-indigo-600 hover:underline">Singapore</button>
//             <button className="text-sm text-indigo-600 hover:underline">Toronto</button>
//           </div>
//         </div>
//       </div>

//       {/* Features Section */}
//       <div className="bg-white py-16">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
//             Compare What Matters Most
//           </h2>
          
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
//             {[
//               { title: 'Living Costs', icon: '💰', desc: 'Housing, groceries, transportation' },
//               { title: 'Job Prospects', icon: '💼', desc: 'Employment rates, salaries' },
//               { title: 'Education', icon: '🎓', desc: 'Schools, universities, quality' },
//               { title: 'Healthcare', icon: '⚕️', desc: 'Hospitals, insurance, quality' },
//               { title: 'Infrastructure', icon: '🏗️', desc: 'Transport, internet, utilities' },
//             ].map((feature, index) => (
//               <div key={index} className="bg-blue-50 p-6 rounded-xl text-center hover:shadow-md transition">
//                 <div className="text-4xl mb-4">{feature.icon}</div>
//                 <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
//                 <p className="text-gray-600">{feature.desc}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* CTA Section */}
//       <div className="bg-indigo-700 text-white py-16">
//         <div className="max-w-4xl mx-auto text-center px-4">
//           <h2 className="text-3xl font-bold mb-6">Ready to Find Your Ideal City?</h2>
//           <p className="text-xl mb-8 max-w-3xl mx-auto">
//             Start comparing locations side-by-side with our comprehensive comparison tool
//           </p>
//           <button className="bg-white text-indigo-700 font-bold px-8 py-4 rounded-lg text-lg hover:bg-indigo-100 transition">
//             Start Comparing Now
//           </button>
//         </div>
//       </div>

//       {/* Footer */}
//       <footer className="bg-gray-800 text-white py-12">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
//             <div>
//               <h3 className="text-lg font-bold mb-4">RelocateRight</h3>
//               <p className="text-gray-400">
//                 Making relocation decisions easier through data-driven comparisons
//               </p>
//             </div>
//             <div>
//               <h4 className="font-bold mb-4">Features</h4>
//               <ul className="space-y-2 text-gray-400">
//                 <li><a href="#" className="hover:text-white">City Comparison</a></li>
//                 <li><a href="#" className="hover:text-white">Cost Calculator</a></li>
//                 <li><a href="#" className="hover:text-white">Relocation Guides</a></li>
//               </ul>
//             </div>
//             <div>
//               <h4 className="font-bold mb-4">Resources</h4>
//               <ul className="space-y-2 text-gray-400">
//                 <li><a href="#" className="hover:text-white">Blog</a></li>
//                 <li><a href="#" className="hover:text-white">Research Methodology</a></li>
//                 <li><a href="#" className="hover:text-white">Data Sources</a></li>
//               </ul>
//             </div>
//             <div>
//               <h4 className="font-bold mb-4">Contact</h4>
//               <ul className="space-y-2 text-gray-400">
//                 <li>contact@relocateright.app</li>
//                 <li>Feedback</li>
//                 <li>Report Issues</li>
//               </ul>
//             </div>
//           </div>
//           <div className="mt-12 pt-8 border-t border-gray-700 text-center text-gray-400">
//             <p>© 2023 RelocateRight. Final Year Project.</p>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default HomePage;


















'use client';

import {
  Shield,
  DollarSign,
  Train,
  Home,
  Clock,
  ArrowRight,
} from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function LandingPage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20">

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute top-20 right-0 w-96 h-96 bg-gradient-to-br from-[#1A56DB]/10 to-[#7E3AF2]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-[#7E3AF2]/10 to-[#1A56DB]/10 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Left Content */}
            <div
              className={`transition-all duration-1000 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="inline-block px-4 py-2 bg-gradient-to-r from-[#1A56DB]/10 to-[#7E3AF2]/10 rounded-full mb-6 border border-[#1A56DB]/20">
                <span className="text-[#1A56DB] font-semibold text-sm">
                  SMART RELOCATION DECISIONS
                </span>
              </div>

              <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold text-slate-900 mb-6 leading-tight">
                Find Your Perfect
                <span className="block bg-gradient-to-r from-[#1A56DB] to-[#7E3AF2] bg-clip-text text-transparent">
                  Relocation Destination
                </span>
                <span className="block text-slate-800">in Mumbai</span>
              </h1>

              <p className="text-xl text-slate-600 mb-8 max-w-xl">
                Compare neighborhoods based on safety, affordability, transit,
                amenities, and more. Make informed decisions backed by data.
              </p>

              <Link
                href="/explore"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#1A56DB] to-[#7E3AF2] text-white font-semibold rounded-xl hover:scale-105 transition-all group"
              >
                Start Exploring
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Right Cards */}
            <div
              className={`transition-all duration-1000 delay-300 ${
                isVisible
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 translate-x-8'
              }`}
            >
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Safety', value: '8.5', color: 'from-emerald-400 to-emerald-600' },
                  { label: 'Affordability', value: '7.2', color: 'from-amber-400 to-amber-600' },
                  { label: 'Transit', value: '9.1', color: 'from-blue-400 to-blue-600' },
                  { label: 'Amenities', value: '8.8', color: 'from-purple-400 to-purple-600' },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="bg-white/80 rounded-2xl p-6 shadow-xl hover:scale-105 transition"
                  >
                    <div
                      className={`w-12 h-12 bg-gradient-to-br ${item.color} rounded-lg mb-4 flex items-center justify-center text-white font-bold`}
                    >
                      {item.value}
                    </div>
                    <p className="text-slate-600 font-medium">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              Comprehensive Neighborhood Analysis
            </h2>
            <p className="text-xl text-slate-600">
              Every metric you need to make the right decision
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: 'Safety Index',
                desc: 'Crime rates and community safety scores.',
                color: 'from-emerald-500 to-emerald-600',
              },
              {
                icon: DollarSign,
                title: 'Affordability',
                desc: 'Rent, utilities, and cost-of-living metrics.',
                color: 'from-amber-500 to-amber-600',
              },
              {
                icon: Train,
                title: 'Transit',
                desc: 'Metro, local trains, and bus connectivity.',
                color: 'from-blue-500 to-blue-600',
              },
              {
                icon: Home,
                title: 'Amenities',
                desc: 'Schools, hospitals, parks, and shopping.',
                color: 'from-purple-500 to-purple-600',
              },
              {
                icon: Clock,
                title: 'Commute',
                desc: 'Travel time to major work hubs.',
                color: 'from-rose-500 to-rose-600',
              },
            ].map((f) => (
              <div
                key={f.title}
                className="bg-slate-50 rounded-2xl p-8 shadow-lg hover:scale-105 transition"
              >
                <div
                  className={`w-14 h-14 bg-gradient-to-br ${f.color} rounded-xl flex items-center justify-center mb-6`}
                >
                  <f.icon className="text-white" size={28} />
                </div>
                <h3 className="text-2xl font-bold mb-3">{f.title}</h3>
                <p className="text-slate-600">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-blue-50/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              How It Works
            </h2>
            <p className="text-xl text-slate-600">
              Three simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Set Preferences',
                desc: 'Choose what matters most to you.',
              },
              {
                step: '02',
                title: 'Compare Areas',
                desc: 'Analyze neighborhoods side by side.',
              },
              {
                step: '03',
                title: 'Decide Confidently',
                desc: 'Pick the best place for your lifestyle.',
              },
            ].map((s) => (
              <div key={s.step} className="bg-white rounded-2xl p-8 shadow-xl">
                <div className="w-16 h-16 bg-gradient-to-br from-[#1A56DB] to-[#7E3AF2] rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-6">
                  {s.step}
                </div>
                <h3 className="text-2xl font-bold text-center mb-4">
                  {s.title}
                </h3>
                <p className="text-slate-600 text-center">{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link
              href="/explore"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#1A56DB] to-[#7E3AF2] text-white rounded-xl hover:scale-105 transition group"
            >
              Get Started
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
