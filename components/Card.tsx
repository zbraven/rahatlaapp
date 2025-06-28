import React from 'react';
import { View, ViewProps, StyleSheet, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { Spacing } from '@/constants/Spacing';

interface CardProps extends ViewProps {
  variant?: 'default' | 'elevated' | 'outlined';
  padding?: 'none' | 'small' | 'medium' | 'large';
  pressable?: boolean;
  onPress?: TouchableOpacityProps['onPress'];
}

export function Card({
  style,
  variant = 'default',
  padding = 'medium',
  pressable = false,
  onPress,
  children,
  ...props
}: CardProps) {
  const { colors } = useTheme();

  const getCardStyle = () => {
    const baseStyle = {
      backgroundColor: colors.card,
      borderRadius: 20,
    };

    const paddingStyles = {
      none: {},
      small: { padding: Spacing.md },
      medium: { padding: Spacing.lg },
      large: { padding: Spacing.xl },
    };

    const variantStyles = {
      default: {
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 2,
      },
      elevated: {
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.15,
        shadowRadius: 16,
        elevation: 8,
      },
      outlined: {
        borderWidth: 1,
        borderColor: colors.border,
        shadowOpacity: 0,
        elevation: 0,
      },
    };

    return {
      ...baseStyle,
      ...paddingStyles[padding],
      ...variantStyles[variant],
    };
  };

  if (pressable && onPress) {
    return (
      <TouchableOpacity
        style={[getCardStyle(), style]}
        onPress={onPress}
        activeOpacity={0.95}
        {...props}
      >
        {children}
      </TouchableOpacity>
    );
  }

  return (
    <View
      style={[getCardStyle(), style]}
      {...props}
    >
      {children}
    </View>
  );
}