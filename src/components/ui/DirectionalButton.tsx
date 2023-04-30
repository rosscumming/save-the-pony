import styled from 'styled-components';

const DirectionalButton = ({
  active,
  onMouseDown,
  onMouseUp,
  children,
}: {
  active: boolean;
  onMouseDown: () => void;
  onMouseUp: () => void;
  children: React.ReactNode;
}): JSX.Element => (
  <Button active={active} onMouseDown={onMouseDown} onMouseUp={onMouseUp}>
    {children}
  </Button>
);

export default DirectionalButton;

const Button = styled.button<{ active: boolean }>`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: ${({ active }) => (active ? '#2980b9' : '#1e90ff;')};
  color: ${({ active }) => (active ? 'white' : 'black')};
  color: #fff;
  font-weight: 600;
  font-size: 1rem;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  transform: ${({ active }) => (active ? 'scale(0.95)' : 'none')};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px;
  margin-top: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);

  &:hover {
    background-color: #2980b9;
  }

  &:active {
    ${({ active }) => active && 'background-color: #1e90ff; transform: scale(0.95);'}
  }
`;
