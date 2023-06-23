// import { config } from "dotenv"
// config()

// import { Configuration, OpenAIApi } from "openai"
// import readline from "readline"

// const openAi = new OpenAIApi(
//   new Configuration({
//     apiKey: process.env.OPEN_AI_API_KEY,
//   })
// )

// const userInterface = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// })

// userInterface.prompt()
// userInterface.on("line", async input => {
//   const response = await openAi.createChatCompletion({
//     model: "gpt-3.5-turbo",
//     messages: [{ role: "user", content: input }],
//   })
//   console.log(response.data.choices[0].message.content)
//   userInterface.prompt()
// })

import express from 'express';
import { config } from 'dotenv';
import { Configuration, OpenAIApi } from 'openai';
import cors from 'cors';

config();

const app = express();
app.use(cors());

const openAi = new OpenAIApi(
  new Configuration({
    apiKey: process.env.OPEN_AI_API_KEY,
  })
);

app.get('/api/chat', async (req, res) => {
  const { input } = req.query;

  try {
    const response = await openAi.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: input }],
    });

    const message = response.data.choices[0].message.content;
    res.send(message);
  } catch (error) {
    console.error(error);
    res.status(500).send('Something went wrong');
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
