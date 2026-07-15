import axios from "axios";

export const askAi = async (messages) => { // 1. Fixed parameter name to 'messages'
    try {
        if (!messages || !Array.isArray(messages) || messages.length === 0) {
            throw new Error("Messages array is empty.");
        }

        const response = await axios.post(
            "https://openrouter.ai/api/v1/chat/completions",
            {
                model: "openai/gpt-4o-mini",
                messages: messages // 2. Fixed body payload key from 'message' to 'messages'
            },
            {
                headers: {
                    "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
                    "Content-Type": "application/json",
                    // 3. Added compulsory OpenRouter headers
                    "HTTP-Referer": "https://three-interview-client.onrender.com", 
                    "X-Title": "AI Interview Platform"       
                }
            }
        );

        const content = response?.data?.choices?.[0]?.message?.content;
        if (!content || !content.trim()) {
            throw new Error("AI returned empty response");
        }
        
        return content;
    } catch (error) {
        // This log will print the exact reason from OpenRouter in your terminal (e.g. out of credits, wrong key, etc.)
        console.error("OpenRouter Error Details:", error.response?.data || error.message);
        throw new Error("OpenRouter API Error");
    }
};
