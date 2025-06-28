import React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { LinearGradient } from 'react-native-linear-gradient';
import { useTheme } from '@/hooks/useTheme';

interface GradientBackgroundProps {
  children: React.ReactNode;
  style?: ViewStyle;
  variant?: 'primary' | 'secondary' | 'accent' | 'sunset' | 'ocean';
}

export function GradientBackground({
  children,
  style,
  variant = 'primary',
}: GradientBackgroundProps) {
  const { colors, isDark } = useTheme();

  const getGradientColors = () => {
    if (isDark) {
      switch (variant) {
        case 'primary':
          return ['#0F172A', '#1E293B', '#334155'];
        case 'secondary':
          return ['#1E1B4B', '#312E81', '#3730A3'];
        case 'accent':
          return ['#064E3B', '#065F46', '#047857'];
        case 'sunset':
          return ['#7C2D12', '#9A3412', '#C2410C'];
        case 'ocean':
          return ['#0C4A6E', '#0369A1', '#0284C7'];
        default:
          return ['#0F172A', '#1E293B'];
      }
    } else {
      switch (variant) {
        case 'primary':
          return ['#E0F2FE', '#BAE6FD', '#7DD3FC'];
        case 'secondary':
          return ['#EDE9FE', '#DDD6FE', '#C4B5FD'];
        case 'accent':
          return ['#DCFCE7', '#BBF7D0', '#86EFAC'];
        case 'sunset':
          return ['#FED7AA', '#FDBA74', '#FB923C'];
        case 'ocean':
          return ['#DBEAFE', '#BFDBFE', '#93C5FD'];
        default:
          return ['#FFFFFF', '#F8FAFC'];
      }
    }
  };

  return (
    <LinearGradient
      colors={getGradientColors()}
      style={[styles.container, style]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      {children}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});