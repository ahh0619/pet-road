import { create } from 'zustand';

const usePlaceStore = create((set) => ({
  selectedPlace: 0,
  setSelectedPlace: (selectedPlace) => set({ selectedPlace }),

  isLiked: false,
  setIsLiked: (likedStatus) => set({ isLiked: likedStatus }),
}));

export default usePlaceStore;
