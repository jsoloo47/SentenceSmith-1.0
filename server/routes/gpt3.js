const express = require('express');
const { Configuration, OpenAIApi } = require('openai');
const { requireAuth } = require('./middleware');
const { Project } = require('../database/schemas');

const router = express.Router();

module.exports = router;

router.post('/', requireAuth, async (req, res) => {
  const { prompt } = req.body;
  console.log(req.body);
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const openai = new OpenAIApi(configuration);
  try {
    const response = await openai.createCompletion({
      model: 'text-davinci-002',
      prompt: `${prompt}`,
      max_tokens: 200,
    });
    const ssRes = response.data.choices[0].text;
    res
      .status(200)
      .send({ rez: ssRes, message: 'Response succesfully sent back' });
    console.log('Server log:', ssRes);

    const p = await Project.findById(req.body.id);
    p.resList = [ssRes, ...p.resList];
    p.save();
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});
