import React from 'react';
import { motion } from 'framer-motion';

const AnimatedBackground = () => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-gradient-to-br from-indigo-50 to-cyan-50">
      {/* Abstract AI Network Pattern */}
      <svg className="absolute w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
            <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#4f46e5" strokeWidth="0.5" opacity="0.3" />
          </pattern>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
        
        {/* Animated Nodes */}
        <motion.circle
          cx="20%"
          cy="30%"
          r="2"
          fill="#4f46e5"
          filter="url(#glow)"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.circle
          cx="80%"
          cy="70%"
          r="2"
          fill="#06b6d4"
          filter="url(#glow)"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Connecting Lines */}
        <motion.path
          d="M 20% 30% L 80% 70%"
          stroke="#4f46e5"
          strokeWidth="0.5"
          strokeDasharray="5,5"
          animate={{
            strokeDashoffset: [0, -20]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {/* Floating Particles */}
        <motion.g
          animate={{
            y: [-10, 10, -10]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <circle cx="40%" cy="20%" r="1" fill="#4f46e5" opacity="0.3" />
          <circle cx="60%" cy="80%" r="1" fill="#06b6d4" opacity="0.3" />
          <circle cx="30%" cy="60%" r="1" fill="#4f46e5" opacity="0.3" />
          <circle cx="70%" cy="40%" r="1" fill="#06b6d4" opacity="0.3" />
        </motion.g>
      </svg>
    </div>
  );
};

export default AnimatedBackground;