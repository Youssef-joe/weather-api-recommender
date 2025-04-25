const { OpenAI } = require('openai');
// Note: The @vercel/ai SDK is primarily for streaming responses in frontend applications
// For backend Node.js applications, the official OpenAI SDK is often more appropriate

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

async function generateActivities(location, weatherData, getAllActivities = false) {
  try {
    let prompt;
    
    if (getAllActivities) {
      prompt = `Generate 10 fun activities for someone who is bored in ${location}. Include indoor and outdoor activities. 
      Format the response as a JSON array of objects, each with "name", "description", and "type" (indoor/outdoor) properties.`;
    } else {
      const weatherCondition = weatherData.current.condition.text;
      const temperature = weatherData.current.temp_c;
      
      prompt = `Generate 5 fun activities for someone who is bored in ${location} during ${weatherCondition} weather with a temperature of ${temperature}°C.
      Format the response as a JSON array of objects, each with "name", "description", "type" (indoor/outdoor), and "weatherCondition" properties.`;
    }
    
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 1000
    });
    
    // Get the response content
    const content = response.choices[0].message.content;
    
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