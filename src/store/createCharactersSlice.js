export const createCharactersSlice = (set, get) => ({
    characters: [],
    setCharacters: (data) => {
        set(() => ({characters: data}))
    },
})