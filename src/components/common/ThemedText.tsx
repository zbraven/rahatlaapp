import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { Typography } from '@/constants/typography';

interface ThemedTextProps extends TextProps {
  variant?: 'heading1' | 'heading2' | 'heading3' | 'body' | 'caption' | 'button';
  color?: 'primary' | 'secondary' | 'accent' | 'text' | 'textSecondary';
  weight?: 'regular' | 'medium' | 'semiBold' | 'bold';
}

export const ThemedText: React.FC<ThemedTextProps> = ({
  style,
  variant = 'body',
  color = 'text',
  weight = 'regular',
  ...props
}) => {
  const { colors } = useTheme();

  const getTextStyle = () => {
    const baseStyle = {
      fontFamily: Typography.fontFamily[weight],
      color: colors[color] || colors.text,
    };

    switch (variant) {
      case 'heading1':
        return {
          ...baseStyle,
          fontSize: Typography.fontSize['4xl'],
          lineHeight: Typography.fontSize['4xl'] * Typography.lineHeight.tight,
          fontFamily: Typography.fontFamily.bold,
        };
      case 'heading2':
        return {
          ...baseStyle,
          fontSize: Typography.fontSize['3xl'],
          lineHeight: Typography.fontSize['3xl'] * Typography.lineHeight.tight,
          fontFamily: Typography.fontFamily.semiBold,
        };
      case 'heading3':
        return {
          ...baseStyle,
          fontSize: Typography.fontSize['2xl'],
          lineHeight: Typography.fontSize['2xl'] * Typography.lineHeight.normal,
          fontFamily: Typography.fontFamily.semiBold,
        };
      case 'body':
        return {
          ...baseStyle,
          fontSize: Typography.fontSize.base,
          lineHeight: Typography.fontSize.base * Typography.lineHeight.normal,
        };
      case 'caption':
        return {
          ...baseStyle,
          fontSize: Typography.fontSize.sm,
          lineHeight: Typography.fontSize.sm * Typography.lineHeight.normal,
        };
      case 'button':
        return {
          ...baseStyle,
          fontSize: Typography.fontSize.base,
          lineHeight: Typography.fontSize.base * Typography.lineHeight.tight,
          fontFamily: Typography.fontFamily.medium,
        };
      default:
        return baseStyle;
    }
  };

  return (
    <Text
      style={[getTextStyle(), style]}
      {...props}
    />
  );
};