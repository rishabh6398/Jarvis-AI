const startButton = document.getElementById('start-btn');
const transcriptionDiv = document.getElementById('transcription');
const audioPlayer = document.getElementById('audio-player');

let recognition;

const toggleButton = () => {
  if (recognition && recognition.recognizing) {
    recognition.stop();
    startButton.innerText = 'Start Speech Recognition';
  } else {
    startRecognition();
  }
};

const startRecognition = () => {
  recognition = new webkitSpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = false;
  recognition.lang = 'en-US';

  recognition.onstart = () => {
    console.log('Speech recognition started.');
    startButton.innerText = 'Stop Speech Recognition';
  };

  recognition.onend = () => {
    console.log('Speech recognition ended.');
    startButton.innerText = 'Start Speech Recognition';
  };

  recognition.onresult = (event) => {
    const result = event.results[event.results.length - 1];
    const transcript = result[0].transcript;
    transcriptionDiv.innerText = `Transcription: ${transcript}`;

    // Send the transcript to the server for further processing
    sendTranscriptToServer(transcript);
  };

  recognition.start();
};

const sendTranscriptToServer = (transcript) => {
  // Establish a WebSocket connection to the server
  const socket = io();

  // Emit the transcript to the server
  socket.emit('voice', transcript);

  // Handle the response from the server
  socket.on('audio', (base64Audio) => {
    // Create an audio element and set its source to the Base64-encoded audio data
    audioPlayer.src = 'data:audio/wav;base64,' + base64Audio;

    // Show and play the audio
    audioPlayer.style.display = 'block';
    audioPlayer.play();
  });
};

startButton.addEventListener('click', toggleButton);
