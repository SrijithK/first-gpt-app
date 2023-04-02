import { Configuration, OpenAIApi } from "openai";
import express from 'express';
import bodyParser from "body-parser";
import cors from 'cors';

const configuration = new Configuration({
    organization: "org-0bWQNp7tP4PijqFw1uoJagEn",
    apiKey: "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"
});

const openai = new OpenAIApi(configuration);

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

app.post("/", async (req, res) => {
    const { messages } = req.body;

    const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
            { role: "system", content: "You are talking with Srijith's GPT Chat Assistant!" },
            ...messages
        ]
    });

    res.json({
        completion: completion.data.choices[0].message
    });
});

app.listen(port, () => {
    console.log(`Chatgpt backend app listening at http://localhost:${port}`);
});