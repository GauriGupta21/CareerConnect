import express from "express";
import { Configuration, OpenAIApi } from "openai";

const router = express.Router();

// Initialize OpenAI API with your API key
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Endpoint to analyze resume
router.post("/analyze", async (req, res) => {
    const { resumeText } = req.body; // Get resume text from request body

    if (!resumeText) {
        return res.status(400).json({ error: "Resume text is required." });
    }

    try {
        // Call OpenAI API for analysis
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `Analyze this resume and provide feedback on formatting, skill matching, and keyword recommendations:\n\n${resumeText}`,
            max_tokens: 200,
        });

        // Return the AI's feedback
        return res.status(200).json({ analysis: response.data.choices[0].text.trim() });
    } catch (error) {
        console.error("Error analyzing resume:", error);
        return res.status(500).json({ error: "An error occurred while analyzing the resume." });
    }
});

export default router;
