import {createStorageIfNotExists} from "./Storage";

const BLACKLIST_STORAGE_KEY = 'blacklist';

createStorageIfNotExists(BLACKLIST_STORAGE_KEY, [])

export class BlacklistStorage {
    static getBlacklistText() {
        return localStorage.getItem(BLACKLIST_STORAGE_KEY);
    }

    /**
     *
     * @returns {string[]}
     */
    static getBlacklist() {
        return BlacklistStorage.getBlacklistText().split(',') || [];
    }

    /**
     *
     * @param {string} text
     */
    static setBlacklistText(text) {
        localStorage.setItem(BLACKLIST_STORAGE_KEY, text);
    }

    /**
     *
     * @param {string} page
     */
    static addPage(page) {
        const list = this.getBlacklist();
        if (list.includes(page)) {
            return;
        }
        list.push(page);
        localStorage.setItem(BLACKLIST_STORAGE_KEY, list);
    }
}