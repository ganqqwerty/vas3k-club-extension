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
        if (!parent || !postCommentForm || !commentsList || !postCommentsRules) {
            return
        }
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
            deletedComment.innerHTML = commentText //TODO надо бы санитизировать это, а то ведь опасно
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDQTtBQUNBLGVBQWUsUUFBUTtBQUN2QixlQUFlLFFBQVE7QUFDdkIsZUFBZSxRQUFRO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxRQUFRO0FBQ3ZCLGVBQWUsUUFBUTtBQUN2QixpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxRQUFRO0FBQ3ZCLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7OztBQzlETyxtREFBbUQ7QUFDMUQ7QUFDQTtBQUNBO0FBQ0E7Ozs7OztVQ0pBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7O0FDTjBDO0FBQ0s7O0FBRS9DLDhEQUFrQjtBQUNsQix3QkFBd0IscURBQVc7QUFDbkM7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3ZhczNrLWNsdWItZXh0ZW5zaW9uLy4vc3JjL1BhZ2VGYWN0b3J5LmpzIiwid2VicGFjazovL3ZhczNrLWNsdWItZXh0ZW5zaW9uLy4vc3JjL2Z1bmN0aW9ucy5qcyIsIndlYnBhY2s6Ly92YXMzay1jbHViLWV4dGVuc2lvbi8uL3NyYy9wYWdlcy9GZWVkUGFnZS5qcyIsIndlYnBhY2s6Ly92YXMzay1jbHViLWV4dGVuc2lvbi8uL3NyYy9wYWdlcy9Pd25Vc2VyUGFnZS5qcyIsIndlYnBhY2s6Ly92YXMzay1jbHViLWV4dGVuc2lvbi8uL3NyYy9wYWdlcy9QYWdlLmpzIiwid2VicGFjazovL3ZhczNrLWNsdWItZXh0ZW5zaW9uLy4vc3JjL3BhZ2VzL1Bvc3RQYWdlLmpzIiwid2VicGFjazovL3ZhczNrLWNsdWItZXh0ZW5zaW9uLy4vc3JjL3BhZ2VzL1VzZXJQYWdlLmpzIiwid2VicGFjazovL3ZhczNrLWNsdWItZXh0ZW5zaW9uLy4vc3JjL3N0b3JhZ2UvQXNzaG9sZXNTdG9yYWdlLmpzIiwid2VicGFjazovL3ZhczNrLWNsdWItZXh0ZW5zaW9uLy4vc3JjL3N0b3JhZ2UvQmxhY2tsaXN0U3RvcmFnZS5qcyIsIndlYnBhY2s6Ly92YXMzay1jbHViLWV4dGVuc2lvbi8uL3NyYy9zdG9yYWdlL1ByaXZhdGVDb21tZW50c1N0b3JhZ2UuanMiLCJ3ZWJwYWNrOi8vdmFzM2stY2x1Yi1leHRlbnNpb24vLi9zcmMvc3RvcmFnZS9Qcm90ZWN0ZWRDb21tZW50c1N0b3JhZ2UuanMiLCJ3ZWJwYWNrOi8vdmFzM2stY2x1Yi1leHRlbnNpb24vLi9zcmMvc3RvcmFnZS9TdG9yYWdlLmpzIiwid2VicGFjazovL3ZhczNrLWNsdWItZXh0ZW5zaW9uL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3ZhczNrLWNsdWItZXh0ZW5zaW9uL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly92YXMzay1jbHViLWV4dGVuc2lvbi93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3ZhczNrLWNsdWItZXh0ZW5zaW9uL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdmFzM2stY2x1Yi1leHRlbnNpb24vLi9zcmMvbWFpbi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2dldFVzZXJ9IGZyb20gXCIuL2Z1bmN0aW9uc1wiO1xuaW1wb3J0IHtVc2VyUGFnZX0gZnJvbSBcIi4vcGFnZXMvVXNlclBhZ2VcIjtcbmltcG9ydCB7T3duVXNlclBhZ2V9IGZyb20gXCIuL3BhZ2VzL093blVzZXJQYWdlXCI7XG5pbXBvcnQge1Bvc3RQYWdlfSBmcm9tIFwiLi9wYWdlcy9Qb3N0UGFnZVwiO1xuaW1wb3J0IHtQYWdlfSBmcm9tIFwiLi9wYWdlcy9QYWdlXCI7XG5pbXBvcnQge0ZlZWRQYWdlfSBmcm9tIFwiLi9wYWdlcy9GZWVkUGFnZVwiO1xuXG5leHBvcnQgY2xhc3MgUGFnZUZhY3Rvcnkge1xuICAgIGNvbnN0cnVjdG9yKHBhdGhuYW1lKSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5wYXRobmFtZSA9IHBhdGhuYW1lO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5wYWdlVHlwZSA9IHRoaXMuZ2V0UGFnZVR5cGUoKVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHJldHVybnMge1BhZ2V9XG4gICAgICovXG4gICAgY3JlYXRlKCkge1xuXG4gICAgICAgIGlmICh0aGlzLmlzVXNlclBhZ2VUeXBlKCkpIHtcbiAgICAgICAgICAgIGlmIChnZXRVc2VyKCkgPT09IHRoaXMuZ2V0V2hvQW1JKCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IE93blVzZXJQYWdlKHRoaXMucGF0aG5hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG5ldyBVc2VyUGFnZSh0aGlzLnBhdGhuYW1lKVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuaXNVc2VyQ29udGVudFBhZ2VUeXBlKCkpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgUG9zdFBhZ2UodGhpcy5wYXRobmFtZSlcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5pc0ZlZWRQYWdlKCkpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRmVlZFBhZ2UodGhpcy5wYXRobmFtZSlcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3IFBhZ2UodGhpcy5wYXRobmFtZSlcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBpc0ZlZWRQYWdlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wYWdlVHlwZSA9PT0gJ2FsbCcgfHwgdGhpcy5wYXRobmFtZSA9PT0gJy8nXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgaXNVc2VyQ29udGVudFBhZ2VUeXBlKCkge1xuICAgICAgICBjb25zdCBjb250ZW50VHlwZXMgPSBbIFwicG9zdFwiLCBcInF1ZXN0aW9uXCIsIFwibGlua1wiLCAgXCJpZGVhXCIsIFwiYmF0dGxlXCIsIFwiZXZlbnRcIiwgXCJwcm9qZWN0XCIsIFwiZ3VpZGVcIiwgXCJ0aHJlYWRcIl1cbiAgICAgICAgcmV0dXJuIGNvbnRlbnRUeXBlcy5pbmNsdWRlcyh0aGlzLnBhZ2VUeXBlKVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIGlzVXNlclBhZ2VUeXBlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wYWdlVHlwZSA9PT0gXCJ1c2VyXCJcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgICAqL1xuICAgIGdldFBhZ2VUeXBlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wYXRobmFtZVxuICAgICAgICAgICAgLnNwbGl0KCcvJylcbiAgICAgICAgICAgIC5maWx0ZXIoYSA9PiBhKVswXVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAgICovXG4gICAgZ2V0V2hvQW1JKCkge1xuICAgICAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tZW51LXJpZ2h0PmEuYXZhdGFyXCIpXG4gICAgICAgICAgICAuZ2V0QXR0cmlidXRlKFwiaHJlZlwiKVxuICAgICAgICAgICAgLnNwbGl0KCcvJylcbiAgICAgICAgICAgIC5maWx0ZXIoYSA9PiBhKVxuICAgICAgICAgICAgLnBvcCgpXG4gICAgfVxufSIsIi8qKlxuICogQHJldHVybnMge3N0cmluZ31cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFVzZXIoKSB7XG4gICAgcmV0dXJuIGRvY3VtZW50LmxvY2F0aW9uLnBhdGhuYW1lLnNwbGl0KCcvJykuZmlsdGVyKChhKSA9PiBhKS5wb3AoKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gaGlkZVZvdGVzUmF0aW5nc0F2YXRhcnMoKSB7XG4gICAgY29uc3QgZGlzdHJhY3RlZEVsZW1lbnRzU2VsZWN0b3JzID0gW1xuICAgICAgICAnLnVwdm90ZScsXG4gICAgICAgICcudXB2b3RlLXZvdGVkJyxcbiAgICAgICAgJy51cHZvdGUtdHlwZS1pbmxpbmUnLFxuICAgICAgICAnLmNvbW1lbnQtcmF0aW5nJyxcbiAgICAgICAgJy5mZWVkLXBvc3QtY29tbWVudHMtdW5yZWFkJ1xuICAgIF1cblxuICAgIGZvciAoY29uc3Qgc2VsZWN0b3Igb2YgZGlzdHJhY3RlZEVsZW1lbnRzU2VsZWN0b3JzKSB7XG4gICAgICAgIGZvciAoY29uc3QgZWwgb2YgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcikpIHtcbiAgICAgICAgICAgIGVsLnJlbW92ZSgpXG4gICAgICAgIH1cbiAgICB9XG4gICAgZm9yIChjb25zdCBhdmF0YXIgb2YgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5hdmF0YXI+aW1nXCIpKSB7XG4gICAgICAgIGF2YXRhci5zZXRBdHRyaWJ1dGUoXCJzcmNcIiwgXCJodHRwczovL2kudmFzM2suY2x1Yi92LnBuZ1wiKVxuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHByaW50RXh0ZW5zaW9uSW5mbygpIHtcbiAgICBjb25zb2xlLmluZm8gKFwi0JLRgdC10Lwg0LHQvtGP0YLRjNGB0Y8hINCS0LDRgdGC0YDQuNC6LdGL0LrRgdGC0Y3QvdGI0YvQvSB2MS4wLjBcIilcbiAgICBjb25zb2xlLmxvZyhgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAobykobylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLyAgICAgXFxcXFxuICAgICAgICAgICAgICAgICAgICAgICAgIC8gICAgICAgfFxuICAgICAgICAgICAgICAgICAgICAgICAgLyAgIFxcXFwgICogfFxuICAgICAgICAgIF9fX19fX19fICAgICAvICAgIC9cXFxcX18vXG4gIF8gICAgICAvICAgICAgICBcXFxcICAgLyAgICAvXG4gLyBcXFxcICAgIC8gIF9fX18gICAgXFxcXF8vICAgIC9cbi8vXFxcXCBcXFxcICAvICAvICAgIFxcXFwgICAgICAgICAvXG5WICBcXFxcIFxcXFwvICAvICAgICAgXFxcXCAgICAgICAvXG4gICAgXFxcXF9fXy8gICAgICAgIFxcXFxfX19fXy9cbiAgICBgKVxufVxuXG5cbiIsImltcG9ydCB7UGFnZX0gZnJvbSBcIi4vUGFnZVwiO1xuaW1wb3J0IHtBc3Nob2xlc1N0b3JhZ2V9IGZyb20gXCIuLi9zdG9yYWdlL0Fzc2hvbGVzU3RvcmFnZVwiO1xuaW1wb3J0IHtCbGFja2xpc3RTdG9yYWdlfSBmcm9tIFwiLi4vc3RvcmFnZS9CbGFja2xpc3RTdG9yYWdlXCI7XG5cbmV4cG9ydCBjbGFzcyBGZWVkUGFnZSBleHRlbmRzIFBhZ2Uge1xuICAgIGNvbnN0cnVjdG9yKHBhdGhuYW1lKSB7XG4gICAgICAgIHN1cGVyKHBhdGhuYW1lKTtcbiAgICB9XG5cbiAgICBtb2RpZnlDb250ZW50KCkge1xuICAgICAgICB0aGlzLmhpZGVCbGFja2xpc3RlZFBvc3RzKClcbiAgICAgICAgdGhpcy5oaWRlQXNzaG9sZVBvc3RzKClcbiAgICAgICAgLy8gaGlkZVZvdGVzUmF0aW5nc0F2YXRhcnMoKVxuICAgICAgICB0aGlzLmFkZEJsYWNrbGlzdEJ1dHRvbigpXG5cbiAgICB9XG5cbiAgICBhZGRCbGFja2xpc3RCdXR0b24oKSB7XG4gICAgICAgIGNvbnN0IHBvc3RzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5mZWVkLXBvc3QtZm9vdGVyXCIpXG4gICAgICAgIHBvc3RzLmZvckVhY2gocG9zdCA9PiB7XG4gICAgICAgICAgICBjb25zdCBwYWdlSWQgPSBwb3N0LnF1ZXJ5U2VsZWN0b3IoXCJhLmZlZWQtcG9zdC1jb21tZW50c1wiKVxuICAgICAgICAgICAgICAgIC5nZXRBdHRyaWJ1dGUoXCJocmVmXCIpXG4gICAgICAgICAgICAgICAgLnNwbGl0KFwiL1wiKVxuICAgICAgICAgICAgICAgIC5zbGljZSgxLCAtMSlcbiAgICAgICAgICAgICAgICAuam9pbihcIi9cIilcbiAgICAgICAgICAgIGNvbnN0IGJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhXCIpXG4gICAgICAgICAgICBidXR0b24uaW5uZXJUZXh0ID0gXCLwn5mIXCJcbiAgICAgICAgICAgIGJ1dHRvbi5zZXRBdHRyaWJ1dGUoXCJ0aXRsZVwiLCBcItCh0LvRg9GI0LDQudGC0LUsINCwINC90YMg0LXQs9C+INC90LDRhdC10YAhXCIpXG4gICAgICAgICAgICBidXR0b24uY2xhc3NMaXN0LmFkZChcImZlZWQtcG9zdC1jb21tZW50c1wiKVxuICAgICAgICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgQmxhY2tsaXN0U3RvcmFnZS5hZGRQYWdlKHBhZ2VJZClcbiAgICAgICAgICAgICAgICBwb3N0LnBhcmVudEVsZW1lbnQucmVtb3ZlKClcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBwb3N0LmFwcGVuZENoaWxkKGJ1dHRvbilcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBoaWRlQXNzaG9sZVBvc3RzKCkge1xuICAgICAgICBmb3IgKGNvbnN0IGFzc2hvbGUgb2YgQXNzaG9sZXNTdG9yYWdlLmdldEFzc2hvbGVzKCkpIHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgYXNzaG9sZUhyZWYgb2YgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgW2hyZWY9XCIvdXNlci8ke2Fzc2hvbGV9L1wiXWApKSB7XG4gICAgICAgICAgICAgICAgYXNzaG9sZUhyZWZcbiAgICAgICAgICAgICAgICAgICAgLnBhcmVudEVsZW1lbnRcbiAgICAgICAgICAgICAgICAgICAgLnBhcmVudEVsZW1lbnRcbiAgICAgICAgICAgICAgICAgICAgLnJlbW92ZSgpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoaWRlQmxhY2tsaXN0ZWRQb3N0cygpIHtcbiAgICAgICAgY29uc3QgcmVmcyA9IEJsYWNrbGlzdFN0b3JhZ2UuZ2V0QmxhY2tsaXN0KClcbiAgICAgICAgZm9yIChjb25zdCByZWYgb2YgcmVmcykge1xuICAgICAgICAgICAgZm9yIChjb25zdCB0b3BpYyBvZiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGBhW2hyZWYqPVwiJHtyZWZ9XCJdYCkpIHtcbiAgICAgICAgICAgICAgICB0b3BpY1xuICAgICAgICAgICAgICAgICAgICAucGFyZW50RWxlbWVudFxuICAgICAgICAgICAgICAgICAgICAucGFyZW50RWxlbWVudFxuICAgICAgICAgICAgICAgICAgICAucmVtb3ZlKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuXG59IiwiaW1wb3J0IHtQYWdlfSBmcm9tIFwiLi9QYWdlXCI7XG5pbXBvcnQge0Fzc2hvbGVzU3RvcmFnZX0gZnJvbSBcIi4uL3N0b3JhZ2UvQXNzaG9sZXNTdG9yYWdlXCI7XG5pbXBvcnQge0JsYWNrbGlzdFN0b3JhZ2V9IGZyb20gXCIuLi9zdG9yYWdlL0JsYWNrbGlzdFN0b3JhZ2VcIjtcblxuZXhwb3J0IGNsYXNzIE93blVzZXJQYWdlIGV4dGVuZHMgUGFnZSB7XG4gICAgY29uc3RydWN0b3IocGF0aG5hbWUpIHtcbiAgICAgICAgc3VwZXIocGF0aG5hbWUpO1xuICAgIH1cblxuICAgIG1vZGlmeUNvbnRlbnQoKSB7XG4gICAgICAgIHRoaXMuYWRkQXNzaG9sZXNMaXN0KClcbiAgICB9XG5cbiAgICBjcmVhdGVBc3Nob2xlc0xpc3RFZGl0KCkge1xuICAgICAgICBjb25zdCB3aWRnZXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpXG4gICAgICAgIHdpZGdldC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImJsb2NrXCIpXG4gICAgICAgIGNvbnN0IGhlYWRlciA9IFwiPGgyIGNsYXNzPSdwcm9maWxlLWhlYWRlcic+0JzQvtC4INC80YPQtNCw0LrQuDwvaDI+XCJcbiAgICAgICAgY29uc3QgdGV4dEFyZWEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGV4dGFyZWFcIilcbiAgICAgICAgdGV4dEFyZWEuc3R5bGUud2lkdGggPSBcIjEwMCVcIlxuICAgICAgICB0ZXh0QXJlYS52YWx1ZSA9IEFzc2hvbGVzU3RvcmFnZS5nZXRBc3Nob2xlc1RleHQoKVxuICAgICAgICB0ZXh0QXJlYS5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgKCkgPT4gQXNzaG9sZXNTdG9yYWdlLnNldEFzc2hvbGVzVGV4dCh0ZXh0QXJlYS52YWx1ZSkpXG4gICAgICAgIHdpZGdldC5pbnNlcnRBZGphY2VudEhUTUwoXCJhZnRlcmJlZ2luXCIsIGhlYWRlcilcbiAgICAgICAgd2lkZ2V0LmFwcGVuZENoaWxkKHRleHRBcmVhKVxuICAgICAgICByZXR1cm4gd2lkZ2V0XG4gICAgfVxuXG4gICAgY3JlYXRlQmxhY2tsaXN0RWRpdCgpIHtcbiAgICAgICAgY29uc3Qgd2lkZ2V0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKVxuICAgICAgICB3aWRnZXQuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJibG9ja1wiKVxuICAgICAgICBjb25zdCBoZWFkZXIgPSBcIjxoMiBjbGFzcz0ncHJvZmlsZS1oZWFkZXInPtCn0LXRgNC90YvQuSDRgdC/0LjRgdC+0Log0YHRgtGA0LDQvdC40YY8L2gyPlwiXG4gICAgICAgIGNvbnN0IHRleHRBcmVhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRleHRhcmVhXCIpXG4gICAgICAgIHRleHRBcmVhLnN0eWxlLndpZHRoID0gXCIxMDAlXCJcbiAgICAgICAgdGV4dEFyZWEudmFsdWUgPSBCbGFja2xpc3RTdG9yYWdlLmdldEJsYWNrbGlzdFRleHQoKVxuICAgICAgICB0ZXh0QXJlYS5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgKCkgPT4gQmxhY2tsaXN0U3RvcmFnZS5zZXRCbGFja2xpc3RUZXh0KHRleHRBcmVhLnZhbHVlKSlcbiAgICAgICAgd2lkZ2V0Lmluc2VydEFkamFjZW50SFRNTChcImFmdGVyYmVnaW5cIiwgaGVhZGVyKVxuICAgICAgICB3aWRnZXQuYXBwZW5kQ2hpbGQodGV4dEFyZWEpXG4gICAgICAgIHJldHVybiB3aWRnZXRcbiAgICB9XG5cbiAgICBhZGRBc3Nob2xlc0xpc3QoKSB7XG4gICAgICAgIGNvbnN0IHByb2ZpbGVJbmZvID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2ZpbGUtaW50cm8nKVxuICAgICAgICBwcm9maWxlSW5mby5hcHBlbmRDaGlsZCggdGhpcy5jcmVhdGVBc3Nob2xlc0xpc3RFZGl0KCkpXG4gICAgICAgIHByb2ZpbGVJbmZvLmFwcGVuZENoaWxkKCB0aGlzLmNyZWF0ZUJsYWNrbGlzdEVkaXQoKSlcbiAgICB9XG5cbn0iLCJleHBvcnQgY2xhc3MgUGFnZSB7XG4gICAgY29uc3RydWN0b3IocGF0aG5hbWUpIHtcbiAgICAgICAgaWYgKCFwYXRobmFtZSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdwYXRobmFtZSBpcyByZXF1aXJlZCcpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucGF0aG5hbWUgPSBwYXRobmFtZTtcbiAgICB9XG5cbiAgICBtb2RpZnlDb250ZW50KCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIk5vdGhpbmcgaXMgaGFwcGVuZWQsIGl0J3MgYW4gdW5zcGVjaWZpZWQgcGFnZVwiKVxuICAgIH1cbn0iLCJpbXBvcnQge1BhZ2V9IGZyb20gXCIuL1BhZ2VcIjtcbmltcG9ydCB7QXNzaG9sZXNTdG9yYWdlfSBmcm9tIFwiLi4vc3RvcmFnZS9Bc3Nob2xlc1N0b3JhZ2VcIjtcbmltcG9ydCB7UHJvdGVjdGVkQ29tbWVudHNTdG9yYWdlfSBmcm9tIFwiLi4vc3RvcmFnZS9Qcm90ZWN0ZWRDb21tZW50c1N0b3JhZ2VcIjtcblxuZXhwb3J0IGNsYXNzIFBvc3RQYWdlIGV4dGVuZHMgUGFnZSB7XG4gICAgY29uc3RydWN0b3IodXJsKSB7XG4gICAgICAgIHN1cGVyKHVybCk7XG4gICAgfVxuXG4gICAgbW9kaWZ5Q29udGVudCgpIHtcbiAgICAgICAgdGhpcy5oaWRlQXNzaG9sZUNvbW1lbnRzKClcbiAgICAgICAgdGhpcy5tb3ZlUG9zdENvbW1lbnRGb3JtKClcbiAgICAgICAgdGhpcy5hZGRQcm90ZWN0Q29tbWVudEJ1dHRvbnMoKVxuICAgICAgICB0aGlzLmFkZFByb3RlY3RBbGxDb21tZW50QnV0dG9uKClcbiAgICAgICAgdGhpcy5yZXN0b3JlQ29tbWVudHMoKVxuICAgIH1cblxuICAgIGhpZGVBc3Nob2xlQ29tbWVudHMoKSB7XG4gICAgICAgIGZvciAoY29uc3QgYXNzaG9sZSBvZiBBc3Nob2xlc1N0b3JhZ2UuZ2V0QXNzaG9sZXMoKSkge1xuICAgICAgICAgICAgY29uc3Qgc2VsZWN0b3IgPSBgLmNvbW1lbnQtaGVhZGVyLWF1dGhvci1uYW1lW2hyZWY9XCIvdXNlci8ke2Fzc2hvbGV9L1wiXWBcbiAgICAgICAgICAgIGNvbnN0IG5vZGVzV2l0aEFzc2hvbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKVxuICAgICAgICAgICAgZm9yIChjb25zdCBhc3Nob2xlTm9kZSBvZiBub2Rlc1dpdGhBc3Nob2xlKSB7XG4gICAgICAgICAgICAgICAgYXNzaG9sZU5vZGVcbiAgICAgICAgICAgICAgICAgICAgLnBhcmVudEVsZW1lbnRcbiAgICAgICAgICAgICAgICAgICAgLnBhcmVudEVsZW1lbnRcbiAgICAgICAgICAgICAgICAgICAgLnBhcmVudEVsZW1lbnRcbiAgICAgICAgICAgICAgICAgICAgLnBhcmVudEVsZW1lbnRcbiAgICAgICAgICAgICAgICAgICAgLnJlbW92ZSgpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgbW92ZVBvc3RDb21tZW50Rm9ybSgpIHtcbiAgICAgICAgY29uc3QgcG9zdENvbW1lbnRGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Bvc3QtY29tbWVudHMtZm9ybScpXG4gICAgICAgIGNvbnN0IGNvbW1lbnRzTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wb3N0LWNvbW1lbnRzLWxpc3QnKVxuICAgICAgICBjb25zdCBwb3N0Q29tbWVudHNSdWxlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wb3N0LWNvbW1lbnRzLXJ1bGVzJylcbiAgICAgICAgY29uc3QgcGFyZW50ID0gY29tbWVudHNMaXN0LnBhcmVudEVsZW1lbnRcbiAgICAgICAgaWYgKCFwYXJlbnQgfHwgIXBvc3RDb21tZW50Rm9ybSB8fCAhY29tbWVudHNMaXN0IHx8ICFwb3N0Q29tbWVudHNSdWxlcykge1xuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgcGFyZW50Lmluc2VydEJlZm9yZShwb3N0Q29tbWVudEZvcm0sIGNvbW1lbnRzTGlzdClcbiAgICAgICAgcGFyZW50Lmluc2VydEJlZm9yZShwb3N0Q29tbWVudHNSdWxlcywgY29tbWVudHNMaXN0KVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjb21tZW50SWRcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgICAqL1xuICAgIGdldENvbW1lbnRUZXh0KGNvbW1lbnRJZCkge1xuICAgICAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgIyR7Y29tbWVudElkfSAudGV4dC1ib2R5LXR5cGUtY29tbWVudGApLmlubmVySFRNTFxuICAgIH1cblxuICAgIC8vc2F2ZXMgdGhlIGNvbW1lbnQgdG8gdGhlIGxvY2FsIHN0b3JhZ2VcbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjb21tZW50SWRcbiAgICAgKi9cbiAgICBwcm90ZWN0Q29tbWVudChjb21tZW50SWQpIHtcbiAgICAgICAgUHJvdGVjdGVkQ29tbWVudHNTdG9yYWdlLmFkZENvbW1lbnQodGhpcy5wYXRobmFtZSwgY29tbWVudElkLCB0aGlzLmdldENvbW1lbnRUZXh0KGNvbW1lbnRJZCkpXG4gICAgfVxuXG4gICAgcHJvdGVjdEFsbENvbW1lbnRzKCkge1xuICAgICAgICBjb25zdCBjb21tZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIudGV4dC1ib2R5LXR5cGUtY29tbWVudFwiKVxuICAgICAgICBmb3IgKGNvbnN0IGNvbW1lbnQgb2YgY29tbWVudHMpIHtcbiAgICAgICAgICAgIHRoaXMucHJvdGVjdENvbW1lbnQoY29tbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQuaWQpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXN0b3JlQ29tbWVudHMoKSB7XG4gICAgICAgIGNvbnN0IGRlbGV0ZWRDb21tZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuY29tbWVudC10ZXh0LWRlbGV0ZWRcIilcbiAgICAgICAgZm9yIChjb25zdCBkZWxldGVkQ29tbWVudCBvZiBkZWxldGVkQ29tbWVudHMpIHtcbiAgICAgICAgICAgdGhpcy5yZXN0b3JlQ29tbWVudChkZWxldGVkQ29tbWVudClcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtFbGVtZW50fSBkZWxldGVkQ29tbWVudFxuICAgICAqL1xuICAgIHJlc3RvcmVDb21tZW50KGRlbGV0ZWRDb21tZW50KSB7XG4gICAgICAgIGNvbnN0IGNvbW1lbnRJZCA9IGRlbGV0ZWRDb21tZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LmlkXG4gICAgICAgIGNvbnN0IGNvbW1lbnRUZXh0ID0gUHJvdGVjdGVkQ29tbWVudHNTdG9yYWdlLmdldENvbW1lbnQodGhpcy5wYXRobmFtZSwgY29tbWVudElkKVxuICAgICAgICBpZiAoY29tbWVudFRleHQpIHtcbiAgICAgICAgICAgIGRlbGV0ZWRDb21tZW50LmlubmVySFRNTCA9IGNvbW1lbnRUZXh0IC8vVE9ETyDQvdCw0LTQviDQsdGLINGB0LDQvdC40YLQuNC30LjRgNC+0LLQsNGC0Ywg0Y3RgtC+LCDQsCDRgtC+INCy0LXQtNGMINC+0L/QsNGB0L3QvlxuICAgICAgICB9XG4gICAgfVxuXG4gICAgYWRkUHJvdGVjdEFsbENvbW1lbnRCdXR0b24oKSB7XG4gICAgICAgIGNvbnN0IGJ1dHRvbiA9IHRoaXMuY3JlYXRlQnV0dG9uKClcbiAgICAgICAgYnV0dG9uLnNldEF0dHJpYnV0ZShcInRpdGxlXCIsIFwi0JfQsNGJ0LjRgtC40YLRjCDQstGB0LUg0LrQvtC80LzQtdC90YLQsNGA0LjQuCDQvtGCINGD0LTQsNC70LXQvdC40Y9cIilcbiAgICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5wcm90ZWN0QWxsQ29tbWVudHMoKVxuICAgICAgICB9KVxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucG9zdC1hY3Rpb25zLWxpbmUnKS5hcHBlbmRDaGlsZChidXR0b24pXG4gICAgfVxuXG4gICAgYWRkUHJvdGVjdENvbW1lbnRCdXR0b25zKCkge1xuICAgICAgICBjb25zdCByZXBseUVsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNvbW1lbnQtaGVhZGVyLWJhZGdlcycpXG4gICAgICAgIGNvbnNvbGUubG9nKHJlcGx5RWxlbWVudHMpXG4gICAgICAgIGZvciAoY29uc3QgcmVwbHlFbGVtZW50IG9mIHJlcGx5RWxlbWVudHMpIHtcbiAgICAgICAgICAgIGNvbnN0IGJ1dHRvbiA9IHRoaXMuY3JlYXRlQnV0dG9uKCk7XG4gICAgICAgICAgICBidXR0b24uc2V0QXR0cmlidXRlKFwidGl0bGVcIiwgXCLQl9Cw0YnQuNGC0LjRgtGMINC60L7QvNC80LXQvdGCINC+0YIg0YPQtNCw0LvQtdC90LjRj1wiKVxuICAgICAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXNcbiAgICAgICAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oZXZ0KSB7XG4gICAgICAgICAgICAgICAgY29uc3QgY29tbWVudElkID0gdGhpcy5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5pZFxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiYmxhYWFcIiwgY29tbWVudElkKVxuICAgICAgICAgICAgICAgIHNlbGYucHJvdGVjdENvbW1lbnQoY29tbWVudElkKVxuXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgcmVwbHlFbGVtZW50LmFwcGVuZENoaWxkKGJ1dHRvbilcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNyZWF0ZUJ1dHRvbigpIHtcbiAgICAgICAgY29uc3QgYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlcIilcbiAgICAgICAgYnV0dG9uLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwiZmFzIGZhLWNsb3VkLWRvd25sb2FkLWFsdFwiKVxuICAgICAgICBidXR0b24uc3R5bGUuY3Vyc29yID0gJ3BvaW50ZXInO1xuICAgICAgICByZXR1cm4gYnV0dG9uO1xuICAgIH1cblxufVxuIiwiaW1wb3J0IHtQYWdlfSBmcm9tIFwiLi9QYWdlXCI7XG5pbXBvcnQge0Fzc2hvbGVzU3RvcmFnZX0gZnJvbSBcIi4uL3N0b3JhZ2UvQXNzaG9sZXNTdG9yYWdlXCI7XG5pbXBvcnQge1ByaXZhdGVDb21tZW50c1N0b3JhZ2V9IGZyb20gXCIuLi9zdG9yYWdlL1ByaXZhdGVDb21tZW50c1N0b3JhZ2VcIjtcblxuZXhwb3J0IGNsYXNzIFVzZXJQYWdlIGV4dGVuZHMgUGFnZSB7XG4gICAgY29uc3RydWN0b3IodXJsKSB7XG4gICAgICAgIHN1cGVyKHVybCk7XG4gICAgICAgIHRoaXMudXNlciA9IHRoaXMuZ2V0VXNlcigpO1xuICAgIH1cblxuICAgIG1vZGlmeUNvbnRlbnQoKSB7XG4gICAgICAgIHRoaXMuYWRkQXNzaG9sZUJ1dHRvbigpXG4gICAgICAgIHRoaXMuYWRkUHJpdmF0ZUNvbW1lbnRXaWRnZXQoKVxuICAgIH1cblxuICAgIGFkZFByaXZhdGVDb21tZW50V2lkZ2V0KCkge1xuICAgICAgICBjb25zdCB3aWRnZXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpXG4gICAgICAgIHdpZGdldC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImJsb2NrXCIpXG4gICAgICAgIGNvbnN0IGhlYWRlciA9IFwiPGgyIGNsYXNzPSdwcm9maWxlLWhlYWRlcic+0J/RgNC40LLQsNGC0L3Ri9C1INC60L7QvNC80LXQvdGC0LDRgNC40Lg8L2gyPlwiXG4gICAgICAgIGNvbnN0IHRleHRhcmVhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRleHRhcmVhXCIpXG4gICAgICAgIHRleHRhcmVhLnZhbHVlID0gUHJpdmF0ZUNvbW1lbnRzU3RvcmFnZS5nZXRDb21tZW50KHRoaXMudXNlciB8fCBcIlwiKVxuICAgICAgICB0ZXh0YXJlYS5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgKHRleHQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGNvbW1lbnQgPSB0ZXh0LnRhcmdldC52YWx1ZVxuICAgICAgICAgICAgUHJpdmF0ZUNvbW1lbnRzU3RvcmFnZS5zZXRDb21tZW50KHRoaXMudXNlciwgY29tbWVudClcbiAgICAgICAgfSlcbiAgICAgICAgd2lkZ2V0LmlubmVySFRNTCA9IGhlYWRlclxuICAgICAgICB3aWRnZXQuYXBwZW5kQ2hpbGQodGV4dGFyZWEpXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvZmlsZS1zdGF0dXNlc1wiKS5hcHBlbmRDaGlsZCh3aWRnZXQpXG4gICAgfVxuXG4gICAgYWRkQXNzaG9sZUJ1dHRvbigpIHtcbiAgICAgICAgY29uc3QgcGFyc2VyID0gbmV3IERPTVBhcnNlcigpO1xuICAgICAgICBjb25zdCBhc3Nob2xlQnRuU3RyID0gYDxhIGNsYXNzPVwicHJvZmlsZS1zdGF0dXMgY2xpY2thYmxlXCI+PHNwYW4gY2xhc3M9XCJwcm9maWxlLXN0YXR1cy1pY29uXCI+8J+WlTwvc3Bhbj4gPHNwYW4gY2xhc3M9XCJwcm9maWxlLXN0YXR1cy1zdGF0dXNcIj7QlNC+0LHQsNCy0LjRgtGMINCyINC80L7QuCDQvNGD0LTQsNC60Lg8L3NwYW4+PC9hPmBcbiAgICAgICAgY29uc3QgYXNzaG9sZUJ0biA9IHBhcnNlci5wYXJzZUZyb21TdHJpbmcoYXNzaG9sZUJ0blN0ciwgJ3RleHQvaHRtbCcpLnF1ZXJ5U2VsZWN0b3IoXCJhXCIpO1xuICAgICAgICBhc3Nob2xlQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgICAgICBBc3Nob2xlc1N0b3JhZ2UuYWRkQXNzaG9sZSh0aGlzLmdldFVzZXIoKSlcbiAgICAgICAgfSlcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9maWxlLXN0YXR1c2VzXCIpLmFwcGVuZENoaWxkKGFzc2hvbGVCdG4pXG4gICAgICAgIGlmICh0aGlzLmlzVXNlckFzc2hvbGUodGhpcy5nZXRVc2VyKCkpKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInRoZSB1c2VyIGlzIGFuIGFzc2hvbGUhXCIpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgICAqL1xuICAgICBnZXRVc2VyKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wYXRobmFtZS5zcGxpdCgnLycpLmZpbHRlcigoYSkgPT4gYSkucG9wKClcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdXNlclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIGlzVXNlckFzc2hvbGUodXNlcikge1xuICAgICAgICByZXR1cm4gQXNzaG9sZXNTdG9yYWdlLmdldEFzc2hvbGVzKCkuaW5jbHVkZXModXNlcilcbiAgICB9XG59IiwiaW1wb3J0IHtjcmVhdGVTdG9yYWdlSWZOb3RFeGlzdHN9IGZyb20gXCIuL1N0b3JhZ2VcIjtcblxuY29uc3QgQVNTSE9MRVNfU1RPUkFHRV9LRVkgPSAnYXNzaG9sZXMnO1xuY3JlYXRlU3RvcmFnZUlmTm90RXhpc3RzKEFTU0hPTEVTX1NUT1JBR0VfS0VZLCBbXSlcblxuZXhwb3J0IGNsYXNzIEFzc2hvbGVzU3RvcmFnZSB7XG5cbiAgICBzdGF0aWMgZ2V0QXNzaG9sZXNUZXh0KCkge1xuICAgICAgICByZXR1cm4gbG9jYWxTdG9yYWdlLmdldEl0ZW0oQVNTSE9MRVNfU1RPUkFHRV9LRVkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHJldHVybnMge3N0cmluZ1tdfVxuICAgICAqL1xuICAgIHN0YXRpYyBnZXRBc3Nob2xlcygpIHtcbiAgICAgICAgcmV0dXJuIEFzc2hvbGVzU3RvcmFnZS5nZXRBc3Nob2xlc1RleHQoKS5zcGxpdCgnLCcpIHx8IFtdO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGFzc2hvbGVzVGV4dFxuICAgICAqL1xuICAgIHN0YXRpYyBzZXRBc3Nob2xlc1RleHQoYXNzaG9sZXNUZXh0KSB7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKEFTU0hPTEVTX1NUT1JBR0VfS0VZLCBhc3Nob2xlc1RleHQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGFzc2hvbGVcbiAgICAgKi9cbiAgICBzdGF0aWMgYWRkQXNzaG9sZShhc3Nob2xlKSB7XG4gICAgICAgIGNvbnN0IGFzc2hvbGVzID0gdGhpcy5nZXRBc3Nob2xlcygpO1xuICAgICAgICBpZiAoYXNzaG9sZXMuaW5jbHVkZXMoYXNzaG9sZSkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBhc3Nob2xlcy5wdXNoKGFzc2hvbGUpO1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShBU1NIT0xFU19TVE9SQUdFX0tFWSwgYXNzaG9sZXMuam9pbignLCcpKTtcbiAgICB9XG59IiwiaW1wb3J0IHtjcmVhdGVTdG9yYWdlSWZOb3RFeGlzdHN9IGZyb20gXCIuL1N0b3JhZ2VcIjtcblxuY29uc3QgQkxBQ0tMSVNUX1NUT1JBR0VfS0VZID0gJ2JsYWNrbGlzdCc7XG5cbmNyZWF0ZVN0b3JhZ2VJZk5vdEV4aXN0cyhCTEFDS0xJU1RfU1RPUkFHRV9LRVksIFtdKVxuXG5leHBvcnQgY2xhc3MgQmxhY2tsaXN0U3RvcmFnZSB7XG4gICAgc3RhdGljIGdldEJsYWNrbGlzdFRleHQoKSB7XG4gICAgICAgIHJldHVybiBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShCTEFDS0xJU1RfU1RPUkFHRV9LRVkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHJldHVybnMge3N0cmluZ1tdfVxuICAgICAqL1xuICAgIHN0YXRpYyBnZXRCbGFja2xpc3QoKSB7XG4gICAgICAgIHJldHVybiBCbGFja2xpc3RTdG9yYWdlLmdldEJsYWNrbGlzdFRleHQoKS5zcGxpdCgnLCcpIHx8IFtdO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHRleHRcbiAgICAgKi9cbiAgICBzdGF0aWMgc2V0QmxhY2tsaXN0VGV4dCh0ZXh0KSB7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKEJMQUNLTElTVF9TVE9SQUdFX0tFWSwgdGV4dCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcGFnZVxuICAgICAqL1xuICAgIHN0YXRpYyBhZGRQYWdlKHBhZ2UpIHtcbiAgICAgICAgY29uc3QgbGlzdCA9IHRoaXMuZ2V0QmxhY2tsaXN0KCk7XG4gICAgICAgIGlmIChsaXN0LmluY2x1ZGVzKHBhZ2UpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgbGlzdC5wdXNoKHBhZ2UpO1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShCTEFDS0xJU1RfU1RPUkFHRV9LRVksIGxpc3QpO1xuICAgIH1cbn0iLCJpbXBvcnQge2NyZWF0ZVN0b3JhZ2VJZk5vdEV4aXN0c30gZnJvbSBcIi4vU3RvcmFnZVwiO1xuXG5jb25zdCBQUklWQVRFX0NPTU1FTlRTX0tFWSA9ICdwcml2YXRlLWNvbW1lbnRzJztcblxuY3JlYXRlU3RvcmFnZUlmTm90RXhpc3RzKFBSSVZBVEVfQ09NTUVOVFNfS0VZLCB7fSlcblxuZXhwb3J0IGNsYXNzIFByaXZhdGVDb21tZW50c1N0b3JhZ2Uge1xuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHVzZXJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gY29tbWVudFxuICAgICAqL1xuICAgIHN0YXRpYyBzZXRDb21tZW50KHVzZXIsIGNvbW1lbnQpIHtcbiAgICAgICAgY29uc3QgY29tbWVudHMgPSBQcml2YXRlQ29tbWVudHNTdG9yYWdlLmdldENvbW1lbnRzKCk7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFBSSVZBVEVfQ09NTUVOVFNfS0VZLCBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICAuLi5jb21tZW50cyxcbiAgICAgICAgICAgIFt1c2VyXTogY29tbWVudFxuICAgICAgICB9KSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdXNlclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAgICovXG4gICAgc3RhdGljIGdldENvbW1lbnQodXNlcikge1xuICAgICAgICBjb25zdCB1c2VyQ29tbWVudCA9IFByaXZhdGVDb21tZW50c1N0b3JhZ2UuZ2V0Q29tbWVudHMoKVxuICAgICAgICBpZiAoIXVzZXJDb21tZW50KSB7XG4gICAgICAgICAgICByZXR1cm4gXCJcIjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB0ZXh0UHJpdmF0ZUNvbW1lbnRzT2JqID0gIHRoaXMuZ2V0Q29tbWVudHMoKVxuICAgICAgICByZXR1cm4gdGV4dFByaXZhdGVDb21tZW50c09ialt1c2VyXSB8fCBcIlwiO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIHtPYmplY3R9XG4gICAgICovXG4gICAgc3RhdGljIGdldENvbW1lbnRzKCkge1xuICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShQUklWQVRFX0NPTU1FTlRTX0tFWSkgfHwgXCJ7fVwiKSB8fCB7fVxuICAgIH1cbn0iLCJpbXBvcnQge2NyZWF0ZVN0b3JhZ2VJZk5vdEV4aXN0c30gZnJvbSBcIi4vU3RvcmFnZVwiO1xuXG5jb25zdCBQUk9URUNURURfQ09NTUVOVFNfU1RPUkFHRV9LRVkgPSBcInByb3RlY3RlZENvbW1lbnRzXCJcblxuY3JlYXRlU3RvcmFnZUlmTm90RXhpc3RzKFBST1RFQ1RFRF9DT01NRU5UU19TVE9SQUdFX0tFWSwge30pXG5cbmV4cG9ydCBjbGFzcyBQcm90ZWN0ZWRDb21tZW50c1N0b3JhZ2Uge1xuICAgIHN0YXRpYyBnZXRTdG9yYWdlKCkge1xuICAgICAgICBpZiAoIWxvY2FsU3RvcmFnZS5nZXRJdGVtKFBST1RFQ1RFRF9DT01NRU5UU19TVE9SQUdFX0tFWSkpIHtcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFBST1RFQ1RFRF9DT01NRU5UU19TVE9SQUdFX0tFWSwgSlNPTi5zdHJpbmdpZnkoe30pKVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFBST1RFQ1RFRF9DT01NRU5UU19TVE9SQUdFX0tFWSkpXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcGFnZUlkXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHBhZ2VTdG9yYWdlXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBzdGF0aWMgX3dyaXRlU3RvcmFnZShwYWdlSWQsIHBhZ2VTdG9yYWdlKSB7XG4gICAgICAgIGNvbnN0IHN0b3JhZ2VPYmogPSBQcm90ZWN0ZWRDb21tZW50c1N0b3JhZ2UuZ2V0U3RvcmFnZSgpXG4gICAgICAgIGNvbnN0IG5ld1N0b3JhZ2VPYmogPSB7XG4gICAgICAgICAgICAuLi5zdG9yYWdlT2JqLFxuICAgICAgICAgICAgW3BhZ2VJZF06IHBhZ2VTdG9yYWdlXG4gICAgICAgIH1cbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oUFJPVEVDVEVEX0NPTU1FTlRTX1NUT1JBR0VfS0VZLCBKU09OLnN0cmluZ2lmeShuZXdTdG9yYWdlT2JqLCBudWxsLCAyKSlcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwYWdlSWRcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gY29tbWVudElkXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGNvbW1lbnRUZXh0XG4gICAgICovXG4gICAgc3RhdGljIGFkZENvbW1lbnQocGFnZUlkLCBjb21tZW50SWQsIGNvbW1lbnRUZXh0KSB7XG4gICAgICAgIGNvbnN0IHBhZ2VTdG9yYWdlID0gdGhpcy5nZXRTdG9yYWdlKClbcGFnZUlkXSB8fCB7fVxuICAgICAgICBwYWdlU3RvcmFnZVtjb21tZW50SWRdID0gY29tbWVudFRleHRcbiAgICAgICAgdGhpcy5fd3JpdGVTdG9yYWdlKHBhZ2VJZCwgcGFnZVN0b3JhZ2UpXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcGFnZUlkXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGNvbW1lbnRJZFxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd8dW5kZWZpbmVkfVxuICAgICAqL1xuICAgIHN0YXRpYyBnZXRDb21tZW50KHBhZ2VJZCwgY29tbWVudElkKSB7XG4gICAgICAgIGNvbnN0IHBhZ2VTdG9yYWdlID0gdGhpcy5nZXRTdG9yYWdlKClbcGFnZUlkXSB8fCB7fVxuICAgICAgICByZXR1cm4gcGFnZVN0b3JhZ2VbY29tbWVudElkXVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHBhZ2VJZFxuICAgICAqIEByZXR1cm5zIHtPYmplY3R9XG4gICAgICovXG4gICAgc3RhdGljIGdldEFsbENvbW1lbnRzKHBhZ2VJZCkge1xuICAgICAgICBjb25zdCBwYWdlU3RvcmFnZSA9IHRoaXMuZ2V0U3RvcmFnZSgpW3BhZ2VJZF0gfHwge31cbiAgICAgICAgcmV0dXJuIHBhZ2VTdG9yYWdlXG4gICAgfVxuXG59IiwiZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVN0b3JhZ2VJZk5vdEV4aXN0cyhrZXksIGluaXRWYWx1ZT17fSkge1xuICAgIGlmICghbG9jYWxTdG9yYWdlLmdldEl0ZW0oa2V5KSkge1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShrZXksIEpTT04uc3RyaW5naWZ5KGluaXRWYWx1ZSkpO1xuICAgIH1cbn0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7UGFnZUZhY3Rvcnl9IGZyb20gXCIuL1BhZ2VGYWN0b3J5XCI7XG5pbXBvcnQge3ByaW50RXh0ZW5zaW9uSW5mb30gZnJvbSBcIi4vZnVuY3Rpb25zXCI7XG5cbnByaW50RXh0ZW5zaW9uSW5mbygpXG5jb25zdCBwYWdlRmFjdG9yeSA9IG5ldyBQYWdlRmFjdG9yeShsb2NhdGlvbi5wYXRobmFtZSlcbmNvbnN0IHBhZ2UgPSBwYWdlRmFjdG9yeS5jcmVhdGUoKVxucGFnZS5tb2RpZnlDb250ZW50KClcblxuXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=