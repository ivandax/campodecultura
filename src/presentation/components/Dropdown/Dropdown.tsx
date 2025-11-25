import React, { useState, useRef, useEffect } from 'react';
import * as S from './Dropdown.Styles';

interface DropdownOption {
  label: string;
  value: string | number;
}

interface DropdownProps {
  options: DropdownOption[];
  selectedValue: string | number;
  onChange: (value: string | number) => void;
  placeholder?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  selectedValue,
  onChange,
  placeholder = 'Select an option',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => setIsOpen(!isOpen);

  const handleSelect = (value: string | number) => {
    onChange(value);
    setIsOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const selectedOption = options.find((opt) => opt.value === selectedValue);

  return (
    <S.DropdownContainer ref={containerRef}>
      <S.SelectedValue onClick={handleToggle} $isOpen={isOpen}>
        {selectedOption ? selectedOption.label : placeholder}
        <S.ArrowIcon $isOpen={isOpen}>
          <svg
            width="10"
            height="6"
            viewBox="0 0 10 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 1L5 5L9 1"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </S.ArrowIcon>
      </S.SelectedValue>
      {isOpen && (
        <S.OptionsList>
          {options.map((option) => (
            <S.OptionItem
              key={option.value}
              onClick={() => handleSelect(option.value)}
              $isSelected={option.value === selectedValue}
            >
              {option.label}
            </S.OptionItem>
          ))}
        </S.OptionsList>
      )}
    </S.DropdownContainer>
  );
};

export { Dropdown };
