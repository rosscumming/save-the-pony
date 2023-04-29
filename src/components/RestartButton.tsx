type RestartButtonProps = {
  onRestart: () => void;
};

const RestartButton = ({ onRestart }: RestartButtonProps) => {
  return <button onClick={onRestart}>Restart</button>;
};

export default RestartButton;
