import { useToastStore } from '@/stores/toastStore';

describe('toastStore', () => {
  beforeEach(() => {
    useToastStore.getState().hideToast();
  });

  it('should show toast with message and type', () => {
    useToastStore.getState().showToast('Hello', 'success');
    
    const state = useToastStore.getState();
    expect(state.message).toBe('Hello');
    expect(state.type).toBe('success');
    expect(state.isVisible).toBe(true);
  });

  it('should hide toast', () => {
    useToastStore.getState().showToast('Hello');
    useToastStore.getState().hideToast();
    
    expect(useToastStore.getState().isVisible).toBe(false);
  });
});
