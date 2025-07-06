import React from 'react';
import { motion } from 'framer-motion';

const BusinessBackground = ({ variant = 'home' }) => {
  const patterns = {
    home: (
      <>
        <defs>
          <pattern id="hexagons" x="0" y="0" width="50" height="87" patternUnits="userSpaceOnUse">
            <path d="M25,43.3 L0,25 L0,75 L25,93.3 L50,75 L50,25 L25,43.3" fill="none" stroke="currentColor" strokeWidth="1" />
          </pattern>
          <pattern id="buildings" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M10,60 V30 H20 V60 M30,60 V20 H40 V60 M45,60 V40 H55 V60" stroke="currentColor" strokeWidth="1" fill="none" />
          </pattern>
          <linearGradient id="overlay" x1="0" y1="0" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4F46E5" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#818CF8" stopOpacity="0.05" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#hexagons)" className="text-blue-200 opacity-10" />
        <rect width="100%" height="100%" fill="url(#buildings)" className="text-gray-400 opacity-10" />
        <rect width="100%" height="100%" fill="url(#overlay)" />
        <motion.g
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <path d="M0,100 C25,80 75,80 100,100" stroke="currentColor" strokeWidth="1" fill="none" className="text-blue-300 opacity-20" />
          <path d="M0,85 C25,65 75,65 100,85" stroke="currentColor" strokeWidth="1" fill="none" className="text-blue-300 opacity-15" />
        </motion.g>
      </>
    ),
    dashboard: (
      <>
        <defs>
          <pattern id="graph" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M0,20 L40,20 M20,0 L20,40" stroke="currentColor" strokeWidth="0.5" />
          </pattern>
          <pattern id="charts" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            <path d="M10,70 L30,30 L50,50 L70,20 L90,60" stroke="currentColor" strokeWidth="1" fill="none" />
            <circle cx="30" cy="30" r="2" fill="currentColor" />
            <circle cx="50" cy="50" r="2" fill="currentColor" />
            <circle cx="70" cy="20" r="2" fill="currentColor" />
          </pattern>
          <linearGradient id="dashOverlay" x1="0" y1="0" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1E40AF" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.05" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#graph)" className="text-gray-300 opacity-10" />
        <rect width="100%" height="100%" fill="url(#charts)" className="text-blue-400 opacity-10" />
        <rect width="100%" height="100%" fill="url(#dashOverlay)" />
        <motion.g
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <rect x="10%" y="20%" width="30%" height="20%" rx="5" fill="currentColor" className="text-blue-100 opacity-10" />
          <rect x="50%" y="50%" width="40%" height="25%" rx="5" fill="currentColor" className="text-blue-200 opacity-10" />
        </motion.g>
      </>
    )
  };

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-white to-indigo-50">
        <svg
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
        >
          {patterns[variant]}
        </svg>
      </div>
      <motion.div
        className="absolute inset-0 bg-gradient-to-tr from-transparent via-white to-transparent opacity-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
      />
    </div>
  );
};

export default BusinessBackground;