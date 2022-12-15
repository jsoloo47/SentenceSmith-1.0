const express = require('express');
const { Configuration, OpenAIApi } = require('openai');

const rateLimit = require('express-rate-limit');

const router = express.Router();

module.exports = router;

const publicLimit = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // Limit each IP to 5 create account requests per `window` (here, per hour)
  message: 'Make an account to continue',
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

router.post('/', publicLimit, async (req, res) => {
  const { prompt } = req.body;
  console.log(prompt);
  const configuration = new Configuration({
    // Set up API Key in config for actual project
    apiKey: process.env.OPENAI_API_KEY,
  });

  const openai = new OpenAIApi(configuration);
  try {
    const response = await openai.createCompletion({
      model: 'text-davinci-002',
      prompt: `The following is a conversation with an AI assistant on the landing page of SentenceSmith. The assistant is helpful, creative, clever, and very friendly.

      AI: I am an AI created by SentenceSmith. How can I help you today?
      Human: ${prompt}`,
      max_tokens: 200,
    });
    const ssRes = response.data.choices[0].text;
    res
      .status(200)
      .send({ rez: ssRes, message: 'Response succesfully sent back' });
    console.log('Server log:', ssRes);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});
