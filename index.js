const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const { SpeechClient } = require('@google-cloud/speech');
const { TextToSpeechClient } = require('@google-cloud/text-to-speech');
const { Configuration, OpenAIApi } = require('openai');

require('dotenv').config();

// Google Cloud Speech-to-Text configuration
const speechClient = new SpeechClient();

// Google Cloud Text-to-Speech configuration
const textToSpeechClient = new TextToSpeechClient();

// OpenAI configuration
const configuration = new Configuration({
    organization: "org-bZ4ydvkd2CNltfXkKsef4JyZ",
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);
// Serve the web application
app.use(express.static('public'));

// WebSocket connection
io.on('connection', (socket) => {
  console.log('A user connected.');

  // Speech-to-Text processing
  const recognizeSpeech = async (audio) => {
    const config = {
      encoding: 'LINEAR16',
      sampleRateHertz: 16000,
      languageCode: 'en-US',
    };

    const request = {
      audio: { content: audio },
      config: config,
    };

    const [response] = await speechClient.recognize(request);
    const transcription = response.results
      .map((result) => result.alternatives[0].transcript)
      .join('');

    console.log('Transcription:', transcription);

    return transcription;
  };

  // Text-to-Speech processing
  const generateSpeech = async (text) => {
    const request = {
      input: { text },
      voice: { languageCode: 'en-US', ssmlGender: 'FEMALE' },
      audioConfig: { audioEncoding: 'LINEAR16' },
    };

    const [response] = await textToSpeechClient.synthesizeSpeech(request);
    const audio = response.audioContent;
    return audio;
  };

  // OpenAI GPT-3 processing
  const generateResponse = async (input) => {
    try {
        const message = [{"role": "system", "content": "You are a helpful assistant."}, {"role": "user", "content": input}]
        const response = await openai.createChatCompletion({
          model: "gpt-3.5-turbo",
          messages: message,
        });
        console.log(response.data.choices[0].message.content)
        return response.data.choices[0].message.content;
      } catch (error) {
        throw new Error('Error generating GPT-3 response');
      }
  };

  // Handle voice input and generate response
  socket.on('voice', async (transcript) => {
    // Process transcript and generate response
    const response = await generateResponse(transcript);

    // Generate speech from the response
    const audioResponse = await generateSpeech(response);

    // Encode the audio data as Base64
    const base64Audio = audioResponse.toString('base64');

    // Send the Base64-encoded audio to the client
    socket.emit('audio', base64Audio);  
});   
  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('A user disconnected.');
  });
});

// Start the server
const port = 3000;
http.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
