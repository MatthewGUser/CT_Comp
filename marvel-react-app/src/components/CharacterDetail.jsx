import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
          console.error("Error fetching character details:", error);
        }
      };

      fetchCharacterDetail();
    }
  }, [characterId]);

  if (!character) return <p>Loading...</p>;

  return (
    <div className="character-detail">
      <h2>{character.name}</h2>
      <p>{character.description || "No description available."}</p>
      <h3>Comics:</h3>
      <ul>
        {character.comics.items.slice(0, 5).map((comic, index) => (
          <li key={index}>{comic.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default CharacterDetail;
