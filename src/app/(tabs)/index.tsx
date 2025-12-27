import React, { useRef, useEffect, useCallback } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { AppMapView } from '@/components/map/MapView';
import { useMapRoutes } from '@/hooks/useMapRoutes';
import { RoutePolyline } from '@/components/map/RoutePolyline';
import { useMapStore } from '@/stores/mapStore';
import { CustomMarker } from '@/components/map/CustomMarker';
import { usePoints } from '@/hooks/usePoints';
import { Point, LatLng } from '@/types';
import type MapView from 'react-native-maps';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing } from '@/theme';
import { useTheme } from '@/hooks/useTheme';

export default function MapScreen() {
  const { routes } = useMapRoutes();
  const { selectedRoadtripId, selectRoadtrip, selectPoint } = useMapStore();
  const mapRef = useRef<MapView>(null);
  const router = useRouter();
  const { mode } = useTheme();

  const { data: points } = usePoints(selectedRoadtripId || '');
  const hasInitialFit = useRef(false);
  const isInternalPress = useRef(false);

  const handleRoutePress = useCallback((id: string) => {
    isInternalPress.current = true;
    selectRoadtrip(id);
    // Reset flag after a slightly longer delay
    setTimeout(() => { isInternalPress.current = false; }, 300);
  }, [selectRoadtrip]);

  const handlePointPress = useCallback((point: Point) => {
    isInternalPress.current = true;
    selectPoint(point.id);
    router.push(`/point/${point.id}`);
    setTimeout(() => { isInternalPress.current = false; }, 300);
  }, [selectPoint, router]);

  const handleMapPress = useCallback(() => {
    // If the press was on a route or marker, don't deselect
    if (isInternalPress.current) return;
    
    selectRoadtrip(null);
    selectPoint(null);
  }, [selectRoadtrip, selectPoint]);

  const fitToCoordinatesSafe = useCallback((coords: LatLng[], padding = 100) => {
    if (!coords || coords.length === 0) return;
    
    mapRef.current?.fitToCoordinates(coords, {
      edgePadding: { top: padding, right: padding, bottom: padding, left: padding },
      animated: true,
    });
  }, []);

  const fitAllRoutes = useCallback(() => {
    const allCoordinates = routes.flatMap(r => r.coordinates);
    if (allCoordinates.length > 0) {
      // Calculate manual bounding box
      let minLat = allCoordinates[0].latitude;
      let maxLat = allCoordinates[0].latitude;
      let minLng = allCoordinates[0].longitude;
      let maxLng = allCoordinates[0].longitude;

      allCoordinates.forEach(c => {
        minLat = Math.min(minLat, c.latitude);
        maxLat = Math.max(maxLat, c.latitude);
        minLng = Math.min(minLng, c.longitude);
        maxLng = Math.max(maxLng, c.longitude);
      });

      // Calculate center
      const midLat = (minLat + maxLat) / 2;
      const midLng = (minLng + maxLng) / 2;

      // Calculate span with a large coefficient (2.5x) to ensure visibility
      const latDelta = Math.max((maxLat - minLat) * 2.5, 50);
      const lngDelta = Math.max((maxLng - minLng) * 2.5, 50);

      mapRef.current?.animateToRegion({
        latitude: midLat,
        longitude: midLng,
        latitudeDelta: Math.min(latDelta, 150), // Cap to avoid distortion
        longitudeDelta: Math.min(lngDelta, 150),
      }, 1000);
    }
  }, [routes]);

  // Handle auto-fit logic
  useEffect(() => {
    if (!routes || routes.length === 0) return;

    const timer = setTimeout(() => {
      if (selectedRoadtripId) {
        const route = routes.find(r => r.id === selectedRoadtripId);
        if (route) fitToCoordinatesSafe(route.coordinates);
      } else if (!hasInitialFit.current) {
        fitAllRoutes();
        hasInitialFit.current = true;
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [selectedRoadtripId, routes, fitToCoordinatesSafe, fitAllRoutes]);

  return (
    <View style={styles.container}>
      <AppMapView 
        ref={mapRef} 
        isGlobe={!selectedRoadtripId}
        onPress={handleMapPress}
      >
        {routes.map((route) => (
          <RoutePolyline
            key={route.id}
            coordinates={route.coordinates}
            color={route.color}
            isSelected={route.isSelected}
            onPress={() => handleRoutePress(route.id)}
          />
        ))}

        {points?.map((point) => (
          <CustomMarker
            key={point.id}
            coordinate={point.coordinates}
            type={point.type}
            onPress={() => handlePointPress(point)}
            title={point.title}
            order={point.order}
          />
        ))}
      </AppMapView>

      <TouchableOpacity 
        style={[styles.recenterBtn, { backgroundColor: colors[mode].surface }]} 
        onPress={fitAllRoutes}
        activeOpacity={0.8}
      >
        <Ionicons name="expand" size={22} color={colors[mode].primary} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  recenterBtn: {
    position: 'absolute',
    bottom: spacing.xl,
    right: spacing.m,
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
});
