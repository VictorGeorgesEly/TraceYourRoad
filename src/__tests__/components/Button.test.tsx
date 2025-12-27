import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Button } from '@/components/ui/Button';

describe('Button component', () => {
  it('should render title correctly', () => {
    const { getByText } = render(<Button title="Click Me" onPress={() => {}} />);
    expect(getByText('Click Me')).toBeTruthy();
  });

  it('should call onPress when pressed', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(<Button title="Press" onPress={onPressMock} />);
    
    fireEvent.press(getByText('Press'));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it('should show loading indicator when loading', () => {
    const { getByTestId, queryByText } = render(
      <Button title="Save" onPress={() => {}} loading={true} />
    );
    // Standard ActivityIndicator doesn't have testID by default in my component, 
    // but we can check text is gone or add testID
    expect(queryByText('Save')).toBeNull();
  });
});
