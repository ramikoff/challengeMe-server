import { generateChallengeFields } from "../utils/openai.js";

export const generateChallenge = async (req, res) => {
  try {
    const { category, subcategory, location } = req.body;

    if (!category || !subcategory || !location) {
      return res.status(400).json({
        error: "Category, subcategory, and location are required.",
      });
    }

    const result = await generateChallengeFields({
      category,
      subcategory,
      location,
    });
    res.status(200).json(result);
  } catch (error) {
    console.error("Generation error:", error);
    res.status(500).json({ error: "Challenge generation failed." });
  }
};
