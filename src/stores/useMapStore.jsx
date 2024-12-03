import { create } from 'zustand';

const useMapStore = create((set) => ({
  map: null,
  keyWords: '',
  setMap: (map) => set({ map }),
  setKeyWords: (keyWords) => set({ keyWords }),
}));

export default useMapStore;
