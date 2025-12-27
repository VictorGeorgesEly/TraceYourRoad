import React from 'react';
import { TextInput, StyleSheet, TextInputProps, View, Text } from 'react-native';
import { colors, typography, spacing } from '@/theme';
import { useTheme } from '@/hooks/useTheme';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
}

export const Input = React.forwardRef<TextInput, InputProps>(({ label, error, style, ...props }, ref) => {
  const { mode } = useTheme();
  const themeColors = colors[mode];

  return (
    <View style={styles.container}>
      {label && <Text style={[styles.label, { color: themeColors.text }]}>{label}</Text>}
      <TextInput
        ref={ref}
        style={[
          styles.input,
          {
            color: themeColors.text,
            borderColor: error ? themeColors.error : themeColors.border,
            backgroundColor: themeColors.surface,
          },
          style,
        ]}
        placeholderTextColor={themeColors.textSecondary}
        {...props}
      />
      {error && <Text style={[styles.error, { color: themeColors.error }]}>{error}</Text>}
    </View>
  );
});

Input.displayName = 'Input';

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.m,
    width: '100%',
  },
  label: {
    ...typography.caption,
    marginBottom: spacing.xs,
    fontWeight: '600',
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderRadius: spacing.s,
    paddingHorizontal: spacing.m,
    ...typography.body,
  },
  error: {
    ...typography.caption,
    marginTop: spacing.xs,
  },
});
