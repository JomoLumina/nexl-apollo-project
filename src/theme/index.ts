import _ from 'lodash';
import { responsiveFontSizes, createTheme as createMuiTheme} from "@mui/material";
import type { Theme as MuiTheme } from "@mui/material";
import type { Shadows as MuiShadows } from "@mui/material";
import type { 
  TypeBackground as MuiTypeBackground,
  Palette as MuiPalette
} from '@mui/material';
import { Shadows } from './shadows';
import typography from './typography';

interface TypeBackground extends MuiTypeBackground {
  dark?: string;
}

interface Palette extends MuiPalette {
  background: TypeBackground;
}

export interface Theme extends MuiTheme {
  palette: Palette;
}

interface ThemeOptions { 
  typography?: Record<string, any>;
  overrides?: Record<string, any>;
  palette?: Record<string, any>;
  shadows?: MuiShadows;
}

const baseOptions: ThemeOptions = {
  typography,
  overrides: {
    MuiLinearProgress: {
      root: {
        borderRadius: 3,
        overflow: 'hidden'
      }
    }
  }
};

const themeOptions: ThemeOptions = {
  palette: {
    action: {
      active: 'rgba(255, 255, 255, 0.54)',
      hover: 'rgba(255, 255, 255, 0.04)',
      selected: 'rgba(255, 255, 255, 0.08)',
      disabled: 'rgba(255, 255, 255, 0.26)',
      disabledBackground: 'rgba(255, 255, 255, 0.12)',
      focus: 'rgba(255, 255, 255, 0.12)'
    },
    background: {
      default: '#282C34',
      dark: '#1c2025',
      paper: '#282C34',
    },
    primary: {
      main: '#8a85ff'
    },
    secondary: {
      main: '#8a85ff'
    },
    text: {
      primary: '#e6e5e8',
      secondary: '#eeeeee'
    }
  },
  shadows: Shadows
};

export const createTheme = (): Theme => {
  let theme = createMuiTheme(_.merge({}, baseOptions, themeOptions));
  theme = responsiveFontSizes(theme);
  return theme as Theme;
}

export const useTheme = (): Theme => {
  return createTheme();
}
