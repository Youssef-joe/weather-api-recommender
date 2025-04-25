const express = require('express');
require('dotenv').config();
const cors = require('cors');
const activityRoutes = require("./routes/activity.routes.js");
const weatherRoutes = require('./routes/weather.routes.js');
const favoriteRoutes = require('./routes/favourite.routes.js');
if (!process.env.OPENAI_API_KEY) {
  throw new Error('OPENAI_API_KEY environment variable is missing');
}

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