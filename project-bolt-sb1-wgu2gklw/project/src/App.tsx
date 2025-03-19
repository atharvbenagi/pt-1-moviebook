import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { SearchBar } from './components/SearchBar';
import { EventCard } from './components/EventCard';
import { SeatMap } from './components/SeatMap';
import { BookingSteps } from './components/BookingSteps';
import { motion } from 'framer-motion';

const FEATURED_EVENTS = [
  {
    id: '1',
    title: 'Inception',
    type: 'movie',
    image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80',
    date: new Date('2024-04-15'),
    venue: 'Cinema City',
    duration: '2h 28min',
    price: 15,
  },
  {
    id: '2',
    title: 'Taylor Swift Concert',
    type: 'concert',
    image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80',
    date: new Date('2024-04-20'),
    venue: 'Stadium Arena',
    duration: '3h',
    price: 89,
  },
  {
    id: '3',
    title: 'Tech Conference 2024',
    type: 'event',
    image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80',
    date: new Date('2024-05-01'),
    venue: 'Convention Center',
    duration: '8h',
    price: 199,
  },
] as const;

function HomePage() {
  return (
    <div className="space-y-12">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4 py-12"
      >
        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
          Book Your Next Experience
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Discover and book the best movies, concerts, and events happening near you
        </p>
      </motion.section>

      <section className="my-8">
        <SearchBar />
      </section>

      <section>
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Featured Events</h2>
          <button className="text-blue-600 hover:text-blue-700 font-semibold">
            View All
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURED_EVENTS.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <EventCard {...event} />
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}

function BookingPage() {
  return (
    <div className="max-w-5xl mx-auto py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <BookingSteps currentStep={2} />
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold mb-2">Inception</h1>
              <p className="text-gray-600">Cinema City · April 15, 2024 · 7:30 PM</p>
            </div>
            <img
              src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80"
              alt="Inception"
              className="w-24 h-24 rounded-lg object-cover"
            />
          </div>
        </div>
        <SeatMap />
      </motion.div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        
        <main className="max-w-7xl mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/booking" element={<BookingPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;