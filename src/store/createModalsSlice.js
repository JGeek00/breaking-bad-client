export const createModalsSlice = (set, get) => ({
    apiLimitModal: false,
    noConnectionModal: false,
    unknownErrorModal: false,
    setApiLimitModal: (data) => {
        set(() => ({apiLimitModal: data}))
    },
    setNoConnectionModal: (data) => {
        set(() => ({noConnectionModal: data}))
    },
    setUnknownErrorModal: (data) => {
        set(() => ({unknownErrorModal: data}))
    },
})