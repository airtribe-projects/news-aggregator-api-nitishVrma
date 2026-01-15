const { getPreferenceForUser } = require("./preferenceController");
const { fetchNews } = require("../services/newsApi");

async function getPersonalizedNews(userId) {
  try {
    const preferences = await getPreferenceForUser(userId);
    console.log(preferences);
    const news = await fetchNews(preferences);
    return news;
  } catch (error) {
    console.error("Error in getPersonalizedNews controller:", error);
    throw error;
  }
}

module.exports = {
  getPersonalizedNews,
};
