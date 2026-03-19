import express from 'express'
import cors from 'cors'
import path from 'path'
import OpenAI from 'openai'

const app = express();
app.use(cors());
app.use(express.json());

app.use(express.static(path.join(import.meta.dirname, 'dist')));

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    baseUrl: process.env.OPENAI_URL,
})

const systemPrompt = `You are a language translation expert and can translate any
text from English to French, Spanish, or Japanese. Take any English word, statement or phrase 
and translate it to the requested language.

Your response must not include any introduction, conculsion, or any other text than the translation
text.
`

app.post("/api/translate", async (req, res) => {

    try {
        const language = req.body.language
        const userPrompt = req.body.translateTxt

        const response = await openai.responses.create({
            model: process.env.OPENAI_MODEL,
            input: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: `Translate the following from English to ${language}: ${userPrompt}` }
            ]
        })

        const translation = response.output_text

        res.status(200).send(JSON.stringify({ request: translation }))

    } catch (err) {
        console.log("Something went wrong: ", err)
    }
})

if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(path.join(import.meta.dirname, 'dist', 'index.html'));
  });
}

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
