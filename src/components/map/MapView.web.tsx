import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const AppMapView = React.forwardRef((props: any, ref) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Map View (Web Placeholder)</Text>
      <Text style={styles.subtext}>Interactive maps are optimized for mobile.</Text>
      {/* We render children so logic still runs/renders (e.g. if we had web-compatible markers) */}
      {props.children}
    </View>
  );
});

AppMapView.displayName = 'AppMapView';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  subtext: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
  },
});
