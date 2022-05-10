export const readLocalStorage = (property) => {
    return localStorage.getItem(property);
}

export const writeLocalStorage = (property, value) => {
    localStorage.setItem(property, value);
}