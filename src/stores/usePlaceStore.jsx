import { create } from 'zustand';

const usePlaceStore = create((set) => ({
  selectedPlace: {
    id: null,
    place_name: '',
    address_name: '',
    road_address_name: '',
    phone: '', // 기본값 설정
    category_group_name: '',
    category_name: '',
    x: null,
    y: null,
  },
  isLiked: false,
  setSelectedPlace: (selectedPlace) => set({ selectedPlace }),
  setIsLiked: (likedStatus) => set({ isLiked: likedStatus }),
}));

export default usePlaceStore;
