import reviewCode from "../config/gemini.js";

export const aiController = async (req, res) => {
    try {
        //Gathering Code from req.body
        const { code } = req.body;

        //Checking if code exists
        if(!code) {
            return res.json({ success: false, message: "Missing Code" });
        }
        
        //Generating response
        let response = await reviewCode(code);
        return res.send(response);
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}