const PreferenceModel = require("../models/Preference");

const getPreferenceForUser = async (userId) => {
  const userPreference = await preferenceModel.findOne({ userId: userId });
  if (!userPreference) {
    return { preferences: [] };
  }

  return userPreference;
};

const updateOrCreatePreferences = async (userId, payload) => {
  const query = { userId: userId };
  const update = { preferences: payload.preferences };

  const options = {
    upsert: true,
    new: true,
    setDefaultsOnInsert: true,
  };

  try {
    const updatedPreference = await PreferenceModel.findOneAndUpdate(
      query,
      update,
      options
    );
    return updatedPreference;
  } catch (error) {
    console.error("Error in updateOrCreatePreferences:", error);
    throw error;
  }
};

module.exports = {
  getPreferenceForUser,
  updateOrCreatePreferences,
};
