import React, { useState } from 'react';

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validate JSON input
    try {
      const parsedJson = JSON.parse(jsonInput);

      // Call the backend API
      const res = await fetch('https://your-backend-url.vercel.app/bfhl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(parsedJson),
      });

      const data = await res.json();
      setResponse(data);
    } catch (err) {
      setError('Invalid JSON format');
    }
  };

  const handleOptionChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedOptions([...selectedOptions, value]);
    } else {
      setSelectedOptions(selectedOptions.filter((option) => option !== value));
    }
  };

  return (
    <div className="App">
      <h1>{`your_roll_number`}</h1>
      <form onSubmit={handleSubmit}>
        <label>
          JSON Input:
          <textarea
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            rows="4"
            cols="50"
          />
        </label>
        <button type="submit">Submit</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {response && (
        <div>
          <h3>Response:</h3>
          <div>
            <label>
              <input
                type="checkbox"
                value="alphabets"
                onChange={handleOptionChange}
              />
              Alphabets
            </label>
            <label>
              <input
                type="checkbox"
                value="numbers"
                onChange={handleOptionChange}
              />
              Numbers
            </label>
            <label>
              <input
                type="checkbox"
                value="highest_lowercase_alphabet"
                onChange={handleOptionChange}
              />
              Highest Lowercase Alphabet
            </label>
          </div>

          <div>
            {selectedOptions.includes('alphabets') && (
              <p>Alphabets: {response.alphabets.join(', ')}</p>
            )}
            {selectedOptions.includes('numbers') && (
              <p>Numbers: {response.numbers.join(', ')}</p>
            )}
            {selectedOptions.includes('highest_lowercase_alphabet') && (
              <p>Highest Lowercase Alphabet: {response.highest_lowercase_alphabet.join(', ')}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
