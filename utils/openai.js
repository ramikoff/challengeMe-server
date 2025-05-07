import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
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

- title (maximum 26 characters)
- shortDescription (a brief summary of the challenge)
- description (a detailed explanation of the challenge, considering location, activity type, terrain, accessibility, equipment, physical requirements, etc.)
- frequence (daily, weekly, monthly, yearly — based on challenge nature)
- standardLevel (Easy, Medium, Difficult — based on category, subcategory, and location)
- credits (001 to 1000 points — based on difficulty and complexity)

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
    return JSON.parse(content);
  } catch (err) {
    console.error("Parsing error:", err);
    throw err;
  }
}
