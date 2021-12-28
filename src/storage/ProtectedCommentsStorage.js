import {createStorageIfNotExists} from "./Storage";

const PROTECTED_COMMENTS_STORAGE_KEY = "protectedComments"

createStorageIfNotExists(PROTECTED_COMMENTS_STORAGE_KEY, [])

export class ProtectedCommentsStorage {
    static getStorage() {
        if (!localStorage.getItem(PROTECTED_COMMENTS_STORAGE_KEY)) {
            localStorage.setItem(PROTECTED_COMMENTS_STORAGE_KEY, JSON.stringify({}))
        }
        return JSON.parse(localStorage.getItem(PROTECTED_COMMENTS_STORAGE_KEY))
    }

    /**
     *
     * @param {string} pageId
     * @param {string} pageStorage
     * @private
     */
    static _writeStorage(pageId, pageStorage) {
        const storageObj = ProtectedCommentsStorage.getStorage()
        const newStorageObj = {
            ...storageObj,
            [pageId]: pageStorage
        }
        localStorage.setItem(PROTECTED_COMMENTS_STORAGE_KEY, JSON.stringify(newStorageObj, null, 2))
    }

    /**
     *
     * @param {string} pageId
     * @param {string} commentId
     * @param {string} commentText
     */
    static addComment(pageId, commentId, commentText) {

        if (!this.getStorage()[pageId]) {
            localStorage[pageId] = JSON.stringify({}, null, 2)
        }
        const pageStorage = this.getStorage()[pageId] || {}
        pageStorage[commentId] = commentText
        this._writeStorage(pageId, pageStorage)
    }

    /**
     *
     * @param {string} pageId
     * @param {string} commentId
     * @returns {string|undefined}
     */
    static getComment(pageId, commentId) {
        const pageStorage = this.getStorage()[pageId] || {}
        return pageStorage[commentId]
    }

    /**
     *
     * @param {string} pageId
     * @returns {Object}
     */
    static getAllComments(pageId) {
        const pageStorage = this.getStorage()[pageId] || {}
        return pageStorage
    }

}