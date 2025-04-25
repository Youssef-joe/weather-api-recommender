const supabase = require('./../config/supabase.js');

async function getFavoritesByUser(userId) {
  try {
    const { data, error } = await supabase
      .from('favorites')
      .select('*')
      .eq('user_id', userId);
      
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching favorites:', error);
    throw error;
  }
}

async function saveFavorite(userId, activity) {
  try {
    const { data, error } = await supabase
      .from('favorites')
      .insert([
        {
          user_id: userId,
          activity_name: activity.name,
          activity_description: activity.description,
          location: activity.location,
          weather_condition: activity.weatherCondition || null
        }
      ]);
      
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error saving favorite:', error);
    throw error;
  }
}

module.exports = {
  getFavoritesByUser,
  saveFavorite
};