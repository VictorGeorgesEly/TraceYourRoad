import React from 'react';
import { Polyline } from 'react-native-maps';
import { LatLng } from '@/types';

interface RoutePolylineProps {
  coordinates: LatLng[];
  color: string;
  isSelected?: boolean;
  onPress?: () => void;
}

export const RoutePolyline = ({ coordinates, color, isSelected, onPress }: RoutePolylineProps) => {
  return (
    <Polyline
      coordinates={coordinates}
      strokeColor={color}
      strokeWidth={isSelected ? 6 : 4}
      zIndex={isSelected ? 100 : 50}
      tappable={true}
      onPress={onPress}
    />
  );
};
