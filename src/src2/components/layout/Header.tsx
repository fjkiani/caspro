import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Settings, Dna, Bot, Zap, Command, BarChart3, Users, TestTube } from 'lucide-react';

const Header: React.FC = () => {
  const location = useLocation();
  
  const navigationItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/site/oracle', icon: Dna, label: 'Oracle' },
    { path: '/site/forge', icon: Bot, label: 'Forge' },
    { path: '/site/boltz', icon: Zap, label: 'Boltz' },
    { path: '/site/command-center', icon: Command, label: 'Command' },
    { path: '/site/biotech-transformation', icon: BarChart3, label: 'Biotech' },
    { path: '/site/clinical-transformation', icon: Users, label: 'Clinical' },
    { path: '/site/genetic-testing-transformation', icon: TestTube, label: 'Testing' },
    { path: '/composer', icon: Settings, label: 'Composer' },
  ];

  return (
    <header className="bg-slate-900 shadow-sm border-b border-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <div className="text-2xl">🧬</div>
            <div>
              <h1 className="text-xl font-bold text-white">CrisPRO.ai</h1>
              <p className="text-xs text-cyan-400">Data Room</p>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center space-x-2">
            {navigationItems.map(({ path, icon: Icon, label }) => {
              const isActive = location.pathname === path || 
                              (path !== '/' && location.pathname.startsWith(path));
              
              return (
                <Link
                  key={path}
                  to={path}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors text-sm ${
                    isActive
                      ? 'bg-cyan-600 text-white'
                      : 'text-gray-300 hover:text-white hover:bg-slate-800'
                  }`}
                  title={label}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden lg:block">{label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header; 