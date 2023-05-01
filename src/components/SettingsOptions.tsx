import { useState } from 'react';
import styled from 'styled-components';
import type { SettingsProps } from '../../utils/types/settings.type';

const SettingsOptions = ({ onUpdateSettings }: SettingsProps) => {
  const [mazeWidth, setMazeWidth] = useState(15);
  const [mazeHeight, setMazeHeight] = useState(15);
  const [playerName, setPlayerName] = useState('Applejack');
  const [difficulty, setDifficulty] = useState(0);

  const ponyNames = ['Twilight Sparkle', 'Applejack', 'Rainbow Dash', 'Rarity', 'Fluttershy', 'Pinkie Pie'];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newSettings = {
      'maze-width': mazeWidth,
      'maze-height': mazeHeight,
      'maze-player-name': playerName,
      difficulty,
    };
    onUpdateSettings(newSettings);
  };

  return (
    <FormWrapper onSubmit={handleSubmit}>
      <FormGroup>
        <Label htmlFor="mazeWidth">Maze Width:</Label>
        <Input type="number" id="mazeWidth" value={mazeWidth} min={15} max={25} onChange={(e) => setMazeWidth(Number(e.target.value))} />
      </FormGroup>

      <FormGroup>
        <Label htmlFor="mazeHeight">Maze Height:</Label>
        <Input type="number" id="mazeHeight" value={mazeHeight} min={15} max={25} onChange={(e) => setMazeHeight(Number(e.target.value))} />
      </FormGroup>

      <FormGroup>
        <Label htmlFor="playerName">Player Name:</Label>
        <Select id="playerName" value={playerName} onChange={(e) => setPlayerName(e.target.value)}>
          {ponyNames.map((character) => (
            <option key={character} value={character}>
              {character}
            </option>
          ))}
        </Select>
      </FormGroup>

      <FormGroup>
        <Label htmlFor="difficulty">Difficulty:</Label>
        <Input
          type="number"
          id="difficulty"
          value={difficulty}
          min={0}
          max={10}
          step={1}
          onChange={(e) => setDifficulty(Number(e.target.value))}
        />
      </FormGroup>

      <Button type="submit">Save settings</Button>
    </FormWrapper>
  );
};

export default SettingsOptions;

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const Label = styled.label`
  font-weight: 500;
  font-size: 1.4rem;
`;

const Input = styled.input`
  padding: 0.5rem;
  border-radius: 0.25rem;
  border: 1px solid #ccc;
`;

const Select = styled.select`
  padding: 0.5rem;
  border-radius: 0.25rem;
  border: 1px solid #ccc;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  background-color: #3498db;
  color: #fff;
  font-weight: 500;
  border-radius: 0.25rem;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #2980b9;
  }
`;
