
const { OpenAI } = require('openai');

// Initializing OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

async function generateActivities(location, weatherInfo, getAllActivities = false) {
  try {
    let prompt;
    
    if (getAllActivities) {
      prompt = `Generate 10 fun activities for someone who is bored in ${location}. Include indoor and outdoor activities. 
      Format the response as a JSON array of objects, each with "name", "description", and "type" (indoor/outdoor) properties.`;
    } else {
      const { condition, temperature, isDay } = weatherInfo;
      const timeOfDay = isDay ? 'daytime' : 'nighttime';
      
      prompt = `Generate 5 fun activities for someone who is bored in ${location} during ${condition} weather with a temperature of ${temperature}°C during ${timeOfDay}.
      Format the response as a JSON array of objects, each with "name", "description", "type" (indoor/outdoor), and "weatherCondition" properties.`;
    }
    
    console.log('Sending prompt to OpenAI:', prompt);
    
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 1000
    });
    
    // Get the response content
    const content = response.choices[0].message.content;
    
    console.log('Received response from OpenAI:', content.substring(0, 100) + '...');
    
    // Parse the JSON response
    try {
      // Try to parse the entire response as JSON
      return JSON.parse(content);
    } catch (parseError) {
      // If that fails, try to extract JSON from the response text
      const jsonMatch = content.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      throw new Error('Failed to parse AI response as JSON');
    }
  } catch (error) {
    console.error('Error generating activities with AI:', error);
    throw error;
  }
}

module.exports = { 
  generateActivities 
};