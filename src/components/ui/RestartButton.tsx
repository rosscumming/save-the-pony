import styled from 'styled-components';

type RestartButtonProps = {
  onRestart: () => void;
};

const RestartButton = ({ onRestart }: RestartButtonProps): JSX.Element => {
  return (
    <StyledButton onClick={onRestart} data-testid="restart-button">
      Restart ↻
    </StyledButton>
  );
};

export default RestartButton;

const StyledButton = styled.button`
  background-color: #1e90ff;
  border: none;
  border-radius: 5px;
  color: white;
  font-size: 1rem;
  font-weight: 600;
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
