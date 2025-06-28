import { useColorScheme } from 'react-native';
import { Colors, ColorScheme } from '@/constants/Colors';

export function useTheme() {
  const systemColorScheme = useColorScheme();
  const colorScheme: ColorScheme = systemColorScheme || 'light';
  
  return {
    colors: Colors[colorScheme],
    colorScheme,
    isDark: colorScheme === 'dark',
  };
}