# Fleet Management System - Setup Instructions

## Overview
You have built a comprehensive Fleet Management System with:
- **Backend**: Node.js/Express server with MongoDB and real-time WebSocket communication
- **Frontend**: React application with Google Maps integration for fleet tracking

## Prerequisites Installation

### 1. Install Node.js
1. Go to [https://nodejs.org/](https://nodejs.org/)
2. Download the LTS version (recommended for most users)
3. Run the installer and follow the setup wizard
4. Restart your terminal/PowerShell after installation
5. Verify installation: `node --version` and `npm --version`

### 2. Install MongoDB (Choose one option)

**Option A: MongoDB Atlas (Cloud - Recommended)**
1. Go to [https://www.mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Create a free account
3. Create a new cluster
4. Get your connection string

**Option B: Local MongoDB**
1. Download from [https://www.mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)
2. Install and start MongoDB service
3. Use connection string: `mongodb://localhost:27017/fleet_management`

### 3. Get Google Maps API Key
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable these APIs:
   - Maps JavaScript API
   - Geocoding API
4. Create credentials (API Key)
5. Restrict the API key to your domain (optional but recommended)

## Environment Configuration

### Backend Environment (.env file)
Create `backend/.env` file:
```
MONGO_URI=your_mongodb_connection_string_here
PORT=3000
```

### Frontend Environment (.env file)
Create `frontend/fleet-dashboard/.env` file:
```
REACT_APP_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
```

## Installation & Running

### 1. Install Backend Dependencies
```bash
cd backend
npm install
```

### 2. Install Frontend Dependencies
```bash
cd frontend/fleet-dashboard
npm install
```

### 3. Start the Application

**Terminal 1 - Backend:**
```bash
cd backend
npm start
```
Server will run on http://localhost:3000

**Terminal 2 - Frontend:**
```bash
cd frontend/fleet-dashboard
npm start
```
Application will run on http://localhost:3001

## Features

### Backend Features:
- REST API for vehicle data (`/api/locations`, `/api/vehicle/:id/history`)
- Real-time WebSocket communication for live updates
- MongoDB integration with vehicle and historical data
- Simulated vehicle movements and status changes
- Alert system (breakdown, idle, moving)

### Frontend Features:
- Google Maps integration with real-time vehicle tracking
- Color-coded vehicle markers (green=normal, yellow=idle, red=breakdown)
- Vehicle status table with live updates
- Historical route visualization
- Click on vehicles to see their routes

## Troubleshooting

1. **"Cannot connect to MongoDB"**: Check your MONGO_URI in backend/.env
2. **"Google Maps not loading"**: Verify your API key in frontend/.env
3. **"Port already in use"**: Change PORT in backend/.env or stop other services
4. **WebSocket connection issues**: Ensure backend is running before starting frontend

## Next Steps for Development

1. Add user authentication
2. Implement real GPS device integration
3. Add more alert types and notifications
4. Create admin dashboard for fleet management
5. Add reporting and analytics features

