const express = require('express');
const app = express();
const port = process.argv[2] || 3000;

const houses = [
    { price: 240000, city: "baltimore" },
    { price: 300000, city: "austin" },
    { price: 400000, city: "austin" },
    { price: 1000000, city: "seattle" },
    { price: 325000, city: "baltimore" },
    { price: 550000, city: "seattle" },
    { price: 250000, city: "boston" }
];

// Endpoint to calculate Zestimate
app.get('/v1/zillow/zestimate', (req, res) => {
    const { sqft, bed, bath } = req.query;
    
    if (!sqft || !bed || !bath || isNaN(sqft) || isNaN(bed) || isNaN(bath)) {
        return res.status(404).json({ error: "Invalid query parameters" });
    }
    
    const zestimate = parseInt(sqft) * parseInt(bed) * parseInt(bath) * 10;
    res.status(200).json({ zestimate });
});

// Endpoint to get houses by city
app.get('/v1/zillow/houses', (req, res) => {
    const { city } = req.query;
    
    if (city) {
        const filteredHouses = houses.filter(h => h.city.toLowerCase() === city.toLowerCase());
        return res.status(200).json(filteredHouses);
    }
    
    res.status(200).json([]);
});

// Endpoint to get houses under a given price
app.get('/v1/zillow/prices', (req, res) => {
    const { usd } = req.query;
    
    if (!usd || isNaN(usd)) {
        return res.status(404).json({ error: "Invalid query parameter" });
    }
    
    const filteredHouses = houses.filter(h => h.price <= parseInt(usd));
    res.status(200).json(filteredHouses);
});

// Handle invalid routes
app.use((req, res) => {
    res.status(404).json({ error: "Endpoint not found" });
});

// Start server
app.listen(port, () => {
    console.log(`Zillow API Server running on port ${port}`);
});
