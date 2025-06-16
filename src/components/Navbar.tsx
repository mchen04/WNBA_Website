import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BarChart3, Menu, X, Crown, Star, Zap } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { AuthModal } from './AuthModal';

export const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case 'pro': return <Crown className="h-4 w-4 text-yellow-500" />;
      case 'premium': return <Star className="h-4 w-4 text-purple-500" />;
      default: return <Zap className="h-4 w-4 text-gray-500" />;
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'pro': return 'text-yellow-600 bg-yellow-50';
      case 'premium': return 'text-purple-600 bg-purple-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', requiresAuth: true },
    { name: 'Compare', href: '/compare', requiresAuth: false },
    { name: 'Trade Analyzer', href: '/trade', requiresAuth: false },
    { name: 'Rankings', href: '/rankings', requiresAuth: false },
    { name: 'Hot Players', href: '/hot-players', requiresAuth: false },
    { name: 'Consistency', href: '/consistency', requiresAuth: false },
    { name: 'Waiver Wire', href: '/waiver', requiresAuth: true, requiresTier: 'pro' },
  ];

  const isActive = (href: string) => location.pathname === href;

  return (
    <>
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-2">
                <BarChart3 className="h-8 w-8 text-purple-600" />
                <span className="text-xl font-bold text-gray-900">WNBA Analytics</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-6">
              {navigation.map((item) => {
                const canAccess = !item.requiresAuth || (user && (!item.requiresTier || user.tier === item.requiresTier || (item.requiresTier === 'premium' && user.tier === 'pro')));
                
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive(item.href)
                        ? 'bg-purple-100 text-purple-700'
                        : canAccess
                        ? 'text-gray-700 hover:text-purple-600 hover:bg-gray-50'
                        : 'text-gray-400 cursor-not-allowed'
                    }`}
                    onClick={(e) => {
                      if (!canAccess) {
                        e.preventDefault();
                        if (!user) setIsAuthModalOpen(true);
                      }
                    }}
                  >
                    {item.name}
                    {item.requiresTier && (
                      <span className="ml-1 text-xs font-semibold px-1.5 py-0.5 rounded-full bg-yellow-100 text-yellow-800">
                        PRO
                      </span>
                    )}
                  </Link>
                );
              })}
              
              <Link
                to="/pricing"
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-purple-600 hover:bg-gray-50"
              >
                Pricing
              </Link>

              {user ? (
                <div className="flex items-center space-x-4">
                  <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium ${getTierColor(user.tier)}`}>
                    {getTierIcon(user.tier)}
                    <span className="capitalize">{user.tier}</span>
                  </div>
                  <button
                    onClick={logout}
                    className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-200 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="bg-purple-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-purple-700 transition-colors"
                >
                  Sign In
                </button>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 hover:text-purple-600 p-2"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => {
                const canAccess = !item.requiresAuth || (user && (!item.requiresTier || user.tier === item.requiresTier || (item.requiresTier === 'premium' && user.tier === 'pro')));
                
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`block px-3 py-2 rounded-md text-sm font-medium ${
                      isActive(item.href)
                        ? 'bg-purple-100 text-purple-700'
                        : canAccess
                        ? 'text-gray-700 hover:text-purple-600 hover:bg-gray-50'
                        : 'text-gray-400'
                    }`}
                    onClick={(e) => {
                      if (!canAccess) {
                        e.preventDefault();
                        if (!user) setIsAuthModalOpen(true);
                      } else {
                        setIsMenuOpen(false);
                      }
                    }}
                  >
                    {item.name}
                    {item.requiresTier && (
                      <span className="ml-2 text-xs font-semibold px-1.5 py-0.5 rounded-full bg-yellow-100 text-yellow-800">
                        PRO
                      </span>
                    )}
                  </Link>
                );
              })}
              
              <Link
                to="/pricing"
                className="block px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-purple-600 hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                Pricing
              </Link>

              {user ? (
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex items-center px-3 py-2">
                    <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium ${getTierColor(user.tier)}`}>
                      {getTierIcon(user.tier)}
                      <span className="capitalize">{user.tier}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 text-sm font-medium text-gray-700 hover:text-purple-600 hover:bg-gray-50"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="pt-4 border-t border-gray-200">
                  <button
                    onClick={() => {
                      setIsAuthModalOpen(true);
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 text-sm font-medium bg-purple-600 text-white rounded-md hover:bg-purple-700"
                  >
                    Sign In
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </>
  );
};