interface StarIconProps {
  active: boolean;
}

const StarIcon = ({ active }: StarIconProps) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8.24991 1.23727L10.0592 5.3325L10.1713 5.58634L10.446 5.62545L14.6887 6.2295L11.5594 9.43795L11.3815 9.62038L11.4246 9.87154L12.2012 14.4017L8.50277 12.2337L8.24991 12.0854L7.99705 12.2337L4.2986 14.4017L5.07526 9.87154L5.11832 9.62038L4.94039 9.43795L1.8111 6.2295L6.05377 5.62545L6.3285 5.58634L6.44065 5.3325L8.24991 1.23727Z"
      fill={active ? '#E4D237' : undefined}
      stroke="#E4D237"
    />
  </svg>
);

export { StarIcon };
