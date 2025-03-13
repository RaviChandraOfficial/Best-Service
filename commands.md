1️⃣ Register a Customer

    URL: POST http://localhost:8080/register
    Headers:

{
  "Content-Type": "application/json"
}

Body (JSON):

    {
      "username": "john_doe",
      "password": "password123",
      "user_type": "customer"
    }

✅ Expected Response

{
  "message": "User registered successfully"
}

2️⃣ Register a Service Center

    URL: POST http://localhost:8080/register-service-center

Headers:

{
  "Content-Type": "application/json"
}

Body (JSON):

    {
      "username": "speed_motors",
      "password": "securepass",
      "user_type": "service_center",
      "name": "Speed Motors",
      "location": "New York",
      "rating": 4.5,
      "price_range": "$$",
      "bike_types": "Sport, Cruiser",
      "service_type": "authorized"
    }

✅ Expected Response

{
  "message": "Service center registered successfully"
}

3️⃣ Login (For Both Customers & Service Centers)

    URL: POST http://localhost:8080/login
    Headers:

{
  "Content-Type": "application/json"
}

Body (JSON):

    {
      "username": "speed_motors",
      "password": "securepass"
    }

✅ Expected Response

{
  "token": "your_generated_jwt_token"
}

4️⃣ Fetch All Service Centers (Authenticated Request)

    URL: GET http://localhost:8080/service-centers
    Headers:

    {
      "Authorization": "Bearer your_generated_jwt_token"
    }

✅ Expected Response

{
  "total_service_centers": 2,
  "data": [
    {
      "id": 1,
      "name": "Speed Motors",
      "location": "New York",
      "rating": 4.5,
      "price_range": "$$",
      "bike_types": "Sport, Cruiser",
      "service_type": "authorized"
    },
    {
      "id": 2,
      "name": "Bike Fixers",
      "location": "Los Angeles",
      "rating": 3.9,
      "price_range": "$",
      "bike_types": "Dirt, Standard",
      "service_type": "private"
    }
  ]
}

5️⃣ Fetch Logged-in User Details

    URL: GET http://localhost:8080/user
    Headers:

    {
      "Authorization": "Bearer your_generated_jwt_token"
    }

✅ Expected Response

{
  "id": 1,
  "username": "speed_motors",
  "user_type": "service_center"
}