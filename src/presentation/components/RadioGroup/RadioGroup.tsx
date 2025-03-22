import * as S from "./RadioGroup.Styles";

interface RadioOption<T> {
  label: string;
  value: T;
}

interface RadioGroupProps<T> {
  name: string;
  options: RadioOption<T>[];
  selectedValue: string;
  onChange: (value: T) => void;
  color?: string;
  backgroundColor?: string;
  borderColor?: string;
}

const RadioGroup = <T extends string | number>({
  name,
  options,
  selectedValue,
  onChange,
  color,
  backgroundColor,
  borderColor,
}: RadioGroupProps<T>) => {
  return (
    <S.RadioGroupWrapper>
      {options.map((option) => (
        <S.RadioWrapper>
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={selectedValue === option.value}
            onChange={() => onChange(option.value)}
          />
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="14"
              height="14"
            >
              <circle cx="12" cy="12" r="5" />
            </svg>
          </span>
          <S.RadioWrapper
            key={option.value}
            $color={color}
            $backgroundColor={backgroundColor}
            $borderColor={borderColor}
          >
            {option.label}
          </S.RadioWrapper>
        </S.RadioWrapper>
      ))}
    </S.RadioGroupWrapper>
  );
};

export { RadioGroup };
