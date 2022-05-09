export const createConfigSlice = (set, get) => ({
    screenWidth: window.innerWidth,
    apiRequestError: false,
    setScreenWidth: (data) => {
        set(() => ({screenWidth: data}))
    },
    setApiRequestError: (data) => {
        set(() => ({apiRequestError: data}))
    }
})