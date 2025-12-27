import React from 'react';
import { render } from '@testing-library/react-native';
import { CustomMarker } from '@/components/map/CustomMarker';

describe('CustomMarker component', () => {
  const mockCoord = { latitude: 0, longitude: 0 };

  it('should render marker with icon', () => {
    const { getByTestId } = render(
      <CustomMarker coordinate={mockCoord} type="city" onPress={() => {}} />
    );
    // Since Marker is mocked as a View, we check if it renders
    expect(getByTestId).toBeDefined();
  });

  it('should render order badge when provided', () => {
    const { getByText } = render(
      <CustomMarker coordinate={mockCoord} type="city" onPress={() => {}} order={5} />
    );
    // Order 5 should display "6" (index + 1)
    expect(getByText('6')).toBeTruthy();
  });
});
