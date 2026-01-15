const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { getPersonalizedNews } = require("../controllers/newsController");

router.get("/news", authMiddleware, async (req, res) => {
  try {
    let userId = req.user.id;
    const news = await getPersonalizedNews(userId);

    if (news && news.length > 0) {
      res.status(200).json({ news: news });
    } else {
      return res
        .status(200)
        .json({ message: "No news found for your preferences.", news: [] });
    }
  } catch (err) {
    return res
      .status(500)
      .json({
        message: `Internal server error. Could not retrieve personalized news. ${err}`,
      });
  }
});

module.exports = router;
