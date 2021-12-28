export function createStorageIfNotExists(key, initValue={}) {
    if (!localStorage.getItem(key)) {
        localStorage.setItem(key, JSON.stringify(initValue));
    }
}