const {GoogleGenerativeAI} = require('@google/generative-ai')
const dotenv = require('dotenv')
dotenv.config()
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API);
const model = genAI.getGenerativeModel({
     model: "gemini-1.5-flash" ,
    systemInstruction:{
        text:"You are an expert at Indian Law System and will help the user clarify their doubts on Indian laws"
    }});


// Controller function
const getLawResponse = async (req, res) => {
    const { prompt } = req.body;
    try {
        const result = await model.generateContent(prompt);
        console.log("Raw API Response:", result); // Log the raw response
        const responseText = result.response?.text?.(); // Safely access the property
        if (!responseText) throw new Error("Response text is undefined.");
        res.status(200).json({ response: responseText });
    } catch (error) {
        console.error("Error generating content:", error.response ? error.response.data : error.message);
        res.status(500).json({ error: "Failed to generate content.", details: error.message });
    }
};


module.exports = { getLawResponse };