const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const mongoose = require("mongoose");
require("dotenv").config();

// Define Mongoose Schemas
const vehicleSchema = new mongoose.Schema({
  id: Number,
  address: String,
  lat: Number,
  lng: Number,
  status: String,
  lastUpdated: Date,
  alert: String, // Field to store alerts
});

const Vehicle = mongoose.model("Vehicle", vehicleSchema);

const vehicleHistorySchema = new mongoose.Schema({
  vehicleId: Number,
  lat: Number,
  lng: Number,
  timestamp: Date,
});

const VehicleHistory = mongoose.model("VehicleHistory", vehicleHistorySchema);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("Connected to MongoDB");
  seedDatabase(); // Seed the database after connecting
}).catch((error) => {
  console.error("Error connecting to MongoDB:", error);
});

const app = express();
const port = 3000;

app.use(cors({ origin: "http://localhost:3002", methods: ["GET", "POST"] }));

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "http://localhost:3002" } });

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  // Periodically send vehicle updates
  setInterval(async () => {
    const vehicles = await Vehicle.find({});

    for (const vehicle of vehicles) {
      // Simulate status updates and alerts
      if (vehicle.status === "moving") {
        if (Math.random() < 0.1) {
          vehicle.alert = "breakdown";
        } else if (Math.random() < 0.1) {
          vehicle.alert = "idle";
        } else {
          vehicle.alert = ""; // Clear alert
        }

        // Simulate small movement for "moving" vehicles
        vehicle.lat += (Math.random() - 0.5) * 0.01;
        vehicle.lng += (Math.random() - 0.5) * 0.01;
      }

      vehicle.lastUpdated = new Date();
      await vehicle.save();

      // Save historical data
      await VehicleHistory.create({
        vehicleId: vehicle.id,
        lat: vehicle.lat,
        lng: vehicle.lng,
        timestamp: vehicle.lastUpdated,
      });
    }

    socket.emit("vehicleUpdate", vehicles);
  }, 2000);

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

// Seed the database
const seedDatabase = async () => {
  try {
    await Vehicle.deleteMany({}); // Clear existing data
    await VehicleHistory.deleteMany({}); // Clear historical data
    console.log("Cleared existing data.");

    // Insert sample data
    const vehicles = [
      { id: 1, address: "Dublin, Ireland", lat: 53.333, lng: -6.248, status: "stopped", lastUpdated: new Date(), alert: "" },
      { id: 2, address: "Galway, Ireland", lat: 53.270, lng: -9.057, status: "moving", lastUpdated: new Date(), alert: "" },
    ];
    await Vehicle.insertMany(vehicles);
    console.log("Sample data inserted into database.");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

// API route to fetch all vehicles
app.get("/api/locations", async (req, res) => {
  try {
    const vehicles = await Vehicle.find({});
    res.json(vehicles);
  } catch (error) {
    console.error("Error fetching vehicles:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// API route to fetch historical data for a specific vehicle
app.get("/api/vehicle/:id/history", async (req, res) => {
  try {
    const { id } = req.params;
    const history = await VehicleHistory.find({ vehicleId: id }).sort({ timestamp: 1 });
    res.json(history);
  } catch (error) {
    console.error("Error fetching vehicle history:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

server.listen(port, () => {
  console.log(`Backend running on http://localhost:${port}`);
});
