import { useState, useEffect, useRef } from 'react';
import { Send, X, Mic } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function InterviewPage() {
  // Initialize messages with the first default question
  const [messages, setMessages] = useState([{ text: "Hello! I'm your interviewer. Let's get started. Give me your introduction.", sender: "ai" }]);
  const [inputMessage, setInputMessage] = useState('');
  const [isEndDialogOpen, setIsEndDialogOpen] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [similarity, setSimilarity] = useState(0);
  const [count, setCount] = useState(0);
  const [micAccessError, setMicAccessError] = useState('');
  const chunksRef = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(navigator.mediaDevices);
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        const options = { mimeType: 'audio/webm' };
        if (!MediaRecorder.isTypeSupported(options.mimeType)) {
          delete options.mimeType;
        }
        const recorder = new MediaRecorder(stream, options);

        recorder.ondataavailable = (e) => {
          if (e.data.size > 0) chunksRef.current.push(e.data);
        };

        recorder.onstop = () => {
          const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
          setAudioBlob(blob);
          chunksRef.current = [];
        };

        setMediaRecorder(recorder);
      })
      .catch(() => {
        setMicAccessError('Microphone access is required for voice recording.');
      });

    return () => {
      if (mediaRecorder) {
        mediaRecorder.stream?.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === ' ' && !isRecording && !audioBlob) {
        e.preventDefault();
        startRecording();
      }
    };

    const handleKeyUp = (e) => {
      if (e.key === ' ' && isRecording) {
        e.preventDefault();
        stopRecording();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [isRecording, mediaRecorder, audioBlob]);

  const startRecording = () => {
    if (mediaRecorder) {
      chunksRef.current = [];
      mediaRecorder.start();
      setIsRecording(true);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder?.state === 'recording') {
      mediaRecorder.stop();
      setIsRecording(false);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (audioBlob) {
      const audioUrl = URL.createObjectURL(audioBlob);
      setMessages(prev => [...prev, {
        sender: 'user',
        isAudio: true,
        audioUrl,
        text: 'Audio message'
      }]);

      const formData = new FormData();
      formData.append('audio', audioBlob, 'recording.webm');
      formData.append('sessionId', new URLSearchParams(window.location.search).get('sessionId'));

      try {
        await fetch('http://localhost:5000/api/v1/interview/voice-upload', {
          method: 'POST',
          body: formData,
        })
          .then(response => response.json())
          .then(data => {
            setMessages(prev => [...prev,
            { text: data.apiResponse.chatText, sender: 'ai' }
            ]);
            setCount(prev => prev + 1); // Increment count
            setSimilarity(prev => {
              const newCount = count + 1; // Use the updated count value
              if (newCount === 0) return 0; // Avoid division by zero
              const newSimilarity = (prev + Number(data.similarity)) / newCount;
              return newSimilarity;
            });
            setInputMessage('');
          });
      } catch (error) {
        console.error('Error sending audio:', error);
      }

      setAudioBlob(null);
    } else if (inputMessage.trim()) {
      setMessages(prev => [...prev, { text: inputMessage, sender: 'user' }]);
      setInputMessage('');
    }
  };

  const handleEndInterview = () => setIsEndDialogOpen(true);
  const confirmEndInterview = () => {
    navigate('/interview-result', { state: { similarity } });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-between py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-2xl">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-foreground">
          Interview Chat
        </h2>
        <p className="mt-2 text-center text-sm text-muted-foreground">
          Hold space to record, release to stop
        </p>
      </div>

      <div className="flex-grow mt-8 sm:mx-auto sm:w-full sm:max-w-2xl">
        <div className="bg-card-dark p-4 rounded-lg shadow-lg sm:px-6 flex flex-col justify-end h-full border border-muted">
          <div className="overflow-y-auto flex-grow">
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} mb-4`}>
                <div className={`inline-block px-4 py-2 rounded-lg shadow ${message.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted text-card-foreground'
                  }`}>
                  {message.isAudio ? (
                    <audio controls src={message.audioUrl} className="w-48" />
                  ) : (
                    message.text
                  )}
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSendMessage} className="mt-4">
            {micAccessError && (
              <div className="text-red-500 text-sm mb-2">{micAccessError}</div>
            )}

            {isRecording && (
              <div className="flex items-center text-red-500 text-sm mb-2">
                <Mic className="h-4 w-4 mr-2" /> Recording...
              </div>
            )}

            {audioBlob && (
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Audio ready to send</span>
                <button
                  type="button"
                  onClick={() => setAudioBlob(null)}
                  className="text-sm text-red-500 hover:text-red-700"
                >
                  Clear
                </button>
              </div>
            )}

            <div className="flex items-center space-x-3">
              <input
                type="text"
                className="w-full px-4 py-2 border border-muted rounded-md shadow-sm placeholder-muted-foreground focus:outline-none focus:ring-primary focus:border-primary sm:text-sm bg-input-background"
                placeholder={audioBlob ? 'Audio ready to send' : 'Type or hold Space to record'}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                disabled={!!audioBlob}
              />
              <button
                type="submit"
                className="p-2 bg-primary text-primary-foreground rounded-md shadow hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
                disabled={!inputMessage.trim() && !audioBlob}
              >
                <Send className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-2xl mt-4 flex justify-center">
        <button
          onClick={handleEndInterview}
          className="w-40 flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          <X className="h-5 w-5 mr-2" />
          End Interview
        </button>
      </div>

      {isEndDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-xl">
            <h3 className="text-lg font-medium mb-4">End Interview</h3>
            <p className="mb-6">Are you sure you want to end this interview? This action cannot be undone.</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsEndDialogOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancel
              </button>
              <button
                onClick={confirmEndInterview}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                End Interview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}