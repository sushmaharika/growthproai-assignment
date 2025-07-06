const express = require('express');
const cors = require('cors');
const app = express();

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to GrowthPro AI API',
    endpoints: {
      'POST /business-data': 'Generate business data including rating, reviews, and headline',
      'GET /regenerate-headline': 'Generate a new headline for given business name and location'
    }
  });
});

// Load environment variables
require('dotenv').config();

// CORS configuration
const allowedOrigins = (process.env.CORS_ORIGINS || 'http://localhost:3000').split(',');
console.log('Allowed Origins:', allowedOrigins);

// Middleware
app.use(cors({
  origin: function(origin, callback) {
    console.log('Request Origin:', origin);
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST'],
  credentials: true
}));
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`, req.body);
  next();
});

// Simulated headlines for random selection
const headlineTemplates = [
  (name, location) => `${name}: Setting New Standards for Excellence in ${location}`,
  (name, location) => `Why ${name} is ${location}'s Best Kept Secret in 2025`,
  (name, location) => `${name} Revolutionizes Customer Experience in ${location}`,
  (name, location) => `The Success Story of ${name}: ${location}'s Rising Star`,
  (name, location) => `How ${name} Became ${location}'s Most Talked About Business`,
  (name, location) => `${name}: Transforming Business Landscape in ${location}`,
  (name, location) => `Discover Why Customers Trust ${name} in ${location}`,
  (name, location) => `${name}: Leading Innovation and Growth in ${location}`,
  (name, location) => `The ${location} Success Blueprint: Inside ${name}'s Journey`,
  (name, location) => `${name}: Redefining Industry Standards in ${location}`,
  (name, location) => `Why ${name} is ${location}'s Most Recommended Business`,
  (name, location) => `${name}: Building Tomorrow's Solutions in ${location} Today`,
  (name, location) => `Experience Excellence with ${name} in ${location}`,
  (name, location) => `${name}: Creating Lasting Impact in ${location}'s Community`,
  (name, location) => `The Future of Business in ${location}: Spotlight on ${name}`,
];

// Generate random rating between 4.0 and 5.0
const generateRating = () => (4 + Math.random()).toFixed(1);

// Generate random number of reviews between 50 and 500
const generateReviews = () => Math.floor(Math.random() * 450) + 50;

// Generate random headline
const generateHeadline = (name, location) => {
  const template = headlineTemplates[Math.floor(Math.random() * headlineTemplates.length)];
  return template(name, location);
};

// POST endpoint for business data
app.post('/business-data', (req, res) => {
  try {
    console.log('Received business data request:', req.body);
    const { name, location } = req.body;
    
    if (!name || !location) {
      console.log('Missing required fields:', { name, location });
      return res.status(400).json({ error: 'Name and location are required' });
    }

    const businessData = {
      rating: parseFloat(generateRating()),
      reviews: generateReviews(),
      headline: generateHeadline(name, location)
    };

    console.log('Generated business data:', businessData);
    res.json(businessData);
  } catch (error) {
    console.error('Error generating business data:', error);
    res.status(500).json({ error: 'Failed to generate business data', details: error.message });
  }
});

// GET endpoint for headline regeneration
app.get('/regenerate-headline', (req, res) => {
  try {
    console.log('Received headline regeneration request:', req.query);
    const { name, location } = req.query;

    if (!name || !location) {
      console.log('Missing required fields:', { name, location });
      return res.status(400).json({ error: 'Name and location are required' });
    }

    const newHeadline = generateHeadline(name, location);
    console.log('Generated new headline:', newHeadline);
    res.json({ headline: newHeadline });
  } catch (error) {
    console.error('Error regenerating headline:', error);
    res.status(500).json({ error: 'Failed to regenerate headline', details: error.message });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});