import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Input } from '@/components/ui/Input';

describe('Input component', () => {
  it('should render label and placeholder', () => {
    const { getByText, getByPlaceholderText } = render(
      <Input label="Username" placeholder="Enter name" />
    );
    expect(getByText('Username')).toBeTruthy();
    expect(getByPlaceholderText('Enter name')).toBeTruthy();
  });

  it('should render error message when provided', () => {
    const { getByText } = render(<Input error="Required field" />);
    expect(getByText('Required field')).toBeTruthy();
  });

  it('should call onChangeText', () => {
    const onChangeMock = jest.fn();
    const { getByPlaceholderText } = render(
      <Input placeholder="Type" onChangeText={onChangeMock} />
    );
    
    fireEvent.changeText(getByPlaceholderText('Type'), 'Hello');
    expect(onChangeMock).toHaveBeenCalledWith('Hello');
  });
});
