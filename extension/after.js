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
/* harmony import */ var _functions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../functions */ "./src/functions.js");
/* harmony import */ var _storage_BlacklistStorage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../storage/BlacklistStorage */ "./src/storage/BlacklistStorage.js");





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
                _storage_BlacklistStorage__WEBPACK_IMPORTED_MODULE_3__.BlacklistStorage.addPage(pageId)
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
        const refs = _storage_BlacklistStorage__WEBPACK_IMPORTED_MODULE_3__.BlacklistStorage.getBlacklist()
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QWUsUUFBUTtBQUN2QixpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQSwyRUFBMkU7QUFDM0U7QUFDQTs7Ozs7O1VDcENBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7O0FDTjBDO0FBQ0s7O0FBRS9DLDhEQUFrQjtBQUNsQix3QkFBd0IscURBQVc7QUFDbkM7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3ZhczNrLWNsdWItZXh0ZW5zaW9uLy4vc3JjL1BhZ2VGYWN0b3J5LmpzIiwid2VicGFjazovL3ZhczNrLWNsdWItZXh0ZW5zaW9uLy4vc3JjL2Z1bmN0aW9ucy5qcyIsIndlYnBhY2s6Ly92YXMzay1jbHViLWV4dGVuc2lvbi8uL3NyYy9wYWdlcy9GZWVkUGFnZS5qcyIsIndlYnBhY2s6Ly92YXMzay1jbHViLWV4dGVuc2lvbi8uL3NyYy9wYWdlcy9Pd25Vc2VyUGFnZS5qcyIsIndlYnBhY2s6Ly92YXMzay1jbHViLWV4dGVuc2lvbi8uL3NyYy9wYWdlcy9QYWdlLmpzIiwid2VicGFjazovL3ZhczNrLWNsdWItZXh0ZW5zaW9uLy4vc3JjL3BhZ2VzL1Bvc3RQYWdlLmpzIiwid2VicGFjazovL3ZhczNrLWNsdWItZXh0ZW5zaW9uLy4vc3JjL3BhZ2VzL1VzZXJQYWdlLmpzIiwid2VicGFjazovL3ZhczNrLWNsdWItZXh0ZW5zaW9uLy4vc3JjL3N0b3JhZ2UvQXNzaG9sZXNTdG9yYWdlLmpzIiwid2VicGFjazovL3ZhczNrLWNsdWItZXh0ZW5zaW9uLy4vc3JjL3N0b3JhZ2UvQmxhY2tsaXN0U3RvcmFnZS5qcyIsIndlYnBhY2s6Ly92YXMzay1jbHViLWV4dGVuc2lvbi8uL3NyYy9zdG9yYWdlL1ByaXZhdGVDb21tZW50c1N0b3JhZ2UuanMiLCJ3ZWJwYWNrOi8vdmFzM2stY2x1Yi1leHRlbnNpb24vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdmFzM2stY2x1Yi1leHRlbnNpb24vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3ZhczNrLWNsdWItZXh0ZW5zaW9uL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdmFzM2stY2x1Yi1leHRlbnNpb24vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly92YXMzay1jbHViLWV4dGVuc2lvbi8uL3NyYy9tYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Z2V0VXNlcn0gZnJvbSBcIi4vZnVuY3Rpb25zXCI7XG5pbXBvcnQge1VzZXJQYWdlfSBmcm9tIFwiLi9wYWdlcy9Vc2VyUGFnZVwiO1xuaW1wb3J0IHtPd25Vc2VyUGFnZX0gZnJvbSBcIi4vcGFnZXMvT3duVXNlclBhZ2VcIjtcbmltcG9ydCB7UG9zdFBhZ2V9IGZyb20gXCIuL3BhZ2VzL1Bvc3RQYWdlXCI7XG5pbXBvcnQge1BhZ2V9IGZyb20gXCIuL3BhZ2VzL1BhZ2VcIjtcbmltcG9ydCB7RmVlZFBhZ2V9IGZyb20gXCIuL3BhZ2VzL0ZlZWRQYWdlXCI7XG5cbmV4cG9ydCBjbGFzcyBQYWdlRmFjdG9yeSB7XG4gICAgY29uc3RydWN0b3IocGF0aG5hbWUpIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLnBhdGhuYW1lID0gcGF0aG5hbWU7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLnBhZ2VUeXBlID0gdGhpcy5nZXRQYWdlVHlwZSgpXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7UGFnZX1cbiAgICAgKi9cbiAgICBjcmVhdGUoKSB7XG5cbiAgICAgICAgaWYgKHRoaXMuaXNVc2VyUGFnZVR5cGUoKSkge1xuICAgICAgICAgICAgaWYgKGdldFVzZXIoKSA9PT0gdGhpcy5nZXRXaG9BbUkoKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgT3duVXNlclBhZ2UodGhpcy5wYXRobmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbmV3IFVzZXJQYWdlKHRoaXMucGF0aG5hbWUpXG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5pc1VzZXJDb250ZW50UGFnZVR5cGUoKSkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBQb3N0UGFnZSh0aGlzLnBhdGhuYW1lKVxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmlzRmVlZFBhZ2UoKSkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBGZWVkUGFnZSh0aGlzLnBhdGhuYW1lKVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXcgUGFnZSh0aGlzLnBhdGhuYW1lKVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIGlzRmVlZFBhZ2UoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBhZ2VUeXBlID09PSAnYWxsJyB8fCB0aGlzLnBhdGhuYW1lID09PSAnLydcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBpc1VzZXJDb250ZW50UGFnZVR5cGUoKSB7XG4gICAgICAgIGNvbnN0IGNvbnRlbnRUeXBlcyA9IFsnYmF0dGxlJywgXCJxdWVzdGlvblwiLCBcInBvc3RcIiwgXCJpZGVhXCJdXG4gICAgICAgIHJldHVybiBjb250ZW50VHlwZXMuaW5jbHVkZXModGhpcy5wYWdlVHlwZSlcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBpc1VzZXJQYWdlVHlwZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGFnZVR5cGUgPT09IFwidXNlclwiXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJldHVybnMge3N0cmluZ31cbiAgICAgKi9cbiAgICBnZXRQYWdlVHlwZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGF0aG5hbWVcbiAgICAgICAgICAgIC5zcGxpdCgnLycpXG4gICAgICAgICAgICAuZmlsdGVyKGEgPT4gYSlbMF1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgICAqL1xuICAgIGdldFdob0FtSSgpIHtcbiAgICAgICAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubWVudS1yaWdodD5hLmF2YXRhclwiKVxuICAgICAgICAgICAgLmdldEF0dHJpYnV0ZShcImhyZWZcIilcbiAgICAgICAgICAgIC5zcGxpdCgnLycpXG4gICAgICAgICAgICAuZmlsdGVyKGEgPT4gYSlcbiAgICAgICAgICAgIC5wb3AoKVxuICAgIH1cbn0iLCIvKipcbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRVc2VyKCkge1xuICAgIHJldHVybiBkb2N1bWVudC5sb2NhdGlvbi5wYXRobmFtZS5zcGxpdCgnLycpLmZpbHRlcigoYSkgPT4gYSkucG9wKClcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGhpZGVWb3Rlc1JhdGluZ3NBdmF0YXJzKCkge1xuICAgIGNvbnN0IGRpc3RyYWN0ZWRFbGVtZW50c1NlbGVjdG9ycyA9IFtcbiAgICAgICAgJy51cHZvdGUnLFxuICAgICAgICAnLnVwdm90ZS12b3RlZCcsXG4gICAgICAgICcudXB2b3RlLXR5cGUtaW5saW5lJyxcbiAgICAgICAgJy5jb21tZW50LXJhdGluZycsXG4gICAgICAgICcuZmVlZC1wb3N0LWNvbW1lbnRzLXVucmVhZCdcbiAgICBdXG5cbiAgICBmb3IgKGNvbnN0IHNlbGVjdG9yIG9mIGRpc3RyYWN0ZWRFbGVtZW50c1NlbGVjdG9ycykge1xuICAgICAgICBmb3IgKGNvbnN0IGVsIG9mIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpKSB7XG4gICAgICAgICAgICBlbC5yZW1vdmUoKVxuICAgICAgICB9XG4gICAgfVxuICAgIGZvciAoY29uc3QgYXZhdGFyIG9mIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuYXZhdGFyPmltZ1wiKSkge1xuICAgICAgICBhdmF0YXIuc2V0QXR0cmlidXRlKFwic3JjXCIsIFwiaHR0cHM6Ly9pLnZhczNrLmNsdWIvdi5wbmdcIilcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwcmludEV4dGVuc2lvbkluZm8oKSB7XG4gICAgY29uc29sZS5pbmZvIChcItCS0YHQtdC8INCx0L7Rj9GC0YzRgdGPISDQktCw0YHRgtGA0LjQui3Ri9C60YHRgtGN0L3RiNGL0L0gdjEuMC4wXCIpXG4gICAgY29uc29sZS5sb2coYFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgKG8pKG8pXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC8gICAgIFxcXFxcbiAgICAgICAgICAgICAgICAgICAgICAgICAvICAgICAgIHxcbiAgICAgICAgICAgICAgICAgICAgICAgIC8gICBcXFxcICAqIHxcbiAgICAgICAgICBfX19fX19fXyAgICAgLyAgICAvXFxcXF9fL1xuICBfICAgICAgLyAgICAgICAgXFxcXCAgIC8gICAgL1xuIC8gXFxcXCAgICAvICBfX19fICAgIFxcXFxfLyAgICAvXG4vL1xcXFwgXFxcXCAgLyAgLyAgICBcXFxcICAgICAgICAgL1xuViAgXFxcXCBcXFxcLyAgLyAgICAgIFxcXFwgICAgICAgL1xuICAgIFxcXFxfX18vICAgICAgICBcXFxcX19fX18vXG4gICAgYClcbn1cblxuXG4iLCJpbXBvcnQge1BhZ2V9IGZyb20gXCIuL1BhZ2VcIjtcbmltcG9ydCB7QXNzaG9sZXNTdG9yYWdlfSBmcm9tIFwiLi4vc3RvcmFnZS9Bc3Nob2xlc1N0b3JhZ2VcIjtcbmltcG9ydCB7aGlkZVZvdGVzUmF0aW5nc0F2YXRhcnN9IGZyb20gXCIuLi9mdW5jdGlvbnNcIjtcbmltcG9ydCB7QmxhY2tsaXN0U3RvcmFnZX0gZnJvbSBcIi4uL3N0b3JhZ2UvQmxhY2tsaXN0U3RvcmFnZVwiO1xuXG5leHBvcnQgY2xhc3MgRmVlZFBhZ2UgZXh0ZW5kcyBQYWdlIHtcbiAgICBjb25zdHJ1Y3RvcihwYXRobmFtZSkge1xuICAgICAgICBzdXBlcihwYXRobmFtZSk7XG4gICAgfVxuXG4gICAgbW9kaWZ5Q29udGVudCgpIHtcbiAgICAgICAgdGhpcy5oaWRlQmxhY2tsaXN0ZWRQb3N0cygpXG4gICAgICAgIHRoaXMuaGlkZUFzc2hvbGVQb3N0cygpXG4gICAgICAgIC8vIGhpZGVWb3Rlc1JhdGluZ3NBdmF0YXJzKClcbiAgICAgICAgdGhpcy5hZGRCbGFja2xpc3RCdXR0b24oKVxuXG4gICAgfVxuXG4gICAgYWRkQmxhY2tsaXN0QnV0dG9uKCkge1xuICAgICAgICBjb25zdCBwb3N0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZmVlZC1wb3N0LWZvb3RlclwiKVxuICAgICAgICBwb3N0cy5mb3JFYWNoKHBvc3QgPT4ge1xuICAgICAgICAgICAgY29uc3QgcGFnZUlkID0gcG9zdC5xdWVyeVNlbGVjdG9yKFwiYS5mZWVkLXBvc3QtY29tbWVudHNcIilcbiAgICAgICAgICAgICAgICAuZ2V0QXR0cmlidXRlKFwiaHJlZlwiKVxuICAgICAgICAgICAgICAgIC5zcGxpdChcIi9cIilcbiAgICAgICAgICAgICAgICAuc2xpY2UoMSwgLTEpXG4gICAgICAgICAgICAgICAgLmpvaW4oXCIvXCIpXG4gICAgICAgICAgICBjb25zdCBidXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYVwiKVxuICAgICAgICAgICAgYnV0dG9uLmlubmVyVGV4dCA9IFwi8J+ZiFwiXG4gICAgICAgICAgICBidXR0b24uc2V0QXR0cmlidXRlKFwidGl0bGVcIiwgXCLQodC70YPRiNCw0LnRgtC1LCDQsCDQvdGDINC10LPQviDQvdCw0YXQtdGAIVwiKVxuICAgICAgICAgICAgYnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJmZWVkLXBvc3QtY29tbWVudHNcIilcbiAgICAgICAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIEJsYWNrbGlzdFN0b3JhZ2UuYWRkUGFnZShwYWdlSWQpXG4gICAgICAgICAgICAgICAgcG9zdC5wYXJlbnRFbGVtZW50LnJlbW92ZSgpXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgcG9zdC5hcHBlbmRDaGlsZChidXR0b24pXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgaGlkZUFzc2hvbGVQb3N0cygpIHtcbiAgICAgICAgZm9yIChjb25zdCBhc3Nob2xlIG9mIEFzc2hvbGVzU3RvcmFnZS5nZXRBc3Nob2xlcygpKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGFzc2hvbGVIcmVmIG9mIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYFtocmVmPVwiL3VzZXIvJHthc3Nob2xlfS9cIl1gKSkge1xuICAgICAgICAgICAgICAgIGFzc2hvbGVIcmVmXG4gICAgICAgICAgICAgICAgICAgIC5wYXJlbnRFbGVtZW50XG4gICAgICAgICAgICAgICAgICAgIC5wYXJlbnRFbGVtZW50XG4gICAgICAgICAgICAgICAgICAgIC5yZW1vdmUoKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGlkZUJsYWNrbGlzdGVkUG9zdHMoKSB7XG4gICAgICAgIGNvbnN0IHJlZnMgPSBCbGFja2xpc3RTdG9yYWdlLmdldEJsYWNrbGlzdCgpXG4gICAgICAgIGZvciAoY29uc3QgcmVmIG9mIHJlZnMpIHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgdG9waWMgb2YgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgYVtocmVmKj1cIiR7cmVmfVwiXWApKSB7XG4gICAgICAgICAgICAgICAgdG9waWNcbiAgICAgICAgICAgICAgICAgICAgLnBhcmVudEVsZW1lbnRcbiAgICAgICAgICAgICAgICAgICAgLnBhcmVudEVsZW1lbnRcbiAgICAgICAgICAgICAgICAgICAgLnJlbW92ZSgpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cblxufSIsImltcG9ydCB7UGFnZX0gZnJvbSBcIi4vUGFnZVwiO1xuaW1wb3J0IHtBc3Nob2xlc1N0b3JhZ2V9IGZyb20gXCIuLi9zdG9yYWdlL0Fzc2hvbGVzU3RvcmFnZVwiO1xuaW1wb3J0IHtCbGFja2xpc3RTdG9yYWdlfSBmcm9tIFwiLi4vc3RvcmFnZS9CbGFja2xpc3RTdG9yYWdlXCI7XG5cbmV4cG9ydCBjbGFzcyBPd25Vc2VyUGFnZSBleHRlbmRzIFBhZ2Uge1xuICAgIGNvbnN0cnVjdG9yKHBhdGhuYW1lKSB7XG4gICAgICAgIHN1cGVyKHBhdGhuYW1lKTtcbiAgICB9XG5cbiAgICBtb2RpZnlDb250ZW50KCkge1xuICAgICAgICB0aGlzLmFkZEFzc2hvbGVzTGlzdCgpXG4gICAgfVxuXG4gICAgY3JlYXRlQXNzaG9sZXNMaXN0RWRpdCgpIHtcbiAgICAgICAgY29uc3Qgd2lkZ2V0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKVxuICAgICAgICB3aWRnZXQuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJibG9ja1wiKVxuICAgICAgICBjb25zdCBoZWFkZXIgPSBcIjxoMiBjbGFzcz0ncHJvZmlsZS1oZWFkZXInPtCc0L7QuCDQvNGD0LTQsNC60Lg8L2gyPlwiXG4gICAgICAgIGNvbnN0IHRleHRBcmVhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRleHRhcmVhXCIpXG4gICAgICAgIHRleHRBcmVhLnN0eWxlLndpZHRoID0gXCIxMDAlXCJcbiAgICAgICAgdGV4dEFyZWEudmFsdWUgPSBBc3Nob2xlc1N0b3JhZ2UuZ2V0QXNzaG9sZXNUZXh0KClcbiAgICAgICAgdGV4dEFyZWEuYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsICgpID0+IEFzc2hvbGVzU3RvcmFnZS5zZXRBc3Nob2xlc1RleHQodGV4dEFyZWEudmFsdWUpKVxuICAgICAgICB3aWRnZXQuaW5zZXJ0QWRqYWNlbnRIVE1MKFwiYWZ0ZXJiZWdpblwiLCBoZWFkZXIpXG4gICAgICAgIHdpZGdldC5hcHBlbmRDaGlsZCh0ZXh0QXJlYSlcbiAgICAgICAgcmV0dXJuIHdpZGdldFxuICAgIH1cblxuICAgIGNyZWF0ZUJsYWNrbGlzdEVkaXQoKSB7XG4gICAgICAgIGNvbnN0IHdpZGdldCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIilcbiAgICAgICAgd2lkZ2V0LnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwiYmxvY2tcIilcbiAgICAgICAgY29uc3QgaGVhZGVyID0gXCI8aDIgY2xhc3M9J3Byb2ZpbGUtaGVhZGVyJz7Qp9C10YDQvdGL0Lkg0YHQv9C40YHQvtC6INGB0YLRgNCw0L3QuNGGPC9oMj5cIlxuICAgICAgICBjb25zdCB0ZXh0QXJlYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZXh0YXJlYVwiKVxuICAgICAgICB0ZXh0QXJlYS5zdHlsZS53aWR0aCA9IFwiMTAwJVwiXG4gICAgICAgIHRleHRBcmVhLnZhbHVlID0gQmxhY2tsaXN0U3RvcmFnZS5nZXRCbGFja2xpc3RUZXh0KClcbiAgICAgICAgdGV4dEFyZWEuYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsICgpID0+IEJsYWNrbGlzdFN0b3JhZ2Uuc2V0QmxhY2tsaXN0VGV4dCh0ZXh0QXJlYS52YWx1ZSkpXG4gICAgICAgIHdpZGdldC5pbnNlcnRBZGphY2VudEhUTUwoXCJhZnRlcmJlZ2luXCIsIGhlYWRlcilcbiAgICAgICAgd2lkZ2V0LmFwcGVuZENoaWxkKHRleHRBcmVhKVxuICAgICAgICByZXR1cm4gd2lkZ2V0XG4gICAgfVxuXG4gICAgYWRkQXNzaG9sZXNMaXN0KCkge1xuICAgICAgICBjb25zdCBwcm9maWxlSW5mbyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9maWxlLWludHJvJylcbiAgICAgICAgcHJvZmlsZUluZm8uYXBwZW5kQ2hpbGQoIHRoaXMuY3JlYXRlQXNzaG9sZXNMaXN0RWRpdCgpKVxuICAgICAgICBwcm9maWxlSW5mby5hcHBlbmRDaGlsZCggdGhpcy5jcmVhdGVCbGFja2xpc3RFZGl0KCkpXG4gICAgfVxuXG59IiwiZXhwb3J0IGNsYXNzIFBhZ2Uge1xuICAgIGNvbnN0cnVjdG9yKHBhdGhuYW1lKSB7XG4gICAgICAgIGlmICghcGF0aG5hbWUpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigncGF0aG5hbWUgaXMgcmVxdWlyZWQnKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnBhdGhuYW1lID0gcGF0aG5hbWU7XG4gICAgfVxuXG4gICAgbW9kaWZ5Q29udGVudCgpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJOb3RoaW5nIGlzIGhhcHBlbmVkLCBpdCdzIGFuIHVuc3BlY2lmaWVkIHBhZ2VcIilcbiAgICB9XG59IiwiaW1wb3J0IHtQYWdlfSBmcm9tIFwiLi9QYWdlXCI7XG5pbXBvcnQge0Fzc2hvbGVzU3RvcmFnZX0gZnJvbSBcIi4uL3N0b3JhZ2UvQXNzaG9sZXNTdG9yYWdlXCI7XG5cbmV4cG9ydCBjbGFzcyBQb3N0UGFnZSBleHRlbmRzIFBhZ2Uge1xuICAgIGNvbnN0cnVjdG9yKHVybCkge1xuICAgICAgICBzdXBlcih1cmwpO1xuICAgIH1cblxuICAgIG1vZGlmeUNvbnRlbnQoKSB7XG4gICAgICAgIHRoaXMuaGlkZUFzc2hvbGVDb21tZW50cygpXG4gICAgfVxuXG4gICAgaGlkZUFzc2hvbGVDb21tZW50cygpIHtcbiAgICAgICAgZm9yIChjb25zdCBhc3Nob2xlIG9mIEFzc2hvbGVzU3RvcmFnZS5nZXRBc3Nob2xlcygpKSB7XG4gICAgICAgICAgICBjb25zdCBzZWxlY3RvciA9IGAuY29tbWVudC1oZWFkZXItYXV0aG9yLW5hbWVbaHJlZj1cIi91c2VyLyR7YXNzaG9sZX0vXCJdYFxuICAgICAgICAgICAgY29uc3Qgbm9kZXNXaXRoQXNzaG9sZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGFzc2hvbGVOb2RlIG9mIG5vZGVzV2l0aEFzc2hvbGUpIHtcbiAgICAgICAgICAgICAgICBhc3Nob2xlTm9kZVxuICAgICAgICAgICAgICAgICAgICAucGFyZW50RWxlbWVudFxuICAgICAgICAgICAgICAgICAgICAucGFyZW50RWxlbWVudFxuICAgICAgICAgICAgICAgICAgICAucGFyZW50RWxlbWVudFxuICAgICAgICAgICAgICAgICAgICAucGFyZW50RWxlbWVudFxuICAgICAgICAgICAgICAgICAgICAucmVtb3ZlKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCB7UGFnZX0gZnJvbSBcIi4vUGFnZVwiO1xuaW1wb3J0IHtBc3Nob2xlc1N0b3JhZ2V9IGZyb20gXCIuLi9zdG9yYWdlL0Fzc2hvbGVzU3RvcmFnZVwiO1xuaW1wb3J0IHtQcml2YXRlQ29tbWVudHNTdG9yYWdlfSBmcm9tIFwiLi4vc3RvcmFnZS9Qcml2YXRlQ29tbWVudHNTdG9yYWdlXCI7XG5cbmV4cG9ydCBjbGFzcyBVc2VyUGFnZSBleHRlbmRzIFBhZ2Uge1xuICAgIGNvbnN0cnVjdG9yKHVybCkge1xuICAgICAgICBzdXBlcih1cmwpO1xuICAgICAgICB0aGlzLnVzZXIgPSB0aGlzLmdldFVzZXIoKTtcbiAgICB9XG5cbiAgICBtb2RpZnlDb250ZW50KCkge1xuICAgICAgICB0aGlzLmFkZEFzc2hvbGVCdXR0b24oKVxuICAgICAgICB0aGlzLmFkZFByaXZhdGVDb21tZW50V2lkZ2V0KClcbiAgICB9XG5cbiAgICBhZGRQcml2YXRlQ29tbWVudFdpZGdldCgpIHtcbiAgICAgICAgY29uc3Qgd2lkZ2V0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKVxuICAgICAgICB3aWRnZXQuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJibG9ja1wiKVxuICAgICAgICBjb25zdCBoZWFkZXIgPSBcIjxoMiBjbGFzcz0ncHJvZmlsZS1oZWFkZXInPtCf0YDQuNCy0LDRgtC90YvQtSDQutC+0LzQvNC10L3RgtCw0YDQuNC4PC9oMj5cIlxuICAgICAgICBjb25zdCB0ZXh0YXJlYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZXh0YXJlYVwiKVxuICAgICAgICB0ZXh0YXJlYS52YWx1ZSA9IFByaXZhdGVDb21tZW50c1N0b3JhZ2UuZ2V0Q29tbWVudCh0aGlzLnVzZXIgfHwgXCJcIilcbiAgICAgICAgdGV4dGFyZWEuYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsICh0ZXh0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBjb21tZW50ID0gdGV4dC50YXJnZXQudmFsdWVcbiAgICAgICAgICAgIFByaXZhdGVDb21tZW50c1N0b3JhZ2Uuc2V0Q29tbWVudCh0aGlzLnVzZXIsIGNvbW1lbnQpXG4gICAgICAgIH0pXG4gICAgICAgIHdpZGdldC5pbm5lckhUTUwgPSBoZWFkZXJcbiAgICAgICAgd2lkZ2V0LmFwcGVuZENoaWxkKHRleHRhcmVhKVxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2ZpbGUtc3RhdHVzZXNcIikuYXBwZW5kQ2hpbGQod2lkZ2V0KVxuICAgIH1cblxuICAgIGFkZEFzc2hvbGVCdXR0b24oKSB7XG4gICAgICAgIGNvbnN0IHBhcnNlciA9IG5ldyBET01QYXJzZXIoKTtcbiAgICAgICAgY29uc3QgYXNzaG9sZUJ0blN0ciA9IGA8YSBjbGFzcz1cInByb2ZpbGUtc3RhdHVzIGNsaWNrYWJsZVwiPjxzcGFuIGNsYXNzPVwicHJvZmlsZS1zdGF0dXMtaWNvblwiPvCflpU8L3NwYW4+IDxzcGFuIGNsYXNzPVwicHJvZmlsZS1zdGF0dXMtc3RhdHVzXCI+0JTQvtCx0LDQstC40YLRjCDQsiDQvNC+0Lgg0LzRg9C00LDQutC4PC9zcGFuPjwvYT5gXG4gICAgICAgIGNvbnN0IGFzc2hvbGVCdG4gPSBwYXJzZXIucGFyc2VGcm9tU3RyaW5nKGFzc2hvbGVCdG5TdHIsICd0ZXh0L2h0bWwnKS5xdWVyeVNlbGVjdG9yKFwiYVwiKTtcbiAgICAgICAgYXNzaG9sZUJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICAgICAgQXNzaG9sZXNTdG9yYWdlLmFkZEFzc2hvbGUodGhpcy5nZXRVc2VyKCkpXG4gICAgICAgIH0pXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvZmlsZS1zdGF0dXNlc1wiKS5hcHBlbmRDaGlsZChhc3Nob2xlQnRuKVxuICAgICAgICBpZiAodGhpcy5pc1VzZXJBc3Nob2xlKHRoaXMuZ2V0VXNlcigpKSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJ0aGUgdXNlciBpcyBhbiBhc3Nob2xlIVwiKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJldHVybnMge3N0cmluZ31cbiAgICAgKi9cbiAgICAgZ2V0VXNlcigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGF0aG5hbWUuc3BsaXQoJy8nKS5maWx0ZXIoKGEpID0+IGEpLnBvcCgpXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHVzZXJcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBpc1VzZXJBc3Nob2xlKHVzZXIpIHtcbiAgICAgICAgcmV0dXJuIEFzc2hvbGVzU3RvcmFnZS5nZXRBc3Nob2xlcygpLmluY2x1ZGVzKHVzZXIpXG4gICAgfVxufSIsImNvbnN0IEFTU0hPTEVTX1NUT1JBR0VfS0VZID0gJ2Fzc2hvbGVzJztcblxuZXhwb3J0IGNsYXNzIEFzc2hvbGVzU3RvcmFnZSB7XG4gICAgc3RhdGljIGdldEFzc2hvbGVzVGV4dCgpIHtcbiAgICAgICAgcmV0dXJuIGxvY2FsU3RvcmFnZS5nZXRJdGVtKEFTU0hPTEVTX1NUT1JBR0VfS0VZKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtzdHJpbmdbXX1cbiAgICAgKi9cbiAgICBzdGF0aWMgZ2V0QXNzaG9sZXMoKSB7XG4gICAgICAgIHJldHVybiBBc3Nob2xlc1N0b3JhZ2UuZ2V0QXNzaG9sZXNUZXh0KCkuc3BsaXQoJywnKSB8fCBbXTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBhc3Nob2xlc1RleHRcbiAgICAgKi9cbiAgICBzdGF0aWMgc2V0QXNzaG9sZXNUZXh0KGFzc2hvbGVzVGV4dCkge1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShBU1NIT0xFU19TVE9SQUdFX0tFWSwgYXNzaG9sZXNUZXh0KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBhc3Nob2xlXG4gICAgICovXG4gICAgc3RhdGljIGFkZEFzc2hvbGUoYXNzaG9sZSkge1xuICAgICAgICBjb25zdCBhc3Nob2xlcyA9IHRoaXMuZ2V0QXNzaG9sZXMoKTtcbiAgICAgICAgaWYgKGFzc2hvbGVzLmluY2x1ZGVzKGFzc2hvbGUpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgYXNzaG9sZXMucHVzaChhc3Nob2xlKTtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oQVNTSE9MRVNfU1RPUkFHRV9LRVksIGFzc2hvbGVzLmpvaW4oJywnKSk7XG4gICAgfVxufSIsImNvbnN0IEJMQUNLTElTVF9TVE9SQUdFX0tFWSA9ICdibGFja2xpc3QnO1xuXG5leHBvcnQgY2xhc3MgQmxhY2tsaXN0U3RvcmFnZSB7XG4gICAgc3RhdGljIGdldEJsYWNrbGlzdFRleHQoKSB7XG4gICAgICAgIHJldHVybiBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShCTEFDS0xJU1RfU1RPUkFHRV9LRVkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHJldHVybnMge3N0cmluZ1tdfVxuICAgICAqL1xuICAgIHN0YXRpYyBnZXRCbGFja2xpc3QoKSB7XG4gICAgICAgIHJldHVybiBCbGFja2xpc3RTdG9yYWdlLmdldEJsYWNrbGlzdFRleHQoKS5zcGxpdCgnLCcpIHx8IFtdO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHRleHRcbiAgICAgKi9cbiAgICBzdGF0aWMgc2V0QmxhY2tsaXN0VGV4dCh0ZXh0KSB7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKEJMQUNLTElTVF9TVE9SQUdFX0tFWSwgdGV4dCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcGFnZVxuICAgICAqL1xuICAgIHN0YXRpYyBhZGRQYWdlKHBhZ2UpIHtcbiAgICAgICAgY29uc3QgbGlzdCA9IHRoaXMuZ2V0QmxhY2tsaXN0KCk7XG4gICAgICAgIGlmIChsaXN0LmluY2x1ZGVzKHBhZ2UpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgbGlzdC5wdXNoKHBhZ2UpO1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShCTEFDS0xJU1RfU1RPUkFHRV9LRVksIGxpc3QpO1xuICAgIH1cbn0iLCJjb25zdCBQUklWQVRFX0NPTU1FTlRTX0tFWSA9ICdwcml2YXRlLWNvbW1lbnRzJztcblxuZXhwb3J0IGNsYXNzIFByaXZhdGVDb21tZW50c1N0b3JhZ2Uge1xuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHVzZXJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gY29tbWVudFxuICAgICAqL1xuICAgIHN0YXRpYyBzZXRDb21tZW50KHVzZXIsIGNvbW1lbnQpIHtcbiAgICAgICAgY29uc3QgY29tbWVudHMgPSBQcml2YXRlQ29tbWVudHNTdG9yYWdlLmdldENvbW1lbnRzKCk7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFBSSVZBVEVfQ09NTUVOVFNfS0VZLCBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICAuLi5jb21tZW50cyxcbiAgICAgICAgICAgIFt1c2VyXTogY29tbWVudFxuICAgICAgICB9KSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdXNlclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAgICovXG4gICAgc3RhdGljIGdldENvbW1lbnQodXNlcikge1xuICAgICAgICBjb25zdCB1c2VyQ29tbWVudCA9IFByaXZhdGVDb21tZW50c1N0b3JhZ2UuZ2V0Q29tbWVudHMoKVxuICAgICAgICBpZiAoIXVzZXJDb21tZW50KSB7XG4gICAgICAgICAgICByZXR1cm4gXCJcIjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB0ZXh0UHJpdmF0ZUNvbW1lbnRzT2JqID0gIHRoaXMuZ2V0Q29tbWVudHMoKVxuICAgICAgICByZXR1cm4gdGV4dFByaXZhdGVDb21tZW50c09ialt1c2VyXSB8fCBcIlwiO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIHtPYmplY3R9XG4gICAgICovXG4gICAgc3RhdGljIGdldENvbW1lbnRzKCkge1xuICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShQUklWQVRFX0NPTU1FTlRTX0tFWSkgfHwgXCJ7fVwiKSB8fCB7fVxuICAgIH1cbn0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7UGFnZUZhY3Rvcnl9IGZyb20gXCIuL1BhZ2VGYWN0b3J5XCI7XG5pbXBvcnQge3ByaW50RXh0ZW5zaW9uSW5mb30gZnJvbSBcIi4vZnVuY3Rpb25zXCI7XG5cbnByaW50RXh0ZW5zaW9uSW5mbygpXG5jb25zdCBwYWdlRmFjdG9yeSA9IG5ldyBQYWdlRmFjdG9yeShsb2NhdGlvbi5wYXRobmFtZSlcbmNvbnN0IHBhZ2UgPSBwYWdlRmFjdG9yeS5jcmVhdGUoKVxucGFnZS5tb2RpZnlDb250ZW50KClcblxuXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=