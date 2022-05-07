export const createCharactersSlice = (set, get) => ({
    characters: [],
    loadingCharacters: true,
    setCharacters: (data) => {
        set(() => ({characters: data}))
    },
    setLoadingCharacters: (data) => {
        set(() => ({loadingCharacters: data}))
    },
})