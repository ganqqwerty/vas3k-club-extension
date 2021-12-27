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
        // this.hideAssholeComments()
        // this.movePostCommentForm()
        this.addProtectCommentButtons()
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
        const comments = document.querySelectorAll('.comment')
        for (const comment of comments) {
            this.protectComment(comment.id)
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

    addProtectCommentButtons() {
        const replyElements = document.querySelectorAll('.comment-header-badges')
        console.log(replyElements)
        for (const replyElement of replyElements) {
            const button = this.createButton();
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
        const button = document.createElement("a")
        button.setAttribute("class", "protect-comment-button")
        button.setAttribute("title", "Сохранить коммент")
        button.style.cursor = 'pointer';
        button.innerText = "📥"
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
const ASSHOLES_STORAGE_KEY = 'assholes';

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
const BLACKLIST_STORAGE_KEY = 'blacklist';

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
const PRIVATE_COMMENTS_KEY = 'private-comments';

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
const PROTECTED_COMMENTS_STORAGE_KEY = "protectedComments"
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxRQUFRO0FBQ3ZCLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7VUM3REE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7QUNOMEM7QUFDSzs7QUFFL0MsOERBQWtCO0FBQ2xCLHdCQUF3QixxREFBVztBQUNuQztBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdmFzM2stY2x1Yi1leHRlbnNpb24vLi9zcmMvUGFnZUZhY3RvcnkuanMiLCJ3ZWJwYWNrOi8vdmFzM2stY2x1Yi1leHRlbnNpb24vLi9zcmMvZnVuY3Rpb25zLmpzIiwid2VicGFjazovL3ZhczNrLWNsdWItZXh0ZW5zaW9uLy4vc3JjL3BhZ2VzL0ZlZWRQYWdlLmpzIiwid2VicGFjazovL3ZhczNrLWNsdWItZXh0ZW5zaW9uLy4vc3JjL3BhZ2VzL093blVzZXJQYWdlLmpzIiwid2VicGFjazovL3ZhczNrLWNsdWItZXh0ZW5zaW9uLy4vc3JjL3BhZ2VzL1BhZ2UuanMiLCJ3ZWJwYWNrOi8vdmFzM2stY2x1Yi1leHRlbnNpb24vLi9zcmMvcGFnZXMvUG9zdFBhZ2UuanMiLCJ3ZWJwYWNrOi8vdmFzM2stY2x1Yi1leHRlbnNpb24vLi9zcmMvcGFnZXMvVXNlclBhZ2UuanMiLCJ3ZWJwYWNrOi8vdmFzM2stY2x1Yi1leHRlbnNpb24vLi9zcmMvc3RvcmFnZS9Bc3Nob2xlc1N0b3JhZ2UuanMiLCJ3ZWJwYWNrOi8vdmFzM2stY2x1Yi1leHRlbnNpb24vLi9zcmMvc3RvcmFnZS9CbGFja2xpc3RTdG9yYWdlLmpzIiwid2VicGFjazovL3ZhczNrLWNsdWItZXh0ZW5zaW9uLy4vc3JjL3N0b3JhZ2UvUHJpdmF0ZUNvbW1lbnRzU3RvcmFnZS5qcyIsIndlYnBhY2s6Ly92YXMzay1jbHViLWV4dGVuc2lvbi8uL3NyYy9zdG9yYWdlL1Byb3RlY3RlZENvbW1lbnRzU3RvcmFnZS5qcyIsIndlYnBhY2s6Ly92YXMzay1jbHViLWV4dGVuc2lvbi93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly92YXMzay1jbHViLWV4dGVuc2lvbi93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdmFzM2stY2x1Yi1leHRlbnNpb24vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly92YXMzay1jbHViLWV4dGVuc2lvbi93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3ZhczNrLWNsdWItZXh0ZW5zaW9uLy4vc3JjL21haW4uanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtnZXRVc2VyfSBmcm9tIFwiLi9mdW5jdGlvbnNcIjtcbmltcG9ydCB7VXNlclBhZ2V9IGZyb20gXCIuL3BhZ2VzL1VzZXJQYWdlXCI7XG5pbXBvcnQge093blVzZXJQYWdlfSBmcm9tIFwiLi9wYWdlcy9Pd25Vc2VyUGFnZVwiO1xuaW1wb3J0IHtQb3N0UGFnZX0gZnJvbSBcIi4vcGFnZXMvUG9zdFBhZ2VcIjtcbmltcG9ydCB7UGFnZX0gZnJvbSBcIi4vcGFnZXMvUGFnZVwiO1xuaW1wb3J0IHtGZWVkUGFnZX0gZnJvbSBcIi4vcGFnZXMvRmVlZFBhZ2VcIjtcblxuZXhwb3J0IGNsYXNzIFBhZ2VGYWN0b3J5IHtcbiAgICBjb25zdHJ1Y3RvcihwYXRobmFtZSkge1xuICAgICAgICAvKipcbiAgICAgICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMucGF0aG5hbWUgPSBwYXRobmFtZTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMucGFnZVR5cGUgPSB0aGlzLmdldFBhZ2VUeXBlKClcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtQYWdlfVxuICAgICAqL1xuICAgIGNyZWF0ZSgpIHtcblxuICAgICAgICBpZiAodGhpcy5pc1VzZXJQYWdlVHlwZSgpKSB7XG4gICAgICAgICAgICBpZiAoZ2V0VXNlcigpID09PSB0aGlzLmdldFdob0FtSSgpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBPd25Vc2VyUGFnZSh0aGlzLnBhdGhuYW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBuZXcgVXNlclBhZ2UodGhpcy5wYXRobmFtZSlcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmlzVXNlckNvbnRlbnRQYWdlVHlwZSgpKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFBvc3RQYWdlKHRoaXMucGF0aG5hbWUpXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuaXNGZWVkUGFnZSgpKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEZlZWRQYWdlKHRoaXMucGF0aG5hbWUpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ldyBQYWdlKHRoaXMucGF0aG5hbWUpXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgaXNGZWVkUGFnZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGFnZVR5cGUgPT09ICdhbGwnIHx8IHRoaXMucGF0aG5hbWUgPT09ICcvJ1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIGlzVXNlckNvbnRlbnRQYWdlVHlwZSgpIHtcbiAgICAgICAgY29uc3QgY29udGVudFR5cGVzID0gWydiYXR0bGUnLCBcInF1ZXN0aW9uXCIsIFwicG9zdFwiLCBcImlkZWFcIl1cbiAgICAgICAgcmV0dXJuIGNvbnRlbnRUeXBlcy5pbmNsdWRlcyh0aGlzLnBhZ2VUeXBlKVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIGlzVXNlclBhZ2VUeXBlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wYWdlVHlwZSA9PT0gXCJ1c2VyXCJcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgICAqL1xuICAgIGdldFBhZ2VUeXBlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wYXRobmFtZVxuICAgICAgICAgICAgLnNwbGl0KCcvJylcbiAgICAgICAgICAgIC5maWx0ZXIoYSA9PiBhKVswXVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAgICovXG4gICAgZ2V0V2hvQW1JKCkge1xuICAgICAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tZW51LXJpZ2h0PmEuYXZhdGFyXCIpXG4gICAgICAgICAgICAuZ2V0QXR0cmlidXRlKFwiaHJlZlwiKVxuICAgICAgICAgICAgLnNwbGl0KCcvJylcbiAgICAgICAgICAgIC5maWx0ZXIoYSA9PiBhKVxuICAgICAgICAgICAgLnBvcCgpXG4gICAgfVxufSIsIi8qKlxuICogQHJldHVybnMge3N0cmluZ31cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFVzZXIoKSB7XG4gICAgcmV0dXJuIGRvY3VtZW50LmxvY2F0aW9uLnBhdGhuYW1lLnNwbGl0KCcvJykuZmlsdGVyKChhKSA9PiBhKS5wb3AoKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gaGlkZVZvdGVzUmF0aW5nc0F2YXRhcnMoKSB7XG4gICAgY29uc3QgZGlzdHJhY3RlZEVsZW1lbnRzU2VsZWN0b3JzID0gW1xuICAgICAgICAnLnVwdm90ZScsXG4gICAgICAgICcudXB2b3RlLXZvdGVkJyxcbiAgICAgICAgJy51cHZvdGUtdHlwZS1pbmxpbmUnLFxuICAgICAgICAnLmNvbW1lbnQtcmF0aW5nJyxcbiAgICAgICAgJy5mZWVkLXBvc3QtY29tbWVudHMtdW5yZWFkJ1xuICAgIF1cblxuICAgIGZvciAoY29uc3Qgc2VsZWN0b3Igb2YgZGlzdHJhY3RlZEVsZW1lbnRzU2VsZWN0b3JzKSB7XG4gICAgICAgIGZvciAoY29uc3QgZWwgb2YgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcikpIHtcbiAgICAgICAgICAgIGVsLnJlbW92ZSgpXG4gICAgICAgIH1cbiAgICB9XG4gICAgZm9yIChjb25zdCBhdmF0YXIgb2YgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5hdmF0YXI+aW1nXCIpKSB7XG4gICAgICAgIGF2YXRhci5zZXRBdHRyaWJ1dGUoXCJzcmNcIiwgXCJodHRwczovL2kudmFzM2suY2x1Yi92LnBuZ1wiKVxuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHByaW50RXh0ZW5zaW9uSW5mbygpIHtcbiAgICBjb25zb2xlLmluZm8gKFwi0JLRgdC10Lwg0LHQvtGP0YLRjNGB0Y8hINCS0LDRgdGC0YDQuNC6LdGL0LrRgdGC0Y3QvdGI0YvQvSB2MS4wLjBcIilcbiAgICBjb25zb2xlLmxvZyhgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAobykobylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLyAgICAgXFxcXFxuICAgICAgICAgICAgICAgICAgICAgICAgIC8gICAgICAgfFxuICAgICAgICAgICAgICAgICAgICAgICAgLyAgIFxcXFwgICogfFxuICAgICAgICAgIF9fX19fX19fICAgICAvICAgIC9cXFxcX18vXG4gIF8gICAgICAvICAgICAgICBcXFxcICAgLyAgICAvXG4gLyBcXFxcICAgIC8gIF9fX18gICAgXFxcXF8vICAgIC9cbi8vXFxcXCBcXFxcICAvICAvICAgIFxcXFwgICAgICAgICAvXG5WICBcXFxcIFxcXFwvICAvICAgICAgXFxcXCAgICAgICAvXG4gICAgXFxcXF9fXy8gICAgICAgIFxcXFxfX19fXy9cbiAgICBgKVxufVxuXG5cbiIsImltcG9ydCB7UGFnZX0gZnJvbSBcIi4vUGFnZVwiO1xuaW1wb3J0IHtBc3Nob2xlc1N0b3JhZ2V9IGZyb20gXCIuLi9zdG9yYWdlL0Fzc2hvbGVzU3RvcmFnZVwiO1xuaW1wb3J0IHtCbGFja2xpc3RTdG9yYWdlfSBmcm9tIFwiLi4vc3RvcmFnZS9CbGFja2xpc3RTdG9yYWdlXCI7XG5cbmV4cG9ydCBjbGFzcyBGZWVkUGFnZSBleHRlbmRzIFBhZ2Uge1xuICAgIGNvbnN0cnVjdG9yKHBhdGhuYW1lKSB7XG4gICAgICAgIHN1cGVyKHBhdGhuYW1lKTtcbiAgICB9XG5cbiAgICBtb2RpZnlDb250ZW50KCkge1xuICAgICAgICB0aGlzLmhpZGVCbGFja2xpc3RlZFBvc3RzKClcbiAgICAgICAgdGhpcy5oaWRlQXNzaG9sZVBvc3RzKClcbiAgICAgICAgLy8gaGlkZVZvdGVzUmF0aW5nc0F2YXRhcnMoKVxuICAgICAgICB0aGlzLmFkZEJsYWNrbGlzdEJ1dHRvbigpXG5cbiAgICB9XG5cbiAgICBhZGRCbGFja2xpc3RCdXR0b24oKSB7XG4gICAgICAgIGNvbnN0IHBvc3RzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5mZWVkLXBvc3QtZm9vdGVyXCIpXG4gICAgICAgIHBvc3RzLmZvckVhY2gocG9zdCA9PiB7XG4gICAgICAgICAgICBjb25zdCBwYWdlSWQgPSBwb3N0LnF1ZXJ5U2VsZWN0b3IoXCJhLmZlZWQtcG9zdC1jb21tZW50c1wiKVxuICAgICAgICAgICAgICAgIC5nZXRBdHRyaWJ1dGUoXCJocmVmXCIpXG4gICAgICAgICAgICAgICAgLnNwbGl0KFwiL1wiKVxuICAgICAgICAgICAgICAgIC5zbGljZSgxLCAtMSlcbiAgICAgICAgICAgICAgICAuam9pbihcIi9cIilcbiAgICAgICAgICAgIGNvbnN0IGJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhXCIpXG4gICAgICAgICAgICBidXR0b24uaW5uZXJUZXh0ID0gXCLwn5mIXCJcbiAgICAgICAgICAgIGJ1dHRvbi5zZXRBdHRyaWJ1dGUoXCJ0aXRsZVwiLCBcItCh0LvRg9GI0LDQudGC0LUsINCwINC90YMg0LXQs9C+INC90LDRhdC10YAhXCIpXG4gICAgICAgICAgICBidXR0b24uY2xhc3NMaXN0LmFkZChcImZlZWQtcG9zdC1jb21tZW50c1wiKVxuICAgICAgICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgQmxhY2tsaXN0U3RvcmFnZS5hZGRQYWdlKHBhZ2VJZClcbiAgICAgICAgICAgICAgICBwb3N0LnBhcmVudEVsZW1lbnQucmVtb3ZlKClcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBwb3N0LmFwcGVuZENoaWxkKGJ1dHRvbilcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBoaWRlQXNzaG9sZVBvc3RzKCkge1xuICAgICAgICBmb3IgKGNvbnN0IGFzc2hvbGUgb2YgQXNzaG9sZXNTdG9yYWdlLmdldEFzc2hvbGVzKCkpIHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgYXNzaG9sZUhyZWYgb2YgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgW2hyZWY9XCIvdXNlci8ke2Fzc2hvbGV9L1wiXWApKSB7XG4gICAgICAgICAgICAgICAgYXNzaG9sZUhyZWZcbiAgICAgICAgICAgICAgICAgICAgLnBhcmVudEVsZW1lbnRcbiAgICAgICAgICAgICAgICAgICAgLnBhcmVudEVsZW1lbnRcbiAgICAgICAgICAgICAgICAgICAgLnJlbW92ZSgpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoaWRlQmxhY2tsaXN0ZWRQb3N0cygpIHtcbiAgICAgICAgY29uc3QgcmVmcyA9IEJsYWNrbGlzdFN0b3JhZ2UuZ2V0QmxhY2tsaXN0KClcbiAgICAgICAgZm9yIChjb25zdCByZWYgb2YgcmVmcykge1xuICAgICAgICAgICAgZm9yIChjb25zdCB0b3BpYyBvZiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGBhW2hyZWYqPVwiJHtyZWZ9XCJdYCkpIHtcbiAgICAgICAgICAgICAgICB0b3BpY1xuICAgICAgICAgICAgICAgICAgICAucGFyZW50RWxlbWVudFxuICAgICAgICAgICAgICAgICAgICAucGFyZW50RWxlbWVudFxuICAgICAgICAgICAgICAgICAgICAucmVtb3ZlKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuXG59IiwiaW1wb3J0IHtQYWdlfSBmcm9tIFwiLi9QYWdlXCI7XG5pbXBvcnQge0Fzc2hvbGVzU3RvcmFnZX0gZnJvbSBcIi4uL3N0b3JhZ2UvQXNzaG9sZXNTdG9yYWdlXCI7XG5pbXBvcnQge0JsYWNrbGlzdFN0b3JhZ2V9IGZyb20gXCIuLi9zdG9yYWdlL0JsYWNrbGlzdFN0b3JhZ2VcIjtcblxuZXhwb3J0IGNsYXNzIE93blVzZXJQYWdlIGV4dGVuZHMgUGFnZSB7XG4gICAgY29uc3RydWN0b3IocGF0aG5hbWUpIHtcbiAgICAgICAgc3VwZXIocGF0aG5hbWUpO1xuICAgIH1cblxuICAgIG1vZGlmeUNvbnRlbnQoKSB7XG4gICAgICAgIHRoaXMuYWRkQXNzaG9sZXNMaXN0KClcbiAgICB9XG5cbiAgICBjcmVhdGVBc3Nob2xlc0xpc3RFZGl0KCkge1xuICAgICAgICBjb25zdCB3aWRnZXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpXG4gICAgICAgIHdpZGdldC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImJsb2NrXCIpXG4gICAgICAgIGNvbnN0IGhlYWRlciA9IFwiPGgyIGNsYXNzPSdwcm9maWxlLWhlYWRlcic+0JzQvtC4INC80YPQtNCw0LrQuDwvaDI+XCJcbiAgICAgICAgY29uc3QgdGV4dEFyZWEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGV4dGFyZWFcIilcbiAgICAgICAgdGV4dEFyZWEuc3R5bGUud2lkdGggPSBcIjEwMCVcIlxuICAgICAgICB0ZXh0QXJlYS52YWx1ZSA9IEFzc2hvbGVzU3RvcmFnZS5nZXRBc3Nob2xlc1RleHQoKVxuICAgICAgICB0ZXh0QXJlYS5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgKCkgPT4gQXNzaG9sZXNTdG9yYWdlLnNldEFzc2hvbGVzVGV4dCh0ZXh0QXJlYS52YWx1ZSkpXG4gICAgICAgIHdpZGdldC5pbnNlcnRBZGphY2VudEhUTUwoXCJhZnRlcmJlZ2luXCIsIGhlYWRlcilcbiAgICAgICAgd2lkZ2V0LmFwcGVuZENoaWxkKHRleHRBcmVhKVxuICAgICAgICByZXR1cm4gd2lkZ2V0XG4gICAgfVxuXG4gICAgY3JlYXRlQmxhY2tsaXN0RWRpdCgpIHtcbiAgICAgICAgY29uc3Qgd2lkZ2V0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKVxuICAgICAgICB3aWRnZXQuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJibG9ja1wiKVxuICAgICAgICBjb25zdCBoZWFkZXIgPSBcIjxoMiBjbGFzcz0ncHJvZmlsZS1oZWFkZXInPtCn0LXRgNC90YvQuSDRgdC/0LjRgdC+0Log0YHRgtGA0LDQvdC40YY8L2gyPlwiXG4gICAgICAgIGNvbnN0IHRleHRBcmVhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRleHRhcmVhXCIpXG4gICAgICAgIHRleHRBcmVhLnN0eWxlLndpZHRoID0gXCIxMDAlXCJcbiAgICAgICAgdGV4dEFyZWEudmFsdWUgPSBCbGFja2xpc3RTdG9yYWdlLmdldEJsYWNrbGlzdFRleHQoKVxuICAgICAgICB0ZXh0QXJlYS5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgKCkgPT4gQmxhY2tsaXN0U3RvcmFnZS5zZXRCbGFja2xpc3RUZXh0KHRleHRBcmVhLnZhbHVlKSlcbiAgICAgICAgd2lkZ2V0Lmluc2VydEFkamFjZW50SFRNTChcImFmdGVyYmVnaW5cIiwgaGVhZGVyKVxuICAgICAgICB3aWRnZXQuYXBwZW5kQ2hpbGQodGV4dEFyZWEpXG4gICAgICAgIHJldHVybiB3aWRnZXRcbiAgICB9XG5cbiAgICBhZGRBc3Nob2xlc0xpc3QoKSB7XG4gICAgICAgIGNvbnN0IHByb2ZpbGVJbmZvID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2ZpbGUtaW50cm8nKVxuICAgICAgICBwcm9maWxlSW5mby5hcHBlbmRDaGlsZCggdGhpcy5jcmVhdGVBc3Nob2xlc0xpc3RFZGl0KCkpXG4gICAgICAgIHByb2ZpbGVJbmZvLmFwcGVuZENoaWxkKCB0aGlzLmNyZWF0ZUJsYWNrbGlzdEVkaXQoKSlcbiAgICB9XG5cbn0iLCJleHBvcnQgY2xhc3MgUGFnZSB7XG4gICAgY29uc3RydWN0b3IocGF0aG5hbWUpIHtcbiAgICAgICAgaWYgKCFwYXRobmFtZSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdwYXRobmFtZSBpcyByZXF1aXJlZCcpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucGF0aG5hbWUgPSBwYXRobmFtZTtcbiAgICB9XG5cbiAgICBtb2RpZnlDb250ZW50KCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIk5vdGhpbmcgaXMgaGFwcGVuZWQsIGl0J3MgYW4gdW5zcGVjaWZpZWQgcGFnZVwiKVxuICAgIH1cbn0iLCJpbXBvcnQge1BhZ2V9IGZyb20gXCIuL1BhZ2VcIjtcbmltcG9ydCB7QXNzaG9sZXNTdG9yYWdlfSBmcm9tIFwiLi4vc3RvcmFnZS9Bc3Nob2xlc1N0b3JhZ2VcIjtcbmltcG9ydCB7UHJvdGVjdGVkQ29tbWVudHNTdG9yYWdlfSBmcm9tIFwiLi4vc3RvcmFnZS9Qcm90ZWN0ZWRDb21tZW50c1N0b3JhZ2VcIjtcblxuZXhwb3J0IGNsYXNzIFBvc3RQYWdlIGV4dGVuZHMgUGFnZSB7XG4gICAgY29uc3RydWN0b3IodXJsKSB7XG4gICAgICAgIHN1cGVyKHVybCk7XG4gICAgfVxuXG4gICAgbW9kaWZ5Q29udGVudCgpIHtcbiAgICAgICAgLy8gdGhpcy5oaWRlQXNzaG9sZUNvbW1lbnRzKClcbiAgICAgICAgLy8gdGhpcy5tb3ZlUG9zdENvbW1lbnRGb3JtKClcbiAgICAgICAgdGhpcy5hZGRQcm90ZWN0Q29tbWVudEJ1dHRvbnMoKVxuICAgICAgICB0aGlzLnJlc3RvcmVDb21tZW50cygpXG4gICAgfVxuXG4gICAgaGlkZUFzc2hvbGVDb21tZW50cygpIHtcbiAgICAgICAgZm9yIChjb25zdCBhc3Nob2xlIG9mIEFzc2hvbGVzU3RvcmFnZS5nZXRBc3Nob2xlcygpKSB7XG4gICAgICAgICAgICBjb25zdCBzZWxlY3RvciA9IGAuY29tbWVudC1oZWFkZXItYXV0aG9yLW5hbWVbaHJlZj1cIi91c2VyLyR7YXNzaG9sZX0vXCJdYFxuICAgICAgICAgICAgY29uc3Qgbm9kZXNXaXRoQXNzaG9sZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGFzc2hvbGVOb2RlIG9mIG5vZGVzV2l0aEFzc2hvbGUpIHtcbiAgICAgICAgICAgICAgICBhc3Nob2xlTm9kZVxuICAgICAgICAgICAgICAgICAgICAucGFyZW50RWxlbWVudFxuICAgICAgICAgICAgICAgICAgICAucGFyZW50RWxlbWVudFxuICAgICAgICAgICAgICAgICAgICAucGFyZW50RWxlbWVudFxuICAgICAgICAgICAgICAgICAgICAucGFyZW50RWxlbWVudFxuICAgICAgICAgICAgICAgICAgICAucmVtb3ZlKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBtb3ZlUG9zdENvbW1lbnRGb3JtKCkge1xuICAgICAgICBjb25zdCBwb3N0Q29tbWVudEZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcG9zdC1jb21tZW50cy1mb3JtJylcbiAgICAgICAgY29uc3QgY29tbWVudHNMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBvc3QtY29tbWVudHMtbGlzdCcpXG4gICAgICAgIGNvbnN0IHBvc3RDb21tZW50c1J1bGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBvc3QtY29tbWVudHMtcnVsZXMnKVxuICAgICAgICBjb25zdCBwYXJlbnQgPSBjb21tZW50c0xpc3QucGFyZW50RWxlbWVudFxuICAgICAgICBwYXJlbnQuaW5zZXJ0QmVmb3JlKHBvc3RDb21tZW50Rm9ybSwgY29tbWVudHNMaXN0KVxuICAgICAgICBwYXJlbnQuaW5zZXJ0QmVmb3JlKHBvc3RDb21tZW50c1J1bGVzLCBjb21tZW50c0xpc3QpXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGNvbW1lbnRJZFxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAgICovXG4gICAgZ2V0Q29tbWVudFRleHQoY29tbWVudElkKSB7XG4gICAgICAgIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjJHtjb21tZW50SWR9IC50ZXh0LWJvZHktdHlwZS1jb21tZW50YCkuaW5uZXJIVE1MXG4gICAgfVxuXG4gICAgLy9zYXZlcyB0aGUgY29tbWVudCB0byB0aGUgbG9jYWwgc3RvcmFnZVxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGNvbW1lbnRJZFxuICAgICAqL1xuICAgIHByb3RlY3RDb21tZW50KGNvbW1lbnRJZCkge1xuICAgICAgICBQcm90ZWN0ZWRDb21tZW50c1N0b3JhZ2UuYWRkQ29tbWVudCh0aGlzLnBhdGhuYW1lLCBjb21tZW50SWQsIHRoaXMuZ2V0Q29tbWVudFRleHQoY29tbWVudElkKSlcbiAgICB9XG5cbiAgICBwcm90ZWN0QWxsQ29tbWVudHMoKSB7XG4gICAgICAgIGNvbnN0IGNvbW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNvbW1lbnQnKVxuICAgICAgICBmb3IgKGNvbnN0IGNvbW1lbnQgb2YgY29tbWVudHMpIHtcbiAgICAgICAgICAgIHRoaXMucHJvdGVjdENvbW1lbnQoY29tbWVudC5pZClcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlc3RvcmVDb21tZW50cygpIHtcbiAgICAgICAgY29uc3QgZGVsZXRlZENvbW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5jb21tZW50LXRleHQtZGVsZXRlZFwiKVxuICAgICAgICBmb3IgKGNvbnN0IGRlbGV0ZWRDb21tZW50IG9mIGRlbGV0ZWRDb21tZW50cykge1xuICAgICAgICAgICB0aGlzLnJlc3RvcmVDb21tZW50KGRlbGV0ZWRDb21tZW50KVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0VsZW1lbnR9IGRlbGV0ZWRDb21tZW50XG4gICAgICovXG4gICAgcmVzdG9yZUNvbW1lbnQoZGVsZXRlZENvbW1lbnQpIHtcbiAgICAgICAgY29uc3QgY29tbWVudElkID0gZGVsZXRlZENvbW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQuaWRcbiAgICAgICAgY29uc3QgY29tbWVudFRleHQgPSBQcm90ZWN0ZWRDb21tZW50c1N0b3JhZ2UuZ2V0Q29tbWVudCh0aGlzLnBhdGhuYW1lLCBjb21tZW50SWQpXG4gICAgICAgIGlmIChjb21tZW50VGV4dCkge1xuICAgICAgICAgICAgZGVsZXRlZENvbW1lbnQuaW5uZXJIVE1MID0gY29tbWVudFRleHRcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFkZFByb3RlY3RDb21tZW50QnV0dG9ucygpIHtcbiAgICAgICAgY29uc3QgcmVwbHlFbGVtZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jb21tZW50LWhlYWRlci1iYWRnZXMnKVxuICAgICAgICBjb25zb2xlLmxvZyhyZXBseUVsZW1lbnRzKVxuICAgICAgICBmb3IgKGNvbnN0IHJlcGx5RWxlbWVudCBvZiByZXBseUVsZW1lbnRzKSB7XG4gICAgICAgICAgICBjb25zdCBidXR0b24gPSB0aGlzLmNyZWF0ZUJ1dHRvbigpO1xuICAgICAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXNcbiAgICAgICAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oZXZ0KSB7XG4gICAgICAgICAgICAgICAgY29uc3QgY29tbWVudElkID0gdGhpcy5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5pZFxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiYmxhYWFcIiwgY29tbWVudElkKVxuICAgICAgICAgICAgICAgIHNlbGYucHJvdGVjdENvbW1lbnQoY29tbWVudElkKVxuXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgcmVwbHlFbGVtZW50LmFwcGVuZENoaWxkKGJ1dHRvbilcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNyZWF0ZUJ1dHRvbigpIHtcbiAgICAgICAgY29uc3QgYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFcIilcbiAgICAgICAgYnV0dG9uLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwicHJvdGVjdC1jb21tZW50LWJ1dHRvblwiKVxuICAgICAgICBidXR0b24uc2V0QXR0cmlidXRlKFwidGl0bGVcIiwgXCLQodC+0YXRgNCw0L3QuNGC0Ywg0LrQvtC80LzQtdC90YJcIilcbiAgICAgICAgYnV0dG9uLnN0eWxlLmN1cnNvciA9ICdwb2ludGVyJztcbiAgICAgICAgYnV0dG9uLmlubmVyVGV4dCA9IFwi8J+TpVwiXG4gICAgICAgIHJldHVybiBidXR0b247XG4gICAgfVxuXG59XG4iLCJpbXBvcnQge1BhZ2V9IGZyb20gXCIuL1BhZ2VcIjtcbmltcG9ydCB7QXNzaG9sZXNTdG9yYWdlfSBmcm9tIFwiLi4vc3RvcmFnZS9Bc3Nob2xlc1N0b3JhZ2VcIjtcbmltcG9ydCB7UHJpdmF0ZUNvbW1lbnRzU3RvcmFnZX0gZnJvbSBcIi4uL3N0b3JhZ2UvUHJpdmF0ZUNvbW1lbnRzU3RvcmFnZVwiO1xuXG5leHBvcnQgY2xhc3MgVXNlclBhZ2UgZXh0ZW5kcyBQYWdlIHtcbiAgICBjb25zdHJ1Y3Rvcih1cmwpIHtcbiAgICAgICAgc3VwZXIodXJsKTtcbiAgICAgICAgdGhpcy51c2VyID0gdGhpcy5nZXRVc2VyKCk7XG4gICAgfVxuXG4gICAgbW9kaWZ5Q29udGVudCgpIHtcbiAgICAgICAgdGhpcy5hZGRBc3Nob2xlQnV0dG9uKClcbiAgICAgICAgdGhpcy5hZGRQcml2YXRlQ29tbWVudFdpZGdldCgpXG4gICAgfVxuXG4gICAgYWRkUHJpdmF0ZUNvbW1lbnRXaWRnZXQoKSB7XG4gICAgICAgIGNvbnN0IHdpZGdldCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIilcbiAgICAgICAgd2lkZ2V0LnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwiYmxvY2tcIilcbiAgICAgICAgY29uc3QgaGVhZGVyID0gXCI8aDIgY2xhc3M9J3Byb2ZpbGUtaGVhZGVyJz7Qn9GA0LjQstCw0YLQvdGL0LUg0LrQvtC80LzQtdC90YLQsNGA0LjQuDwvaDI+XCJcbiAgICAgICAgY29uc3QgdGV4dGFyZWEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGV4dGFyZWFcIilcbiAgICAgICAgdGV4dGFyZWEudmFsdWUgPSBQcml2YXRlQ29tbWVudHNTdG9yYWdlLmdldENvbW1lbnQodGhpcy51c2VyIHx8IFwiXCIpXG4gICAgICAgIHRleHRhcmVhLmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCAodGV4dCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgY29tbWVudCA9IHRleHQudGFyZ2V0LnZhbHVlXG4gICAgICAgICAgICBQcml2YXRlQ29tbWVudHNTdG9yYWdlLnNldENvbW1lbnQodGhpcy51c2VyLCBjb21tZW50KVxuICAgICAgICB9KVxuICAgICAgICB3aWRnZXQuaW5uZXJIVE1MID0gaGVhZGVyXG4gICAgICAgIHdpZGdldC5hcHBlbmRDaGlsZCh0ZXh0YXJlYSlcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9maWxlLXN0YXR1c2VzXCIpLmFwcGVuZENoaWxkKHdpZGdldClcbiAgICB9XG5cbiAgICBhZGRBc3Nob2xlQnV0dG9uKCkge1xuICAgICAgICBjb25zdCBwYXJzZXIgPSBuZXcgRE9NUGFyc2VyKCk7XG4gICAgICAgIGNvbnN0IGFzc2hvbGVCdG5TdHIgPSBgPGEgY2xhc3M9XCJwcm9maWxlLXN0YXR1cyBjbGlja2FibGVcIj48c3BhbiBjbGFzcz1cInByb2ZpbGUtc3RhdHVzLWljb25cIj7wn5aVPC9zcGFuPiA8c3BhbiBjbGFzcz1cInByb2ZpbGUtc3RhdHVzLXN0YXR1c1wiPtCU0L7QsdCw0LLQuNGC0Ywg0LIg0LzQvtC4INC80YPQtNCw0LrQuDwvc3Bhbj48L2E+YFxuICAgICAgICBjb25zdCBhc3Nob2xlQnRuID0gcGFyc2VyLnBhcnNlRnJvbVN0cmluZyhhc3Nob2xlQnRuU3RyLCAndGV4dC9odG1sJykucXVlcnlTZWxlY3RvcihcImFcIik7XG4gICAgICAgIGFzc2hvbGVCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgICAgIEFzc2hvbGVzU3RvcmFnZS5hZGRBc3Nob2xlKHRoaXMuZ2V0VXNlcigpKVxuICAgICAgICB9KVxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2ZpbGUtc3RhdHVzZXNcIikuYXBwZW5kQ2hpbGQoYXNzaG9sZUJ0bilcbiAgICAgICAgaWYgKHRoaXMuaXNVc2VyQXNzaG9sZSh0aGlzLmdldFVzZXIoKSkpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwidGhlIHVzZXIgaXMgYW4gYXNzaG9sZSFcIilcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAgICovXG4gICAgIGdldFVzZXIoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBhdGhuYW1lLnNwbGl0KCcvJykuZmlsdGVyKChhKSA9PiBhKS5wb3AoKVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB1c2VyXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgaXNVc2VyQXNzaG9sZSh1c2VyKSB7XG4gICAgICAgIHJldHVybiBBc3Nob2xlc1N0b3JhZ2UuZ2V0QXNzaG9sZXMoKS5pbmNsdWRlcyh1c2VyKVxuICAgIH1cbn0iLCJjb25zdCBBU1NIT0xFU19TVE9SQUdFX0tFWSA9ICdhc3Nob2xlcyc7XG5cbmV4cG9ydCBjbGFzcyBBc3Nob2xlc1N0b3JhZ2Uge1xuICAgIHN0YXRpYyBnZXRBc3Nob2xlc1RleHQoKSB7XG4gICAgICAgIHJldHVybiBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShBU1NIT0xFU19TVE9SQUdFX0tFWSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nW119XG4gICAgICovXG4gICAgc3RhdGljIGdldEFzc2hvbGVzKCkge1xuICAgICAgICByZXR1cm4gQXNzaG9sZXNTdG9yYWdlLmdldEFzc2hvbGVzVGV4dCgpLnNwbGl0KCcsJykgfHwgW107XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gYXNzaG9sZXNUZXh0XG4gICAgICovXG4gICAgc3RhdGljIHNldEFzc2hvbGVzVGV4dChhc3Nob2xlc1RleHQpIHtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oQVNTSE9MRVNfU1RPUkFHRV9LRVksIGFzc2hvbGVzVGV4dCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gYXNzaG9sZVxuICAgICAqL1xuICAgIHN0YXRpYyBhZGRBc3Nob2xlKGFzc2hvbGUpIHtcbiAgICAgICAgY29uc3QgYXNzaG9sZXMgPSB0aGlzLmdldEFzc2hvbGVzKCk7XG4gICAgICAgIGlmIChhc3Nob2xlcy5pbmNsdWRlcyhhc3Nob2xlKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGFzc2hvbGVzLnB1c2goYXNzaG9sZSk7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKEFTU0hPTEVTX1NUT1JBR0VfS0VZLCBhc3Nob2xlcy5qb2luKCcsJykpO1xuICAgIH1cbn0iLCJjb25zdCBCTEFDS0xJU1RfU1RPUkFHRV9LRVkgPSAnYmxhY2tsaXN0JztcblxuZXhwb3J0IGNsYXNzIEJsYWNrbGlzdFN0b3JhZ2Uge1xuICAgIHN0YXRpYyBnZXRCbGFja2xpc3RUZXh0KCkge1xuICAgICAgICByZXR1cm4gbG9jYWxTdG9yYWdlLmdldEl0ZW0oQkxBQ0tMSVNUX1NUT1JBR0VfS0VZKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtzdHJpbmdbXX1cbiAgICAgKi9cbiAgICBzdGF0aWMgZ2V0QmxhY2tsaXN0KCkge1xuICAgICAgICByZXR1cm4gQmxhY2tsaXN0U3RvcmFnZS5nZXRCbGFja2xpc3RUZXh0KCkuc3BsaXQoJywnKSB8fCBbXTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0XG4gICAgICovXG4gICAgc3RhdGljIHNldEJsYWNrbGlzdFRleHQodGV4dCkge1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShCTEFDS0xJU1RfU1RPUkFHRV9LRVksIHRleHQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHBhZ2VcbiAgICAgKi9cbiAgICBzdGF0aWMgYWRkUGFnZShwYWdlKSB7XG4gICAgICAgIGNvbnN0IGxpc3QgPSB0aGlzLmdldEJsYWNrbGlzdCgpO1xuICAgICAgICBpZiAobGlzdC5pbmNsdWRlcyhwYWdlKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGxpc3QucHVzaChwYWdlKTtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oQkxBQ0tMSVNUX1NUT1JBR0VfS0VZLCBsaXN0KTtcbiAgICB9XG59IiwiY29uc3QgUFJJVkFURV9DT01NRU5UU19LRVkgPSAncHJpdmF0ZS1jb21tZW50cyc7XG5cbmV4cG9ydCBjbGFzcyBQcml2YXRlQ29tbWVudHNTdG9yYWdlIHtcbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB1c2VyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGNvbW1lbnRcbiAgICAgKi9cbiAgICBzdGF0aWMgc2V0Q29tbWVudCh1c2VyLCBjb21tZW50KSB7XG4gICAgICAgIGNvbnN0IGNvbW1lbnRzID0gUHJpdmF0ZUNvbW1lbnRzU3RvcmFnZS5nZXRDb21tZW50cygpO1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShQUklWQVRFX0NPTU1FTlRTX0tFWSwgSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgLi4uY29tbWVudHMsXG4gICAgICAgICAgICBbdXNlcl06IGNvbW1lbnRcbiAgICAgICAgfSkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHVzZXJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgICAqL1xuICAgIHN0YXRpYyBnZXRDb21tZW50KHVzZXIpIHtcbiAgICAgICAgY29uc3QgdXNlckNvbW1lbnQgPSBQcml2YXRlQ29tbWVudHNTdG9yYWdlLmdldENvbW1lbnRzKClcbiAgICAgICAgaWYgKCF1c2VyQ29tbWVudCkge1xuICAgICAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgdGV4dFByaXZhdGVDb21tZW50c09iaiA9ICB0aGlzLmdldENvbW1lbnRzKClcbiAgICAgICAgcmV0dXJuIHRleHRQcml2YXRlQ29tbWVudHNPYmpbdXNlcl0gfHwgXCJcIjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyB7T2JqZWN0fVxuICAgICAqL1xuICAgIHN0YXRpYyBnZXRDb21tZW50cygpIHtcbiAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oUFJJVkFURV9DT01NRU5UU19LRVkpIHx8IFwie31cIikgfHwge31cbiAgICB9XG59IiwiY29uc3QgUFJPVEVDVEVEX0NPTU1FTlRTX1NUT1JBR0VfS0VZID0gXCJwcm90ZWN0ZWRDb21tZW50c1wiXG5leHBvcnQgY2xhc3MgUHJvdGVjdGVkQ29tbWVudHNTdG9yYWdlIHtcbiAgICBzdGF0aWMgZ2V0U3RvcmFnZSgpIHtcbiAgICAgICAgaWYgKCFsb2NhbFN0b3JhZ2UuZ2V0SXRlbShQUk9URUNURURfQ09NTUVOVFNfU1RPUkFHRV9LRVkpKSB7XG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShQUk9URUNURURfQ09NTUVOVFNfU1RPUkFHRV9LRVksIEpTT04uc3RyaW5naWZ5KHt9KSlcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShQUk9URUNURURfQ09NTUVOVFNfU1RPUkFHRV9LRVkpKVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHBhZ2VJZFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwYWdlU3RvcmFnZVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgc3RhdGljIF93cml0ZVN0b3JhZ2UocGFnZUlkLCBwYWdlU3RvcmFnZSkge1xuICAgICAgICBjb25zdCBzdG9yYWdlT2JqID0gUHJvdGVjdGVkQ29tbWVudHNTdG9yYWdlLmdldFN0b3JhZ2UoKVxuICAgICAgICBjb25zdCBuZXdTdG9yYWdlT2JqID0ge1xuICAgICAgICAgICAgLi4uc3RvcmFnZU9iaixcbiAgICAgICAgICAgIFtwYWdlSWRdOiBwYWdlU3RvcmFnZVxuICAgICAgICB9XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFBST1RFQ1RFRF9DT01NRU5UU19TVE9SQUdFX0tFWSwgSlNPTi5zdHJpbmdpZnkobmV3U3RvcmFnZU9iaiwgbnVsbCwgMikpXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcGFnZUlkXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGNvbW1lbnRJZFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjb21tZW50VGV4dFxuICAgICAqL1xuICAgIHN0YXRpYyBhZGRDb21tZW50KHBhZ2VJZCwgY29tbWVudElkLCBjb21tZW50VGV4dCkge1xuXG4gICAgICAgIGlmICghdGhpcy5nZXRTdG9yYWdlKClbcGFnZUlkXSkge1xuICAgICAgICAgICAgbG9jYWxTdG9yYWdlW3BhZ2VJZF0gPSBKU09OLnN0cmluZ2lmeSh7fSwgbnVsbCwgMilcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBwYWdlU3RvcmFnZSA9IHRoaXMuZ2V0U3RvcmFnZSgpW3BhZ2VJZF0gfHwge31cbiAgICAgICAgcGFnZVN0b3JhZ2VbY29tbWVudElkXSA9IGNvbW1lbnRUZXh0XG4gICAgICAgIHRoaXMuX3dyaXRlU3RvcmFnZShwYWdlSWQsIHBhZ2VTdG9yYWdlKVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHBhZ2VJZFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjb21tZW50SWRcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfHVuZGVmaW5lZH1cbiAgICAgKi9cbiAgICBzdGF0aWMgZ2V0Q29tbWVudChwYWdlSWQsIGNvbW1lbnRJZCkge1xuICAgICAgICBjb25zdCBwYWdlU3RvcmFnZSA9IHRoaXMuZ2V0U3RvcmFnZSgpW3BhZ2VJZF0gfHwge31cbiAgICAgICAgcmV0dXJuIHBhZ2VTdG9yYWdlW2NvbW1lbnRJZF1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwYWdlSWRcbiAgICAgKiBAcmV0dXJucyB7T2JqZWN0fVxuICAgICAqL1xuICAgIHN0YXRpYyBnZXRBbGxDb21tZW50cyhwYWdlSWQpIHtcbiAgICAgICAgY29uc3QgcGFnZVN0b3JhZ2UgPSB0aGlzLmdldFN0b3JhZ2UoKVtwYWdlSWRdIHx8IHt9XG4gICAgICAgIHJldHVybiBwYWdlU3RvcmFnZVxuICAgIH1cblxufSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHtQYWdlRmFjdG9yeX0gZnJvbSBcIi4vUGFnZUZhY3RvcnlcIjtcbmltcG9ydCB7cHJpbnRFeHRlbnNpb25JbmZvfSBmcm9tIFwiLi9mdW5jdGlvbnNcIjtcblxucHJpbnRFeHRlbnNpb25JbmZvKClcbmNvbnN0IHBhZ2VGYWN0b3J5ID0gbmV3IFBhZ2VGYWN0b3J5KGxvY2F0aW9uLnBhdGhuYW1lKVxuY29uc3QgcGFnZSA9IHBhZ2VGYWN0b3J5LmNyZWF0ZSgpXG5wYWdlLm1vZGlmeUNvbnRlbnQoKVxuXG5cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==