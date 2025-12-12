import { IconButtonWrapper } from './IconButton.Styles';

interface IconButtonProps {
  onClick: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  icon: React.ReactNode;
  ariaLabel?: string;
  disabled?: boolean;
}

const IconButton: React.FC<IconButtonProps> = ({
  onClick,
  icon,
  ariaLabel,
  disabled = false,
}) => {
  return (
    <IconButtonWrapper
      onClick={onClick}
      aria-label={ariaLabel ?? 'icon button'}
      disabled={disabled}
    >
      {icon}
    </IconButtonWrapper>
  );
};

export { IconButton };
