import React, { useState } from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Globe } from 'lucide-react';
import { clsx } from 'clsx';
import { useEcosystemData } from '../../hooks/useEcosystemData';
import { ECOSYSTEMS, type EcosystemName } from '../../types';
import Logo from '../../assets/AI-INNOCENSE-LOGO.png';

// Create a context to share ecosystem state across pages
export interface AppContextType {
    currentEcosystem: EcosystemName;
    setEcosystem: (name: EcosystemName) => void;
    data: any;
    loading: boolean;
}

export const AppContext = React.createContext<AppContextType | null>(null);

const AppShell: React.FC = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { currentEcosystem, setEcosystem, data, loading } = useEcosystemData();
    const location = useLocation();

    const navItems = [
        { name: 'Dashboard', path: '/' },
        { name: 'Entities', path: '/entities' },
        { name: 'Partnerships', path: '/partnerships' },
        { name: 'Collaboration', path: '/collaboration' },
        // { name: 'Insights', path: '/insights' }, // Disabled per user request
    ];

    const handleEcosystemChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setEcosystem(e.target.value as EcosystemName);
    };

    return (
        <AppContext.Provider value={{ currentEcosystem, setEcosystem, data, loading }}>
            <div className="min-h-screen bg-[#FAFAFA] font-sans text-brand-dark flex flex-col">
                {/* Sticky Header - Exact Height 129px and Shadow */}
                <header className="sticky top-0 z-50 bg-white shadow-navbar h-[129px] flex items-center transition-all duration-300">
                    <div className="w-full max-w-[1200px] mx-auto px-5 lg:px-0">
                        <div className="flex justify-between items-center w-full">

                            {/* Logo Section */}
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-3">
                                    {/* Logo Placeholder - simplified version of AI-InnoScEnCE */}
                                    <img
                                        src={Logo}
                                        alt="AI-InnoScEnCE Logo"
                                        className="h-16 w-auto object-contain"
                                    />
                                    <div>
                                        <span className="block text-brand-secondary font-bold text-xl leading-none">AI-InnoScEnCE</span>
                                        <span className="block text-sm text-gray-500 font-medium mt-1">Ecosystem Viewer</span>
                                    </div>
                                </div>

                                {/* Ecosystem Selector (Desktop) */}
                                <div className="hidden md:flex ml-10 items-center bg-gray-50 rounded-full px-4 py-2 border border-gray-100">
                                    <Globe size={16} className="text-gray-400 mr-2" />
                                    <select
                                        value={currentEcosystem}
                                        onChange={handleEcosystemChange}
                                        className="bg-transparent border-none text-sm font-semibold text-gray-600 focus:ring-0 cursor-pointer py-0 pr-8"
                                    >
                                        {Object.keys(ECOSYSTEMS).map((name) => (
                                            <option key={name} value={name}>{name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Desktop Navigation */}
                            <nav className="hidden md:flex items-center space-x-2">
                                {navItems.map((item) => {
                                    const isActive = location.pathname === item.path;
                                    return (
                                        <NavLink
                                            key={item.path}
                                            to={item.path}
                                            className={clsx(
                                                "px-6 py-3 rounded-full text-base font-semibold transition-all duration-200",
                                                isActive
                                                    ? "bg-brand-primary text-white shadow-md"
                                                    : "text-gray-600 hover:text-brand-primary hover:bg-brand-primary/5"
                                            )}
                                        >
                                            {item.name}
                                        </NavLink>
                                    );
                                })}
                            </nav>

                            {/* Mobile Menu Button */}
                            <div className="md:hidden flex items-center">
                                <button
                                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                    className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 focus:outline-none"
                                >
                                    {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Mobile Menu Dropdown */}
                    {isMobileMenuOpen && (
                        <div className="md:hidden bg-white border-t border-gray-100 shadow-xl absolute top-[129px] left-0 w-full z-40">
                            <div className="px-4 py-6 space-y-3">
                                <div className="mb-6 px-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">Ecosystem</label>
                                    <select
                                        value={currentEcosystem}
                                        onChange={handleEcosystemChange}
                                        className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-base"
                                    >
                                        {Object.keys(ECOSYSTEMS).map((name) => (
                                            <option key={name} value={name}>{name}</option>
                                        ))}
                                    </select>
                                </div>
                                {navItems.map((item) => {
                                    const isActive = location.pathname === item.path;
                                    return (
                                        <NavLink
                                            key={item.path}
                                            to={item.path}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className={clsx(
                                                "block px-4 py-4 rounded-xl text-lg font-medium",
                                                isActive
                                                    ? "bg-brand-primary/10 text-brand-primary"
                                                    : "text-gray-600 hover:bg-gray-50"
                                            )}
                                        >
                                            {item.name}
                                        </NavLink>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </header>

                {/* Main Content */}
                <main className="flex-1 w-full mx-auto">
                    <Outlet context={{ currentEcosystem, setEcosystem, data, loading }} />
                </main>

                {/* Footer */}
                <footer className="bg-white border-t border-gray-100 mt-auto py-12">
                    <div className="max-w-[1200px] mx-auto px-5 lg:px-0">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                            <div className="text-sm text-gray-500 font-medium">
                                © 2026 AI-InnoScEnCE Project. AI-Empowered Innovation in Natural Science and Engineering for the Circular Economy. A project funded by EIT HEI Initiative.
                            </div>
                            <div className="flex gap-8">
                                <a href="https://ai-innoscence.eu" target="_blank" rel="noreferrer" className="text-brand-primary hover:text-brand-secondary transition-colors text-sm font-bold">
                                    Visit Main Website
                                </a>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </AppContext.Provider>
    );
};

export default AppShell;
