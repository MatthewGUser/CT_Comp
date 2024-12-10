import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

// CharacterList Component
const CharacterList = ({ onCharacterClick }) => {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    const fetchCharacters = async () => {
      const publicKey = process.env.REACT_APP_MARVEL_PUBLIC_KEY;  // Use environment variables for security
      const hash = process.env.REACT_APP_MARVEL_HASH;
      const url = `https://gateway.marvel.com/v1/public/characters?ts=1&apikey=${publicKey}&hash=${hash}`;

      try {
        const response = await axios.get(url);
        setCharacters(response.data.data.results);
      } catch (error) {
        console.error('Error fetching characters:', error);
      }
    };

    fetchCharacters();
  }, []);

  return (
    <div className="character-list">
      {characters.map((character) => (
        <div
          key={character.id}
          className="character-card"
          onClick={() => onCharacterClick(character.id)}
        >
          <img
            src={`${character.thumbnail.path}/portrait_xlarge.jpg`}
            alt={character.name}
          />
          <h3>{character.name}</h3>
        </div>
      ))}
    </div>
  );
};

// CharacterDetail Component
const CharacterDetail = ({ characterId }) => {
  const [character, setCharacter] = useState(null);

  useEffect(() => {
    if (characterId) {
      const fetchCharacterDetail = async () => {
        const publicKey = process.env.REACT_APP_MARVEL_PUBLIC_KEY;
        const hash = process.env.REACT_APP_MARVEL_HASH;
        const url = `https://gateway.marvel.com/v1/public/characters/${characterId}?ts=1&apikey=${publicKey}&hash=${hash}`;

        try {
          const response = await axios.get(url);
          setCharacter(response.data.data.results[0]);
        } catch (error) {
          console.error('Error fetching character details:', error);
        }
      };

      fetchCharacterDetail();
    }
  }, [characterId]);

  if (!character) return <p>Loading...</p>;

  return (
    <div className="character-detail">
      <h2>{character.name}</h2>
      <p>{character.description || 'No description available.'}</p>
      <h3>Comics:</h3>
      <ul>
        {character.comics.items.slice(0, 5).map((comic, index) => (
          <li key={index}>{comic.name}</li>
        ))}
      </ul>
    </div>
  );
};

// Main App Component
const App = () => {
  const [selectedCharacterId, setSelectedCharacterId] = useState(null);

  const handleCharacterClick = (id) => {
    setSelectedCharacterId(id);
  };

  return (
    <div className="App">
      <h1>Marvel Characters</h1>
      <div className="content">
        <CharacterList onCharacterClick={handleCharacterClick} />
        {selectedCharacterId && <CharacterDetail characterId={selectedCharacterId} />}
      </div>
    </div>
  );
};

export default App;
