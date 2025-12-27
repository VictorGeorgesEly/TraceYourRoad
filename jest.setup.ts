// Mock SecureStore
jest.mock('expo-secure-store', () => ({
  setItemAsync: jest.fn(),
  getItemAsync: jest.fn(),
  deleteItemAsync: jest.fn(),
}));

jest.mock('expo-constants', () => ({
  expoConfig: {
    extra: {},
  },
}));

// Mock Expo Localization
jest.mock('expo-localization', () => ({
  getLocales: () => [{ languageCode: 'en' }],
}));

// Mock react-native-reanimated
require('react-native-reanimated/mock');

// Mock react-native-maps
jest.mock('react-native-maps', () => {
  const React = require('react');
  const { View } = require('react-native');
  class MockMapView extends React.Component {
    render() { return React.createElement(View, this.props, this.props.children); }
    fitToCoordinates = jest.fn();
    animateToRegion = jest.fn();
  }
  const MockMarker = (props: any) => React.createElement(View, props, props.children);
  const MockPolyline = (props: any) => React.createElement(View, props, props.children);
  const MockUrlTile = (props: any) => React.createElement(View, props, props.children);
  return {
    __esModule: true,
    default: MockMapView,
    Marker: MockMarker,
    Polyline: MockPolyline,
    UrlTile: MockUrlTile,
    PROVIDER_GOOGLE: 'google',
  };
});

// Mock Ionicons
jest.mock('@expo/vector-icons', () => ({
  Ionicons: 'Ionicons',
}));

// Mock expo-router
jest.mock('expo-router', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
  }),
  useLocalSearchParams: () => ({}),
  Stack: {
    Screen: jest.fn(() => null),
  },
}));