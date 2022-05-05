import create from 'zustand';

import {createCharactersSlice} from './createCharactersSlice';

const useStore = create((set, get) => ({
    ...createCharactersSlice(set, get),
}));

export default useStore;