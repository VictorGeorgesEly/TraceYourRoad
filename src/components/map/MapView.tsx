import React from 'react';
import MapView, { UrlTile, MapViewProps, PROVIDER_GOOGLE } from 'react-native-maps';
import { StyleSheet, Platform } from 'react-native';

interface Props extends MapViewProps {
  children?: React.ReactNode;
  isGlobe?: boolean;
}

export const AppMapView = React.forwardRef<MapView, Props>(({ isGlobe, children, ...props }, ref) => {
  // On iOS, mutedStandard gives a nice globe effect. 
  // On Android, we stick to standard but with wider zoom levels.
  const mapType = Platform.OS === 'ios' && isGlobe ? "mutedStandard" : "standard";
  
  return (
    <MapView
      ref={ref}
      style={styles.map}
      provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : undefined}
      mapType={mapType}
      rotateEnabled={true}
      zoomEnabled={true}
      {...props}
    >
      {children}
      {!isGlobe && (
        <UrlTile
          urlTemplate="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maximumZ={19}
          flipY={false}
          tileSize={256}
        />
      )}
    </MapView>
  );
});

AppMapView.displayName = 'AppMapView';

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});