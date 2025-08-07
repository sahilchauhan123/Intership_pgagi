import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useIdeaStore = create(
    persist(
        (set, get) => ({
            ideas: [],
            liked: [],
            mockDataAdded : false,
            isInitialized: false, // Tracks hydration completion
            
            setIdea: (idea: any) => set({ ideas: idea }),
            setInitialized: () => set({ isInitialized: true }),
            // getIdeas: () => get().ideas,
            setlikedidea: (ids) => {
                set({ liked: ids });
            } // store id for liked ideas
        }),
        {
            name: "user-data",
            storage: createJSONStorage(() => AsyncStorage),
            onRehydrateStorage: () => (state) => {
                if (state) {
                    setTimeout(() => state.setInitialized(), 0);
                }
            },
        }
    )
);

export default useIdeaStore;