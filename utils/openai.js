import OpenAI from "openai";
import axios from "axios";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const openaiDall = new OpenAI({
  apiKey: process.env.DALL_E_API_KEY,
});

async function uploadToCloudinaryFromUrl(imageUrl) {
  try {
    const response = await axios.get(imageUrl, { responseType: "arraybuffer" });

    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "challenge-me-images",
          resource_type: "image",
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result.secure_url);
        }
      );

      uploadStream.end(response.data);
    });
  } catch (error) {
    console.error("Greška prilikom slanja slike na Cloudinary:", error);
    throw error;
  }
}

export async function generateChallengeFields({
  category,
  subcategory,
  location,
}) {
  const prompt = `
Using the following data:

- Category: ${category}
- Subcategory: ${subcategory}
- Location: ${location}

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

    const imagePrompt = `${category} ${subcategory} challenge in ${location},  cartoon style, cel-shaded, no text, realistic`;
    const imageResponse = await openaiDall.images.generate({
      prompt: imagePrompt,
      n: 1,
      size: "600x300",
    });

    const dallImageUrl = imageResponse.data[0].url;

    const cloudinaryImageUrl = await uploadToCloudinaryFromUrl(dallImageUrl);

    challengeData.imageUrl = cloudinaryImageUrl;

    return challengeData;
  } catch (err) {
    console.error("Error generating challenge or image:", err);
    throw err;
  }
}
