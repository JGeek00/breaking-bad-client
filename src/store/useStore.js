import create from 'zustand';

import {createCharactersSlice} from './createCharactersSlice';
import { createModalsSlice } from './createModalsSlice';

const useStore = create((set, get) => ({
    ...createCharactersSlice(set, get),
    ...createModalsSlice(set, get),
}));

export default useStore;