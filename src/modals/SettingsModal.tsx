import { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

const SettingsModal = ({ children }: { children: React.ReactNode }) => {
  const modalRoot = document.getElementById('modal-root');
  const el = useRef(document.createElement('div'));

  useEffect(() => {
    const currentEl = el.current;

    if (modalRoot) {
      modalRoot.appendChild(currentEl);
    }
    return () => {
      if (modalRoot) {
        modalRoot.removeChild(currentEl);
      }
    };
  }, [modalRoot]);

  return ReactDOM.createPortal(children, el.current);
};

export default SettingsModal;
