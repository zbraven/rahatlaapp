import React from 'react';
import { View, ViewProps, StyleSheet } from 'react-native';
import { useTheme } from '@/hooks/useTheme';

interface ThemedViewProps extends ViewProps {
  variant?: 'default' | 'surface' | 'card' | 'transparent';
}

export function ThemedView({
  style,
  variant = 'default',
  ...props
}: ThemedViewProps) {
  const { colors } = useTheme();

  const getBackgroundColor = () => {
    switch (variant) {
      case 'surface':
        return colors.surface;
      case 'card':
        return colors.card;
      case 'transparent':
        return 'transparent';
      default:
        return colors.background;
    }
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: getBackgroundColor() },
        style,
      ]}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});