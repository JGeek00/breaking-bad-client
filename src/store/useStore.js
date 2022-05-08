import create from 'zustand';

import { createCharactersSlice } from './createCharactersSlice';
import { createModalsSlice } from './createModalsSlice';
import { createConfigSlice } from './createConfigSlice';

const useStore = create((set, get) => ({
    ...createCharactersSlice(set, get),
    ...createModalsSlice(set, get),
    ...createConfigSlice(set, get),
}));

export default useStore;