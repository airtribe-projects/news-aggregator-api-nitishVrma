const axios = require('axios');
require('dotenv').config();

const NEWS_API_BASE_URL = 'https://newsapi.org/v2';
const NEWS_API_KEY = process.env.NEWS_API_KEY;

async function fetchNews(userPreferences = {}) {
    try {
        const keywords = userPreferences.preferences && userPreferences.preferences.length > 0 
            ? userPreferences.preferences.join(' OR ') 
            : 'general';

        const params = {
            apiKey: NEWS_API_KEY,
            q: keywords,
            language: 'en'
        };

        const response = await axios.get(`${NEWS_API_BASE_URL}/everything`, { params });
        return response.data.articles;

    } catch (error) {
        console.error("Error fetching news:", error.message);
        throw error;
    }
}

module.exports = { fetchNews };