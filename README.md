## testing
Weather Endpoint

In your collection, click "Add request"
Name it "Get Weather"
Set method to GET
URL: http://localhost:3000/api/weather?location=London
Click "Send"

Activities Endpoints

Add another request: "Get Activities by Weather"
Method: GET
URL: http://localhost:3000/api/activities/recommendations?location=London
Click "Send"

This should return both the weather and recommended activities.

Add another request: "Get All Activities"
Method: GET
URL: http://localhost:3000/api/activities/all?location=London
Click "Send"

This should return activities regardless of weather.

Favorites Endpoints

Add another request: "Get User Favorites"
Method: GET
URL: http://localhost:3000/api/favorites/user123
Click "Send"
Add another request: "Save Favorite"
Method: POST
URL: http://localhost:3000/api/favorites/user123
In the "Body" tab, select "raw" and "JSON"
Enter:
json{
  "name": "Visit Museum",
  "description": "Explore local art at the city museum",
  "location": "London",
  "type": "indoor",
  "weatherCondition": "Cloudy"
}

Click "Send"
