export const createConfigSlice = (set, get) => ({
    screenWidth: window.innerWidth,
    setScreenWidth: (data) => {
        set(() => ({screenWidth: data}))
    },
})