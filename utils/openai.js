import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const openaiDall = new OpenAI({
  apiKey: process.env.DALL_E_API_KEY,
});

export async function generateChallengeFields({
  category,
  subcategory,
  location,
}) {
  const prompt = `
Using the following data:

- Category: {category}
- Subcategory: {subcategory}
- Location: {location}

Generate a challenge as a JSON object containing:

- title (must be between 10 and 26 characters long, but not exceed 26 characters)
- shortDescription (a brief summary of the challenge)
- description (a detailed explanation of the challenge, considering location, activity type, terrain, accessibility, equipment, physical requirements, etc.)
- frequence (daily, weekly, monthly, yearly — based on challenge nature)
- standardLevel (Easy, Medium, Difficult — based on category, subcategory, and location)
- credits (001 to 1000 points — based on difficulty and complexity)
- duration (How long the challenge can last)
- imageUrl (a URL string pointing to an illustrative image for this challenge )

Return only the JSON object.
  `;

  const filledPrompt = prompt
    .replace("{category}", category)
    .replace("{subcategory}", subcategory)
    .replace("{location}", location);

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: filledPrompt }],
    temperature: 0.7,
  });

  try {
    const content = response.choices[0].message.content;
    const challengeData = JSON.parse(content);

    const imagePrompt = `${category} ${subcategory} challenge set in ${location}, comic style, cel-shaded and without any letters`;
    const imageResponse = await openaiDall.images.generate({
      prompt: imagePrompt,
      n: 1,
      size: "512x512",
    });

    const imageUrl = imageResponse.data[0].url;
    challengeData.imageUrl = imageUrl;

    return challengeData;
  } catch (err) {
    console.error("Error generating challenge or image:", err);
    throw err;
  }
}
