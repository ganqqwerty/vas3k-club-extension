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
        const contentTypes = [ "post", "question", "link",  "idea", "battle", "event", "project", "guide", "thread"]
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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UUFBUTtBQUN2QixlQUFlLFFBQVE7QUFDdkIsZUFBZSxRQUFRO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxRQUFRO0FBQ3ZCLGVBQWUsUUFBUTtBQUN2QixpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxRQUFRO0FBQ3ZCLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7OztBQzlETyxtREFBbUQ7QUFDMUQ7QUFDQTtBQUNBO0FBQ0E7Ozs7OztVQ0pBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7O0FDTjBDO0FBQ0s7O0FBRS9DLDhEQUFrQjtBQUNsQix3QkFBd0IscURBQVc7QUFDbkM7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3ZhczNrLWNsdWItZXh0ZW5zaW9uLy4vc3JjL1BhZ2VGYWN0b3J5LmpzIiwid2VicGFjazovL3ZhczNrLWNsdWItZXh0ZW5zaW9uLy4vc3JjL2Z1bmN0aW9ucy5qcyIsIndlYnBhY2s6Ly92YXMzay1jbHViLWV4dGVuc2lvbi8uL3NyYy9wYWdlcy9GZWVkUGFnZS5qcyIsIndlYnBhY2s6Ly92YXMzay1jbHViLWV4dGVuc2lvbi8uL3NyYy9wYWdlcy9Pd25Vc2VyUGFnZS5qcyIsIndlYnBhY2s6Ly92YXMzay1jbHViLWV4dGVuc2lvbi8uL3NyYy9wYWdlcy9QYWdlLmpzIiwid2VicGFjazovL3ZhczNrLWNsdWItZXh0ZW5zaW9uLy4vc3JjL3BhZ2VzL1Bvc3RQYWdlLmpzIiwid2VicGFjazovL3ZhczNrLWNsdWItZXh0ZW5zaW9uLy4vc3JjL3BhZ2VzL1VzZXJQYWdlLmpzIiwid2VicGFjazovL3ZhczNrLWNsdWItZXh0ZW5zaW9uLy4vc3JjL3N0b3JhZ2UvQXNzaG9sZXNTdG9yYWdlLmpzIiwid2VicGFjazovL3ZhczNrLWNsdWItZXh0ZW5zaW9uLy4vc3JjL3N0b3JhZ2UvQmxhY2tsaXN0U3RvcmFnZS5qcyIsIndlYnBhY2s6Ly92YXMzay1jbHViLWV4dGVuc2lvbi8uL3NyYy9zdG9yYWdlL1ByaXZhdGVDb21tZW50c1N0b3JhZ2UuanMiLCJ3ZWJwYWNrOi8vdmFzM2stY2x1Yi1leHRlbnNpb24vLi9zcmMvc3RvcmFnZS9Qcm90ZWN0ZWRDb21tZW50c1N0b3JhZ2UuanMiLCJ3ZWJwYWNrOi8vdmFzM2stY2x1Yi1leHRlbnNpb24vLi9zcmMvc3RvcmFnZS9TdG9yYWdlLmpzIiwid2VicGFjazovL3ZhczNrLWNsdWItZXh0ZW5zaW9uL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3ZhczNrLWNsdWItZXh0ZW5zaW9uL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly92YXMzay1jbHViLWV4dGVuc2lvbi93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3ZhczNrLWNsdWItZXh0ZW5zaW9uL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdmFzM2stY2x1Yi1leHRlbnNpb24vLi9zcmMvbWFpbi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2dldFVzZXJ9IGZyb20gXCIuL2Z1bmN0aW9uc1wiO1xuaW1wb3J0IHtVc2VyUGFnZX0gZnJvbSBcIi4vcGFnZXMvVXNlclBhZ2VcIjtcbmltcG9ydCB7T3duVXNlclBhZ2V9IGZyb20gXCIuL3BhZ2VzL093blVzZXJQYWdlXCI7XG5pbXBvcnQge1Bvc3RQYWdlfSBmcm9tIFwiLi9wYWdlcy9Qb3N0UGFnZVwiO1xuaW1wb3J0IHtQYWdlfSBmcm9tIFwiLi9wYWdlcy9QYWdlXCI7XG5pbXBvcnQge0ZlZWRQYWdlfSBmcm9tIFwiLi9wYWdlcy9GZWVkUGFnZVwiO1xuXG5leHBvcnQgY2xhc3MgUGFnZUZhY3Rvcnkge1xuICAgIGNvbnN0cnVjdG9yKHBhdGhuYW1lKSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5wYXRobmFtZSA9IHBhdGhuYW1lO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5wYWdlVHlwZSA9IHRoaXMuZ2V0UGFnZVR5cGUoKVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHJldHVybnMge1BhZ2V9XG4gICAgICovXG4gICAgY3JlYXRlKCkge1xuXG4gICAgICAgIGlmICh0aGlzLmlzVXNlclBhZ2VUeXBlKCkpIHtcbiAgICAgICAgICAgIGlmIChnZXRVc2VyKCkgPT09IHRoaXMuZ2V0V2hvQW1JKCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IE93blVzZXJQYWdlKHRoaXMucGF0aG5hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG5ldyBVc2VyUGFnZSh0aGlzLnBhdGhuYW1lKVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuaXNVc2VyQ29udGVudFBhZ2VUeXBlKCkpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgUG9zdFBhZ2UodGhpcy5wYXRobmFtZSlcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5pc0ZlZWRQYWdlKCkpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRmVlZFBhZ2UodGhpcy5wYXRobmFtZSlcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3IFBhZ2UodGhpcy5wYXRobmFtZSlcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBpc0ZlZWRQYWdlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wYWdlVHlwZSA9PT0gJ2FsbCcgfHwgdGhpcy5wYXRobmFtZSA9PT0gJy8nXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgaXNVc2VyQ29udGVudFBhZ2VUeXBlKCkge1xuICAgICAgICBjb25zdCBjb250ZW50VHlwZXMgPSBbIFwicG9zdFwiLCBcInF1ZXN0aW9uXCIsIFwibGlua1wiLCAgXCJpZGVhXCIsIFwiYmF0dGxlXCIsIFwiZXZlbnRcIiwgXCJwcm9qZWN0XCIsIFwiZ3VpZGVcIiwgXCJ0aHJlYWRcIl1cbiAgICAgICAgcmV0dXJuIGNvbnRlbnRUeXBlcy5pbmNsdWRlcyh0aGlzLnBhZ2VUeXBlKVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIGlzVXNlclBhZ2VUeXBlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wYWdlVHlwZSA9PT0gXCJ1c2VyXCJcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgICAqL1xuICAgIGdldFBhZ2VUeXBlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wYXRobmFtZVxuICAgICAgICAgICAgLnNwbGl0KCcvJylcbiAgICAgICAgICAgIC5maWx0ZXIoYSA9PiBhKVswXVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAgICovXG4gICAgZ2V0V2hvQW1JKCkge1xuICAgICAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tZW51LXJpZ2h0PmEuYXZhdGFyXCIpXG4gICAgICAgICAgICAuZ2V0QXR0cmlidXRlKFwiaHJlZlwiKVxuICAgICAgICAgICAgLnNwbGl0KCcvJylcbiAgICAgICAgICAgIC5maWx0ZXIoYSA9PiBhKVxuICAgICAgICAgICAgLnBvcCgpXG4gICAgfVxufSIsIi8qKlxuICogQHJldHVybnMge3N0cmluZ31cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFVzZXIoKSB7XG4gICAgcmV0dXJuIGRvY3VtZW50LmxvY2F0aW9uLnBhdGhuYW1lLnNwbGl0KCcvJykuZmlsdGVyKChhKSA9PiBhKS5wb3AoKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gaGlkZVZvdGVzUmF0aW5nc0F2YXRhcnMoKSB7XG4gICAgY29uc3QgZGlzdHJhY3RlZEVsZW1lbnRzU2VsZWN0b3JzID0gW1xuICAgICAgICAnLnVwdm90ZScsXG4gICAgICAgICcudXB2b3RlLXZvdGVkJyxcbiAgICAgICAgJy51cHZvdGUtdHlwZS1pbmxpbmUnLFxuICAgICAgICAnLmNvbW1lbnQtcmF0aW5nJyxcbiAgICAgICAgJy5mZWVkLXBvc3QtY29tbWVudHMtdW5yZWFkJ1xuICAgIF1cblxuICAgIGZvciAoY29uc3Qgc2VsZWN0b3Igb2YgZGlzdHJhY3RlZEVsZW1lbnRzU2VsZWN0b3JzKSB7XG4gICAgICAgIGZvciAoY29uc3QgZWwgb2YgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcikpIHtcbiAgICAgICAgICAgIGVsLnJlbW92ZSgpXG4gICAgICAgIH1cbiAgICB9XG4gICAgZm9yIChjb25zdCBhdmF0YXIgb2YgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5hdmF0YXI+aW1nXCIpKSB7XG4gICAgICAgIGF2YXRhci5zZXRBdHRyaWJ1dGUoXCJzcmNcIiwgXCJodHRwczovL2kudmFzM2suY2x1Yi92LnBuZ1wiKVxuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHByaW50RXh0ZW5zaW9uSW5mbygpIHtcbiAgICBjb25zb2xlLmluZm8gKFwi0JLRgdC10Lwg0LHQvtGP0YLRjNGB0Y8hINCS0LDRgdGC0YDQuNC6LdGL0LrRgdGC0Y3QvdGI0YvQvSB2MS4wLjBcIilcbiAgICBjb25zb2xlLmxvZyhgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAobykobylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLyAgICAgXFxcXFxuICAgICAgICAgICAgICAgICAgICAgICAgIC8gICAgICAgfFxuICAgICAgICAgICAgICAgICAgICAgICAgLyAgIFxcXFwgICogfFxuICAgICAgICAgIF9fX19fX19fICAgICAvICAgIC9cXFxcX18vXG4gIF8gICAgICAvICAgICAgICBcXFxcICAgLyAgICAvXG4gLyBcXFxcICAgIC8gIF9fX18gICAgXFxcXF8vICAgIC9cbi8vXFxcXCBcXFxcICAvICAvICAgIFxcXFwgICAgICAgICAvXG5WICBcXFxcIFxcXFwvICAvICAgICAgXFxcXCAgICAgICAvXG4gICAgXFxcXF9fXy8gICAgICAgIFxcXFxfX19fXy9cbiAgICBgKVxufVxuXG5cbiIsImltcG9ydCB7UGFnZX0gZnJvbSBcIi4vUGFnZVwiO1xuaW1wb3J0IHtBc3Nob2xlc1N0b3JhZ2V9IGZyb20gXCIuLi9zdG9yYWdlL0Fzc2hvbGVzU3RvcmFnZVwiO1xuaW1wb3J0IHtCbGFja2xpc3RTdG9yYWdlfSBmcm9tIFwiLi4vc3RvcmFnZS9CbGFja2xpc3RTdG9yYWdlXCI7XG5cbmV4cG9ydCBjbGFzcyBGZWVkUGFnZSBleHRlbmRzIFBhZ2Uge1xuICAgIGNvbnN0cnVjdG9yKHBhdGhuYW1lKSB7XG4gICAgICAgIHN1cGVyKHBhdGhuYW1lKTtcbiAgICB9XG5cbiAgICBtb2RpZnlDb250ZW50KCkge1xuICAgICAgICB0aGlzLmhpZGVCbGFja2xpc3RlZFBvc3RzKClcbiAgICAgICAgdGhpcy5oaWRlQXNzaG9sZVBvc3RzKClcbiAgICAgICAgLy8gaGlkZVZvdGVzUmF0aW5nc0F2YXRhcnMoKVxuICAgICAgICB0aGlzLmFkZEJsYWNrbGlzdEJ1dHRvbigpXG5cbiAgICB9XG5cbiAgICBhZGRCbGFja2xpc3RCdXR0b24oKSB7XG4gICAgICAgIGNvbnN0IHBvc3RzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5mZWVkLXBvc3QtZm9vdGVyXCIpXG4gICAgICAgIHBvc3RzLmZvckVhY2gocG9zdCA9PiB7XG4gICAgICAgICAgICBjb25zdCBwYWdlSWQgPSBwb3N0LnF1ZXJ5U2VsZWN0b3IoXCJhLmZlZWQtcG9zdC1jb21tZW50c1wiKVxuICAgICAgICAgICAgICAgIC5nZXRBdHRyaWJ1dGUoXCJocmVmXCIpXG4gICAgICAgICAgICAgICAgLnNwbGl0KFwiL1wiKVxuICAgICAgICAgICAgICAgIC5zbGljZSgxLCAtMSlcbiAgICAgICAgICAgICAgICAuam9pbihcIi9cIilcbiAgICAgICAgICAgIGNvbnN0IGJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhXCIpXG4gICAgICAgICAgICBidXR0b24uaW5uZXJUZXh0ID0gXCLwn5mIXCJcbiAgICAgICAgICAgIGJ1dHRvbi5zZXRBdHRyaWJ1dGUoXCJ0aXRsZVwiLCBcItCh0LvRg9GI0LDQudGC0LUsINCwINC90YMg0LXQs9C+INC90LDRhdC10YAhXCIpXG4gICAgICAgICAgICBidXR0b24uY2xhc3NMaXN0LmFkZChcImZlZWQtcG9zdC1jb21tZW50c1wiKVxuICAgICAgICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgQmxhY2tsaXN0U3RvcmFnZS5hZGRQYWdlKHBhZ2VJZClcbiAgICAgICAgICAgICAgICBwb3N0LnBhcmVudEVsZW1lbnQucmVtb3ZlKClcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBwb3N0LmFwcGVuZENoaWxkKGJ1dHRvbilcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBoaWRlQXNzaG9sZVBvc3RzKCkge1xuICAgICAgICBmb3IgKGNvbnN0IGFzc2hvbGUgb2YgQXNzaG9sZXNTdG9yYWdlLmdldEFzc2hvbGVzKCkpIHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgYXNzaG9sZUhyZWYgb2YgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgW2hyZWY9XCIvdXNlci8ke2Fzc2hvbGV9L1wiXWApKSB7XG4gICAgICAgICAgICAgICAgYXNzaG9sZUhyZWZcbiAgICAgICAgICAgICAgICAgICAgLnBhcmVudEVsZW1lbnRcbiAgICAgICAgICAgICAgICAgICAgLnBhcmVudEVsZW1lbnRcbiAgICAgICAgICAgICAgICAgICAgLnJlbW92ZSgpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoaWRlQmxhY2tsaXN0ZWRQb3N0cygpIHtcbiAgICAgICAgY29uc3QgcmVmcyA9IEJsYWNrbGlzdFN0b3JhZ2UuZ2V0QmxhY2tsaXN0KClcbiAgICAgICAgZm9yIChjb25zdCByZWYgb2YgcmVmcykge1xuICAgICAgICAgICAgZm9yIChjb25zdCB0b3BpYyBvZiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGBhW2hyZWYqPVwiJHtyZWZ9XCJdYCkpIHtcbiAgICAgICAgICAgICAgICB0b3BpY1xuICAgICAgICAgICAgICAgICAgICAucGFyZW50RWxlbWVudFxuICAgICAgICAgICAgICAgICAgICAucGFyZW50RWxlbWVudFxuICAgICAgICAgICAgICAgICAgICAucmVtb3ZlKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuXG59IiwiaW1wb3J0IHtQYWdlfSBmcm9tIFwiLi9QYWdlXCI7XG5pbXBvcnQge0Fzc2hvbGVzU3RvcmFnZX0gZnJvbSBcIi4uL3N0b3JhZ2UvQXNzaG9sZXNTdG9yYWdlXCI7XG5pbXBvcnQge0JsYWNrbGlzdFN0b3JhZ2V9IGZyb20gXCIuLi9zdG9yYWdlL0JsYWNrbGlzdFN0b3JhZ2VcIjtcblxuZXhwb3J0IGNsYXNzIE93blVzZXJQYWdlIGV4dGVuZHMgUGFnZSB7XG4gICAgY29uc3RydWN0b3IocGF0aG5hbWUpIHtcbiAgICAgICAgc3VwZXIocGF0aG5hbWUpO1xuICAgIH1cblxuICAgIG1vZGlmeUNvbnRlbnQoKSB7XG4gICAgICAgIHRoaXMuYWRkQXNzaG9sZXNMaXN0KClcbiAgICB9XG5cbiAgICBjcmVhdGVBc3Nob2xlc0xpc3RFZGl0KCkge1xuICAgICAgICBjb25zdCB3aWRnZXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpXG4gICAgICAgIHdpZGdldC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImJsb2NrXCIpXG4gICAgICAgIGNvbnN0IGhlYWRlciA9IFwiPGgyIGNsYXNzPSdwcm9maWxlLWhlYWRlcic+0JzQvtC4INC80YPQtNCw0LrQuDwvaDI+XCJcbiAgICAgICAgY29uc3QgdGV4dEFyZWEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGV4dGFyZWFcIilcbiAgICAgICAgdGV4dEFyZWEuc3R5bGUud2lkdGggPSBcIjEwMCVcIlxuICAgICAgICB0ZXh0QXJlYS52YWx1ZSA9IEFzc2hvbGVzU3RvcmFnZS5nZXRBc3Nob2xlc1RleHQoKVxuICAgICAgICB0ZXh0QXJlYS5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgKCkgPT4gQXNzaG9sZXNTdG9yYWdlLnNldEFzc2hvbGVzVGV4dCh0ZXh0QXJlYS52YWx1ZSkpXG4gICAgICAgIHdpZGdldC5pbnNlcnRBZGphY2VudEhUTUwoXCJhZnRlcmJlZ2luXCIsIGhlYWRlcilcbiAgICAgICAgd2lkZ2V0LmFwcGVuZENoaWxkKHRleHRBcmVhKVxuICAgICAgICByZXR1cm4gd2lkZ2V0XG4gICAgfVxuXG4gICAgY3JlYXRlQmxhY2tsaXN0RWRpdCgpIHtcbiAgICAgICAgY29uc3Qgd2lkZ2V0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKVxuICAgICAgICB3aWRnZXQuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJibG9ja1wiKVxuICAgICAgICBjb25zdCBoZWFkZXIgPSBcIjxoMiBjbGFzcz0ncHJvZmlsZS1oZWFkZXInPtCn0LXRgNC90YvQuSDRgdC/0LjRgdC+0Log0YHRgtGA0LDQvdC40YY8L2gyPlwiXG4gICAgICAgIGNvbnN0IHRleHRBcmVhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRleHRhcmVhXCIpXG4gICAgICAgIHRleHRBcmVhLnN0eWxlLndpZHRoID0gXCIxMDAlXCJcbiAgICAgICAgdGV4dEFyZWEudmFsdWUgPSBCbGFja2xpc3RTdG9yYWdlLmdldEJsYWNrbGlzdFRleHQoKVxuICAgICAgICB0ZXh0QXJlYS5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgKCkgPT4gQmxhY2tsaXN0U3RvcmFnZS5zZXRCbGFja2xpc3RUZXh0KHRleHRBcmVhLnZhbHVlKSlcbiAgICAgICAgd2lkZ2V0Lmluc2VydEFkamFjZW50SFRNTChcImFmdGVyYmVnaW5cIiwgaGVhZGVyKVxuICAgICAgICB3aWRnZXQuYXBwZW5kQ2hpbGQodGV4dEFyZWEpXG4gICAgICAgIHJldHVybiB3aWRnZXRcbiAgICB9XG5cbiAgICBhZGRBc3Nob2xlc0xpc3QoKSB7XG4gICAgICAgIGNvbnN0IHByb2ZpbGVJbmZvID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2ZpbGUtaW50cm8nKVxuICAgICAgICBwcm9maWxlSW5mby5hcHBlbmRDaGlsZCggdGhpcy5jcmVhdGVBc3Nob2xlc0xpc3RFZGl0KCkpXG4gICAgICAgIHByb2ZpbGVJbmZvLmFwcGVuZENoaWxkKCB0aGlzLmNyZWF0ZUJsYWNrbGlzdEVkaXQoKSlcbiAgICB9XG5cbn0iLCJleHBvcnQgY2xhc3MgUGFnZSB7XG4gICAgY29uc3RydWN0b3IocGF0aG5hbWUpIHtcbiAgICAgICAgaWYgKCFwYXRobmFtZSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdwYXRobmFtZSBpcyByZXF1aXJlZCcpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucGF0aG5hbWUgPSBwYXRobmFtZTtcbiAgICB9XG5cbiAgICBtb2RpZnlDb250ZW50KCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIk5vdGhpbmcgaXMgaGFwcGVuZWQsIGl0J3MgYW4gdW5zcGVjaWZpZWQgcGFnZVwiKVxuICAgIH1cbn0iLCJpbXBvcnQge1BhZ2V9IGZyb20gXCIuL1BhZ2VcIjtcbmltcG9ydCB7QXNzaG9sZXNTdG9yYWdlfSBmcm9tIFwiLi4vc3RvcmFnZS9Bc3Nob2xlc1N0b3JhZ2VcIjtcbmltcG9ydCB7UHJvdGVjdGVkQ29tbWVudHNTdG9yYWdlfSBmcm9tIFwiLi4vc3RvcmFnZS9Qcm90ZWN0ZWRDb21tZW50c1N0b3JhZ2VcIjtcblxuZXhwb3J0IGNsYXNzIFBvc3RQYWdlIGV4dGVuZHMgUGFnZSB7XG4gICAgY29uc3RydWN0b3IodXJsKSB7XG4gICAgICAgIHN1cGVyKHVybCk7XG4gICAgfVxuXG4gICAgbW9kaWZ5Q29udGVudCgpIHtcbiAgICAgICAgdGhpcy5oaWRlQXNzaG9sZUNvbW1lbnRzKClcbiAgICAgICAgdGhpcy5tb3ZlUG9zdENvbW1lbnRGb3JtKClcbiAgICAgICAgdGhpcy5hZGRQcm90ZWN0Q29tbWVudEJ1dHRvbnMoKVxuICAgICAgICB0aGlzLmFkZFByb3RlY3RBbGxDb21tZW50QnV0dG9uKClcbiAgICAgICAgdGhpcy5yZXN0b3JlQ29tbWVudHMoKVxuICAgIH1cblxuICAgIGhpZGVBc3Nob2xlQ29tbWVudHMoKSB7XG4gICAgICAgIGZvciAoY29uc3QgYXNzaG9sZSBvZiBBc3Nob2xlc1N0b3JhZ2UuZ2V0QXNzaG9sZXMoKSkge1xuICAgICAgICAgICAgY29uc3Qgc2VsZWN0b3IgPSBgLmNvbW1lbnQtaGVhZGVyLWF1dGhvci1uYW1lW2hyZWY9XCIvdXNlci8ke2Fzc2hvbGV9L1wiXWBcbiAgICAgICAgICAgIGNvbnN0IG5vZGVzV2l0aEFzc2hvbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKVxuICAgICAgICAgICAgZm9yIChjb25zdCBhc3Nob2xlTm9kZSBvZiBub2Rlc1dpdGhBc3Nob2xlKSB7XG4gICAgICAgICAgICAgICAgYXNzaG9sZU5vZGVcbiAgICAgICAgICAgICAgICAgICAgLnBhcmVudEVsZW1lbnRcbiAgICAgICAgICAgICAgICAgICAgLnBhcmVudEVsZW1lbnRcbiAgICAgICAgICAgICAgICAgICAgLnBhcmVudEVsZW1lbnRcbiAgICAgICAgICAgICAgICAgICAgLnBhcmVudEVsZW1lbnRcbiAgICAgICAgICAgICAgICAgICAgLnJlbW92ZSgpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgbW92ZVBvc3RDb21tZW50Rm9ybSgpIHtcbiAgICAgICAgY29uc3QgcG9zdENvbW1lbnRGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Bvc3QtY29tbWVudHMtZm9ybScpXG4gICAgICAgIGNvbnN0IGNvbW1lbnRzTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wb3N0LWNvbW1lbnRzLWxpc3QnKVxuICAgICAgICBjb25zdCBwb3N0Q29tbWVudHNSdWxlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wb3N0LWNvbW1lbnRzLXJ1bGVzJylcbiAgICAgICAgY29uc3QgcGFyZW50ID0gY29tbWVudHNMaXN0LnBhcmVudEVsZW1lbnRcbiAgICAgICAgcGFyZW50Lmluc2VydEJlZm9yZShwb3N0Q29tbWVudEZvcm0sIGNvbW1lbnRzTGlzdClcbiAgICAgICAgcGFyZW50Lmluc2VydEJlZm9yZShwb3N0Q29tbWVudHNSdWxlcywgY29tbWVudHNMaXN0KVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjb21tZW50SWRcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgICAqL1xuICAgIGdldENvbW1lbnRUZXh0KGNvbW1lbnRJZCkge1xuICAgICAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgIyR7Y29tbWVudElkfSAudGV4dC1ib2R5LXR5cGUtY29tbWVudGApLmlubmVySFRNTFxuICAgIH1cblxuICAgIC8vc2F2ZXMgdGhlIGNvbW1lbnQgdG8gdGhlIGxvY2FsIHN0b3JhZ2VcbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjb21tZW50SWRcbiAgICAgKi9cbiAgICBwcm90ZWN0Q29tbWVudChjb21tZW50SWQpIHtcbiAgICAgICAgUHJvdGVjdGVkQ29tbWVudHNTdG9yYWdlLmFkZENvbW1lbnQodGhpcy5wYXRobmFtZSwgY29tbWVudElkLCB0aGlzLmdldENvbW1lbnRUZXh0KGNvbW1lbnRJZCkpXG4gICAgfVxuXG4gICAgcHJvdGVjdEFsbENvbW1lbnRzKCkge1xuICAgICAgICBjb25zdCBjb21tZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIudGV4dC1ib2R5LXR5cGUtY29tbWVudFwiKVxuICAgICAgICBmb3IgKGNvbnN0IGNvbW1lbnQgb2YgY29tbWVudHMpIHtcbiAgICAgICAgICAgIHRoaXMucHJvdGVjdENvbW1lbnQoY29tbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQuaWQpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXN0b3JlQ29tbWVudHMoKSB7XG4gICAgICAgIGNvbnN0IGRlbGV0ZWRDb21tZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuY29tbWVudC10ZXh0LWRlbGV0ZWRcIilcbiAgICAgICAgZm9yIChjb25zdCBkZWxldGVkQ29tbWVudCBvZiBkZWxldGVkQ29tbWVudHMpIHtcbiAgICAgICAgICAgdGhpcy5yZXN0b3JlQ29tbWVudChkZWxldGVkQ29tbWVudClcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtFbGVtZW50fSBkZWxldGVkQ29tbWVudFxuICAgICAqL1xuICAgIHJlc3RvcmVDb21tZW50KGRlbGV0ZWRDb21tZW50KSB7XG4gICAgICAgIGNvbnN0IGNvbW1lbnRJZCA9IGRlbGV0ZWRDb21tZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LmlkXG4gICAgICAgIGNvbnN0IGNvbW1lbnRUZXh0ID0gUHJvdGVjdGVkQ29tbWVudHNTdG9yYWdlLmdldENvbW1lbnQodGhpcy5wYXRobmFtZSwgY29tbWVudElkKVxuICAgICAgICBpZiAoY29tbWVudFRleHQpIHtcbiAgICAgICAgICAgIGRlbGV0ZWRDb21tZW50LmlubmVySFRNTCA9IGNvbW1lbnRUZXh0XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhZGRQcm90ZWN0QWxsQ29tbWVudEJ1dHRvbigpIHtcbiAgICAgICAgY29uc3QgYnV0dG9uID0gdGhpcy5jcmVhdGVCdXR0b24oKVxuICAgICAgICBidXR0b24uc2V0QXR0cmlidXRlKFwidGl0bGVcIiwgXCLQl9Cw0YnQuNGC0LjRgtGMINCy0YHQtSDQutC+0LzQvNC10L3RgtCw0YDQuNC4INC+0YIg0YPQtNCw0LvQtdC90LjRj1wiKVxuICAgICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnByb3RlY3RBbGxDb21tZW50cygpXG4gICAgICAgIH0pXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wb3N0LWFjdGlvbnMtbGluZScpLmFwcGVuZENoaWxkKGJ1dHRvbilcbiAgICB9XG5cbiAgICBhZGRQcm90ZWN0Q29tbWVudEJ1dHRvbnMoKSB7XG4gICAgICAgIGNvbnN0IHJlcGx5RWxlbWVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY29tbWVudC1oZWFkZXItYmFkZ2VzJylcbiAgICAgICAgY29uc29sZS5sb2cocmVwbHlFbGVtZW50cylcbiAgICAgICAgZm9yIChjb25zdCByZXBseUVsZW1lbnQgb2YgcmVwbHlFbGVtZW50cykge1xuICAgICAgICAgICAgY29uc3QgYnV0dG9uID0gdGhpcy5jcmVhdGVCdXR0b24oKTtcbiAgICAgICAgICAgIGJ1dHRvbi5zZXRBdHRyaWJ1dGUoXCJ0aXRsZVwiLCBcItCX0LDRidC40YLQuNGC0Ywg0LrQvtC80LzQtdC90YIg0L7RgiDRg9C00LDQu9C10L3QuNGPXCIpXG4gICAgICAgICAgICBjb25zdCBzZWxmID0gdGhpc1xuICAgICAgICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbihldnQpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBjb21tZW50SWQgPSB0aGlzLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LmlkXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJibGFhYVwiLCBjb21tZW50SWQpXG4gICAgICAgICAgICAgICAgc2VsZi5wcm90ZWN0Q29tbWVudChjb21tZW50SWQpXG5cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICByZXBseUVsZW1lbnQuYXBwZW5kQ2hpbGQoYnV0dG9uKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY3JlYXRlQnV0dG9uKCkge1xuICAgICAgICBjb25zdCBidXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaVwiKVxuICAgICAgICBidXR0b24uc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJmYXMgZmEtY2xvdWQtZG93bmxvYWQtYWx0XCIpXG4gICAgICAgIGJ1dHRvbi5zdHlsZS5jdXJzb3IgPSAncG9pbnRlcic7XG4gICAgICAgIHJldHVybiBidXR0b247XG4gICAgfVxuXG59XG4iLCJpbXBvcnQge1BhZ2V9IGZyb20gXCIuL1BhZ2VcIjtcbmltcG9ydCB7QXNzaG9sZXNTdG9yYWdlfSBmcm9tIFwiLi4vc3RvcmFnZS9Bc3Nob2xlc1N0b3JhZ2VcIjtcbmltcG9ydCB7UHJpdmF0ZUNvbW1lbnRzU3RvcmFnZX0gZnJvbSBcIi4uL3N0b3JhZ2UvUHJpdmF0ZUNvbW1lbnRzU3RvcmFnZVwiO1xuXG5leHBvcnQgY2xhc3MgVXNlclBhZ2UgZXh0ZW5kcyBQYWdlIHtcbiAgICBjb25zdHJ1Y3Rvcih1cmwpIHtcbiAgICAgICAgc3VwZXIodXJsKTtcbiAgICAgICAgdGhpcy51c2VyID0gdGhpcy5nZXRVc2VyKCk7XG4gICAgfVxuXG4gICAgbW9kaWZ5Q29udGVudCgpIHtcbiAgICAgICAgdGhpcy5hZGRBc3Nob2xlQnV0dG9uKClcbiAgICAgICAgdGhpcy5hZGRQcml2YXRlQ29tbWVudFdpZGdldCgpXG4gICAgfVxuXG4gICAgYWRkUHJpdmF0ZUNvbW1lbnRXaWRnZXQoKSB7XG4gICAgICAgIGNvbnN0IHdpZGdldCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIilcbiAgICAgICAgd2lkZ2V0LnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwiYmxvY2tcIilcbiAgICAgICAgY29uc3QgaGVhZGVyID0gXCI8aDIgY2xhc3M9J3Byb2ZpbGUtaGVhZGVyJz7Qn9GA0LjQstCw0YLQvdGL0LUg0LrQvtC80LzQtdC90YLQsNGA0LjQuDwvaDI+XCJcbiAgICAgICAgY29uc3QgdGV4dGFyZWEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGV4dGFyZWFcIilcbiAgICAgICAgdGV4dGFyZWEudmFsdWUgPSBQcml2YXRlQ29tbWVudHNTdG9yYWdlLmdldENvbW1lbnQodGhpcy51c2VyIHx8IFwiXCIpXG4gICAgICAgIHRleHRhcmVhLmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCAodGV4dCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgY29tbWVudCA9IHRleHQudGFyZ2V0LnZhbHVlXG4gICAgICAgICAgICBQcml2YXRlQ29tbWVudHNTdG9yYWdlLnNldENvbW1lbnQodGhpcy51c2VyLCBjb21tZW50KVxuICAgICAgICB9KVxuICAgICAgICB3aWRnZXQuaW5uZXJIVE1MID0gaGVhZGVyXG4gICAgICAgIHdpZGdldC5hcHBlbmRDaGlsZCh0ZXh0YXJlYSlcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9maWxlLXN0YXR1c2VzXCIpLmFwcGVuZENoaWxkKHdpZGdldClcbiAgICB9XG5cbiAgICBhZGRBc3Nob2xlQnV0dG9uKCkge1xuICAgICAgICBjb25zdCBwYXJzZXIgPSBuZXcgRE9NUGFyc2VyKCk7XG4gICAgICAgIGNvbnN0IGFzc2hvbGVCdG5TdHIgPSBgPGEgY2xhc3M9XCJwcm9maWxlLXN0YXR1cyBjbGlja2FibGVcIj48c3BhbiBjbGFzcz1cInByb2ZpbGUtc3RhdHVzLWljb25cIj7wn5aVPC9zcGFuPiA8c3BhbiBjbGFzcz1cInByb2ZpbGUtc3RhdHVzLXN0YXR1c1wiPtCU0L7QsdCw0LLQuNGC0Ywg0LIg0LzQvtC4INC80YPQtNCw0LrQuDwvc3Bhbj48L2E+YFxuICAgICAgICBjb25zdCBhc3Nob2xlQnRuID0gcGFyc2VyLnBhcnNlRnJvbVN0cmluZyhhc3Nob2xlQnRuU3RyLCAndGV4dC9odG1sJykucXVlcnlTZWxlY3RvcihcImFcIik7XG4gICAgICAgIGFzc2hvbGVCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgICAgIEFzc2hvbGVzU3RvcmFnZS5hZGRBc3Nob2xlKHRoaXMuZ2V0VXNlcigpKVxuICAgICAgICB9KVxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2ZpbGUtc3RhdHVzZXNcIikuYXBwZW5kQ2hpbGQoYXNzaG9sZUJ0bilcbiAgICAgICAgaWYgKHRoaXMuaXNVc2VyQXNzaG9sZSh0aGlzLmdldFVzZXIoKSkpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwidGhlIHVzZXIgaXMgYW4gYXNzaG9sZSFcIilcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAgICovXG4gICAgIGdldFVzZXIoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBhdGhuYW1lLnNwbGl0KCcvJykuZmlsdGVyKChhKSA9PiBhKS5wb3AoKVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB1c2VyXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgaXNVc2VyQXNzaG9sZSh1c2VyKSB7XG4gICAgICAgIHJldHVybiBBc3Nob2xlc1N0b3JhZ2UuZ2V0QXNzaG9sZXMoKS5pbmNsdWRlcyh1c2VyKVxuICAgIH1cbn0iLCJpbXBvcnQge2NyZWF0ZVN0b3JhZ2VJZk5vdEV4aXN0c30gZnJvbSBcIi4vU3RvcmFnZVwiO1xuXG5jb25zdCBBU1NIT0xFU19TVE9SQUdFX0tFWSA9ICdhc3Nob2xlcyc7XG5jcmVhdGVTdG9yYWdlSWZOb3RFeGlzdHMoQVNTSE9MRVNfU1RPUkFHRV9LRVksIFtdKVxuXG5leHBvcnQgY2xhc3MgQXNzaG9sZXNTdG9yYWdlIHtcblxuICAgIHN0YXRpYyBnZXRBc3Nob2xlc1RleHQoKSB7XG4gICAgICAgIHJldHVybiBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShBU1NIT0xFU19TVE9SQUdFX0tFWSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nW119XG4gICAgICovXG4gICAgc3RhdGljIGdldEFzc2hvbGVzKCkge1xuICAgICAgICByZXR1cm4gQXNzaG9sZXNTdG9yYWdlLmdldEFzc2hvbGVzVGV4dCgpLnNwbGl0KCcsJykgfHwgW107XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gYXNzaG9sZXNUZXh0XG4gICAgICovXG4gICAgc3RhdGljIHNldEFzc2hvbGVzVGV4dChhc3Nob2xlc1RleHQpIHtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oQVNTSE9MRVNfU1RPUkFHRV9LRVksIGFzc2hvbGVzVGV4dCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gYXNzaG9sZVxuICAgICAqL1xuICAgIHN0YXRpYyBhZGRBc3Nob2xlKGFzc2hvbGUpIHtcbiAgICAgICAgY29uc3QgYXNzaG9sZXMgPSB0aGlzLmdldEFzc2hvbGVzKCk7XG4gICAgICAgIGlmIChhc3Nob2xlcy5pbmNsdWRlcyhhc3Nob2xlKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGFzc2hvbGVzLnB1c2goYXNzaG9sZSk7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKEFTU0hPTEVTX1NUT1JBR0VfS0VZLCBhc3Nob2xlcy5qb2luKCcsJykpO1xuICAgIH1cbn0iLCJpbXBvcnQge2NyZWF0ZVN0b3JhZ2VJZk5vdEV4aXN0c30gZnJvbSBcIi4vU3RvcmFnZVwiO1xuXG5jb25zdCBCTEFDS0xJU1RfU1RPUkFHRV9LRVkgPSAnYmxhY2tsaXN0JztcblxuY3JlYXRlU3RvcmFnZUlmTm90RXhpc3RzKEJMQUNLTElTVF9TVE9SQUdFX0tFWSwgW10pXG5cbmV4cG9ydCBjbGFzcyBCbGFja2xpc3RTdG9yYWdlIHtcbiAgICBzdGF0aWMgZ2V0QmxhY2tsaXN0VGV4dCgpIHtcbiAgICAgICAgcmV0dXJuIGxvY2FsU3RvcmFnZS5nZXRJdGVtKEJMQUNLTElTVF9TVE9SQUdFX0tFWSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nW119XG4gICAgICovXG4gICAgc3RhdGljIGdldEJsYWNrbGlzdCgpIHtcbiAgICAgICAgcmV0dXJuIEJsYWNrbGlzdFN0b3JhZ2UuZ2V0QmxhY2tsaXN0VGV4dCgpLnNwbGl0KCcsJykgfHwgW107XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdGV4dFxuICAgICAqL1xuICAgIHN0YXRpYyBzZXRCbGFja2xpc3RUZXh0KHRleHQpIHtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oQkxBQ0tMSVNUX1NUT1JBR0VfS0VZLCB0ZXh0KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwYWdlXG4gICAgICovXG4gICAgc3RhdGljIGFkZFBhZ2UocGFnZSkge1xuICAgICAgICBjb25zdCBsaXN0ID0gdGhpcy5nZXRCbGFja2xpc3QoKTtcbiAgICAgICAgaWYgKGxpc3QuaW5jbHVkZXMocGFnZSkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBsaXN0LnB1c2gocGFnZSk7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKEJMQUNLTElTVF9TVE9SQUdFX0tFWSwgbGlzdCk7XG4gICAgfVxufSIsImltcG9ydCB7Y3JlYXRlU3RvcmFnZUlmTm90RXhpc3RzfSBmcm9tIFwiLi9TdG9yYWdlXCI7XG5cbmNvbnN0IFBSSVZBVEVfQ09NTUVOVFNfS0VZID0gJ3ByaXZhdGUtY29tbWVudHMnO1xuXG5jcmVhdGVTdG9yYWdlSWZOb3RFeGlzdHMoUFJJVkFURV9DT01NRU5UU19LRVksIHt9KVxuXG5leHBvcnQgY2xhc3MgUHJpdmF0ZUNvbW1lbnRzU3RvcmFnZSB7XG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdXNlclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjb21tZW50XG4gICAgICovXG4gICAgc3RhdGljIHNldENvbW1lbnQodXNlciwgY29tbWVudCkge1xuICAgICAgICBjb25zdCBjb21tZW50cyA9IFByaXZhdGVDb21tZW50c1N0b3JhZ2UuZ2V0Q29tbWVudHMoKTtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oUFJJVkFURV9DT01NRU5UU19LRVksIEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgIC4uLmNvbW1lbnRzLFxuICAgICAgICAgICAgW3VzZXJdOiBjb21tZW50XG4gICAgICAgIH0pKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB1c2VyXG4gICAgICogQHJldHVybnMge3N0cmluZ31cbiAgICAgKi9cbiAgICBzdGF0aWMgZ2V0Q29tbWVudCh1c2VyKSB7XG4gICAgICAgIGNvbnN0IHVzZXJDb21tZW50ID0gUHJpdmF0ZUNvbW1lbnRzU3RvcmFnZS5nZXRDb21tZW50cygpXG4gICAgICAgIGlmICghdXNlckNvbW1lbnQpIHtcbiAgICAgICAgICAgIHJldHVybiBcIlwiO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHRleHRQcml2YXRlQ29tbWVudHNPYmogPSAgdGhpcy5nZXRDb21tZW50cygpXG4gICAgICAgIHJldHVybiB0ZXh0UHJpdmF0ZUNvbW1lbnRzT2JqW3VzZXJdIHx8IFwiXCI7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJldHVybnMge09iamVjdH1cbiAgICAgKi9cbiAgICBzdGF0aWMgZ2V0Q29tbWVudHMoKSB7XG4gICAgICAgIHJldHVybiBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFBSSVZBVEVfQ09NTUVOVFNfS0VZKSB8fCBcInt9XCIpIHx8IHt9XG4gICAgfVxufSIsImltcG9ydCB7Y3JlYXRlU3RvcmFnZUlmTm90RXhpc3RzfSBmcm9tIFwiLi9TdG9yYWdlXCI7XG5cbmNvbnN0IFBST1RFQ1RFRF9DT01NRU5UU19TVE9SQUdFX0tFWSA9IFwicHJvdGVjdGVkQ29tbWVudHNcIlxuXG5jcmVhdGVTdG9yYWdlSWZOb3RFeGlzdHMoUFJPVEVDVEVEX0NPTU1FTlRTX1NUT1JBR0VfS0VZLCB7fSlcblxuZXhwb3J0IGNsYXNzIFByb3RlY3RlZENvbW1lbnRzU3RvcmFnZSB7XG4gICAgc3RhdGljIGdldFN0b3JhZ2UoKSB7XG4gICAgICAgIGlmICghbG9jYWxTdG9yYWdlLmdldEl0ZW0oUFJPVEVDVEVEX0NPTU1FTlRTX1NUT1JBR0VfS0VZKSkge1xuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oUFJPVEVDVEVEX0NPTU1FTlRTX1NUT1JBR0VfS0VZLCBKU09OLnN0cmluZ2lmeSh7fSkpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oUFJPVEVDVEVEX0NPTU1FTlRTX1NUT1JBR0VfS0VZKSlcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwYWdlSWRcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcGFnZVN0b3JhZ2VcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIHN0YXRpYyBfd3JpdGVTdG9yYWdlKHBhZ2VJZCwgcGFnZVN0b3JhZ2UpIHtcbiAgICAgICAgY29uc3Qgc3RvcmFnZU9iaiA9IFByb3RlY3RlZENvbW1lbnRzU3RvcmFnZS5nZXRTdG9yYWdlKClcbiAgICAgICAgY29uc3QgbmV3U3RvcmFnZU9iaiA9IHtcbiAgICAgICAgICAgIC4uLnN0b3JhZ2VPYmosXG4gICAgICAgICAgICBbcGFnZUlkXTogcGFnZVN0b3JhZ2VcbiAgICAgICAgfVxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShQUk9URUNURURfQ09NTUVOVFNfU1RPUkFHRV9LRVksIEpTT04uc3RyaW5naWZ5KG5ld1N0b3JhZ2VPYmosIG51bGwsIDIpKVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHBhZ2VJZFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjb21tZW50SWRcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gY29tbWVudFRleHRcbiAgICAgKi9cbiAgICBzdGF0aWMgYWRkQ29tbWVudChwYWdlSWQsIGNvbW1lbnRJZCwgY29tbWVudFRleHQpIHtcbiAgICAgICAgY29uc3QgcGFnZVN0b3JhZ2UgPSB0aGlzLmdldFN0b3JhZ2UoKVtwYWdlSWRdIHx8IHt9XG4gICAgICAgIHBhZ2VTdG9yYWdlW2NvbW1lbnRJZF0gPSBjb21tZW50VGV4dFxuICAgICAgICB0aGlzLl93cml0ZVN0b3JhZ2UocGFnZUlkLCBwYWdlU3RvcmFnZSlcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwYWdlSWRcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gY29tbWVudElkXG4gICAgICogQHJldHVybnMge3N0cmluZ3x1bmRlZmluZWR9XG4gICAgICovXG4gICAgc3RhdGljIGdldENvbW1lbnQocGFnZUlkLCBjb21tZW50SWQpIHtcbiAgICAgICAgY29uc3QgcGFnZVN0b3JhZ2UgPSB0aGlzLmdldFN0b3JhZ2UoKVtwYWdlSWRdIHx8IHt9XG4gICAgICAgIHJldHVybiBwYWdlU3RvcmFnZVtjb21tZW50SWRdXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcGFnZUlkXG4gICAgICogQHJldHVybnMge09iamVjdH1cbiAgICAgKi9cbiAgICBzdGF0aWMgZ2V0QWxsQ29tbWVudHMocGFnZUlkKSB7XG4gICAgICAgIGNvbnN0IHBhZ2VTdG9yYWdlID0gdGhpcy5nZXRTdG9yYWdlKClbcGFnZUlkXSB8fCB7fVxuICAgICAgICByZXR1cm4gcGFnZVN0b3JhZ2VcbiAgICB9XG5cbn0iLCJleHBvcnQgZnVuY3Rpb24gY3JlYXRlU3RvcmFnZUlmTm90RXhpc3RzKGtleSwgaW5pdFZhbHVlPXt9KSB7XG4gICAgaWYgKCFsb2NhbFN0b3JhZ2UuZ2V0SXRlbShrZXkpKSB7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKGtleSwgSlNPTi5zdHJpbmdpZnkoaW5pdFZhbHVlKSk7XG4gICAgfVxufSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHtQYWdlRmFjdG9yeX0gZnJvbSBcIi4vUGFnZUZhY3RvcnlcIjtcbmltcG9ydCB7cHJpbnRFeHRlbnNpb25JbmZvfSBmcm9tIFwiLi9mdW5jdGlvbnNcIjtcblxucHJpbnRFeHRlbnNpb25JbmZvKClcbmNvbnN0IHBhZ2VGYWN0b3J5ID0gbmV3IFBhZ2VGYWN0b3J5KGxvY2F0aW9uLnBhdGhuYW1lKVxuY29uc3QgcGFnZSA9IHBhZ2VGYWN0b3J5LmNyZWF0ZSgpXG5wYWdlLm1vZGlmeUNvbnRlbnQoKVxuXG5cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==