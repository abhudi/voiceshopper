import React, { useState, useEffect } from 'react';

function App() {
  const [transcript, setTranscript] = useState('');
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Your browser does not support speech recognition. Please use Chrome.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onresult = (event) => {
      const lastTranscript = event.results[event.results.length - 1][0].transcript.trim();
      setTranscript(lastTranscript);
    };

    recognition.start();

    return () => {
      recognition.stop();
    };
  }, []);

  useEffect(() => {
    if (transcript) {
      fetch(`http://localhost:5000/products?query=${transcript}`)
        .then(response => response.json())
        .then(data => setProducts(data))
        .catch(error => console.error('Error fetching products:', error));
    }
  }, [transcript]);

  return (
    <div>
      <h1>Voice Activated E-commerce</h1>
      <p>Transcript: {transcript}</p>
      <div>
        {products.length > 0 ? (
          products.map(product => (
            <div key={product.id}>
              <h2>{product.name}</h2>
              <p>{product.description}</p>
            </div>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
}

export default App;
