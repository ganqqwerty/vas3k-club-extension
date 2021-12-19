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



class PostPage extends _Page__WEBPACK_IMPORTED_MODULE_0__.Page {
    constructor(url) {
        super(url);
    }

    modifyContent() {
        this.hideAssholeComments()
        this.movePostCommentForm()
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQSxlQUFlLFFBQVE7QUFDdkIsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0EsMkVBQTJFO0FBQzNFO0FBQ0E7Ozs7OztVQ3BDQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7OztBQ04wQztBQUNLOztBQUUvQyw4REFBa0I7QUFDbEIsd0JBQXdCLHFEQUFXO0FBQ25DO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly92YXMzay1jbHViLWV4dGVuc2lvbi8uL3NyYy9QYWdlRmFjdG9yeS5qcyIsIndlYnBhY2s6Ly92YXMzay1jbHViLWV4dGVuc2lvbi8uL3NyYy9mdW5jdGlvbnMuanMiLCJ3ZWJwYWNrOi8vdmFzM2stY2x1Yi1leHRlbnNpb24vLi9zcmMvcGFnZXMvRmVlZFBhZ2UuanMiLCJ3ZWJwYWNrOi8vdmFzM2stY2x1Yi1leHRlbnNpb24vLi9zcmMvcGFnZXMvT3duVXNlclBhZ2UuanMiLCJ3ZWJwYWNrOi8vdmFzM2stY2x1Yi1leHRlbnNpb24vLi9zcmMvcGFnZXMvUGFnZS5qcyIsIndlYnBhY2s6Ly92YXMzay1jbHViLWV4dGVuc2lvbi8uL3NyYy9wYWdlcy9Qb3N0UGFnZS5qcyIsIndlYnBhY2s6Ly92YXMzay1jbHViLWV4dGVuc2lvbi8uL3NyYy9wYWdlcy9Vc2VyUGFnZS5qcyIsIndlYnBhY2s6Ly92YXMzay1jbHViLWV4dGVuc2lvbi8uL3NyYy9zdG9yYWdlL0Fzc2hvbGVzU3RvcmFnZS5qcyIsIndlYnBhY2s6Ly92YXMzay1jbHViLWV4dGVuc2lvbi8uL3NyYy9zdG9yYWdlL0JsYWNrbGlzdFN0b3JhZ2UuanMiLCJ3ZWJwYWNrOi8vdmFzM2stY2x1Yi1leHRlbnNpb24vLi9zcmMvc3RvcmFnZS9Qcml2YXRlQ29tbWVudHNTdG9yYWdlLmpzIiwid2VicGFjazovL3ZhczNrLWNsdWItZXh0ZW5zaW9uL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3ZhczNrLWNsdWItZXh0ZW5zaW9uL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly92YXMzay1jbHViLWV4dGVuc2lvbi93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3ZhczNrLWNsdWItZXh0ZW5zaW9uL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdmFzM2stY2x1Yi1leHRlbnNpb24vLi9zcmMvbWFpbi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2dldFVzZXJ9IGZyb20gXCIuL2Z1bmN0aW9uc1wiO1xuaW1wb3J0IHtVc2VyUGFnZX0gZnJvbSBcIi4vcGFnZXMvVXNlclBhZ2VcIjtcbmltcG9ydCB7T3duVXNlclBhZ2V9IGZyb20gXCIuL3BhZ2VzL093blVzZXJQYWdlXCI7XG5pbXBvcnQge1Bvc3RQYWdlfSBmcm9tIFwiLi9wYWdlcy9Qb3N0UGFnZVwiO1xuaW1wb3J0IHtQYWdlfSBmcm9tIFwiLi9wYWdlcy9QYWdlXCI7XG5pbXBvcnQge0ZlZWRQYWdlfSBmcm9tIFwiLi9wYWdlcy9GZWVkUGFnZVwiO1xuXG5leHBvcnQgY2xhc3MgUGFnZUZhY3Rvcnkge1xuICAgIGNvbnN0cnVjdG9yKHBhdGhuYW1lKSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5wYXRobmFtZSA9IHBhdGhuYW1lO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5wYWdlVHlwZSA9IHRoaXMuZ2V0UGFnZVR5cGUoKVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHJldHVybnMge1BhZ2V9XG4gICAgICovXG4gICAgY3JlYXRlKCkge1xuXG4gICAgICAgIGlmICh0aGlzLmlzVXNlclBhZ2VUeXBlKCkpIHtcbiAgICAgICAgICAgIGlmIChnZXRVc2VyKCkgPT09IHRoaXMuZ2V0V2hvQW1JKCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IE93blVzZXJQYWdlKHRoaXMucGF0aG5hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG5ldyBVc2VyUGFnZSh0aGlzLnBhdGhuYW1lKVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuaXNVc2VyQ29udGVudFBhZ2VUeXBlKCkpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgUG9zdFBhZ2UodGhpcy5wYXRobmFtZSlcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5pc0ZlZWRQYWdlKCkpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRmVlZFBhZ2UodGhpcy5wYXRobmFtZSlcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3IFBhZ2UodGhpcy5wYXRobmFtZSlcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBpc0ZlZWRQYWdlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wYWdlVHlwZSA9PT0gJ2FsbCcgfHwgdGhpcy5wYXRobmFtZSA9PT0gJy8nXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgaXNVc2VyQ29udGVudFBhZ2VUeXBlKCkge1xuICAgICAgICBjb25zdCBjb250ZW50VHlwZXMgPSBbJ2JhdHRsZScsIFwicXVlc3Rpb25cIiwgXCJwb3N0XCIsIFwiaWRlYVwiXVxuICAgICAgICByZXR1cm4gY29udGVudFR5cGVzLmluY2x1ZGVzKHRoaXMucGFnZVR5cGUpXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgaXNVc2VyUGFnZVR5cGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBhZ2VUeXBlID09PSBcInVzZXJcIlxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAgICovXG4gICAgZ2V0UGFnZVR5cGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBhdGhuYW1lXG4gICAgICAgICAgICAuc3BsaXQoJy8nKVxuICAgICAgICAgICAgLmZpbHRlcihhID0+IGEpWzBdXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJldHVybnMge3N0cmluZ31cbiAgICAgKi9cbiAgICBnZXRXaG9BbUkoKSB7XG4gICAgICAgIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1lbnUtcmlnaHQ+YS5hdmF0YXJcIilcbiAgICAgICAgICAgIC5nZXRBdHRyaWJ1dGUoXCJocmVmXCIpXG4gICAgICAgICAgICAuc3BsaXQoJy8nKVxuICAgICAgICAgICAgLmZpbHRlcihhID0+IGEpXG4gICAgICAgICAgICAucG9wKClcbiAgICB9XG59IiwiLyoqXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0VXNlcigpIHtcbiAgICByZXR1cm4gZG9jdW1lbnQubG9jYXRpb24ucGF0aG5hbWUuc3BsaXQoJy8nKS5maWx0ZXIoKGEpID0+IGEpLnBvcCgpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBoaWRlVm90ZXNSYXRpbmdzQXZhdGFycygpIHtcbiAgICBjb25zdCBkaXN0cmFjdGVkRWxlbWVudHNTZWxlY3RvcnMgPSBbXG4gICAgICAgICcudXB2b3RlJyxcbiAgICAgICAgJy51cHZvdGUtdm90ZWQnLFxuICAgICAgICAnLnVwdm90ZS10eXBlLWlubGluZScsXG4gICAgICAgICcuY29tbWVudC1yYXRpbmcnLFxuICAgICAgICAnLmZlZWQtcG9zdC1jb21tZW50cy11bnJlYWQnXG4gICAgXVxuXG4gICAgZm9yIChjb25zdCBzZWxlY3RvciBvZiBkaXN0cmFjdGVkRWxlbWVudHNTZWxlY3RvcnMpIHtcbiAgICAgICAgZm9yIChjb25zdCBlbCBvZiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKSkge1xuICAgICAgICAgICAgZWwucmVtb3ZlKClcbiAgICAgICAgfVxuICAgIH1cbiAgICBmb3IgKGNvbnN0IGF2YXRhciBvZiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmF2YXRhcj5pbWdcIikpIHtcbiAgICAgICAgYXZhdGFyLnNldEF0dHJpYnV0ZShcInNyY1wiLCBcImh0dHBzOi8vaS52YXMzay5jbHViL3YucG5nXCIpXG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcHJpbnRFeHRlbnNpb25JbmZvKCkge1xuICAgIGNvbnNvbGUuaW5mbyAoXCLQktGB0LXQvCDQsdC+0Y/RgtGM0YHRjyEg0JLQsNGB0YLRgNC40Lot0YvQutGB0YLRjdC90YjRi9C9IHYxLjAuMFwiKVxuICAgIGNvbnNvbGUubG9nKGBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIChvKShvKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAvICAgICBcXFxcXG4gICAgICAgICAgICAgICAgICAgICAgICAgLyAgICAgICB8XG4gICAgICAgICAgICAgICAgICAgICAgICAvICAgXFxcXCAgKiB8XG4gICAgICAgICAgX19fX19fX18gICAgIC8gICAgL1xcXFxfXy9cbiAgXyAgICAgIC8gICAgICAgIFxcXFwgICAvICAgIC9cbiAvIFxcXFwgICAgLyAgX19fXyAgICBcXFxcXy8gICAgL1xuLy9cXFxcIFxcXFwgIC8gIC8gICAgXFxcXCAgICAgICAgIC9cblYgIFxcXFwgXFxcXC8gIC8gICAgICBcXFxcICAgICAgIC9cbiAgICBcXFxcX19fLyAgICAgICAgXFxcXF9fX19fL1xuICAgIGApXG59XG5cblxuIiwiaW1wb3J0IHtQYWdlfSBmcm9tIFwiLi9QYWdlXCI7XG5pbXBvcnQge0Fzc2hvbGVzU3RvcmFnZX0gZnJvbSBcIi4uL3N0b3JhZ2UvQXNzaG9sZXNTdG9yYWdlXCI7XG5pbXBvcnQge0JsYWNrbGlzdFN0b3JhZ2V9IGZyb20gXCIuLi9zdG9yYWdlL0JsYWNrbGlzdFN0b3JhZ2VcIjtcblxuZXhwb3J0IGNsYXNzIEZlZWRQYWdlIGV4dGVuZHMgUGFnZSB7XG4gICAgY29uc3RydWN0b3IocGF0aG5hbWUpIHtcbiAgICAgICAgc3VwZXIocGF0aG5hbWUpO1xuICAgIH1cblxuICAgIG1vZGlmeUNvbnRlbnQoKSB7XG4gICAgICAgIHRoaXMuaGlkZUJsYWNrbGlzdGVkUG9zdHMoKVxuICAgICAgICB0aGlzLmhpZGVBc3Nob2xlUG9zdHMoKVxuICAgICAgICAvLyBoaWRlVm90ZXNSYXRpbmdzQXZhdGFycygpXG4gICAgICAgIHRoaXMuYWRkQmxhY2tsaXN0QnV0dG9uKClcblxuICAgIH1cblxuICAgIGFkZEJsYWNrbGlzdEJ1dHRvbigpIHtcbiAgICAgICAgY29uc3QgcG9zdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmZlZWQtcG9zdC1mb290ZXJcIilcbiAgICAgICAgcG9zdHMuZm9yRWFjaChwb3N0ID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHBhZ2VJZCA9IHBvc3QucXVlcnlTZWxlY3RvcihcImEuZmVlZC1wb3N0LWNvbW1lbnRzXCIpXG4gICAgICAgICAgICAgICAgLmdldEF0dHJpYnV0ZShcImhyZWZcIilcbiAgICAgICAgICAgICAgICAuc3BsaXQoXCIvXCIpXG4gICAgICAgICAgICAgICAgLnNsaWNlKDEsIC0xKVxuICAgICAgICAgICAgICAgIC5qb2luKFwiL1wiKVxuICAgICAgICAgICAgY29uc3QgYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFcIilcbiAgICAgICAgICAgIGJ1dHRvbi5pbm5lclRleHQgPSBcIvCfmYhcIlxuICAgICAgICAgICAgYnV0dG9uLnNldEF0dHJpYnV0ZShcInRpdGxlXCIsIFwi0KHQu9GD0YjQsNC50YLQtSwg0LAg0L3RgyDQtdCz0L4g0L3QsNGF0LXRgCFcIilcbiAgICAgICAgICAgIGJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwiZmVlZC1wb3N0LWNvbW1lbnRzXCIpXG4gICAgICAgICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgICAgICAgICBCbGFja2xpc3RTdG9yYWdlLmFkZFBhZ2UocGFnZUlkKVxuICAgICAgICAgICAgICAgIHBvc3QucGFyZW50RWxlbWVudC5yZW1vdmUoKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIHBvc3QuYXBwZW5kQ2hpbGQoYnV0dG9uKVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIGhpZGVBc3Nob2xlUG9zdHMoKSB7XG4gICAgICAgIGZvciAoY29uc3QgYXNzaG9sZSBvZiBBc3Nob2xlc1N0b3JhZ2UuZ2V0QXNzaG9sZXMoKSkge1xuICAgICAgICAgICAgZm9yIChjb25zdCBhc3Nob2xlSHJlZiBvZiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGBbaHJlZj1cIi91c2VyLyR7YXNzaG9sZX0vXCJdYCkpIHtcbiAgICAgICAgICAgICAgICBhc3Nob2xlSHJlZlxuICAgICAgICAgICAgICAgICAgICAucGFyZW50RWxlbWVudFxuICAgICAgICAgICAgICAgICAgICAucGFyZW50RWxlbWVudFxuICAgICAgICAgICAgICAgICAgICAucmVtb3ZlKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhpZGVCbGFja2xpc3RlZFBvc3RzKCkge1xuICAgICAgICBjb25zdCByZWZzID0gQmxhY2tsaXN0U3RvcmFnZS5nZXRCbGFja2xpc3QoKVxuICAgICAgICBmb3IgKGNvbnN0IHJlZiBvZiByZWZzKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHRvcGljIG9mIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYGFbaHJlZio9XCIke3JlZn1cIl1gKSkge1xuICAgICAgICAgICAgICAgIHRvcGljXG4gICAgICAgICAgICAgICAgICAgIC5wYXJlbnRFbGVtZW50XG4gICAgICAgICAgICAgICAgICAgIC5wYXJlbnRFbGVtZW50XG4gICAgICAgICAgICAgICAgICAgIC5yZW1vdmUoKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG5cbn0iLCJpbXBvcnQge1BhZ2V9IGZyb20gXCIuL1BhZ2VcIjtcbmltcG9ydCB7QXNzaG9sZXNTdG9yYWdlfSBmcm9tIFwiLi4vc3RvcmFnZS9Bc3Nob2xlc1N0b3JhZ2VcIjtcbmltcG9ydCB7QmxhY2tsaXN0U3RvcmFnZX0gZnJvbSBcIi4uL3N0b3JhZ2UvQmxhY2tsaXN0U3RvcmFnZVwiO1xuXG5leHBvcnQgY2xhc3MgT3duVXNlclBhZ2UgZXh0ZW5kcyBQYWdlIHtcbiAgICBjb25zdHJ1Y3RvcihwYXRobmFtZSkge1xuICAgICAgICBzdXBlcihwYXRobmFtZSk7XG4gICAgfVxuXG4gICAgbW9kaWZ5Q29udGVudCgpIHtcbiAgICAgICAgdGhpcy5hZGRBc3Nob2xlc0xpc3QoKVxuICAgIH1cblxuICAgIGNyZWF0ZUFzc2hvbGVzTGlzdEVkaXQoKSB7XG4gICAgICAgIGNvbnN0IHdpZGdldCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIilcbiAgICAgICAgd2lkZ2V0LnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwiYmxvY2tcIilcbiAgICAgICAgY29uc3QgaGVhZGVyID0gXCI8aDIgY2xhc3M9J3Byb2ZpbGUtaGVhZGVyJz7QnNC+0Lgg0LzRg9C00LDQutC4PC9oMj5cIlxuICAgICAgICBjb25zdCB0ZXh0QXJlYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZXh0YXJlYVwiKVxuICAgICAgICB0ZXh0QXJlYS5zdHlsZS53aWR0aCA9IFwiMTAwJVwiXG4gICAgICAgIHRleHRBcmVhLnZhbHVlID0gQXNzaG9sZXNTdG9yYWdlLmdldEFzc2hvbGVzVGV4dCgpXG4gICAgICAgIHRleHRBcmVhLmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCAoKSA9PiBBc3Nob2xlc1N0b3JhZ2Uuc2V0QXNzaG9sZXNUZXh0KHRleHRBcmVhLnZhbHVlKSlcbiAgICAgICAgd2lkZ2V0Lmluc2VydEFkamFjZW50SFRNTChcImFmdGVyYmVnaW5cIiwgaGVhZGVyKVxuICAgICAgICB3aWRnZXQuYXBwZW5kQ2hpbGQodGV4dEFyZWEpXG4gICAgICAgIHJldHVybiB3aWRnZXRcbiAgICB9XG5cbiAgICBjcmVhdGVCbGFja2xpc3RFZGl0KCkge1xuICAgICAgICBjb25zdCB3aWRnZXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpXG4gICAgICAgIHdpZGdldC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImJsb2NrXCIpXG4gICAgICAgIGNvbnN0IGhlYWRlciA9IFwiPGgyIGNsYXNzPSdwcm9maWxlLWhlYWRlcic+0KfQtdGA0L3Ri9C5INGB0L/QuNGB0L7QuiDRgdGC0YDQsNC90LjRhjwvaDI+XCJcbiAgICAgICAgY29uc3QgdGV4dEFyZWEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGV4dGFyZWFcIilcbiAgICAgICAgdGV4dEFyZWEuc3R5bGUud2lkdGggPSBcIjEwMCVcIlxuICAgICAgICB0ZXh0QXJlYS52YWx1ZSA9IEJsYWNrbGlzdFN0b3JhZ2UuZ2V0QmxhY2tsaXN0VGV4dCgpXG4gICAgICAgIHRleHRBcmVhLmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCAoKSA9PiBCbGFja2xpc3RTdG9yYWdlLnNldEJsYWNrbGlzdFRleHQodGV4dEFyZWEudmFsdWUpKVxuICAgICAgICB3aWRnZXQuaW5zZXJ0QWRqYWNlbnRIVE1MKFwiYWZ0ZXJiZWdpblwiLCBoZWFkZXIpXG4gICAgICAgIHdpZGdldC5hcHBlbmRDaGlsZCh0ZXh0QXJlYSlcbiAgICAgICAgcmV0dXJuIHdpZGdldFxuICAgIH1cblxuICAgIGFkZEFzc2hvbGVzTGlzdCgpIHtcbiAgICAgICAgY29uc3QgcHJvZmlsZUluZm8gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvZmlsZS1pbnRybycpXG4gICAgICAgIHByb2ZpbGVJbmZvLmFwcGVuZENoaWxkKCB0aGlzLmNyZWF0ZUFzc2hvbGVzTGlzdEVkaXQoKSlcbiAgICAgICAgcHJvZmlsZUluZm8uYXBwZW5kQ2hpbGQoIHRoaXMuY3JlYXRlQmxhY2tsaXN0RWRpdCgpKVxuICAgIH1cblxufSIsImV4cG9ydCBjbGFzcyBQYWdlIHtcbiAgICBjb25zdHJ1Y3RvcihwYXRobmFtZSkge1xuICAgICAgICBpZiAoIXBhdGhuYW1lKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3BhdGhuYW1lIGlzIHJlcXVpcmVkJyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wYXRobmFtZSA9IHBhdGhuYW1lO1xuICAgIH1cblxuICAgIG1vZGlmeUNvbnRlbnQoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiTm90aGluZyBpcyBoYXBwZW5lZCwgaXQncyBhbiB1bnNwZWNpZmllZCBwYWdlXCIpXG4gICAgfVxufSIsImltcG9ydCB7UGFnZX0gZnJvbSBcIi4vUGFnZVwiO1xuaW1wb3J0IHtBc3Nob2xlc1N0b3JhZ2V9IGZyb20gXCIuLi9zdG9yYWdlL0Fzc2hvbGVzU3RvcmFnZVwiO1xuXG5leHBvcnQgY2xhc3MgUG9zdFBhZ2UgZXh0ZW5kcyBQYWdlIHtcbiAgICBjb25zdHJ1Y3Rvcih1cmwpIHtcbiAgICAgICAgc3VwZXIodXJsKTtcbiAgICB9XG5cbiAgICBtb2RpZnlDb250ZW50KCkge1xuICAgICAgICB0aGlzLmhpZGVBc3Nob2xlQ29tbWVudHMoKVxuICAgICAgICB0aGlzLm1vdmVQb3N0Q29tbWVudEZvcm0oKVxuICAgIH1cblxuICAgIGhpZGVBc3Nob2xlQ29tbWVudHMoKSB7XG4gICAgICAgIGZvciAoY29uc3QgYXNzaG9sZSBvZiBBc3Nob2xlc1N0b3JhZ2UuZ2V0QXNzaG9sZXMoKSkge1xuICAgICAgICAgICAgY29uc3Qgc2VsZWN0b3IgPSBgLmNvbW1lbnQtaGVhZGVyLWF1dGhvci1uYW1lW2hyZWY9XCIvdXNlci8ke2Fzc2hvbGV9L1wiXWBcbiAgICAgICAgICAgIGNvbnN0IG5vZGVzV2l0aEFzc2hvbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKVxuICAgICAgICAgICAgZm9yIChjb25zdCBhc3Nob2xlTm9kZSBvZiBub2Rlc1dpdGhBc3Nob2xlKSB7XG4gICAgICAgICAgICAgICAgYXNzaG9sZU5vZGVcbiAgICAgICAgICAgICAgICAgICAgLnBhcmVudEVsZW1lbnRcbiAgICAgICAgICAgICAgICAgICAgLnBhcmVudEVsZW1lbnRcbiAgICAgICAgICAgICAgICAgICAgLnBhcmVudEVsZW1lbnRcbiAgICAgICAgICAgICAgICAgICAgLnBhcmVudEVsZW1lbnRcbiAgICAgICAgICAgICAgICAgICAgLnJlbW92ZSgpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgbW92ZVBvc3RDb21tZW50Rm9ybSgpIHtcbiAgICAgICAgY29uc3QgcG9zdENvbW1lbnRGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Bvc3QtY29tbWVudHMtZm9ybScpXG4gICAgICAgIGNvbnN0IGNvbW1lbnRzTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wb3N0LWNvbW1lbnRzLWxpc3QnKVxuICAgICAgICBjb25zdCBwb3N0Q29tbWVudHNSdWxlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wb3N0LWNvbW1lbnRzLXJ1bGVzJylcbiAgICAgICAgY29uc3QgcGFyZW50ID0gY29tbWVudHNMaXN0LnBhcmVudEVsZW1lbnRcbiAgICAgICAgcGFyZW50Lmluc2VydEJlZm9yZShwb3N0Q29tbWVudEZvcm0sIGNvbW1lbnRzTGlzdClcbiAgICAgICAgcGFyZW50Lmluc2VydEJlZm9yZShwb3N0Q29tbWVudHNSdWxlcywgY29tbWVudHNMaXN0KVxuICAgIH1cblxufVxuIiwiaW1wb3J0IHtQYWdlfSBmcm9tIFwiLi9QYWdlXCI7XG5pbXBvcnQge0Fzc2hvbGVzU3RvcmFnZX0gZnJvbSBcIi4uL3N0b3JhZ2UvQXNzaG9sZXNTdG9yYWdlXCI7XG5pbXBvcnQge1ByaXZhdGVDb21tZW50c1N0b3JhZ2V9IGZyb20gXCIuLi9zdG9yYWdlL1ByaXZhdGVDb21tZW50c1N0b3JhZ2VcIjtcblxuZXhwb3J0IGNsYXNzIFVzZXJQYWdlIGV4dGVuZHMgUGFnZSB7XG4gICAgY29uc3RydWN0b3IodXJsKSB7XG4gICAgICAgIHN1cGVyKHVybCk7XG4gICAgICAgIHRoaXMudXNlciA9IHRoaXMuZ2V0VXNlcigpO1xuICAgIH1cblxuICAgIG1vZGlmeUNvbnRlbnQoKSB7XG4gICAgICAgIHRoaXMuYWRkQXNzaG9sZUJ1dHRvbigpXG4gICAgICAgIHRoaXMuYWRkUHJpdmF0ZUNvbW1lbnRXaWRnZXQoKVxuICAgIH1cblxuICAgIGFkZFByaXZhdGVDb21tZW50V2lkZ2V0KCkge1xuICAgICAgICBjb25zdCB3aWRnZXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpXG4gICAgICAgIHdpZGdldC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImJsb2NrXCIpXG4gICAgICAgIGNvbnN0IGhlYWRlciA9IFwiPGgyIGNsYXNzPSdwcm9maWxlLWhlYWRlcic+0J/RgNC40LLQsNGC0L3Ri9C1INC60L7QvNC80LXQvdGC0LDRgNC40Lg8L2gyPlwiXG4gICAgICAgIGNvbnN0IHRleHRhcmVhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRleHRhcmVhXCIpXG4gICAgICAgIHRleHRhcmVhLnZhbHVlID0gUHJpdmF0ZUNvbW1lbnRzU3RvcmFnZS5nZXRDb21tZW50KHRoaXMudXNlciB8fCBcIlwiKVxuICAgICAgICB0ZXh0YXJlYS5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgKHRleHQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGNvbW1lbnQgPSB0ZXh0LnRhcmdldC52YWx1ZVxuICAgICAgICAgICAgUHJpdmF0ZUNvbW1lbnRzU3RvcmFnZS5zZXRDb21tZW50KHRoaXMudXNlciwgY29tbWVudClcbiAgICAgICAgfSlcbiAgICAgICAgd2lkZ2V0LmlubmVySFRNTCA9IGhlYWRlclxuICAgICAgICB3aWRnZXQuYXBwZW5kQ2hpbGQodGV4dGFyZWEpXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvZmlsZS1zdGF0dXNlc1wiKS5hcHBlbmRDaGlsZCh3aWRnZXQpXG4gICAgfVxuXG4gICAgYWRkQXNzaG9sZUJ1dHRvbigpIHtcbiAgICAgICAgY29uc3QgcGFyc2VyID0gbmV3IERPTVBhcnNlcigpO1xuICAgICAgICBjb25zdCBhc3Nob2xlQnRuU3RyID0gYDxhIGNsYXNzPVwicHJvZmlsZS1zdGF0dXMgY2xpY2thYmxlXCI+PHNwYW4gY2xhc3M9XCJwcm9maWxlLXN0YXR1cy1pY29uXCI+8J+WlTwvc3Bhbj4gPHNwYW4gY2xhc3M9XCJwcm9maWxlLXN0YXR1cy1zdGF0dXNcIj7QlNC+0LHQsNCy0LjRgtGMINCyINC80L7QuCDQvNGD0LTQsNC60Lg8L3NwYW4+PC9hPmBcbiAgICAgICAgY29uc3QgYXNzaG9sZUJ0biA9IHBhcnNlci5wYXJzZUZyb21TdHJpbmcoYXNzaG9sZUJ0blN0ciwgJ3RleHQvaHRtbCcpLnF1ZXJ5U2VsZWN0b3IoXCJhXCIpO1xuICAgICAgICBhc3Nob2xlQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgICAgICBBc3Nob2xlc1N0b3JhZ2UuYWRkQXNzaG9sZSh0aGlzLmdldFVzZXIoKSlcbiAgICAgICAgfSlcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9maWxlLXN0YXR1c2VzXCIpLmFwcGVuZENoaWxkKGFzc2hvbGVCdG4pXG4gICAgICAgIGlmICh0aGlzLmlzVXNlckFzc2hvbGUodGhpcy5nZXRVc2VyKCkpKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInRoZSB1c2VyIGlzIGFuIGFzc2hvbGUhXCIpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgICAqL1xuICAgICBnZXRVc2VyKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wYXRobmFtZS5zcGxpdCgnLycpLmZpbHRlcigoYSkgPT4gYSkucG9wKClcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdXNlclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIGlzVXNlckFzc2hvbGUodXNlcikge1xuICAgICAgICByZXR1cm4gQXNzaG9sZXNTdG9yYWdlLmdldEFzc2hvbGVzKCkuaW5jbHVkZXModXNlcilcbiAgICB9XG59IiwiY29uc3QgQVNTSE9MRVNfU1RPUkFHRV9LRVkgPSAnYXNzaG9sZXMnO1xuXG5leHBvcnQgY2xhc3MgQXNzaG9sZXNTdG9yYWdlIHtcbiAgICBzdGF0aWMgZ2V0QXNzaG9sZXNUZXh0KCkge1xuICAgICAgICByZXR1cm4gbG9jYWxTdG9yYWdlLmdldEl0ZW0oQVNTSE9MRVNfU1RPUkFHRV9LRVkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHJldHVybnMge3N0cmluZ1tdfVxuICAgICAqL1xuICAgIHN0YXRpYyBnZXRBc3Nob2xlcygpIHtcbiAgICAgICAgcmV0dXJuIEFzc2hvbGVzU3RvcmFnZS5nZXRBc3Nob2xlc1RleHQoKS5zcGxpdCgnLCcpIHx8IFtdO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGFzc2hvbGVzVGV4dFxuICAgICAqL1xuICAgIHN0YXRpYyBzZXRBc3Nob2xlc1RleHQoYXNzaG9sZXNUZXh0KSB7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKEFTU0hPTEVTX1NUT1JBR0VfS0VZLCBhc3Nob2xlc1RleHQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGFzc2hvbGVcbiAgICAgKi9cbiAgICBzdGF0aWMgYWRkQXNzaG9sZShhc3Nob2xlKSB7XG4gICAgICAgIGNvbnN0IGFzc2hvbGVzID0gdGhpcy5nZXRBc3Nob2xlcygpO1xuICAgICAgICBpZiAoYXNzaG9sZXMuaW5jbHVkZXMoYXNzaG9sZSkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBhc3Nob2xlcy5wdXNoKGFzc2hvbGUpO1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShBU1NIT0xFU19TVE9SQUdFX0tFWSwgYXNzaG9sZXMuam9pbignLCcpKTtcbiAgICB9XG59IiwiY29uc3QgQkxBQ0tMSVNUX1NUT1JBR0VfS0VZID0gJ2JsYWNrbGlzdCc7XG5cbmV4cG9ydCBjbGFzcyBCbGFja2xpc3RTdG9yYWdlIHtcbiAgICBzdGF0aWMgZ2V0QmxhY2tsaXN0VGV4dCgpIHtcbiAgICAgICAgcmV0dXJuIGxvY2FsU3RvcmFnZS5nZXRJdGVtKEJMQUNLTElTVF9TVE9SQUdFX0tFWSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nW119XG4gICAgICovXG4gICAgc3RhdGljIGdldEJsYWNrbGlzdCgpIHtcbiAgICAgICAgcmV0dXJuIEJsYWNrbGlzdFN0b3JhZ2UuZ2V0QmxhY2tsaXN0VGV4dCgpLnNwbGl0KCcsJykgfHwgW107XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdGV4dFxuICAgICAqL1xuICAgIHN0YXRpYyBzZXRCbGFja2xpc3RUZXh0KHRleHQpIHtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oQkxBQ0tMSVNUX1NUT1JBR0VfS0VZLCB0ZXh0KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwYWdlXG4gICAgICovXG4gICAgc3RhdGljIGFkZFBhZ2UocGFnZSkge1xuICAgICAgICBjb25zdCBsaXN0ID0gdGhpcy5nZXRCbGFja2xpc3QoKTtcbiAgICAgICAgaWYgKGxpc3QuaW5jbHVkZXMocGFnZSkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBsaXN0LnB1c2gocGFnZSk7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKEJMQUNLTElTVF9TVE9SQUdFX0tFWSwgbGlzdCk7XG4gICAgfVxufSIsImNvbnN0IFBSSVZBVEVfQ09NTUVOVFNfS0VZID0gJ3ByaXZhdGUtY29tbWVudHMnO1xuXG5leHBvcnQgY2xhc3MgUHJpdmF0ZUNvbW1lbnRzU3RvcmFnZSB7XG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdXNlclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjb21tZW50XG4gICAgICovXG4gICAgc3RhdGljIHNldENvbW1lbnQodXNlciwgY29tbWVudCkge1xuICAgICAgICBjb25zdCBjb21tZW50cyA9IFByaXZhdGVDb21tZW50c1N0b3JhZ2UuZ2V0Q29tbWVudHMoKTtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oUFJJVkFURV9DT01NRU5UU19LRVksIEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgIC4uLmNvbW1lbnRzLFxuICAgICAgICAgICAgW3VzZXJdOiBjb21tZW50XG4gICAgICAgIH0pKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB1c2VyXG4gICAgICogQHJldHVybnMge3N0cmluZ31cbiAgICAgKi9cbiAgICBzdGF0aWMgZ2V0Q29tbWVudCh1c2VyKSB7XG4gICAgICAgIGNvbnN0IHVzZXJDb21tZW50ID0gUHJpdmF0ZUNvbW1lbnRzU3RvcmFnZS5nZXRDb21tZW50cygpXG4gICAgICAgIGlmICghdXNlckNvbW1lbnQpIHtcbiAgICAgICAgICAgIHJldHVybiBcIlwiO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHRleHRQcml2YXRlQ29tbWVudHNPYmogPSAgdGhpcy5nZXRDb21tZW50cygpXG4gICAgICAgIHJldHVybiB0ZXh0UHJpdmF0ZUNvbW1lbnRzT2JqW3VzZXJdIHx8IFwiXCI7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJldHVybnMge09iamVjdH1cbiAgICAgKi9cbiAgICBzdGF0aWMgZ2V0Q29tbWVudHMoKSB7XG4gICAgICAgIHJldHVybiBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFBSSVZBVEVfQ09NTUVOVFNfS0VZKSB8fCBcInt9XCIpIHx8IHt9XG4gICAgfVxufSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHtQYWdlRmFjdG9yeX0gZnJvbSBcIi4vUGFnZUZhY3RvcnlcIjtcbmltcG9ydCB7cHJpbnRFeHRlbnNpb25JbmZvfSBmcm9tIFwiLi9mdW5jdGlvbnNcIjtcblxucHJpbnRFeHRlbnNpb25JbmZvKClcbmNvbnN0IHBhZ2VGYWN0b3J5ID0gbmV3IFBhZ2VGYWN0b3J5KGxvY2F0aW9uLnBhdGhuYW1lKVxuY29uc3QgcGFnZSA9IHBhZ2VGYWN0b3J5LmNyZWF0ZSgpXG5wYWdlLm1vZGlmeUNvbnRlbnQoKVxuXG5cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==