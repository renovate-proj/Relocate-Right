import { create } from 'zustand';

// Zustand Store for Map and Comparison State
export const useMapStore = create((set) => ({
    mapView: {
        center: [19.0760, 72.8777],
        zoom: 12
    },
    preferences: {
        safety: 50,
        affordability: 50,
        transit: 50,
        amenities: 50,
        schools: 50
    },
    selectedNeighborhood: null,
    comparisonList: [],
    workLocation: null,
    commuteMode: 'car',
    commuteTime: 30,

    setMapView: (view) => set({ mapView: view }),
    setPreference: (key, value) => set((state) => ({
        preferences: { ...state.preferences, [key]: value }
    })),
    setSelectedNeighborhood: (neighborhood) => set({ selectedNeighborhood: neighborhood }),
    addToComparison: (neighborhood) => set((state) => {
        if (state.comparisonList.length >= 4) return state;
        if (state.comparisonList.find(n => n.id === neighborhood.id)) return state;
        return { comparisonList: [...state.comparisonList, neighborhood] };
    }),
    removeFromComparison: (neighborhoodId) => set((state) => ({
        comparisonList: state.comparisonList.filter(n => n.id !== neighborhoodId)
    })),
    clearComparison: () => set({ comparisonList: [] }),
    setWorkLocation: (location) => set({ workLocation: location }),
    setCommuteMode: (mode) => set({ commuteMode: mode }),
    setCommuteTime: (time) => set({ commuteTime: time })
}));
