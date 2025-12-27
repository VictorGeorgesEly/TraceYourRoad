import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, ViewStyle, StyleProp } from 'react-native';
import { colors, typography, spacing } from '@/theme';
import { useTheme } from '@/hooks/useTheme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  loading?: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

export const Button = ({ title, onPress, variant = 'primary', loading, disabled, style }: ButtonProps) => {
  const { mode } = useTheme();
  const themeColors = colors[mode];

  const getBackgroundColor = () => {
    if (disabled) return themeColors.border;
    if (variant === 'primary') return themeColors.primary;
    if (variant === 'secondary') return themeColors.secondary;
    return 'transparent';
  };

  const getTextColor = () => {
    if (disabled) return themeColors.textSecondary;
    if (variant === 'outline') return themeColors.primary;
    return '#FFFFFF';
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: getBackgroundColor(),
          borderColor: variant === 'outline' ? themeColors.primary : 'transparent',
          borderWidth: variant === 'outline' ? 1 : 0,
        },
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator color={getTextColor()} />
      ) : (
        <Text style={[styles.text, { color: getTextColor() }]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: spacing.m,
    paddingHorizontal: spacing.l,
    borderRadius: spacing.s,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  text: {
    ...typography.button,
  },
});
