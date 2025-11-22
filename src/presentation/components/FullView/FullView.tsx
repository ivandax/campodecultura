import { Wrapper } from './FullViewStyles';

interface FullViewProps {
  title: string;
}

const FullView = ({ title }: FullViewProps) => {
  return <Wrapper>{title}</Wrapper>;
};

export { FullView };
