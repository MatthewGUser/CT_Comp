import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CharacterList = ({ onCharacterClick }) => {
  const [characters, setCharacters] = useState([]);
  
  useEffect(() => {
    const fetchCharacters = async () => {
      const publicKey = process.env.REACT_APP_MARVEL_PUBLIC_KEY;
      const hash = process.env.REACT_APP_MARVEL_HASH;
      const url = `https://gateway.marvel.com/v1/public/characters?ts=1&apikey=${publicKey}&hash=${hash}`;
      
      try {
        const response = await axios.get(url);
        setCharacters(response.data.data.results);
      } catch (error) {
        console.error("Error fetching characters:", error);
      }
    };

    fetchCharacters();
  }, []);

  return (
    <div className="character-list">
      {characters.map((character) => (
        <div key={character.id} className="character-card" onClick={() => onCharacterClick(character.id)}>
          <img src={`${character.thumbnail.path}/portrait_xlarge.jpg`} alt={character.name} />
          <h3>{character.name}</h3>
        </div>
      ))}
    </div>
  );
};

export default CharacterList;
