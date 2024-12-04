import { create } from 'zustand';

const useMapStore = create((set) => ({
  map: null,
  keyWords: '',
  markers: [],
  infowindow: null,
  places: [],
  selectedCategory: '',
  selectedRegion: '',
  selectedCity: '',
  setMap: (map) => set({ map }),
  setKeyWords: (keyWords) => set({ keyWords }),
  setMarkers: (markers) => set({ markers }),
  setInfowindow: (infowindow) => set({ infowindow }),
  setPlaces: (places) => set({ places }),
  setSelectedCategory: (selectedCategory) => set({ selectedCategory }),
  setSelectedRegion: (selectedRegion) => set({ selectedRegion }),
  setSelectedCity: (selectedCity) => set({ selectedCity }),
}));

export default useMapStore;
