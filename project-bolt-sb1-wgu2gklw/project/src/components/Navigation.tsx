import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Ticket, Film, Music, Calendar, Heart, User, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <motion.div 
              whileHover={{ rotate: 360 }} 
              transition={{ duration: 0.5 }}
              className="bg-blue-600 p-2 rounded-lg"
            >
              <Ticket className="w-6 h-6 text-white" />
            </motion.div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
              TicketHub
            </span>
          </Link>
          
          <div className="hidden md:flex space-x-8">
            {[
              { to: "/movies", icon: Film, label: "Movies" },
              { to: "/concerts", icon: Music, label: "Concerts" },
              { to: "/events", icon: Calendar, label: "Events" },
            ].map(({ to, icon: Icon, label }) => (
              <Link
                key={to}
                to={to}
                className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors group"
              >
                <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="font-medium">{label}</span>
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <Link 
              to="/wishlist" 
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              <motion.div whileHover={{ scale: 1.1 }}>
                <Heart className="w-6 h-6" />
              </motion.div>
            </Link>
            <Link 
              to="/account" 
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <User className="w-5 h-5" />
              <span className="font-medium">Account</span>
            </Link>
          </div>

          <button
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t"
          >
            <div className="px-4 py-3 space-y-3">
              {[
                { to: "/movies", icon: Film, label: "Movies" },
                { to: "/concerts", icon: Music, label: "Concerts" },
                { to: "/events", icon: Calendar, label: "Events" },
                { to: "/wishlist", icon: Heart, label: "Wishlist" },
                { to: "/account", icon: User, label: "Account" },
              ].map(({ to, icon: Icon, label }) => (
                <Link
                  key={to}
                  to={to}
                  className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{label}</span>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}