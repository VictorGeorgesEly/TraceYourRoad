import React from 'react';
import { renderHook, waitFor } from '@testing-library/react-native';
import { usePoints } from '@/hooks/usePoints';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('usePoints hook', () => {
  it('should fetch points for a roadtrip', async () => {
    const { result } = renderHook(() => usePoints('rt1'), { wrapper });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    
    expect(result.current.data).toBeDefined();
    expect(Array.isArray(result.current.data)).toBe(true);
    if (result.current.data) {
        expect(result.current.data.length).toBeGreaterThan(0);
        expect(result.current.data[0].roadtripId).toBe('rt1');
    }
  });
});
