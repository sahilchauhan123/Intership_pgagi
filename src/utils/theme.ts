// themeStore.js
import { create } from 'zustand';
import { Appearance } from 'react-native';

const lightColors = {
  primary: '#6200EE',     // MD Purple 500
  secondary: '#03DAC6',   // MD Teal 200
  background: '#FFFFFF',
  surface: '#FFFFFF',
  text: '#000000',
  error: '#B00020',
};

const darkColors = {
  primary: '#BB86FC',     // MD Purple 200
  secondary: '#03DAC6',   // MD Teal 200
  background: '#121212',
  surface: '#121212',
  text: '#FFFFFF',
  error: '#CF6679',
};

const getDeviceColorScheme = () => Appearance.getColorScheme() || 'light';

export const useThemeStore = create((set, get) => ({
  theme: getDeviceColorScheme(),
  toggleTheme: () =>
    set((state) => ({
      theme: state.theme === 'dark' ? 'light' : 'dark',
    })),
  getColors: () =>
    get().theme === 'dark' ? darkColors : lightColors,
}));
