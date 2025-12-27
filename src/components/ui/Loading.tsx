import React from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { colors } from '@/theme';
import { useTheme } from '@/hooks/useTheme';

export const Loading = () => {
  const { mode } = useTheme();
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors[mode].primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
