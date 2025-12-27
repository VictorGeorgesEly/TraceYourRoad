import { useAuthStore } from '@/stores/authStore';
import { authService } from '@/services/api/auth.service';

// Mock authService
jest.mock('@/services/api/auth.service');

describe('authStore', () => {
  beforeEach(() => {
    useAuthStore.setState({ user: null, isAuthenticated: false, isLoading: false });
    jest.clearAllMocks();
  });

  it('should initial state be logged out', () => {
    const state = useAuthStore.getState();
    expect(state.user).toBeNull();
    expect(state.isAuthenticated).toBe(false);
  });

  it('should login successfully', async () => {
    const mockUser = { id: 'user1', name: 'Alizée', email: 'alice@example.com' };
    (authService.login as jest.Mock).mockResolvedValue({ user: mockUser, token: 'token' });

    await useAuthStore.getState().login('alice@example.com');

    const state = useAuthStore.getState();
    expect(state.user).toEqual(mockUser);
    expect(state.isAuthenticated).toBe(true);
  });

  it('should logout correctly', async () => {
    useAuthStore.setState({ user: { id: '1' } as any, isAuthenticated: true });
    
    await useAuthStore.getState().logout();

    const state = useAuthStore.getState();
    expect(state.user).toBeNull();
    expect(state.isAuthenticated).toBe(false);
  });
});
