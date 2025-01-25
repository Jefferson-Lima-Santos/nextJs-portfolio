import type { ColorPreset, Contrast, Direction, PaletteMode } from '@/src/theme';

export type Layout = 'horizontal' | 'vertical';

export type NavColor = 'blend-in' | 'discrete' | 'evident';

export type NavLayout = 'normal' | 'minimalist';

export interface Settings {
  colorPreset?: ColorPreset;
  contrast?: Contrast;
  direction?: Direction;
  layout?: Layout;
  navLayout?: NavLayout;
  navColor?: NavColor;
  paletteMode?: PaletteMode;
  responsiveFontSizes?: boolean;
  stretch?: boolean;
}
