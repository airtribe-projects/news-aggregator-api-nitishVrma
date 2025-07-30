// services/newsApi.js
const axios = require('axios');
require('dotenv').config();

const NEWS_API_BASE_URL = 'https://newsapi.org/v2';
const NEWS_API_KEY = process.env.NEWS_API_KEY;

if (!NEWS_API_KEY) {
    console.error('CRITICAL ERROR: NEWS_API_KEY not found in environment variables!');
    process.exit(1);
}

async function fetchNews(preferences = {}) {
    try {
        const params = {
            apiKey: NEWS_API_KEY,
            q: preferences.keywords || 'general',
            language: preferences.language || 'en',
            category: preferences.category
        };

        const endpoint = 'everything';

        const response = await axios.get(`${NEWS_API_BASE_URL}/${endpoint}`, {
            params: params
        });

        return response.data.articles;

    } catch (error) {
        console.error("Error fetching news from NewsAPI:", error.message);

        if (error.response) {
            console.error("NewsAPI Response Error Data:", error.response.data);
            console.error("NewsAPI Response Status:", error.response.status);
            if (error.response.status === 429) {
                throw new Error("News API rate limit exceeded. Please try again later.");
            } else if (error.response.status === 401) {
                throw new Error("News API authentication failed. Check API key.");
            }
            throw new Error(`News API Error: ${error.response.data.message || 'Unknown error'}`);
        } else if (error.request) {
            throw new Error("No response from News API. Network error or API is down.");
        } else {
            throw new Error(`Failed to set up News API request: ${error.message}`);
        }
    }
}

module.exports = {
    fetchNews
};