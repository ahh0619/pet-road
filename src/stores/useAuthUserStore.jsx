import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthUserStore = create(
  persist(
    (set) => ({
      authUser: null,
      setAuthUser: (authUser) => set({ authUser }),
      clearAuthUser: () => set({ authUser: null }),
    }),
    {
      name: 'auth-storage',
    },
  ),
);

export default useAuthUserStore;
