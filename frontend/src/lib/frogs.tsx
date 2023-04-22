import { ReactComponent as ImageFrog0 } from '@burns-depression/images/frogs/frog0.svg';
import { ReactComponent as ImageFrog1 } from '@burns-depression/images/frogs/frog1.svg';
import { ReactComponent as ImageFrog2 } from '@burns-depression/images/frogs/frog2.svg';
import { ReactComponent as ImageFrog3 } from '@burns-depression/images/frogs/frog3.svg';
import { ReactComponent as ImageFrog4 } from '@burns-depression/images/frogs/frog4.svg';

interface FrogColorMap {
  [key: string]: string;
}

export const FROG_COLORS = {
  0: '#78F1BE',
  1: '#75C9FF',
  2: '#FFE482',
  3: '#FCAC4D',
  4: '#FF6E65',
} as FrogColorMap;

interface FrogImageMap {
  [key: string]: JSX.Element;
}

export const FROG_IMAGES = {
  0: <ImageFrog0 />,
  1: <ImageFrog1 />,
  2: <ImageFrog2 />,
  3: <ImageFrog3 />,
  4: <ImageFrog4 />,
} as FrogImageMap;
