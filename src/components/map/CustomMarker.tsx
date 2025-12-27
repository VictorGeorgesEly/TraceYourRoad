import React from 'react';
import { Marker } from 'react-native-maps';
import { LatLng, PointType } from '@/types';
import { View, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/theme';

interface CustomMarkerProps {
  coordinate: LatLng;
  type: PointType;
  isSelected?: boolean;
  onPress: () => void;
  title?: string;
  order?: number;
}

const getIconName = (type: PointType): keyof typeof Ionicons.glyphMap => {
  switch (type) {
    case 'city': return 'business';
    case 'monument': return 'flag';
    case 'nature': return 'leaf';
    case 'food': return 'restaurant';
    case 'accommodation': return 'bed';
    default: return 'location';
  }
};

export const CustomMarker = ({ coordinate, type, isSelected, onPress, title, order }: CustomMarkerProps) => {
  return (
    <Marker coordinate={coordinate} onPress={onPress}>
      <View style={[styles.marker, isSelected && styles.selectedMarker]}>
        <Ionicons name={getIconName(type)} size={20} color="white" />
        {order !== undefined && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{order + 1}</Text>
          </View>
        )}
      </View>
    </Marker>
  );
};

const styles = StyleSheet.create({
  marker: {
    backgroundColor: colors.light.primary,
    padding: 8,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  selectedMarker: {
    transform: [{ scale: 1.2 }],
    backgroundColor: colors.light.secondary,
    zIndex: 10,
  },
  badge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: 'white',
    borderRadius: 8,
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.light.primary,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: colors.light.primary,
  },
});
