import { IconButtonWrapper } from './IconButton.Styles';

interface IconButtonProps {
  onClick: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  icon: React.ReactNode;
  ariaLabel?: string;
}

const IconButton: React.FC<IconButtonProps> = ({
  onClick,
  icon,
  ariaLabel,
}) => {
  return (
    <IconButtonWrapper
      onClick={onClick}
      style={{ border: 'none', background: 'none', cursor: 'pointer' }}
      aria-label={ariaLabel ?? 'close'}
    >
      {icon}
    </IconButtonWrapper>
  );
};

export { IconButton };
