import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { Typography } from '@/constants/Typography';

interface ThemedTextProps extends TextProps {
  variant?: 'heading1' | 'heading2' | 'heading3' | 'heading4' | 'body' | 'bodyLarge' | 'caption' | 'button';
  color?: 'primary' | 'secondary' | 'accent' | 'text' | 'textSecondary' | 'textMuted' | 'success' | 'warning' | 'error';
  weight?: 'regular' | 'medium' | 'semiBold' | 'bold';
}

export function ThemedText({
  style,
  variant = 'body',
  color = 'text',
  weight,
  ...props
}: ThemedTextProps) {
  const { colors } = useTheme();

  const getTextStyle = () => {
    const baseStyle = {
      color: colors[color] || colors.text,
    };

    let fontFamily = Typography.fontFamily.regular;
    if (weight) {
      fontFamily = Typography.fontFamily[weight];
    }

    switch (variant) {
      case 'heading1':
        return {
          ...baseStyle,
          fontSize: Typography.fontSize['4xl'],
          lineHeight: Typography.fontSize['4xl'] * Typography.lineHeight.tight,
          fontFamily: weight ? Typography.fontFamily[weight] : Typography.fontFamily.bold,
          letterSpacing: Typography.letterSpacing.tight,
        };
      case 'heading2':
        return {
          ...baseStyle,
          fontSize: Typography.fontSize['3xl'],
          lineHeight: Typography.fontSize['3xl'] * Typography.lineHeight.tight,
          fontFamily: weight ? Typography.fontFamily[weight] : Typography.fontFamily.semiBold,
          letterSpacing: Typography.letterSpacing.tight,
        };
      case 'heading3':
        return {
          ...baseStyle,
          fontSize: Typography.fontSize['2xl'],
          lineHeight: Typography.fontSize['2xl'] * Typography.lineHeight.normal,
          fontFamily: weight ? Typography.fontFamily[weight] : Typography.fontFamily.semiBold,
        };
      case 'heading4':
        return {
          ...baseStyle,
          fontSize: Typography.fontSize.xl,
          lineHeight: Typography.fontSize.xl * Typography.lineHeight.normal,
          fontFamily: weight ? Typography.fontFamily[weight] : Typography.fontFamily.medium,
        };
      case 'bodyLarge':
        return {
          ...baseStyle,
          fontSize: Typography.fontSize.lg,
          lineHeight: Typography.fontSize.lg * Typography.lineHeight.normal,
          fontFamily,
        };
      case 'body':
        return {
          ...baseStyle,
          fontSize: Typography.fontSize.base,
          lineHeight: Typography.fontSize.base * Typography.lineHeight.normal,
          fontFamily,
        };
      case 'caption':
        return {
          ...baseStyle,
          fontSize: Typography.fontSize.sm,
          lineHeight: Typography.fontSize.sm * Typography.lineHeight.normal,
          fontFamily,
        };
      case 'button':
        return {
          ...baseStyle,
          fontSize: Typography.fontSize.base,
          lineHeight: Typography.fontSize.base * Typography.lineHeight.tight,
          fontFamily: weight ? Typography.fontFamily[weight] : Typography.fontFamily.medium,
          letterSpacing: Typography.letterSpacing.wide,
        };
      default:
        return {
          ...baseStyle,
          fontFamily,
        };
    }
  };

  return (
    <Text
      style={[getTextStyle(), style]}
      {...props}
    />
  );
}