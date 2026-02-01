'use client';

import React, { useState, useEffect } from 'react';
import { Search, Download, ChevronDown, ChevronUp, Check, FileText, Home, BookOpen, Heart, GraduationCap, FileCheck, Mail, Phone, MapPin } from 'lucide-react';

const ResourcesPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [expandedFaq, setExpandedFaq] = useState(null);
    const [checklist, setChecklist] = useState({});

    // Initialize checklist from localStorage
    useEffect(() => {
        const saved = localStorage.getItem('relocationChecklist');
        if (saved) {
            setChecklist(JSON.parse(saved));
        }
    }, []);

    // Save checklist to localStorage
    const toggleChecklistItem = (id) => {
        const updated = { ...checklist, [id]: !checklist[id] };
        setChecklist(updated);
        localStorage.setItem('relocationChecklist', JSON.stringify(updated));
    };

    const categories = [
        { id: 'all', label: 'All Resources', icon: FileText },
        { id: 'moving', label: 'Moving Tips', icon: Home },
        { id: 'legal', label: 'Legal & Docs', icon: FileCheck },
        { id: 'utilities', label: 'Utilities', icon: BookOpen },
        { id: 'education', label: 'Education', icon: GraduationCap },
        { id: 'healthcare', label: 'Healthcare', icon: Heart }
    ];

    const relocationGuides = [
        {
            id: 1,
            title: 'Complete Moving Checklist: Your 60-Day Timeline',
            category: 'moving',
            description: 'A comprehensive timeline to help you plan your move from two months before to moving day.',
            readTime: '8 min read',
            featured: true,
            downloadable: true
        },
        {
            id: 2,
            title: 'Legal Documentation for International Relocation',
            category: 'legal',
            description: 'Essential documents you need for moving abroad, including visas, permits, and certifications.',
            readTime: '12 min read',
            featured: true,
            downloadable: true
        },
        {
            id: 3,
            title: 'Setting Up Utilities in Your New Home',
            category: 'utilities',
            description: 'Step-by-step guide to connecting electricity, water, internet, and other essential services.',
            readTime: '6 min read',
            featured: false,
            downloadable: true
        },
        {
            id: 4,
            title: 'School Admission Process: A Parent\'s Guide',
            category: 'education',
            description: 'Navigate the school enrollment process with our detailed guide for relocating families.',
            readTime: '10 min read',
            featured: true,
            downloadable: true
        },
        {
            id: 5,
            title: 'Healthcare Registration in Your New City',
            category: 'healthcare',
            description: 'How to register with local healthcare providers and understand the medical system.',
            readTime: '7 min read',
            featured: false,
            downloadable: true
        },
        {
            id: 6,
            title: 'Mumbai Relocation Guide: Local Tips & Insights',
            category: 'moving',
            description: 'Insider tips for settling in Mumbai, from neighborhoods to transportation.',
            readTime: '15 min read',
            featured: true,
            downloadable: false
        },
        {
            id: 7,
            title: 'Banking and Financial Setup After Moving',
            category: 'legal',
            description: 'Opening bank accounts, transferring finances, and managing money in a new location.',
            readTime: '9 min read',
            featured: false,
            downloadable: true
        }
    ];

    const checklistItems = [
        { id: 1, text: 'Research and select target city/neighborhood', category: '8 weeks before' },
        { id: 2, text: 'Create moving budget and timeline', category: '8 weeks before' },
        { id: 3, text: 'Notify employer and request relocation assistance', category: '8 weeks before' },
        { id: 4, text: 'Research and hire moving company', category: '6 weeks before' },
        { id: 5, text: 'Start decluttering and organizing belongings', category: '6 weeks before' },
        { id: 6, text: 'Research schools and begin enrollment process', category: '6 weeks before' },
        { id: 7, text: 'Notify current landlord or list property for sale', category: '6 weeks before' },
        { id: 8, text: 'Begin packing non-essential items', category: '4 weeks before' },
        { id: 9, text: 'Transfer or close utility accounts', category: '4 weeks before' },
        { id: 10, text: 'Update address with banks, insurance, subscriptions', category: '4 weeks before' },
        { id: 11, text: 'Schedule utility connections at new home', category: '2 weeks before' },
        { id: 12, text: 'Arrange for mail forwarding', category: '2 weeks before' },
        { id: 13, text: 'Pack essential items and prepare moving day kit', category: '1 week before' },
        { id: 14, text: 'Confirm moving company details and schedule', category: '1 week before' },
        { id: 15, text: 'Clean current home and conduct final walkthrough', category: 'Moving day' },
        { id: 16, text: 'Register with local authorities and update ID', category: 'After arrival' },
        { id: 17, text: 'Register with healthcare providers', category: 'After arrival' },
        { id: 18, text: 'Explore neighborhood and locate essential services', category: 'After arrival' }
    ];

    const faqs = [
        {
            id: 1,
            question: 'How far in advance should I start planning my relocation?',
            answer: 'Ideally, start planning 2-3 months before your intended move date. This gives you enough time to research locations, hire movers, handle paperwork, and make arrangements for schools or jobs. For international moves, allow 4-6 months due to visa processing and documentation requirements.'
        },
        {
            id: 2,
            question: 'What documents do I need for domestic relocation?',
            answer: 'Essential documents include proof of identity (Aadhaar, PAN card, passport), address proof, employment documents, property papers or rental agreement, school records for children, medical records, and vehicle registration if applicable. Keep both physical and digital copies.'
        },
        {
            id: 3,
            question: 'How do I transfer my children to a new school?',
            answer: 'Contact schools in your new area 4-6 weeks before moving. Request transfer certificates from the current school, gather academic records and immunization certificates, and complete admission forms for the new school. Some schools have specific admission windows, so plan accordingly.'
        },
        {
            id: 4,
            question: 'What\'s the best way to set up utilities in a new home?',
            answer: 'Contact utility providers 2-3 weeks before moving. You\'ll typically need your new address, move-in date, identification, and sometimes a security deposit. Set up electricity, water, gas, internet, and cable in that order. Some services can be activated online, while others require in-person visits.'
        },
        {
            id: 5,
            question: 'How do I register with healthcare providers in a new city?',
            answer: 'First, locate nearby hospitals and clinics. If you have insurance, check your network coverage. Register with a general practitioner, transfer medical records from your previous doctor, and refill any ongoing prescriptions. For families, find pediatricians and specialists as needed.'
        },
        {
            id: 6,
            question: 'Should I hire professional movers or move myself?',
            answer: 'Professional movers are recommended for long-distance moves, large households, or if you have valuable items. They provide insurance, packing materials, and expertise. DIY moves work for local relocations, smaller loads, or tight budgets. Get quotes from 3-4 companies before deciding.'
        },
        {
            id: 7,
            question: 'How do I change my address officially?',
            answer: 'Update your address with multiple entities: post office (mail forwarding), Aadhaar, PAN card, voter ID, driving license, vehicle registration, banks, insurance providers, employer, and subscription services. Most can be done online through respective portals.'
        },
        {
            id: 8,
            question: 'What should I pack in my essentials box for moving day?',
            answer: 'Include important documents, medications, phone chargers, basic toiletries, change of clothes, snacks, water, cleaning supplies, basic tools, first aid kit, and valuable items. This box should travel with you, not with the movers.'
        },
        {
            id: 9,
            question: 'How can I help my family adjust to the new location?',
            answer: 'Explore the neighborhood together, maintain routines where possible, connect with community groups, visit local attractions, and give everyone time to adjust. For children, arrange playdates and get involved in school activities. Stay positive and patient during the transition.'
        },
        {
            id: 10,
            question: 'What are the typical costs involved in relocation?',
            answer: 'Costs vary widely but include: moving company fees (₹10,000-50,000+), packing materials, travel expenses, security deposits for new home, utility connection fees, address change fees, and potential temporary housing. Budget an extra 10-15% for unexpected expenses.'
        },
        {
            id: 11,
            question: 'How do I find reliable movers and avoid scams?',
            answer: 'Research companies online, check reviews and ratings, verify licensing and insurance, get written estimates from multiple companies, avoid large upfront deposits, and never sign blank contracts. Ask for references and check with consumer protection agencies for complaints.'
        },
        {
            id: 12,
            question: 'What insurance should I have during relocation?',
            answer: 'Consider moving insurance for your belongings, health insurance that covers your new location, vehicle insurance updates for new address, and renters or homeowners insurance at your new residence. Review coverage limits and ensure continuity between locations.'
        }
    ];

    const filteredGuides = relocationGuides.filter(guide => {
        const matchesCategory = selectedCategory === 'all' || guide.category === selectedCategory;
        const matchesSearch = guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            guide.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const groupedChecklist = checklistItems.reduce((acc, item) => {
        if (!acc[item.category]) {
            acc[item.category] = [];
        }
        acc[item.category].push(item);
        return acc;
    }, {});

    const progress = (Object.values(checklist).filter(Boolean).length / checklistItems.length) * 100;

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Relocation Resources</h1>
                    <p className="text-xl text-blue-100 max-w-3xl">
                        Everything you need to make your move smooth and stress-free. From checklists to guides, we've got you covered.
                    </p>
                </div>
            </div>

            {/* Search and Filter Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
                <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search resources..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-4">
                        {categories.map(cat => {
                            const Icon = cat.icon;
                            return (
                                <button
                                    key={cat.id}
                                    onClick={() => setSelectedCategory(cat.id)}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${selectedCategory === cat.id
                                            ? 'bg-blue-600 text-white shadow-md'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                >
                                    <Icon className="w-4 h-4" />
                                    {cat.label}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content Area */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Featured Guides */}
                        <section>
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">Relocation Guides</h2>
                            <div className="grid gap-6">
                                {filteredGuides.map(guide => (
                                    <div
                                        key={guide.id}
                                        className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow p-6 border border-gray-100"
                                    >
                                        <div className="flex items-start justify-between mb-3">
                                            <div className="flex-1">
                                                {guide.featured && (
                                                    <span className="inline-block bg-yellow-100 text-yellow-800 text-xs font-semibold px-2.5 py-1 rounded-full mb-2">
                                                        Featured
                                                    </span>
                                                )}
                                                <h3 className="text-xl font-bold text-gray-900 mb-2">{guide.title}</h3>
                                                <p className="text-gray-600 mb-3">{guide.description}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-gray-500">{guide.readTime}</span>
                                            <div className="flex gap-3">
                                                <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                                                    Read More →
                                                </button>
                                                {guide.downloadable && (
                                                    <button className="flex items-center gap-1 text-purple-600 hover:text-purple-700 font-medium text-sm">
                                                        <Download className="w-4 h-4" />
                                                        Download PDF
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* FAQ Section */}
                        <section>
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
                            <div className="space-y-4">
                                {faqs.map(faq => (
                                    <div
                                        key={faq.id}
                                        className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden"
                                    >
                                        <button
                                            onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                                            className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                                        >
                                            <span className="font-semibold text-gray-900 pr-4">{faq.question}</span>
                                            {expandedFaq === faq.id ? (
                                                <ChevronUp className="w-5 h-5 text-blue-600 flex-shrink-0" />
                                            ) : (
                                                <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                                            )}
                                        </button>
                                        {expandedFaq === faq.id && (
                                            <div className="px-6 pb-4 text-gray-600 border-t border-gray-100 pt-4">
                                                {faq.answer}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Interactive Checklist */}
                        <div className="bg-white rounded-xl shadow-lg p-6 top-6">
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Moving Checklist</h3>

                            {/* Progress Bar */}
                            <div className="mb-6">
                                <div className="flex justify-between text-sm text-gray-600 mb-2">
                                    <span>Progress</span>
                                    <span>{Math.round(progress)}% Complete</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-3">
                                    <div
                                        className="bg-gradient-to-r from-blue-600 to-purple-600 h-3 rounded-full transition-all duration-300"
                                        style={{ width: `${progress}%` }}
                                    />
                                </div>
                            </div>

                            <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                                {Object.entries(groupedChecklist).map(([category, items]) => (
                                    <div key={category}>
                                        <h4 className="font-semibold text-sm text-gray-700 mb-2 sticky top-0 bg-white py-2 z-10">
                                            {category}
                                        </h4>
                                        <div className="space-y-2">
                                            {items.map(item => (
                                                <label
                                                    key={item.id}
                                                    className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                                                >
                                                    <div className="relative flex items-center justify-center mt-0.5">
                                                        <input
                                                            type="checkbox"
                                                            checked={checklist[item.id] || false}
                                                            onChange={() => toggleChecklistItem(item.id)}
                                                            className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                                        />
                                                    </div>
                                                    <span className={`text-sm flex-1 ${checklist[item.id] ? 'text-gray-400 line-through' : 'text-gray-700'
                                                        }`}>
                                                        {item.text}
                                                    </span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Contact Help Card */}
                        <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl shadow-lg p-6 text-white">
                            <h3 className="text-xl font-bold mb-3">Need More Help?</h3>
                            <p className="text-blue-100 mb-4 text-sm">
                                Our relocation experts are here to assist you with personalized guidance.
                            </p>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <Mail className="w-5 h-5" />
                                    <span className="text-sm">support@relocate.com</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Phone className="w-5 h-5" />
                                    <span className="text-sm">+91 1800-123-4567</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <MapPin className="w-5 h-5" />
                                    <span className="text-sm">Mon-Sat, 9 AM - 6 PM IST</span>
                                </div>
                            </div>
                            <button className="mt-4 w-full bg-white text-blue-600 font-semibold py-2.5 px-4 rounded-lg hover:bg-blue-50 transition-colors">
                                Contact Support
                            </button>
                        </div>

                        {/* Quick Links */}
                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Links</h3>
                            <div className="space-y-2">
                                <a href="#" className="block text-blue-600 hover:text-blue-700 text-sm font-medium">
                                    → Find Moving Companies
                                </a>
                                <a href="#" className="block text-blue-600 hover:text-blue-700 text-sm font-medium">
                                    → Property Listings
                                </a>
                                <a href="#" className="block text-blue-600 hover:text-blue-700 text-sm font-medium">
                                    → School Finder
                                </a>
                                <a href="#" className="block text-blue-600 hover:text-blue-700 text-sm font-medium">
                                    → City Guides
                                </a>
                                <a href="#" className="block text-blue-600 hover:text-blue-700 text-sm font-medium">
                                    → Cost Calculator
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResourcesPage;