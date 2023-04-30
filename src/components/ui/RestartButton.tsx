type RestartButtonProps = {
  onRestart: () => void;
};

const RestartButton = ({ onRestart }: RestartButtonProps): JSX.Element => {
  return <StyledButton onClick={onRestart}>Restart ↻</StyledButton>;
};

export default RestartButton;

import styled from 'styled-components';

const StyledButton = styled.button`
  background-color: #1e90ff;
  border: none;
  border-radius: 5px;
  color: white;
  font-size: 1rem;
  font-weight: bold;
  padding: 10px 20px;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  }
`;
