import axios from "axios";

import config from '../config.json';

export const fetchCharacters = async () => {
    try {
        const response = await axios.get(`${config.apiUrl}/api/characters`);
        return {
            code: response.status,
            data: response.data
        }
    } catch (error) {
        return {
            code: null,
            error: error.toJSON()
        };
    }
}

export const fetchRandomQuote = async (character) => {
    try {
        const response = await axios.get(`${config.apiUrl}/api/quote/random?author=${character}`);
        return {
            code: response.status,
            data: response.data
        }
    } catch (error) {
        return {
            code: null,
            error: error.toJSON()
        };
    }
}