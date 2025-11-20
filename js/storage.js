const STORAGE_KEY = 'recipes';
export function readRecipes() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return [];
        const parsed = JSON.parse(raw);
        if (!Array.isArray(parsed)) throw new Error('Invalid recipes format');
        return parsed;
    } catch (err) {
        console.error('Failed to parse recipes from localStorage', err);
        localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
        return [];
    }
}
export function writeRecipes(arr) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
}
export function getRecipe(id) {
    return readRecipes().find(r => r.id === id) || null;
}
export function addRecipe(recipe) {
    const arr = readRecipes();
    arr.unshift(recipe); 
    writeRecipes(arr);
}

export function updateRecipe(id, newData) {
    const arr = readRecipes();
    const idx = arr.findIndex(r => r.id === id);
    if (idx === -1) return false;
    arr[idx] = { ...arr[idx], ...newData };
    writeRecipes(arr);
    return true;
}
export function deleteRecipe(id) {
    let arr = readRecipes();
    arr = arr.filter(r => r.id !== id);
    writeRecipes(arr);
}
export function uid() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c /
            4).toString(16)
    );
}
export function ensureSeedData(seedRecipes) {
    const existing = readRecipes();
    if (existing.length === 0) {
        writeRecipes(seedRecipes);
    }
}