// Settings.tsx
import { useState } from 'react';
import styled from 'styled-components';
import SettingsModal from '../../modals/SettingsModal';
import SettingsOptions from '../SettingsOptions';
import type { SettingsProps } from '../../../utils/types/settings.type';

const Settings = ({ onUpdateSettings }: SettingsProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggleSettingsWindow: () => void = () => setIsOpen((prev) => !prev);

  return (
    <>
      <StyledButton role="button" onClick={toggleSettingsWindow} data-testid="settings-button">
        Settings ⚙️
      </StyledButton>
      {isOpen && (
        <SettingsModal data-testid="settings-modal">
          <StyledOverlay onClick={toggleSettingsWindow} data-testid="settings-overlay" />
          <StyledSettingsWindowContent>
            <SettingsOptions onUpdateSettings={onUpdateSettings} />
          </StyledSettingsWindowContent>
        </SettingsModal>
      )}
    </>
  );
};

export default Settings;

const StyledOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

const StyledSettingsWindowContent = styled.div`
  position: fixed;
  background: white;
  border: 1px solid;
  border-radius: 0.5rem;
  padding: 10px 10px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1001;
`;

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
