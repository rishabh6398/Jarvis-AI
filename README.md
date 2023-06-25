# Jarvis-AI
This project is a web application that leverages speech recognition, natural language processing, and artificial intelligence to provide an interactive voice-based assistant. The application allows users to speak into their device's microphone, transcribes the speech into text using Google Cloud Speech-to-Text, processes the text using OpenAI GPT-3, generates a response, and converts the response into speech using Google Cloud Text-to-Speech. The generated speech is played back to the user.

## Features
Real-time speech recognition: The application utilizes the browser's speech recognition capabilities to transcribe spoken words into text in real-time.

Natural language processing: The transcribed text is processed using OpenAI GPT-3, an advanced natural language processing model, to generate contextually relevant and meaningful responses.

Interactive voice-based assistant: Users can have dynamic conversations with the assistant by speaking into the microphone and receiving spoken responses.

Audio playback: The generated speech response is converted into audio using Google Cloud Text-to-Speech and played back to the user.

## Technologies Used
Node.js: The server-side JavaScript runtime environment is used to build the application backend.

Express.js: A minimal and flexible web application framework for Node.js, used to handle HTTP requests and serve static files.

Socket.IO: A library that enables real-time bidirectional communication between the web client and the server using WebSockets.

Google Cloud Speech-to-Text: The Google Cloud service for converting spoken language into written text.

Google Cloud Text-to-Speech: The Google Cloud service for converting text into natural-sounding speech.

OpenAI GPT-3: An advanced natural language processing model used for generating contextually relevant responses.

## Deployment
The application is deployed on Glitch and can be deployed further using the Glitch console. 

## Getting Started
To run the application locally, follow these steps:

- Clone the repository.

- Install the required dependencies using npm install.

- Configure your Google Cloud and OpenAI credentials.

- Start the application using npm start.

- Access the application in your browser at http://localhost:3000.
