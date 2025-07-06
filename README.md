# Business Dashboard

A modern, responsive dashboard for small businesses to view their SEO content and Google Business data. Built with React, Express, Tailwind CSS, and Framer Motion.

## Features

- 🎨 Modern UI with glassmorphic design and 3D animations
- 📱 Fully responsive layout
- 🔄 Real-time data simulation
- ✨ Interactive SEO headline generation
- 🌟 Business ratings and reviews display
- 🎭 Smooth transitions and loading states

## Tech Stack

### Frontend
- React
- TypeScript
- Tailwind CSS
- Framer Motion
- Headless UI

### Backend
- Node.js
- Express

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd growthproai
```

2. Install frontend dependencies
```bash
npm install
```

3. Install backend dependencies
```bash
cd server
npm install
```

### Running the Application

1. Start the backend server
```bash
cd server
npm run dev
```
The server will start on http://localhost:5000

2. In a new terminal, start the frontend development server
```bash
npm start
```
The application will open in your browser at http://localhost:3000

## API Endpoints

### POST /business-data
Submit business information to get ratings and SEO headline.

```json
// Request body
{
  "name": "Business Name",
  "location": "Business Location"
}

// Response
{
  "rating": 4.5,
  "reviews": 127,
  "headline": "Generated SEO Headline"
}
```

### GET /regenerate-headline
Generate a new SEO headline for the business.

```
GET /regenerate-headline?name=Business%20Name&location=Business%20Location

// Response
{
  "headline": "New Generated Headline"
}
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.