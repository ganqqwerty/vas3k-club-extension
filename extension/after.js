/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/PageFactory.js":
/*!****************************!*\
  !*** ./src/PageFactory.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PageFactory": () => (/* binding */ PageFactory)
/* harmony export */ });
/* harmony import */ var _functions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./functions */ "./src/functions.js");
/* harmony import */ var _pages_UserPage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./pages/UserPage */ "./src/pages/UserPage.js");
/* harmony import */ var _pages_OwnUserPage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./pages/OwnUserPage */ "./src/pages/OwnUserPage.js");
/* harmony import */ var _pages_PostPage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./pages/PostPage */ "./src/pages/PostPage.js");
/* harmony import */ var _pages_Page__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./pages/Page */ "./src/pages/Page.js");
/* harmony import */ var _pages_FeedPage__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./pages/FeedPage */ "./src/pages/FeedPage.js");







class PageFactory {
    constructor(pathname) {
        /**
         * @type {string}
         */
        this.pathname = pathname;

        /**
         * @type {string}
         */
        this.pageType = this.getPageType()
    }

    /**
     *
     * @returns {Page}
     */
    create() {

        if (this.isUserPageType()) {
            if ((0,_functions__WEBPACK_IMPORTED_MODULE_0__.getUser)() === this.getWhoAmI()) {
                return new _pages_OwnUserPage__WEBPACK_IMPORTED_MODULE_2__.OwnUserPage(this.pathname);
            }
            return new _pages_UserPage__WEBPACK_IMPORTED_MODULE_1__.UserPage(this.pathname)
        }

        if (this.isUserContentPageType()) {
            return new _pages_PostPage__WEBPACK_IMPORTED_MODULE_3__.PostPage(this.pathname)
        }
        if (this.isFeedPage()) {
            return new _pages_FeedPage__WEBPACK_IMPORTED_MODULE_5__.FeedPage(this.pathname)
        }
        return new _pages_Page__WEBPACK_IMPORTED_MODULE_4__.Page(this.pathname)
    }

    /**
     * @returns {boolean}
     */
    isFeedPage() {
        return this.pageType === 'all' || this.pathname === '/'
    }

    /**
     * @returns {boolean}
     */
    isUserContentPageType() {
        const contentTypes = ['battle', "question", "post", "idea"]
        return contentTypes.includes(this.pageType)
    }

    /**
     * @returns {boolean}
     */
    isUserPageType() {
        return this.pageType === "user"
    }

    /**
     * @returns {string}
     */
    getPageType() {
        return this.pathname
            .split('/')
            .filter(a => a)[0]
    }

    /**
     * @returns {string}
     */
    getWhoAmI() {
        return document.querySelector(".menu-right>a.avatar")
            .getAttribute("href")
            .split('/')
            .filter(a => a)
            .pop()
    }
}

/***/ }),

/***/ "./src/functions.js":
/*!**************************!*\
  !*** ./src/functions.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getUser": () => (/* binding */ getUser),
/* harmony export */   "hideVotesRatingsAvatars": () => (/* binding */ hideVotesRatingsAvatars),
/* harmony export */   "printExtensionInfo": () => (/* binding */ printExtensionInfo)
/* harmony export */ });
/**
 * @returns {string}
 */
function getUser() {
    return document.location.pathname.split('/').filter((a) => a).pop()
}

function hideVotesRatingsAvatars() {
    const distractedElementsSelectors = [
        '.upvote',
        '.upvote-voted',
        '.upvote-type-inline',
        '.comment-rating',
        '.feed-post-comments-unread'
    ]

    for (const selector of distractedElementsSelectors) {
        for (const el of document.querySelectorAll(selector)) {
            el.remove()
        }
    }
    for (const avatar of document.querySelectorAll(".avatar>img")) {
        avatar.setAttribute("src", "https://i.vas3k.club/v.png")
    }
}

function printExtensionInfo() {
    console.info ("Всем бояться! Вастрик-ыкстэншын v1.0.0")
    console.log(`
                           (o)(o)
                          /     \\
                         /       |
                        /   \\  * |
          ________     /    /\\__/
  _      /        \\   /    /
 / \\    /  ____    \\_/    /
//\\ \\  /  /    \\         /
V  \\ \\/  /      \\       /
    \\___/        \\_____/
    `)
}




/***/ }),

/***/ "./src/pages/FeedPage.js":
/*!*******************************!*\
  !*** ./src/pages/FeedPage.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FeedPage": () => (/* binding */ FeedPage)
/* harmony export */ });
/* harmony import */ var _Page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Page */ "./src/pages/Page.js");
/* harmony import */ var _storage_AssholesStorage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../storage/AssholesStorage */ "./src/storage/AssholesStorage.js");
/* harmony import */ var _storage_BlacklistStorage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../storage/BlacklistStorage */ "./src/storage/BlacklistStorage.js");




class FeedPage extends _Page__WEBPACK_IMPORTED_MODULE_0__.Page {
    constructor(pathname) {
        super(pathname);
    }

    modifyContent() {
        this.hideBlacklistedPosts()
        this.hideAssholePosts()
        // hideVotesRatingsAvatars()
        this.addBlacklistButton()

    }

    addBlacklistButton() {
        const posts = document.querySelectorAll(".feed-post-footer")
        posts.forEach(post => {
            const pageId = post.querySelector("a.feed-post-comments")
                .getAttribute("href")
                .split("/")
                .slice(1, -1)
                .join("/")
            const button = document.createElement("a")
            button.innerText = "🙈"
            button.setAttribute("title", "Слушайте, а ну его нахер!")
            button.classList.add("feed-post-comments")
            button.addEventListener("click", () => {
                _storage_BlacklistStorage__WEBPACK_IMPORTED_MODULE_2__.BlacklistStorage.addPage(pageId)
                post.parentElement.remove()
            })
            post.appendChild(button)
        })
    }

    hideAssholePosts() {
        for (const asshole of _storage_AssholesStorage__WEBPACK_IMPORTED_MODULE_1__.AssholesStorage.getAssholes()) {
            for (const assholeHref of document.querySelectorAll(`[href="/user/${asshole}/"]`)) {
                assholeHref
                    .parentElement
                    .parentElement
                    .remove()
            }
        }
    }

    hideBlacklistedPosts() {
        const refs = _storage_BlacklistStorage__WEBPACK_IMPORTED_MODULE_2__.BlacklistStorage.getBlacklist()
        for (const ref of refs) {
            for (const topic of document.querySelectorAll(`a[href*="${ref}"]`)) {
                topic
                    .parentElement
                    .parentElement
                    .remove()
            }
        }
    }


}

/***/ }),

/***/ "./src/pages/OwnUserPage.js":
/*!**********************************!*\
  !*** ./src/pages/OwnUserPage.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "OwnUserPage": () => (/* binding */ OwnUserPage)
/* harmony export */ });
/* harmony import */ var _Page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Page */ "./src/pages/Page.js");
/* harmony import */ var _storage_AssholesStorage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../storage/AssholesStorage */ "./src/storage/AssholesStorage.js");
/* harmony import */ var _storage_BlacklistStorage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../storage/BlacklistStorage */ "./src/storage/BlacklistStorage.js");




class OwnUserPage extends _Page__WEBPACK_IMPORTED_MODULE_0__.Page {
    constructor(pathname) {
        super(pathname);
    }

    modifyContent() {
        this.addAssholesList()
    }

    createAssholesListEdit() {
        const widget = document.createElement("div")
        widget.setAttribute("class", "block")
        const header = "<h2 class='profile-header'>Мои мудаки</h2>"
        const textArea = document.createElement("textarea")
        textArea.style.width = "100%"
        textArea.value = _storage_AssholesStorage__WEBPACK_IMPORTED_MODULE_1__.AssholesStorage.getAssholesText()
        textArea.addEventListener("input", () => _storage_AssholesStorage__WEBPACK_IMPORTED_MODULE_1__.AssholesStorage.setAssholesText(textArea.value))
        widget.insertAdjacentHTML("afterbegin", header)
        widget.appendChild(textArea)
        return widget
    }

    createBlacklistEdit() {
        const widget = document.createElement("div")
        widget.setAttribute("class", "block")
        const header = "<h2 class='profile-header'>Черный список страниц</h2>"
        const textArea = document.createElement("textarea")
        textArea.style.width = "100%"
        textArea.value = _storage_BlacklistStorage__WEBPACK_IMPORTED_MODULE_2__.BlacklistStorage.getBlacklistText()
        textArea.addEventListener("input", () => _storage_BlacklistStorage__WEBPACK_IMPORTED_MODULE_2__.BlacklistStorage.setBlacklistText(textArea.value))
        widget.insertAdjacentHTML("afterbegin", header)
        widget.appendChild(textArea)
        return widget
    }

    addAssholesList() {
        const profileInfo = document.querySelector('.profile-intro')
        profileInfo.appendChild( this.createAssholesListEdit())
        profileInfo.appendChild( this.createBlacklistEdit())
    }

}

/***/ }),

/***/ "./src/pages/Page.js":
/*!***************************!*\
  !*** ./src/pages/Page.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Page": () => (/* binding */ Page)
/* harmony export */ });
class Page {
    constructor(pathname) {
        if (!pathname) {
            throw new Error('pathname is required');
        }
        this.pathname = pathname;
    }

    modifyContent() {
        console.log("Nothing is happened, it's an unspecified page")
    }
}

/***/ }),

/***/ "./src/pages/PostPage.js":
/*!*******************************!*\
  !*** ./src/pages/PostPage.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PostPage": () => (/* binding */ PostPage)
/* harmony export */ });
/* harmony import */ var _Page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Page */ "./src/pages/Page.js");
/* harmony import */ var _storage_AssholesStorage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../storage/AssholesStorage */ "./src/storage/AssholesStorage.js");
/* harmony import */ var _storage_ProtectedCommentsStorage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../storage/ProtectedCommentsStorage */ "./src/storage/ProtectedCommentsStorage.js");




class PostPage extends _Page__WEBPACK_IMPORTED_MODULE_0__.Page {
    constructor(url) {
        super(url);
    }

    modifyContent() {
        this.hideAssholeComments()
        this.movePostCommentForm()
        this.addProtectCommentButtons()
        this.addProtectAllCommentButton()
        this.restoreComments()
    }

    hideAssholeComments() {
        for (const asshole of _storage_AssholesStorage__WEBPACK_IMPORTED_MODULE_1__.AssholesStorage.getAssholes()) {
            const selector = `.comment-header-author-name[href="/user/${asshole}/"]`
            const nodesWithAsshole = document.querySelectorAll(selector)
            for (const assholeNode of nodesWithAsshole) {
                assholeNode
                    .parentElement
                    .parentElement
                    .parentElement
                    .parentElement
                    .remove()
            }
        }
    }
    movePostCommentForm() {
        const postCommentForm = document.querySelector('#post-comments-form')
        const commentsList = document.querySelector('.post-comments-list')
        const postCommentsRules = document.querySelector('.post-comments-rules')
        const parent = commentsList.parentElement
        parent.insertBefore(postCommentForm, commentsList)
        parent.insertBefore(postCommentsRules, commentsList)
    }

    /**
     * @param {string} commentId
     * @returns {string}
     */
    getCommentText(commentId) {
        return document.querySelector(`#${commentId} .text-body-type-comment`).innerHTML
    }

    //saves the comment to the local storage
    /**
     *
     * @param {string} commentId
     */
    protectComment(commentId) {
        _storage_ProtectedCommentsStorage__WEBPACK_IMPORTED_MODULE_2__.ProtectedCommentsStorage.addComment(this.pathname, commentId, this.getCommentText(commentId))
    }

    protectAllComments() {
        const comments = document.querySelectorAll(".text-body-type-comment")
        for (const comment of comments) {
            this.protectComment(comment.parentElement.parentElement.id)
        }
    }

    restoreComments() {
        const deletedComments = document.querySelectorAll(".comment-text-deleted")
        for (const deletedComment of deletedComments) {
           this.restoreComment(deletedComment)
        }
    }

    /**
     *
     * @param {Element} deletedComment
     */
    restoreComment(deletedComment) {
        const commentId = deletedComment.parentElement.parentElement.parentElement.id
        const commentText = _storage_ProtectedCommentsStorage__WEBPACK_IMPORTED_MODULE_2__.ProtectedCommentsStorage.getComment(this.pathname, commentId)
        if (commentText) {
            deletedComment.innerHTML = commentText
        }
    }

    addProtectAllCommentButton() {
        const button = this.createButton()
        button.setAttribute("title", "Защитить все комментарии от удаления")
        button.addEventListener('click', () => {
            this.protectAllComments()
        })
        document.querySelector('.post-actions-line').appendChild(button)
    }

    addProtectCommentButtons() {
        const replyElements = document.querySelectorAll('.comment-header-badges')
        console.log(replyElements)
        for (const replyElement of replyElements) {
            const button = this.createButton();
            button.setAttribute("title", "Защитить коммент от удаления")
            const self = this
            button.addEventListener("click", function(evt) {
                const commentId = this.parentElement.parentElement.parentElement.id
                console.log("blaaa", commentId)
                self.protectComment(commentId)

            })
            replyElement.appendChild(button)
        }
    }

    createButton() {
        const button = document.createElement("i")
        button.setAttribute("class", "fas fa-cloud-download-alt")
        button.style.cursor = 'pointer';
        return button;
    }

}


/***/ }),

/***/ "./src/pages/UserPage.js":
/*!*******************************!*\
  !*** ./src/pages/UserPage.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UserPage": () => (/* binding */ UserPage)
/* harmony export */ });
/* harmony import */ var _Page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Page */ "./src/pages/Page.js");
/* harmony import */ var _storage_AssholesStorage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../storage/AssholesStorage */ "./src/storage/AssholesStorage.js");
/* harmony import */ var _storage_PrivateCommentsStorage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../storage/PrivateCommentsStorage */ "./src/storage/PrivateCommentsStorage.js");




class UserPage extends _Page__WEBPACK_IMPORTED_MODULE_0__.Page {
    constructor(url) {
        super(url);
        this.user = this.getUser();
    }

    modifyContent() {
        this.addAssholeButton()
        this.addPrivateCommentWidget()
    }

    addPrivateCommentWidget() {
        const widget = document.createElement("div")
        widget.setAttribute("class", "block")
        const header = "<h2 class='profile-header'>Приватные комментарии</h2>"
        const textarea = document.createElement("textarea")
        textarea.value = _storage_PrivateCommentsStorage__WEBPACK_IMPORTED_MODULE_2__.PrivateCommentsStorage.getComment(this.user || "")
        textarea.addEventListener("input", (text) => {
            const comment = text.target.value
            _storage_PrivateCommentsStorage__WEBPACK_IMPORTED_MODULE_2__.PrivateCommentsStorage.setComment(this.user, comment)
        })
        widget.innerHTML = header
        widget.appendChild(textarea)
        document.querySelector(".profile-statuses").appendChild(widget)
    }

    addAssholeButton() {
        const parser = new DOMParser();
        const assholeBtnStr = `<a class="profile-status clickable"><span class="profile-status-icon">🖕</span> <span class="profile-status-status">Добавить в мои мудаки</span></a>`
        const assholeBtn = parser.parseFromString(assholeBtnStr, 'text/html').querySelector("a");
        assholeBtn.addEventListener("click", () => {
            _storage_AssholesStorage__WEBPACK_IMPORTED_MODULE_1__.AssholesStorage.addAsshole(this.getUser())
        })
        document.querySelector(".profile-statuses").appendChild(assholeBtn)
        if (this.isUserAsshole(this.getUser())) {
            console.log("the user is an asshole!")
        }
    }

    /**
     * @returns {string}
     */
     getUser() {
        return this.pathname.split('/').filter((a) => a).pop()
    }

    /**
     * @param {string} user
     * @returns {boolean}
     */
    isUserAsshole(user) {
        return _storage_AssholesStorage__WEBPACK_IMPORTED_MODULE_1__.AssholesStorage.getAssholes().includes(user)
    }
}

/***/ }),

/***/ "./src/storage/AssholesStorage.js":
/*!****************************************!*\
  !*** ./src/storage/AssholesStorage.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AssholesStorage": () => (/* binding */ AssholesStorage)
/* harmony export */ });
/* harmony import */ var _Storage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Storage */ "./src/storage/Storage.js");


const ASSHOLES_STORAGE_KEY = 'assholes';
(0,_Storage__WEBPACK_IMPORTED_MODULE_0__.createStorageIfNotExists)(ASSHOLES_STORAGE_KEY, [])

class AssholesStorage {

    static getAssholesText() {
        return localStorage.getItem(ASSHOLES_STORAGE_KEY);
    }

    /**
     *
     * @returns {string[]}
     */
    static getAssholes() {
        return AssholesStorage.getAssholesText().split(',') || [];
    }

    /**
     *
     * @param {string} assholesText
     */
    static setAssholesText(assholesText) {
        localStorage.setItem(ASSHOLES_STORAGE_KEY, assholesText);
    }

    /**
     *
     * @param {string} asshole
     */
    static addAsshole(asshole) {
        const assholes = this.getAssholes();
        if (assholes.includes(asshole)) {
            return;
        }
        assholes.push(asshole);
        localStorage.setItem(ASSHOLES_STORAGE_KEY, assholes.join(','));
    }
}

/***/ }),

/***/ "./src/storage/BlacklistStorage.js":
/*!*****************************************!*\
  !*** ./src/storage/BlacklistStorage.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BlacklistStorage": () => (/* binding */ BlacklistStorage)
/* harmony export */ });
/* harmony import */ var _Storage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Storage */ "./src/storage/Storage.js");


const BLACKLIST_STORAGE_KEY = 'blacklist';

(0,_Storage__WEBPACK_IMPORTED_MODULE_0__.createStorageIfNotExists)(BLACKLIST_STORAGE_KEY, [])

class BlacklistStorage {
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

/***/ }),

/***/ "./src/storage/PrivateCommentsStorage.js":
/*!***********************************************!*\
  !*** ./src/storage/PrivateCommentsStorage.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PrivateCommentsStorage": () => (/* binding */ PrivateCommentsStorage)
/* harmony export */ });
/* harmony import */ var _Storage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Storage */ "./src/storage/Storage.js");


const PRIVATE_COMMENTS_KEY = 'private-comments';

(0,_Storage__WEBPACK_IMPORTED_MODULE_0__.createStorageIfNotExists)(PRIVATE_COMMENTS_KEY, {})

class PrivateCommentsStorage {
    /**
     *
     * @param {string} user
     * @param {string} comment
     */
    static setComment(user, comment) {
        const comments = PrivateCommentsStorage.getComments();
        localStorage.setItem(PRIVATE_COMMENTS_KEY, JSON.stringify({
            ...comments,
            [user]: comment
        }));
    }

    /**
     *
     * @param {string} user
     * @returns {string}
     */
    static getComment(user) {
        const userComment = PrivateCommentsStorage.getComments()
        if (!userComment) {
            return "";
        }
        const textPrivateCommentsObj =  this.getComments()
        return textPrivateCommentsObj[user] || "";
    }

    /**
     * @returns {Object}
     */
    static getComments() {
        return JSON.parse(localStorage.getItem(PRIVATE_COMMENTS_KEY) || "{}") || {}
    }
}

/***/ }),

/***/ "./src/storage/ProtectedCommentsStorage.js":
/*!*************************************************!*\
  !*** ./src/storage/ProtectedCommentsStorage.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProtectedCommentsStorage": () => (/* binding */ ProtectedCommentsStorage)
/* harmony export */ });
/* harmony import */ var _Storage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Storage */ "./src/storage/Storage.js");


const PROTECTED_COMMENTS_STORAGE_KEY = "protectedComments"

;(0,_Storage__WEBPACK_IMPORTED_MODULE_0__.createStorageIfNotExists)(PROTECTED_COMMENTS_STORAGE_KEY, {})

class ProtectedCommentsStorage {
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

/***/ }),

/***/ "./src/storage/Storage.js":
/*!********************************!*\
  !*** ./src/storage/Storage.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createStorageIfNotExists": () => (/* binding */ createStorageIfNotExists)
/* harmony export */ });
function createStorageIfNotExists(key, initValue={}) {
    if (!localStorage.getItem(key)) {
        localStorage.setItem(key, JSON.stringify(initValue));
    }
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _PageFactory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PageFactory */ "./src/PageFactory.js");
/* harmony import */ var _functions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./functions */ "./src/functions.js");



(0,_functions__WEBPACK_IMPORTED_MODULE_1__.printExtensionInfo)()
const pageFactory = new _PageFactory__WEBPACK_IMPORTED_MODULE_0__.PageFactory(location.pathname)
const page = pageFactory.create()
page.modifyContent()



})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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UUFBUTtBQUN2QixlQUFlLFFBQVE7QUFDdkIsZUFBZSxRQUFRO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxRQUFRO0FBQ3ZCLGVBQWUsUUFBUTtBQUN2QixpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxRQUFRO0FBQ3ZCLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7OztBQzlETyxtREFBbUQ7QUFDMUQ7QUFDQTtBQUNBO0FBQ0E7Ozs7OztVQ0pBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7O0FDTjBDO0FBQ0s7O0FBRS9DLDhEQUFrQjtBQUNsQix3QkFBd0IscURBQVc7QUFDbkM7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3ZhczNrLWNsdWItZXh0ZW5zaW9uLy4vc3JjL1BhZ2VGYWN0b3J5LmpzIiwid2VicGFjazovL3ZhczNrLWNsdWItZXh0ZW5zaW9uLy4vc3JjL2Z1bmN0aW9ucy5qcyIsIndlYnBhY2s6Ly92YXMzay1jbHViLWV4dGVuc2lvbi8uL3NyYy9wYWdlcy9GZWVkUGFnZS5qcyIsIndlYnBhY2s6Ly92YXMzay1jbHViLWV4dGVuc2lvbi8uL3NyYy9wYWdlcy9Pd25Vc2VyUGFnZS5qcyIsIndlYnBhY2s6Ly92YXMzay1jbHViLWV4dGVuc2lvbi8uL3NyYy9wYWdlcy9QYWdlLmpzIiwid2VicGFjazovL3ZhczNrLWNsdWItZXh0ZW5zaW9uLy4vc3JjL3BhZ2VzL1Bvc3RQYWdlLmpzIiwid2VicGFjazovL3ZhczNrLWNsdWItZXh0ZW5zaW9uLy4vc3JjL3BhZ2VzL1VzZXJQYWdlLmpzIiwid2VicGFjazovL3ZhczNrLWNsdWItZXh0ZW5zaW9uLy4vc3JjL3N0b3JhZ2UvQXNzaG9sZXNTdG9yYWdlLmpzIiwid2VicGFjazovL3ZhczNrLWNsdWItZXh0ZW5zaW9uLy4vc3JjL3N0b3JhZ2UvQmxhY2tsaXN0U3RvcmFnZS5qcyIsIndlYnBhY2s6Ly92YXMzay1jbHViLWV4dGVuc2lvbi8uL3NyYy9zdG9yYWdlL1ByaXZhdGVDb21tZW50c1N0b3JhZ2UuanMiLCJ3ZWJwYWNrOi8vdmFzM2stY2x1Yi1leHRlbnNpb24vLi9zcmMvc3RvcmFnZS9Qcm90ZWN0ZWRDb21tZW50c1N0b3JhZ2UuanMiLCJ3ZWJwYWNrOi8vdmFzM2stY2x1Yi1leHRlbnNpb24vLi9zcmMvc3RvcmFnZS9TdG9yYWdlLmpzIiwid2VicGFjazovL3ZhczNrLWNsdWItZXh0ZW5zaW9uL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3ZhczNrLWNsdWItZXh0ZW5zaW9uL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly92YXMzay1jbHViLWV4dGVuc2lvbi93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3ZhczNrLWNsdWItZXh0ZW5zaW9uL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdmFzM2stY2x1Yi1leHRlbnNpb24vLi9zcmMvbWFpbi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2dldFVzZXJ9IGZyb20gXCIuL2Z1bmN0aW9uc1wiO1xuaW1wb3J0IHtVc2VyUGFnZX0gZnJvbSBcIi4vcGFnZXMvVXNlclBhZ2VcIjtcbmltcG9ydCB7T3duVXNlclBhZ2V9IGZyb20gXCIuL3BhZ2VzL093blVzZXJQYWdlXCI7XG5pbXBvcnQge1Bvc3RQYWdlfSBmcm9tIFwiLi9wYWdlcy9Qb3N0UGFnZVwiO1xuaW1wb3J0IHtQYWdlfSBmcm9tIFwiLi9wYWdlcy9QYWdlXCI7XG5pbXBvcnQge0ZlZWRQYWdlfSBmcm9tIFwiLi9wYWdlcy9GZWVkUGFnZVwiO1xuXG5leHBvcnQgY2xhc3MgUGFnZUZhY3Rvcnkge1xuICAgIGNvbnN0cnVjdG9yKHBhdGhuYW1lKSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5wYXRobmFtZSA9IHBhdGhuYW1lO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5wYWdlVHlwZSA9IHRoaXMuZ2V0UGFnZVR5cGUoKVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHJldHVybnMge1BhZ2V9XG4gICAgICovXG4gICAgY3JlYXRlKCkge1xuXG4gICAgICAgIGlmICh0aGlzLmlzVXNlclBhZ2VUeXBlKCkpIHtcbiAgICAgICAgICAgIGlmIChnZXRVc2VyKCkgPT09IHRoaXMuZ2V0V2hvQW1JKCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IE93blVzZXJQYWdlKHRoaXMucGF0aG5hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG5ldyBVc2VyUGFnZSh0aGlzLnBhdGhuYW1lKVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuaXNVc2VyQ29udGVudFBhZ2VUeXBlKCkpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgUG9zdFBhZ2UodGhpcy5wYXRobmFtZSlcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5pc0ZlZWRQYWdlKCkpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRmVlZFBhZ2UodGhpcy5wYXRobmFtZSlcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3IFBhZ2UodGhpcy5wYXRobmFtZSlcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBpc0ZlZWRQYWdlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wYWdlVHlwZSA9PT0gJ2FsbCcgfHwgdGhpcy5wYXRobmFtZSA9PT0gJy8nXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgaXNVc2VyQ29udGVudFBhZ2VUeXBlKCkge1xuICAgICAgICBjb25zdCBjb250ZW50VHlwZXMgPSBbJ2JhdHRsZScsIFwicXVlc3Rpb25cIiwgXCJwb3N0XCIsIFwiaWRlYVwiXVxuICAgICAgICByZXR1cm4gY29udGVudFR5cGVzLmluY2x1ZGVzKHRoaXMucGFnZVR5cGUpXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgaXNVc2VyUGFnZVR5cGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBhZ2VUeXBlID09PSBcInVzZXJcIlxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAgICovXG4gICAgZ2V0UGFnZVR5cGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBhdGhuYW1lXG4gICAgICAgICAgICAuc3BsaXQoJy8nKVxuICAgICAgICAgICAgLmZpbHRlcihhID0+IGEpWzBdXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJldHVybnMge3N0cmluZ31cbiAgICAgKi9cbiAgICBnZXRXaG9BbUkoKSB7XG4gICAgICAgIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1lbnUtcmlnaHQ+YS5hdmF0YXJcIilcbiAgICAgICAgICAgIC5nZXRBdHRyaWJ1dGUoXCJocmVmXCIpXG4gICAgICAgICAgICAuc3BsaXQoJy8nKVxuICAgICAgICAgICAgLmZpbHRlcihhID0+IGEpXG4gICAgICAgICAgICAucG9wKClcbiAgICB9XG59IiwiLyoqXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0VXNlcigpIHtcbiAgICByZXR1cm4gZG9jdW1lbnQubG9jYXRpb24ucGF0aG5hbWUuc3BsaXQoJy8nKS5maWx0ZXIoKGEpID0+IGEpLnBvcCgpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBoaWRlVm90ZXNSYXRpbmdzQXZhdGFycygpIHtcbiAgICBjb25zdCBkaXN0cmFjdGVkRWxlbWVudHNTZWxlY3RvcnMgPSBbXG4gICAgICAgICcudXB2b3RlJyxcbiAgICAgICAgJy51cHZvdGUtdm90ZWQnLFxuICAgICAgICAnLnVwdm90ZS10eXBlLWlubGluZScsXG4gICAgICAgICcuY29tbWVudC1yYXRpbmcnLFxuICAgICAgICAnLmZlZWQtcG9zdC1jb21tZW50cy11bnJlYWQnXG4gICAgXVxuXG4gICAgZm9yIChjb25zdCBzZWxlY3RvciBvZiBkaXN0cmFjdGVkRWxlbWVudHNTZWxlY3RvcnMpIHtcbiAgICAgICAgZm9yIChjb25zdCBlbCBvZiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKSkge1xuICAgICAgICAgICAgZWwucmVtb3ZlKClcbiAgICAgICAgfVxuICAgIH1cbiAgICBmb3IgKGNvbnN0IGF2YXRhciBvZiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmF2YXRhcj5pbWdcIikpIHtcbiAgICAgICAgYXZhdGFyLnNldEF0dHJpYnV0ZShcInNyY1wiLCBcImh0dHBzOi8vaS52YXMzay5jbHViL3YucG5nXCIpXG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcHJpbnRFeHRlbnNpb25JbmZvKCkge1xuICAgIGNvbnNvbGUuaW5mbyAoXCLQktGB0LXQvCDQsdC+0Y/RgtGM0YHRjyEg0JLQsNGB0YLRgNC40Lot0YvQutGB0YLRjdC90YjRi9C9IHYxLjAuMFwiKVxuICAgIGNvbnNvbGUubG9nKGBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIChvKShvKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAvICAgICBcXFxcXG4gICAgICAgICAgICAgICAgICAgICAgICAgLyAgICAgICB8XG4gICAgICAgICAgICAgICAgICAgICAgICAvICAgXFxcXCAgKiB8XG4gICAgICAgICAgX19fX19fX18gICAgIC8gICAgL1xcXFxfXy9cbiAgXyAgICAgIC8gICAgICAgIFxcXFwgICAvICAgIC9cbiAvIFxcXFwgICAgLyAgX19fXyAgICBcXFxcXy8gICAgL1xuLy9cXFxcIFxcXFwgIC8gIC8gICAgXFxcXCAgICAgICAgIC9cblYgIFxcXFwgXFxcXC8gIC8gICAgICBcXFxcICAgICAgIC9cbiAgICBcXFxcX19fLyAgICAgICAgXFxcXF9fX19fL1xuICAgIGApXG59XG5cblxuIiwiaW1wb3J0IHtQYWdlfSBmcm9tIFwiLi9QYWdlXCI7XG5pbXBvcnQge0Fzc2hvbGVzU3RvcmFnZX0gZnJvbSBcIi4uL3N0b3JhZ2UvQXNzaG9sZXNTdG9yYWdlXCI7XG5pbXBvcnQge0JsYWNrbGlzdFN0b3JhZ2V9IGZyb20gXCIuLi9zdG9yYWdlL0JsYWNrbGlzdFN0b3JhZ2VcIjtcblxuZXhwb3J0IGNsYXNzIEZlZWRQYWdlIGV4dGVuZHMgUGFnZSB7XG4gICAgY29uc3RydWN0b3IocGF0aG5hbWUpIHtcbiAgICAgICAgc3VwZXIocGF0aG5hbWUpO1xuICAgIH1cblxuICAgIG1vZGlmeUNvbnRlbnQoKSB7XG4gICAgICAgIHRoaXMuaGlkZUJsYWNrbGlzdGVkUG9zdHMoKVxuICAgICAgICB0aGlzLmhpZGVBc3Nob2xlUG9zdHMoKVxuICAgICAgICAvLyBoaWRlVm90ZXNSYXRpbmdzQXZhdGFycygpXG4gICAgICAgIHRoaXMuYWRkQmxhY2tsaXN0QnV0dG9uKClcblxuICAgIH1cblxuICAgIGFkZEJsYWNrbGlzdEJ1dHRvbigpIHtcbiAgICAgICAgY29uc3QgcG9zdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmZlZWQtcG9zdC1mb290ZXJcIilcbiAgICAgICAgcG9zdHMuZm9yRWFjaChwb3N0ID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHBhZ2VJZCA9IHBvc3QucXVlcnlTZWxlY3RvcihcImEuZmVlZC1wb3N0LWNvbW1lbnRzXCIpXG4gICAgICAgICAgICAgICAgLmdldEF0dHJpYnV0ZShcImhyZWZcIilcbiAgICAgICAgICAgICAgICAuc3BsaXQoXCIvXCIpXG4gICAgICAgICAgICAgICAgLnNsaWNlKDEsIC0xKVxuICAgICAgICAgICAgICAgIC5qb2luKFwiL1wiKVxuICAgICAgICAgICAgY29uc3QgYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFcIilcbiAgICAgICAgICAgIGJ1dHRvbi5pbm5lclRleHQgPSBcIvCfmYhcIlxuICAgICAgICAgICAgYnV0dG9uLnNldEF0dHJpYnV0ZShcInRpdGxlXCIsIFwi0KHQu9GD0YjQsNC50YLQtSwg0LAg0L3RgyDQtdCz0L4g0L3QsNGF0LXRgCFcIilcbiAgICAgICAgICAgIGJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwiZmVlZC1wb3N0LWNvbW1lbnRzXCIpXG4gICAgICAgICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgICAgICAgICBCbGFja2xpc3RTdG9yYWdlLmFkZFBhZ2UocGFnZUlkKVxuICAgICAgICAgICAgICAgIHBvc3QucGFyZW50RWxlbWVudC5yZW1vdmUoKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIHBvc3QuYXBwZW5kQ2hpbGQoYnV0dG9uKVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIGhpZGVBc3Nob2xlUG9zdHMoKSB7XG4gICAgICAgIGZvciAoY29uc3QgYXNzaG9sZSBvZiBBc3Nob2xlc1N0b3JhZ2UuZ2V0QXNzaG9sZXMoKSkge1xuICAgICAgICAgICAgZm9yIChjb25zdCBhc3Nob2xlSHJlZiBvZiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGBbaHJlZj1cIi91c2VyLyR7YXNzaG9sZX0vXCJdYCkpIHtcbiAgICAgICAgICAgICAgICBhc3Nob2xlSHJlZlxuICAgICAgICAgICAgICAgICAgICAucGFyZW50RWxlbWVudFxuICAgICAgICAgICAgICAgICAgICAucGFyZW50RWxlbWVudFxuICAgICAgICAgICAgICAgICAgICAucmVtb3ZlKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhpZGVCbGFja2xpc3RlZFBvc3RzKCkge1xuICAgICAgICBjb25zdCByZWZzID0gQmxhY2tsaXN0U3RvcmFnZS5nZXRCbGFja2xpc3QoKVxuICAgICAgICBmb3IgKGNvbnN0IHJlZiBvZiByZWZzKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHRvcGljIG9mIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYGFbaHJlZio9XCIke3JlZn1cIl1gKSkge1xuICAgICAgICAgICAgICAgIHRvcGljXG4gICAgICAgICAgICAgICAgICAgIC5wYXJlbnRFbGVtZW50XG4gICAgICAgICAgICAgICAgICAgIC5wYXJlbnRFbGVtZW50XG4gICAgICAgICAgICAgICAgICAgIC5yZW1vdmUoKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG5cbn0iLCJpbXBvcnQge1BhZ2V9IGZyb20gXCIuL1BhZ2VcIjtcbmltcG9ydCB7QXNzaG9sZXNTdG9yYWdlfSBmcm9tIFwiLi4vc3RvcmFnZS9Bc3Nob2xlc1N0b3JhZ2VcIjtcbmltcG9ydCB7QmxhY2tsaXN0U3RvcmFnZX0gZnJvbSBcIi4uL3N0b3JhZ2UvQmxhY2tsaXN0U3RvcmFnZVwiO1xuXG5leHBvcnQgY2xhc3MgT3duVXNlclBhZ2UgZXh0ZW5kcyBQYWdlIHtcbiAgICBjb25zdHJ1Y3RvcihwYXRobmFtZSkge1xuICAgICAgICBzdXBlcihwYXRobmFtZSk7XG4gICAgfVxuXG4gICAgbW9kaWZ5Q29udGVudCgpIHtcbiAgICAgICAgdGhpcy5hZGRBc3Nob2xlc0xpc3QoKVxuICAgIH1cblxuICAgIGNyZWF0ZUFzc2hvbGVzTGlzdEVkaXQoKSB7XG4gICAgICAgIGNvbnN0IHdpZGdldCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIilcbiAgICAgICAgd2lkZ2V0LnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwiYmxvY2tcIilcbiAgICAgICAgY29uc3QgaGVhZGVyID0gXCI8aDIgY2xhc3M9J3Byb2ZpbGUtaGVhZGVyJz7QnNC+0Lgg0LzRg9C00LDQutC4PC9oMj5cIlxuICAgICAgICBjb25zdCB0ZXh0QXJlYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZXh0YXJlYVwiKVxuICAgICAgICB0ZXh0QXJlYS5zdHlsZS53aWR0aCA9IFwiMTAwJVwiXG4gICAgICAgIHRleHRBcmVhLnZhbHVlID0gQXNzaG9sZXNTdG9yYWdlLmdldEFzc2hvbGVzVGV4dCgpXG4gICAgICAgIHRleHRBcmVhLmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCAoKSA9PiBBc3Nob2xlc1N0b3JhZ2Uuc2V0QXNzaG9sZXNUZXh0KHRleHRBcmVhLnZhbHVlKSlcbiAgICAgICAgd2lkZ2V0Lmluc2VydEFkamFjZW50SFRNTChcImFmdGVyYmVnaW5cIiwgaGVhZGVyKVxuICAgICAgICB3aWRnZXQuYXBwZW5kQ2hpbGQodGV4dEFyZWEpXG4gICAgICAgIHJldHVybiB3aWRnZXRcbiAgICB9XG5cbiAgICBjcmVhdGVCbGFja2xpc3RFZGl0KCkge1xuICAgICAgICBjb25zdCB3aWRnZXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpXG4gICAgICAgIHdpZGdldC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImJsb2NrXCIpXG4gICAgICAgIGNvbnN0IGhlYWRlciA9IFwiPGgyIGNsYXNzPSdwcm9maWxlLWhlYWRlcic+0KfQtdGA0L3Ri9C5INGB0L/QuNGB0L7QuiDRgdGC0YDQsNC90LjRhjwvaDI+XCJcbiAgICAgICAgY29uc3QgdGV4dEFyZWEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGV4dGFyZWFcIilcbiAgICAgICAgdGV4dEFyZWEuc3R5bGUud2lkdGggPSBcIjEwMCVcIlxuICAgICAgICB0ZXh0QXJlYS52YWx1ZSA9IEJsYWNrbGlzdFN0b3JhZ2UuZ2V0QmxhY2tsaXN0VGV4dCgpXG4gICAgICAgIHRleHRBcmVhLmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCAoKSA9PiBCbGFja2xpc3RTdG9yYWdlLnNldEJsYWNrbGlzdFRleHQodGV4dEFyZWEudmFsdWUpKVxuICAgICAgICB3aWRnZXQuaW5zZXJ0QWRqYWNlbnRIVE1MKFwiYWZ0ZXJiZWdpblwiLCBoZWFkZXIpXG4gICAgICAgIHdpZGdldC5hcHBlbmRDaGlsZCh0ZXh0QXJlYSlcbiAgICAgICAgcmV0dXJuIHdpZGdldFxuICAgIH1cblxuICAgIGFkZEFzc2hvbGVzTGlzdCgpIHtcbiAgICAgICAgY29uc3QgcHJvZmlsZUluZm8gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvZmlsZS1pbnRybycpXG4gICAgICAgIHByb2ZpbGVJbmZvLmFwcGVuZENoaWxkKCB0aGlzLmNyZWF0ZUFzc2hvbGVzTGlzdEVkaXQoKSlcbiAgICAgICAgcHJvZmlsZUluZm8uYXBwZW5kQ2hpbGQoIHRoaXMuY3JlYXRlQmxhY2tsaXN0RWRpdCgpKVxuICAgIH1cblxufSIsImV4cG9ydCBjbGFzcyBQYWdlIHtcbiAgICBjb25zdHJ1Y3RvcihwYXRobmFtZSkge1xuICAgICAgICBpZiAoIXBhdGhuYW1lKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3BhdGhuYW1lIGlzIHJlcXVpcmVkJyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wYXRobmFtZSA9IHBhdGhuYW1lO1xuICAgIH1cblxuICAgIG1vZGlmeUNvbnRlbnQoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiTm90aGluZyBpcyBoYXBwZW5lZCwgaXQncyBhbiB1bnNwZWNpZmllZCBwYWdlXCIpXG4gICAgfVxufSIsImltcG9ydCB7UGFnZX0gZnJvbSBcIi4vUGFnZVwiO1xuaW1wb3J0IHtBc3Nob2xlc1N0b3JhZ2V9IGZyb20gXCIuLi9zdG9yYWdlL0Fzc2hvbGVzU3RvcmFnZVwiO1xuaW1wb3J0IHtQcm90ZWN0ZWRDb21tZW50c1N0b3JhZ2V9IGZyb20gXCIuLi9zdG9yYWdlL1Byb3RlY3RlZENvbW1lbnRzU3RvcmFnZVwiO1xuXG5leHBvcnQgY2xhc3MgUG9zdFBhZ2UgZXh0ZW5kcyBQYWdlIHtcbiAgICBjb25zdHJ1Y3Rvcih1cmwpIHtcbiAgICAgICAgc3VwZXIodXJsKTtcbiAgICB9XG5cbiAgICBtb2RpZnlDb250ZW50KCkge1xuICAgICAgICB0aGlzLmhpZGVBc3Nob2xlQ29tbWVudHMoKVxuICAgICAgICB0aGlzLm1vdmVQb3N0Q29tbWVudEZvcm0oKVxuICAgICAgICB0aGlzLmFkZFByb3RlY3RDb21tZW50QnV0dG9ucygpXG4gICAgICAgIHRoaXMuYWRkUHJvdGVjdEFsbENvbW1lbnRCdXR0b24oKVxuICAgICAgICB0aGlzLnJlc3RvcmVDb21tZW50cygpXG4gICAgfVxuXG4gICAgaGlkZUFzc2hvbGVDb21tZW50cygpIHtcbiAgICAgICAgZm9yIChjb25zdCBhc3Nob2xlIG9mIEFzc2hvbGVzU3RvcmFnZS5nZXRBc3Nob2xlcygpKSB7XG4gICAgICAgICAgICBjb25zdCBzZWxlY3RvciA9IGAuY29tbWVudC1oZWFkZXItYXV0aG9yLW5hbWVbaHJlZj1cIi91c2VyLyR7YXNzaG9sZX0vXCJdYFxuICAgICAgICAgICAgY29uc3Qgbm9kZXNXaXRoQXNzaG9sZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGFzc2hvbGVOb2RlIG9mIG5vZGVzV2l0aEFzc2hvbGUpIHtcbiAgICAgICAgICAgICAgICBhc3Nob2xlTm9kZVxuICAgICAgICAgICAgICAgICAgICAucGFyZW50RWxlbWVudFxuICAgICAgICAgICAgICAgICAgICAucGFyZW50RWxlbWVudFxuICAgICAgICAgICAgICAgICAgICAucGFyZW50RWxlbWVudFxuICAgICAgICAgICAgICAgICAgICAucGFyZW50RWxlbWVudFxuICAgICAgICAgICAgICAgICAgICAucmVtb3ZlKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBtb3ZlUG9zdENvbW1lbnRGb3JtKCkge1xuICAgICAgICBjb25zdCBwb3N0Q29tbWVudEZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcG9zdC1jb21tZW50cy1mb3JtJylcbiAgICAgICAgY29uc3QgY29tbWVudHNMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBvc3QtY29tbWVudHMtbGlzdCcpXG4gICAgICAgIGNvbnN0IHBvc3RDb21tZW50c1J1bGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBvc3QtY29tbWVudHMtcnVsZXMnKVxuICAgICAgICBjb25zdCBwYXJlbnQgPSBjb21tZW50c0xpc3QucGFyZW50RWxlbWVudFxuICAgICAgICBwYXJlbnQuaW5zZXJ0QmVmb3JlKHBvc3RDb21tZW50Rm9ybSwgY29tbWVudHNMaXN0KVxuICAgICAgICBwYXJlbnQuaW5zZXJ0QmVmb3JlKHBvc3RDb21tZW50c1J1bGVzLCBjb21tZW50c0xpc3QpXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGNvbW1lbnRJZFxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAgICovXG4gICAgZ2V0Q29tbWVudFRleHQoY29tbWVudElkKSB7XG4gICAgICAgIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjJHtjb21tZW50SWR9IC50ZXh0LWJvZHktdHlwZS1jb21tZW50YCkuaW5uZXJIVE1MXG4gICAgfVxuXG4gICAgLy9zYXZlcyB0aGUgY29tbWVudCB0byB0aGUgbG9jYWwgc3RvcmFnZVxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGNvbW1lbnRJZFxuICAgICAqL1xuICAgIHByb3RlY3RDb21tZW50KGNvbW1lbnRJZCkge1xuICAgICAgICBQcm90ZWN0ZWRDb21tZW50c1N0b3JhZ2UuYWRkQ29tbWVudCh0aGlzLnBhdGhuYW1lLCBjb21tZW50SWQsIHRoaXMuZ2V0Q29tbWVudFRleHQoY29tbWVudElkKSlcbiAgICB9XG5cbiAgICBwcm90ZWN0QWxsQ29tbWVudHMoKSB7XG4gICAgICAgIGNvbnN0IGNvbW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi50ZXh0LWJvZHktdHlwZS1jb21tZW50XCIpXG4gICAgICAgIGZvciAoY29uc3QgY29tbWVudCBvZiBjb21tZW50cykge1xuICAgICAgICAgICAgdGhpcy5wcm90ZWN0Q29tbWVudChjb21tZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5pZClcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlc3RvcmVDb21tZW50cygpIHtcbiAgICAgICAgY29uc3QgZGVsZXRlZENvbW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5jb21tZW50LXRleHQtZGVsZXRlZFwiKVxuICAgICAgICBmb3IgKGNvbnN0IGRlbGV0ZWRDb21tZW50IG9mIGRlbGV0ZWRDb21tZW50cykge1xuICAgICAgICAgICB0aGlzLnJlc3RvcmVDb21tZW50KGRlbGV0ZWRDb21tZW50KVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0VsZW1lbnR9IGRlbGV0ZWRDb21tZW50XG4gICAgICovXG4gICAgcmVzdG9yZUNvbW1lbnQoZGVsZXRlZENvbW1lbnQpIHtcbiAgICAgICAgY29uc3QgY29tbWVudElkID0gZGVsZXRlZENvbW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQuaWRcbiAgICAgICAgY29uc3QgY29tbWVudFRleHQgPSBQcm90ZWN0ZWRDb21tZW50c1N0b3JhZ2UuZ2V0Q29tbWVudCh0aGlzLnBhdGhuYW1lLCBjb21tZW50SWQpXG4gICAgICAgIGlmIChjb21tZW50VGV4dCkge1xuICAgICAgICAgICAgZGVsZXRlZENvbW1lbnQuaW5uZXJIVE1MID0gY29tbWVudFRleHRcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFkZFByb3RlY3RBbGxDb21tZW50QnV0dG9uKCkge1xuICAgICAgICBjb25zdCBidXR0b24gPSB0aGlzLmNyZWF0ZUJ1dHRvbigpXG4gICAgICAgIGJ1dHRvbi5zZXRBdHRyaWJ1dGUoXCJ0aXRsZVwiLCBcItCX0LDRidC40YLQuNGC0Ywg0LLRgdC1INC60L7QvNC80LXQvdGC0LDRgNC40Lgg0L7RgiDRg9C00LDQu9C10L3QuNGPXCIpXG4gICAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMucHJvdGVjdEFsbENvbW1lbnRzKClcbiAgICAgICAgfSlcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBvc3QtYWN0aW9ucy1saW5lJykuYXBwZW5kQ2hpbGQoYnV0dG9uKVxuICAgIH1cblxuICAgIGFkZFByb3RlY3RDb21tZW50QnV0dG9ucygpIHtcbiAgICAgICAgY29uc3QgcmVwbHlFbGVtZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jb21tZW50LWhlYWRlci1iYWRnZXMnKVxuICAgICAgICBjb25zb2xlLmxvZyhyZXBseUVsZW1lbnRzKVxuICAgICAgICBmb3IgKGNvbnN0IHJlcGx5RWxlbWVudCBvZiByZXBseUVsZW1lbnRzKSB7XG4gICAgICAgICAgICBjb25zdCBidXR0b24gPSB0aGlzLmNyZWF0ZUJ1dHRvbigpO1xuICAgICAgICAgICAgYnV0dG9uLnNldEF0dHJpYnV0ZShcInRpdGxlXCIsIFwi0JfQsNGJ0LjRgtC40YLRjCDQutC+0LzQvNC10L3RgiDQvtGCINGD0LTQsNC70LXQvdC40Y9cIilcbiAgICAgICAgICAgIGNvbnN0IHNlbGYgPSB0aGlzXG4gICAgICAgICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKGV2dCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNvbW1lbnRJZCA9IHRoaXMucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQuaWRcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImJsYWFhXCIsIGNvbW1lbnRJZClcbiAgICAgICAgICAgICAgICBzZWxmLnByb3RlY3RDb21tZW50KGNvbW1lbnRJZClcblxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIHJlcGx5RWxlbWVudC5hcHBlbmRDaGlsZChidXR0b24pXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjcmVhdGVCdXR0b24oKSB7XG4gICAgICAgIGNvbnN0IGJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpXCIpXG4gICAgICAgIGJ1dHRvbi5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImZhcyBmYS1jbG91ZC1kb3dubG9hZC1hbHRcIilcbiAgICAgICAgYnV0dG9uLnN0eWxlLmN1cnNvciA9ICdwb2ludGVyJztcbiAgICAgICAgcmV0dXJuIGJ1dHRvbjtcbiAgICB9XG5cbn1cbiIsImltcG9ydCB7UGFnZX0gZnJvbSBcIi4vUGFnZVwiO1xuaW1wb3J0IHtBc3Nob2xlc1N0b3JhZ2V9IGZyb20gXCIuLi9zdG9yYWdlL0Fzc2hvbGVzU3RvcmFnZVwiO1xuaW1wb3J0IHtQcml2YXRlQ29tbWVudHNTdG9yYWdlfSBmcm9tIFwiLi4vc3RvcmFnZS9Qcml2YXRlQ29tbWVudHNTdG9yYWdlXCI7XG5cbmV4cG9ydCBjbGFzcyBVc2VyUGFnZSBleHRlbmRzIFBhZ2Uge1xuICAgIGNvbnN0cnVjdG9yKHVybCkge1xuICAgICAgICBzdXBlcih1cmwpO1xuICAgICAgICB0aGlzLnVzZXIgPSB0aGlzLmdldFVzZXIoKTtcbiAgICB9XG5cbiAgICBtb2RpZnlDb250ZW50KCkge1xuICAgICAgICB0aGlzLmFkZEFzc2hvbGVCdXR0b24oKVxuICAgICAgICB0aGlzLmFkZFByaXZhdGVDb21tZW50V2lkZ2V0KClcbiAgICB9XG5cbiAgICBhZGRQcml2YXRlQ29tbWVudFdpZGdldCgpIHtcbiAgICAgICAgY29uc3Qgd2lkZ2V0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKVxuICAgICAgICB3aWRnZXQuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJibG9ja1wiKVxuICAgICAgICBjb25zdCBoZWFkZXIgPSBcIjxoMiBjbGFzcz0ncHJvZmlsZS1oZWFkZXInPtCf0YDQuNCy0LDRgtC90YvQtSDQutC+0LzQvNC10L3RgtCw0YDQuNC4PC9oMj5cIlxuICAgICAgICBjb25zdCB0ZXh0YXJlYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZXh0YXJlYVwiKVxuICAgICAgICB0ZXh0YXJlYS52YWx1ZSA9IFByaXZhdGVDb21tZW50c1N0b3JhZ2UuZ2V0Q29tbWVudCh0aGlzLnVzZXIgfHwgXCJcIilcbiAgICAgICAgdGV4dGFyZWEuYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsICh0ZXh0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBjb21tZW50ID0gdGV4dC50YXJnZXQudmFsdWVcbiAgICAgICAgICAgIFByaXZhdGVDb21tZW50c1N0b3JhZ2Uuc2V0Q29tbWVudCh0aGlzLnVzZXIsIGNvbW1lbnQpXG4gICAgICAgIH0pXG4gICAgICAgIHdpZGdldC5pbm5lckhUTUwgPSBoZWFkZXJcbiAgICAgICAgd2lkZ2V0LmFwcGVuZENoaWxkKHRleHRhcmVhKVxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2ZpbGUtc3RhdHVzZXNcIikuYXBwZW5kQ2hpbGQod2lkZ2V0KVxuICAgIH1cblxuICAgIGFkZEFzc2hvbGVCdXR0b24oKSB7XG4gICAgICAgIGNvbnN0IHBhcnNlciA9IG5ldyBET01QYXJzZXIoKTtcbiAgICAgICAgY29uc3QgYXNzaG9sZUJ0blN0ciA9IGA8YSBjbGFzcz1cInByb2ZpbGUtc3RhdHVzIGNsaWNrYWJsZVwiPjxzcGFuIGNsYXNzPVwicHJvZmlsZS1zdGF0dXMtaWNvblwiPvCflpU8L3NwYW4+IDxzcGFuIGNsYXNzPVwicHJvZmlsZS1zdGF0dXMtc3RhdHVzXCI+0JTQvtCx0LDQstC40YLRjCDQsiDQvNC+0Lgg0LzRg9C00LDQutC4PC9zcGFuPjwvYT5gXG4gICAgICAgIGNvbnN0IGFzc2hvbGVCdG4gPSBwYXJzZXIucGFyc2VGcm9tU3RyaW5nKGFzc2hvbGVCdG5TdHIsICd0ZXh0L2h0bWwnKS5xdWVyeVNlbGVjdG9yKFwiYVwiKTtcbiAgICAgICAgYXNzaG9sZUJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICAgICAgQXNzaG9sZXNTdG9yYWdlLmFkZEFzc2hvbGUodGhpcy5nZXRVc2VyKCkpXG4gICAgICAgIH0pXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvZmlsZS1zdGF0dXNlc1wiKS5hcHBlbmRDaGlsZChhc3Nob2xlQnRuKVxuICAgICAgICBpZiAodGhpcy5pc1VzZXJBc3Nob2xlKHRoaXMuZ2V0VXNlcigpKSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJ0aGUgdXNlciBpcyBhbiBhc3Nob2xlIVwiKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJldHVybnMge3N0cmluZ31cbiAgICAgKi9cbiAgICAgZ2V0VXNlcigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGF0aG5hbWUuc3BsaXQoJy8nKS5maWx0ZXIoKGEpID0+IGEpLnBvcCgpXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHVzZXJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBpc1VzZXJBc3Nob2xlKHVzZXIpIHtcbiAgICAgICAgcmV0dXJuIEFzc2hvbGVzU3RvcmFnZS5nZXRBc3Nob2xlcygpLmluY2x1ZGVzKHVzZXIpXG4gICAgfVxufSIsImltcG9ydCB7Y3JlYXRlU3RvcmFnZUlmTm90RXhpc3RzfSBmcm9tIFwiLi9TdG9yYWdlXCI7XG5cbmNvbnN0IEFTU0hPTEVTX1NUT1JBR0VfS0VZID0gJ2Fzc2hvbGVzJztcbmNyZWF0ZVN0b3JhZ2VJZk5vdEV4aXN0cyhBU1NIT0xFU19TVE9SQUdFX0tFWSwgW10pXG5cbmV4cG9ydCBjbGFzcyBBc3Nob2xlc1N0b3JhZ2Uge1xuXG4gICAgc3RhdGljIGdldEFzc2hvbGVzVGV4dCgpIHtcbiAgICAgICAgcmV0dXJuIGxvY2FsU3RvcmFnZS5nZXRJdGVtKEFTU0hPTEVTX1NUT1JBR0VfS0VZKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtzdHJpbmdbXX1cbiAgICAgKi9cbiAgICBzdGF0aWMgZ2V0QXNzaG9sZXMoKSB7XG4gICAgICAgIHJldHVybiBBc3Nob2xlc1N0b3JhZ2UuZ2V0QXNzaG9sZXNUZXh0KCkuc3BsaXQoJywnKSB8fCBbXTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBhc3Nob2xlc1RleHRcbiAgICAgKi9cbiAgICBzdGF0aWMgc2V0QXNzaG9sZXNUZXh0KGFzc2hvbGVzVGV4dCkge1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShBU1NIT0xFU19TVE9SQUdFX0tFWSwgYXNzaG9sZXNUZXh0KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBhc3Nob2xlXG4gICAgICovXG4gICAgc3RhdGljIGFkZEFzc2hvbGUoYXNzaG9sZSkge1xuICAgICAgICBjb25zdCBhc3Nob2xlcyA9IHRoaXMuZ2V0QXNzaG9sZXMoKTtcbiAgICAgICAgaWYgKGFzc2hvbGVzLmluY2x1ZGVzKGFzc2hvbGUpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgYXNzaG9sZXMucHVzaChhc3Nob2xlKTtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oQVNTSE9MRVNfU1RPUkFHRV9LRVksIGFzc2hvbGVzLmpvaW4oJywnKSk7XG4gICAgfVxufSIsImltcG9ydCB7Y3JlYXRlU3RvcmFnZUlmTm90RXhpc3RzfSBmcm9tIFwiLi9TdG9yYWdlXCI7XG5cbmNvbnN0IEJMQUNLTElTVF9TVE9SQUdFX0tFWSA9ICdibGFja2xpc3QnO1xuXG5jcmVhdGVTdG9yYWdlSWZOb3RFeGlzdHMoQkxBQ0tMSVNUX1NUT1JBR0VfS0VZLCBbXSlcblxuZXhwb3J0IGNsYXNzIEJsYWNrbGlzdFN0b3JhZ2Uge1xuICAgIHN0YXRpYyBnZXRCbGFja2xpc3RUZXh0KCkge1xuICAgICAgICByZXR1cm4gbG9jYWxTdG9yYWdlLmdldEl0ZW0oQkxBQ0tMSVNUX1NUT1JBR0VfS0VZKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtzdHJpbmdbXX1cbiAgICAgKi9cbiAgICBzdGF0aWMgZ2V0QmxhY2tsaXN0KCkge1xuICAgICAgICByZXR1cm4gQmxhY2tsaXN0U3RvcmFnZS5nZXRCbGFja2xpc3RUZXh0KCkuc3BsaXQoJywnKSB8fCBbXTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0XG4gICAgICovXG4gICAgc3RhdGljIHNldEJsYWNrbGlzdFRleHQodGV4dCkge1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShCTEFDS0xJU1RfU1RPUkFHRV9LRVksIHRleHQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHBhZ2VcbiAgICAgKi9cbiAgICBzdGF0aWMgYWRkUGFnZShwYWdlKSB7XG4gICAgICAgIGNvbnN0IGxpc3QgPSB0aGlzLmdldEJsYWNrbGlzdCgpO1xuICAgICAgICBpZiAobGlzdC5pbmNsdWRlcyhwYWdlKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGxpc3QucHVzaChwYWdlKTtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oQkxBQ0tMSVNUX1NUT1JBR0VfS0VZLCBsaXN0KTtcbiAgICB9XG59IiwiaW1wb3J0IHtjcmVhdGVTdG9yYWdlSWZOb3RFeGlzdHN9IGZyb20gXCIuL1N0b3JhZ2VcIjtcblxuY29uc3QgUFJJVkFURV9DT01NRU5UU19LRVkgPSAncHJpdmF0ZS1jb21tZW50cyc7XG5cbmNyZWF0ZVN0b3JhZ2VJZk5vdEV4aXN0cyhQUklWQVRFX0NPTU1FTlRTX0tFWSwge30pXG5cbmV4cG9ydCBjbGFzcyBQcml2YXRlQ29tbWVudHNTdG9yYWdlIHtcbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB1c2VyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGNvbW1lbnRcbiAgICAgKi9cbiAgICBzdGF0aWMgc2V0Q29tbWVudCh1c2VyLCBjb21tZW50KSB7XG4gICAgICAgIGNvbnN0IGNvbW1lbnRzID0gUHJpdmF0ZUNvbW1lbnRzU3RvcmFnZS5nZXRDb21tZW50cygpO1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShQUklWQVRFX0NPTU1FTlRTX0tFWSwgSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgLi4uY29tbWVudHMsXG4gICAgICAgICAgICBbdXNlcl06IGNvbW1lbnRcbiAgICAgICAgfSkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHVzZXJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgICAqL1xuICAgIHN0YXRpYyBnZXRDb21tZW50KHVzZXIpIHtcbiAgICAgICAgY29uc3QgdXNlckNvbW1lbnQgPSBQcml2YXRlQ29tbWVudHNTdG9yYWdlLmdldENvbW1lbnRzKClcbiAgICAgICAgaWYgKCF1c2VyQ29tbWVudCkge1xuICAgICAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgdGV4dFByaXZhdGVDb21tZW50c09iaiA9ICB0aGlzLmdldENvbW1lbnRzKClcbiAgICAgICAgcmV0dXJuIHRleHRQcml2YXRlQ29tbWVudHNPYmpbdXNlcl0gfHwgXCJcIjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyB7T2JqZWN0fVxuICAgICAqL1xuICAgIHN0YXRpYyBnZXRDb21tZW50cygpIHtcbiAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oUFJJVkFURV9DT01NRU5UU19LRVkpIHx8IFwie31cIikgfHwge31cbiAgICB9XG59IiwiaW1wb3J0IHtjcmVhdGVTdG9yYWdlSWZOb3RFeGlzdHN9IGZyb20gXCIuL1N0b3JhZ2VcIjtcblxuY29uc3QgUFJPVEVDVEVEX0NPTU1FTlRTX1NUT1JBR0VfS0VZID0gXCJwcm90ZWN0ZWRDb21tZW50c1wiXG5cbmNyZWF0ZVN0b3JhZ2VJZk5vdEV4aXN0cyhQUk9URUNURURfQ09NTUVOVFNfU1RPUkFHRV9LRVksIHt9KVxuXG5leHBvcnQgY2xhc3MgUHJvdGVjdGVkQ29tbWVudHNTdG9yYWdlIHtcbiAgICBzdGF0aWMgZ2V0U3RvcmFnZSgpIHtcbiAgICAgICAgaWYgKCFsb2NhbFN0b3JhZ2UuZ2V0SXRlbShQUk9URUNURURfQ09NTUVOVFNfU1RPUkFHRV9LRVkpKSB7XG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShQUk9URUNURURfQ09NTUVOVFNfU1RPUkFHRV9LRVksIEpTT04uc3RyaW5naWZ5KHt9KSlcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShQUk9URUNURURfQ09NTUVOVFNfU1RPUkFHRV9LRVkpKVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHBhZ2VJZFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwYWdlU3RvcmFnZVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgc3RhdGljIF93cml0ZVN0b3JhZ2UocGFnZUlkLCBwYWdlU3RvcmFnZSkge1xuICAgICAgICBjb25zdCBzdG9yYWdlT2JqID0gUHJvdGVjdGVkQ29tbWVudHNTdG9yYWdlLmdldFN0b3JhZ2UoKVxuICAgICAgICBjb25zdCBuZXdTdG9yYWdlT2JqID0ge1xuICAgICAgICAgICAgLi4uc3RvcmFnZU9iaixcbiAgICAgICAgICAgIFtwYWdlSWRdOiBwYWdlU3RvcmFnZVxuICAgICAgICB9XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFBST1RFQ1RFRF9DT01NRU5UU19TVE9SQUdFX0tFWSwgSlNPTi5zdHJpbmdpZnkobmV3U3RvcmFnZU9iaiwgbnVsbCwgMikpXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcGFnZUlkXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGNvbW1lbnRJZFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjb21tZW50VGV4dFxuICAgICAqL1xuICAgIHN0YXRpYyBhZGRDb21tZW50KHBhZ2VJZCwgY29tbWVudElkLCBjb21tZW50VGV4dCkge1xuICAgICAgICBjb25zdCBwYWdlU3RvcmFnZSA9IHRoaXMuZ2V0U3RvcmFnZSgpW3BhZ2VJZF0gfHwge31cbiAgICAgICAgcGFnZVN0b3JhZ2VbY29tbWVudElkXSA9IGNvbW1lbnRUZXh0XG4gICAgICAgIHRoaXMuX3dyaXRlU3RvcmFnZShwYWdlSWQsIHBhZ2VTdG9yYWdlKVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHBhZ2VJZFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjb21tZW50SWRcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfHVuZGVmaW5lZH1cbiAgICAgKi9cbiAgICBzdGF0aWMgZ2V0Q29tbWVudChwYWdlSWQsIGNvbW1lbnRJZCkge1xuICAgICAgICBjb25zdCBwYWdlU3RvcmFnZSA9IHRoaXMuZ2V0U3RvcmFnZSgpW3BhZ2VJZF0gfHwge31cbiAgICAgICAgcmV0dXJuIHBhZ2VTdG9yYWdlW2NvbW1lbnRJZF1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwYWdlSWRcbiAgICAgKiBAcmV0dXJucyB7T2JqZWN0fVxuICAgICAqL1xuICAgIHN0YXRpYyBnZXRBbGxDb21tZW50cyhwYWdlSWQpIHtcbiAgICAgICAgY29uc3QgcGFnZVN0b3JhZ2UgPSB0aGlzLmdldFN0b3JhZ2UoKVtwYWdlSWRdIHx8IHt9XG4gICAgICAgIHJldHVybiBwYWdlU3RvcmFnZVxuICAgIH1cblxufSIsImV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTdG9yYWdlSWZOb3RFeGlzdHMoa2V5LCBpbml0VmFsdWU9e30pIHtcbiAgICBpZiAoIWxvY2FsU3RvcmFnZS5nZXRJdGVtKGtleSkpIHtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oa2V5LCBKU09OLnN0cmluZ2lmeShpbml0VmFsdWUpKTtcbiAgICB9XG59IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQge1BhZ2VGYWN0b3J5fSBmcm9tIFwiLi9QYWdlRmFjdG9yeVwiO1xuaW1wb3J0IHtwcmludEV4dGVuc2lvbkluZm99IGZyb20gXCIuL2Z1bmN0aW9uc1wiO1xuXG5wcmludEV4dGVuc2lvbkluZm8oKVxuY29uc3QgcGFnZUZhY3RvcnkgPSBuZXcgUGFnZUZhY3RvcnkobG9jYXRpb24ucGF0aG5hbWUpXG5jb25zdCBwYWdlID0gcGFnZUZhY3RvcnkuY3JlYXRlKClcbnBhZ2UubW9kaWZ5Q29udGVudCgpXG5cblxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9