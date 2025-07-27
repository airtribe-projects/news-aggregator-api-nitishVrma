const express = require("express");
const router = express.Router();
const { getPreferenceForUser, updateOrCreatePreferences } = require("../controllers/preferenceController")
const authMiddleware = require("../middleware/authMiddleware");

router.get("/preferences", authMiddleware, async (req, res) => {
    try {
        const userId = req.user.id;
        const result = await getPreferenceForUser(userId);
        return res.status(200).json(result);
    } catch (err) {
        console.error("Error in GET /preferences:", err);
        return res.status(500).json({ message: "Internal server error. Could not retrieve preferences." });
    }
});

router.put("/preferences", authMiddleware, async (req, res) => {
    try {
        const userId = req.user.id; // Get user ID from the authenticated token
        const newPreferences = req.body;
        if (!newPreferences || !Array.isArray(newPreferences.preferences)) {
            return res.status(400).json({ message: "Invalid preferences data. Expected an array of strings under 'preferences' key." });
        }

        const updatedPreferences = await updateOrCreatePreferences(userId, newPreferences);
        return res.status(200).json({
            message: "Preferences updated successfully!",
            preferences: updatedPreferences.preferences // Return the updated array
        });

    } catch (err) {
        console.error("Error in PUT /preferences:", err);
        if (err.name === 'ValidationError') {
            return res.status(400).json({ message: err.message });
        }
        return res.status(500).json({ message: "Internal server error. Could not update preferences." });
    }
});

module.exports = router;