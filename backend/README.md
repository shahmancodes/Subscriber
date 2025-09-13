# Social Media Follower Counter - Backend

FastAPI backend service for retrieving follower counts from Instagram, LinkedIn, and X (Twitter).

## Features

- 🚀 FastAPI with automatic API documentation
- 📊 Support for Instagram, LinkedIn, and X (Twitter)
- 🔑 RapidAPI integration for reliable data fetching
- 🌐 CORS enabled for frontend integration
- ⚡ Async endpoints for better performance

## Setup

1. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

2. **Run the server:**
   ```bash
   uvicorn main:app --reload --port 8000
   ```

3. **Access the API:**
   - API: http://localhost:8000
   - Documentation: http://localhost:8000/docs
   - Alternative docs: http://localhost:8000/redoc

## API Endpoints

### POST /followers
Get follower counts for social media usernames.

**Request body:**
```json
{
  "instagram_username": "username",
  "linkedin_username": "username", 
  "twitter_username": "username"
}
```

**Response:**
```json
{
  "instagram": {
    "platform": "Instagram",
    "username": "username",
    "followers": 1234567
  },
  "linkedin": {
    "platform": "LinkedIn", 
    "username": "username",
    "followers": 5678
  },
  "twitter": {
    "platform": "X (Twitter)",
    "username": "username", 
    "followers": 987654
  }
}
```

### GET /health
Health check endpoint.

## Environment Variables

The RapidAPI key is currently hardcoded. For production, use environment variables:

```bash
export RAPIDAPI_KEY="your_rapidapi_key_here"
```

## Supported Platforms

- **Instagram:** Just provide the username (e.g., `elonmusk`)
- **LinkedIn:** Just provide the username from LinkedIn URL (e.g., `charlie-bowsher-21380112b`)
- **X/Twitter:** Just provide the username (e.g., `elonmusk`) 