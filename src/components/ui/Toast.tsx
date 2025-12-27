import React from 'react';
import { StyleSheet, Text } from 'react-native';
import Animated, { 
  FadeInUp, 
  FadeOutUp 
} from 'react-native-reanimated';
import { useToastStore } from '@/stores/toastStore';
import { colors, spacing, typography } from '@/theme';
import { useTheme } from '@/hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const Toast = () => {
  const { message, type, isVisible, hideToast } = useToastStore();
  const { mode } = useTheme();
  const insets = useSafeAreaInsets();

  if (!isVisible || !message) return null;

  const getIcon = () => {
    switch (type) {
      case 'success': return 'checkmark-circle';
      case 'error': return 'alert-circle';
      default: return 'information-circle';
    }
  };

  const getBackgroundColor = () => {
    switch (type) {
      case 'success': return colors[mode].success;
      case 'error': return colors[mode].error;
      default: return colors[mode].primary;
    }
  };

  return (
    <Animated.View 
      entering={FadeInUp} 
      exiting={FadeOutUp}
      style={[
        styles.container, 
        { 
          top: insets.top + 10,
          backgroundColor: getBackgroundColor() 
        }
      ]}
    >
      <Ionicons name={getIcon()} size={24} color="white" />
      <Text style={styles.text}>{message}</Text>
      <Animated.View>
        <Ionicons 
          name="close" 
          size={20} 
          color="white" 
          onPress={hideToast}
          style={styles.closeIcon}
        />
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: spacing.m,
    right: spacing.m,
    padding: spacing.m,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 9999,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  text: {
    ...typography.body,
    color: 'white',
    flex: 1,
    marginLeft: spacing.s,
    fontWeight: '600',
  },
  closeIcon: {
    marginLeft: spacing.s,
  }
});
