import express from 'express';
import { config } from 'dotenv';
import { Configuration, OpenAIApi } from 'openai';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const envConfig = {
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  GOOGLE_FONTS_API_KEY: process.env.GOOGLE_FONTS_API_KEY,
}

config();

const app = express();
app.use(cors());

const openAi = new OpenAIApi(
  new Configuration({
    apiKey: envConfig.OPENAI_API_KEY,
  })
);

app.get('/api/suggestions', async (req, res) => {
  const { input } = req.query;

  try {
    const response = await openAi.createChatCompletion({
      model: 'gpt-3.5-turbo-0613',
      messages: [{ role: 'user', content: input}],
    });

    const message = response.data.choices[0].message.content;
    res.send(message);
  } catch (error) {
    console.error(error);
    res.status(500).send('Something went wrong');
  }
});

app.get('/api/fonts', async (req, res) => {
  const { input } = req.query;

  try {
    const fontName = input;
    const response = await axios.get(
      `https://webfonts.googleapis.com/v1/webfonts?family=${fontName}&key=${envConfig.GOOGLE_FONTS_API_KEY}`
    );
    
    res.send(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Something went wrong');
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

// try {
  
//   async function get_10_best_matching_google_fonts_for_prompt(prompt) {
//     return ["Font 1", "Font 2", "Font 3", "Font 4", "Font 5", "Font 6", "Font 7", "Font 8", "Font 9", "Font 10"];
//   }

//   const messages = [{ "role": "user", "content": "give me the 10 best google fonts for the following prompt: Company website that sells high end watches that appeals to a younger audience" }]
//   const functions = [
//     {
//       "name": "get_10_best_matching_google_fonts_for_prompt",
//       function: get_10_best_matching_google_fonts_for_prompt,
//       "description": "based on the user's prompt, give the 10 best google fonts to use for their app or website idea",
//       "parameters": {
//         "type": "object",
//         "properties": {
//           "prompt": {
//             "type": "string",
//             "description": "the prompt that the user entered, e.g Company website that sells high end watches that appeals to a younger audience",
//           }
//         },
//         required: ["prompt"],
//       }
//     }
//   ]
//   const response = await openAi.createChatCompletion({
//     model: 'gpt-3.5-turbo-0613',
//     messages: messages,
//     functions: functions,
//     function_call: "auto"
//   });

//   console.log(response.data.choices[0].message)
//   // const response_message = response.data.choices[0].message.content;
//   // const message = response.data.choices[0].message.content;

//   // res.send(message);
// } catch (error) {
//   console.error(error);
//   // res.status(500).send('Something went wrong');
// }