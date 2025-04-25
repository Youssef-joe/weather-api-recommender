const express = require('express');
const cors = require('cors');
const activityRoutes = require("./routes/activity.routes.js");
const weatherRoutes = require('./routes/weather.routes.js');
const favoriteRoutes = require('./routes/favourite.routes.js');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/activities', activityRoutes);
app.use('/api/weather', weatherRoutes);
app.use('/api/favorites', favoriteRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'Weather Activity Recommender API' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;