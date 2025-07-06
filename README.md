# GrowthPro AI

A modern business analytics dashboard built with React and Node.js.

## Development Setup

### Frontend
1. Install dependencies:
   ```bash
   npm install
   ```
2. Create `.env` file in the root directory with:
   ```
   REACT_APP_API_URL=http://localhost:5000
   ```
3. Start development server:
   ```bash
   npm start
   ```

### Backend
1. Navigate to server directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create `.env` file in the server directory with:
   ```
   PORT=5000
   CORS_ORIGINS=http://localhost:3000,https://your-frontend-url.onrender.com
   ```
4. Start development server:
   ```bash
   npm run dev
   ```

## Deployment (Render)

### Environment Variables

#### Frontend
Set these in Render dashboard:
- `REACT_APP_API_URL`: Your backend API URL

#### Backend
Set these in Render dashboard:
- `PORT`: Default is 5000
- `CORS_ORIGINS`: Comma-separated list of allowed origins (e.g., `https://your-frontend-url.onrender.com,http://localhost:3000`)

### Node.js Version
Both frontend and backend use Node.js v22.x

### Build Commands
- Frontend: Automatically handled by render.yaml
- Backend: Automatically handled by render.yaml

## Security Notes
- Never commit .env files
- Always use environment variables for sensitive data
- Set proper CORS origins in production