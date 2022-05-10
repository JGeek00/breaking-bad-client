import { readLocalStorage } from '../services/local-storage';

export const createConfigSlice = (set, get) => ({
    screenWidth: window.innerWidth,
    apiRequestError: false,
    darkMode: readLocalStorage('darkMode') === 'true' ? true : false,
    setScreenWidth: (data) => {
        set(() => ({screenWidth: data}))
    },
    setApiRequestError: (data) => {
        set(() => ({apiRequestError: data}))
    },
    setDarkMode: (data) => {
        set(() => ({darkMode: data}));
    }
})