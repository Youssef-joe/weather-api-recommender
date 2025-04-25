const { getFavoritesByUser, saveFavorite } = require("./../models/favourite.model.js");

const getFavorites = async (req, res) => {
  try {
    const { userId } = req.params;
    
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }
    
    const favorites = await getFavoritesByUser(userId);
    res.json(favorites);
  } catch (error) {
    console.error('Favorite controller error:', error);
    res.status(500).json({ error: 'Failed to fetch favorite activities' });
  }
};

const saveFavoriteHandler = async (req, res) => {
  try {
    const { userId } = req.params;
    const activity = req.body;
    
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }
    
    if (!activity || !activity.name || !activity.description) {
      return res.status(400).json({ error: 'Activity details are required' });
    }
    
    const savedFavorite = await saveFavorite(userId, activity);
    res.status(201).json(savedFavorite);
  } catch (error) {
    console.error('Favorite controller error:', error);
    res.status(500).json({ error: 'Failed to save favorite activity' });
  }
};

module.exports = {
  getFavorites,
  saveFavorite: saveFavoriteHandler
};