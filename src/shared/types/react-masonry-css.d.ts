declare module 'react-masonry-css' {
  import { ComponentType, ReactNode } from 'react';

  interface MasonryProps {
    breakpointCols?: number | { [key: number]: number; default?: number };
    className?: string;
    columnClassName?: string;
    children?: ReactNode;
  }

  const Masonry: ComponentType<MasonryProps>;
  export default Masonry;
}
