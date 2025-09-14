from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import requests
from bs4 import BeautifulSoup
import re
import json
from urllib.parse import urlparse

app = FastAPI(title="Social Media Follower Counter", version="1.0.0")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://followers-me.vercel.app"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# RapidAPI Configuration
RAPIDAPI_KEY = "5c28e17982msh612385525d38519p138b2ejsne33a5360c8c6"

class SocialMediaRequest(BaseModel):
    instagram_username: Optional[str] = None
    linkedin_username: Optional[str] = None
    twitter_username: Optional[str] = None

class SocialMediaResponse(BaseModel):
    instagram: Optional[dict] = None
    linkedin: Optional[dict] = None
    twitter: Optional[dict] = None



def get_instagram_followers(username: str) -> dict:
    """Get Instagram follower count using RapidAPI"""
    try:
        headers = {
            'x-rapidapi-host': 'instagram-scraper-stable-api.p.rapidapi.com',
            'x-rapidapi-key': RAPIDAPI_KEY
        }
        
        params = {'username_or_url': username}
        api_url = 'https://instagram-scraper-stable-api.p.rapidapi.com/ig_get_fb_profile_hover.php'
        
        response = requests.get(api_url, headers=headers, params=params, timeout=15)
        response.raise_for_status()
        
        data = response.json()
        
        if 'user_data' in data and 'follower_count' in data['user_data']:
            return {
                "platform": "Instagram",
                "username": username,
                "followers": data['user_data']['follower_count']
            }
        else:
            return {"error": "Could not extract follower count from Instagram API"}
            
    except Exception as e:
        return {"error": f"Instagram API Error: {str(e)}"}

def get_linkedin_followers(username: str) -> dict:
    """Get LinkedIn follower count using RapidAPI"""
    try:
        headers = {
            'x-rapidapi-host': 'linkedinscraper.p.rapidapi.com',
            'x-rapidapi-key': RAPIDAPI_KEY
        }
        
        params = {'username': username}
        api_url = 'https://linkedinscraper.p.rapidapi.com/profile-details'
        
        response = requests.get(api_url, headers=headers, params=params, timeout=15)
        response.raise_for_status()
        
        data = response.json()
        
        if 'data' in data and 'followerCount' in data['data']:
            return {
                "platform": "LinkedIn",
                "username": username,
                "followers": data['data']['followerCount']
            }
        else:
            return {"error": "Could not extract follower count from LinkedIn API"}
            
    except Exception as e:
        return {"error": f"LinkedIn API Error: {str(e)}"}

def get_x_followers(username: str) -> dict:
    """Get X (Twitter) follower count using RapidAPI"""
    try:
        headers = {
            'x-rapidapi-host': 'twitter135.p.rapidapi.com',
            'x-rapidapi-key': RAPIDAPI_KEY
        }
        
        params = {'username': username}
        api_url = 'https://twitter135.p.rapidapi.com/v2/UserByScreenName/'
        
        response = requests.get(api_url, headers=headers, params=params, timeout=15)
        response.raise_for_status()
        
        user_data = response.json()
        
        if 'data' in user_data and 'user' in user_data['data'] and 'result' in user_data['data']['user']:
            if 'legacy' in user_data['data']['user']['result'] and 'followers_count' in user_data['data']['user']['result']['legacy']:
                return {
                    "platform": "X (Twitter)",
                    "username": username,
                    "followers": user_data['data']['user']['result']['legacy']['followers_count']
                }
            else:
                return {"error": "Could not extract follower count from X API"}
        else:
            return {"error": "Could not extract user data from X API"}
            
    except Exception as e:
        return {"error": f"X (Twitter) API Error: {str(e)}"}

@app.get("/")
async def root():
    return {"message": "Social Media Follower Counter API"}

@app.post("/followers", response_model=SocialMediaResponse)
async def get_followers(request: SocialMediaRequest):
    """Get follower counts for provided social media usernames"""
    results = {}
    
    if request.instagram_username:
        results["instagram"] = get_instagram_followers(request.instagram_username)
    
    if request.linkedin_username:
        results["linkedin"] = get_linkedin_followers(request.linkedin_username)
    
    if request.twitter_username:
        results["twitter"] = get_x_followers(request.twitter_username)
    
    return SocialMediaResponse(**results)

@app.get("/health")
async def health_check():
    return {"status": "healthy"} 