import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthUserStore = create(
  persist(
    (set) => ({
      authUser: null,
      setAuthUser: (authUser) => set({ authUser }),
      clearAuthUser: () => set({ authUser: null }),
      updateAuthUser: (updates) =>
        set((state) => {
          console.log('붙는 데이터', updates);
          const updatedUser = { ...state.authUser, ...updates };
          console.log('updateAuthUser data:', updatedUser);
          return { authUser: updatedUser };
        }),
    }),
    {
      name: 'auth-storage',
    },
  ),
);

export default useAuthUserStore;
