const vehicles = [];

// generated simulated vehicles
for (let i = 1; i <= 10; i++) {
    vehicles.push({
        id: `vehicle-${i}`,
        latitude: (Math.random() * (53.5 - 53.3) + 53.3).toFixed(6),
        longitude: (Math.random() * (-6.3 - -6.5) + -6.5).toFixed(6),
        status: "stopped",
    });
}

console.log("Initial Vehicles:", vehicles);

//vehicle positions
setInterval(() => {
    vehicles.forEach((vehicle) => {
        //simulate movement
        vehicle.latitude = (parseFloat(vehicle.latitude) + (Math.random() - 0.5) * 0.01).toFixed(6);
        vehicle.longitude = (parseFloat(vehicle.longitude) + (Math.random() - 0.5) * 0.01).toFixed(6);

        //randomly update status
        const statuses = ["moving", "stopped", "idle"];
        vehicle.status = statuses[Math.floor(Math.random() * statuses.length)];
    });

    console.log("Updated Vehicles:", vehicles);
}, 10000);

module.exports = vehicles;
