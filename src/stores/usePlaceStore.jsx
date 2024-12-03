import { create } from 'zustand';

const usePlaceStore = create((set) => ({
  selectedPlace: 0,
  setSelectedPlace: (selectedPlace) => set({ selectedPlace }),
}));

export default usePlaceStore;
