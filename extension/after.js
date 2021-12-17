/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/AssholesStorage.js":
/*!********************************!*\
  !*** ./src/AssholesStorage.js ***!
  \********************************/
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
        return AssholesStorage.getAssholesText.split(',') || [];
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

/***/ "./src/FeedPage.js":
/*!*************************!*\
  !*** ./src/FeedPage.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FeedPage": () => (/* binding */ FeedPage)
/* harmony export */ });
/* harmony import */ var _Page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Page */ "./src/Page.js");
/* harmony import */ var _AssholesStorage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AssholesStorage */ "./src/AssholesStorage.js");
/* harmony import */ var _functions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./functions */ "./src/functions.js");




class FeedPage extends _Page__WEBPACK_IMPORTED_MODULE_0__.Page {
    constructor(pathname) {
        super(pathname);
    }

    modifyContent() {
        this.hideBlacklistedPosts()
        this.hideAssholePosts()
        ;(0,_functions__WEBPACK_IMPORTED_MODULE_2__.hideVotesRatingsAvatars)()

    }

    hideAssholePosts() {
        for (const asshole of _AssholesStorage__WEBPACK_IMPORTED_MODULE_1__.AssholesStorage.getAssholes()) {
            for (const assholeHref of document.querySelectorAll(`[href="/user/${asshole}/"]`)) {
                assholeHref
                    .parentElement
                    .parentElement
                    .remove()
            }
        }
    }

    hideBlacklistedPosts() {
        const refs = [
            "/post/7789/",
            "/battle/2158/",
            "/battle/1624/",
            "/battle/8638/",
            "/battle/7818/",
            "/battle/7795/",
            "/battle/7741/",
            "/battle/7680/",
            "/question/9109/",
            "/question/11517/",
            "/question/9129/",
            "/question/9101/",
            "/question/9582/",
            "/question/7182/",
            "/question/7808/",
            "/question/9071/",
            "/question/13019/",
            "/question/11361/",
            "/post/8036/",
            "/post/11496/",
            "/idea/6619/",
            "/question/11938/"
        ]

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

/***/ "./src/OwnUserPage.js":
/*!****************************!*\
  !*** ./src/OwnUserPage.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "OwnUserPage": () => (/* binding */ OwnUserPage)
/* harmony export */ });
/* harmony import */ var _Page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Page */ "./src/Page.js");
/* harmony import */ var _AssholesStorage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AssholesStorage */ "./src/AssholesStorage.js");



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
        textArea.value = _AssholesStorage__WEBPACK_IMPORTED_MODULE_1__.AssholesStorage.getAssholesText()
        textArea.addEventListener("input", () => _AssholesStorage__WEBPACK_IMPORTED_MODULE_1__.AssholesStorage.setAssholesText(textArea.value))
        widget.insertAdjacentHTML("afterbegin", header)
        widget.appendChild(textArea)
        return widget
    }

    addAssholesList() {
        document.querySelector('.profile-intro')
            .insertAdjacentElement('beforebegin', this.createAssholesListEdit())
    }

}

/***/ }),

/***/ "./src/Page.js":
/*!*********************!*\
  !*** ./src/Page.js ***!
  \*********************/
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
/* harmony import */ var _UserPage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./UserPage */ "./src/UserPage.js");
/* harmony import */ var _OwnUserPage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./OwnUserPage */ "./src/OwnUserPage.js");
/* harmony import */ var _PostPage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./PostPage */ "./src/PostPage.js");
/* harmony import */ var _Page__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Page */ "./src/Page.js");
/* harmony import */ var _FeedPage__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./FeedPage */ "./src/FeedPage.js");







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
                return new _OwnUserPage__WEBPACK_IMPORTED_MODULE_2__.OwnUserPage(this.pathname);
            }
            return new _UserPage__WEBPACK_IMPORTED_MODULE_1__.UserPage(this.pathname)
        }

        if (this.isUserContentPageType()) {
            return new _PostPage__WEBPACK_IMPORTED_MODULE_3__.PostPage(this.pathname)
        }
        if (this.isFeedPage()) {
            return new _FeedPage__WEBPACK_IMPORTED_MODULE_5__.FeedPage(this.pathname)
        }
        return new _Page__WEBPACK_IMPORTED_MODULE_4__.Page(this.pathname)
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

/***/ "./src/PostPage.js":
/*!*************************!*\
  !*** ./src/PostPage.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PostPage": () => (/* binding */ PostPage)
/* harmony export */ });
/* harmony import */ var _Page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Page */ "./src/Page.js");
/* harmony import */ var _AssholesStorage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AssholesStorage */ "./src/AssholesStorage.js");



class PostPage extends _Page__WEBPACK_IMPORTED_MODULE_0__.Page {
    constructor(url) {
        super(url);
    }

    modifyContent() {
        this.hideAssholeComments()
    }

    hideAssholeComments() {
        for (const asshole of _AssholesStorage__WEBPACK_IMPORTED_MODULE_1__.AssholesStorage.getAssholes()) {
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

/***/ "./src/UserPage.js":
/*!*************************!*\
  !*** ./src/UserPage.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UserPage": () => (/* binding */ UserPage)
/* harmony export */ });
/* harmony import */ var _Page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Page */ "./src/Page.js");
/* harmony import */ var _AssholesStorage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AssholesStorage */ "./src/AssholesStorage.js");



class UserPage extends _Page__WEBPACK_IMPORTED_MODULE_0__.Page {
    constructor(url) {
        super(url);
    }

    modifyContent() {
        this.addAssholeButton()
    }

    addAssholeButton() {
        const parser = new DOMParser();
        const assholeBtnStr = `<a class="profile-status clickable"><span class="profile-status-icon">🖕</span> <span class="profile-status-status">Добавить в мои мудаки</span></a>`
        const assholeBtn = parser.parseFromString(assholeBtnStr, 'text/html').querySelector("a");
        assholeBtn.addEventListener("click", () => {
            _AssholesStorage__WEBPACK_IMPORTED_MODULE_1__.AssholesStorage.addAsshole(this.getUser())
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
        return _AssholesStorage__WEBPACK_IMPORTED_MODULE_1__.AssholesStorage.getAssholes().includes(user)
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGVBQWUsUUFBUTtBQUN2QixpQkFBaUI7QUFDakI7QUFDQTtBQUNBLGVBQWUseUVBQTJCO0FBQzFDO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUN2Q0E7QUFDQSxhQUFhO0FBQ2I7QUFDTztBQUNQO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7VUN4Q0E7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7QUNOMEM7QUFDSzs7QUFFL0MsOERBQWtCO0FBQ2xCLHdCQUF3QixxREFBVztBQUNuQztBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdmFzM2stY2x1Yi1leHRlbnNpb24vLi9zcmMvQXNzaG9sZXNTdG9yYWdlLmpzIiwid2VicGFjazovL3ZhczNrLWNsdWItZXh0ZW5zaW9uLy4vc3JjL0ZlZWRQYWdlLmpzIiwid2VicGFjazovL3ZhczNrLWNsdWItZXh0ZW5zaW9uLy4vc3JjL093blVzZXJQYWdlLmpzIiwid2VicGFjazovL3ZhczNrLWNsdWItZXh0ZW5zaW9uLy4vc3JjL1BhZ2UuanMiLCJ3ZWJwYWNrOi8vdmFzM2stY2x1Yi1leHRlbnNpb24vLi9zcmMvUGFnZUZhY3RvcnkuanMiLCJ3ZWJwYWNrOi8vdmFzM2stY2x1Yi1leHRlbnNpb24vLi9zcmMvUG9zdFBhZ2UuanMiLCJ3ZWJwYWNrOi8vdmFzM2stY2x1Yi1leHRlbnNpb24vLi9zcmMvVXNlclBhZ2UuanMiLCJ3ZWJwYWNrOi8vdmFzM2stY2x1Yi1leHRlbnNpb24vLi9zcmMvZnVuY3Rpb25zLmpzIiwid2VicGFjazovL3ZhczNrLWNsdWItZXh0ZW5zaW9uL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3ZhczNrLWNsdWItZXh0ZW5zaW9uL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly92YXMzay1jbHViLWV4dGVuc2lvbi93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3ZhczNrLWNsdWItZXh0ZW5zaW9uL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdmFzM2stY2x1Yi1leHRlbnNpb24vLi9zcmMvbWFpbi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBBU1NIT0xFU19TVE9SQUdFX0tFWSA9ICdhc3Nob2xlcyc7XG5cbmV4cG9ydCBjbGFzcyBBc3Nob2xlc1N0b3JhZ2Uge1xuICAgIHN0YXRpYyBnZXRBc3Nob2xlc1RleHQoKSB7XG4gICAgICAgIHJldHVybiBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShBU1NIT0xFU19TVE9SQUdFX0tFWSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nW119XG4gICAgICovXG4gICAgc3RhdGljIGdldEFzc2hvbGVzKCkge1xuICAgICAgICByZXR1cm4gQXNzaG9sZXNTdG9yYWdlLmdldEFzc2hvbGVzVGV4dC5zcGxpdCgnLCcpIHx8IFtdO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGFzc2hvbGVzVGV4dFxuICAgICAqL1xuICAgIHN0YXRpYyBzZXRBc3Nob2xlc1RleHQoYXNzaG9sZXNUZXh0KSB7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKEFTU0hPTEVTX1NUT1JBR0VfS0VZLCBhc3Nob2xlc1RleHQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGFzc2hvbGVcbiAgICAgKi9cbiAgICBzdGF0aWMgYWRkQXNzaG9sZShhc3Nob2xlKSB7XG4gICAgICAgIGNvbnN0IGFzc2hvbGVzID0gdGhpcy5nZXRBc3Nob2xlcygpO1xuICAgICAgICBpZiAoYXNzaG9sZXMuaW5jbHVkZXMoYXNzaG9sZSkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBhc3Nob2xlcy5wdXNoKGFzc2hvbGUpO1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShBU1NIT0xFU19TVE9SQUdFX0tFWSwgYXNzaG9sZXMuam9pbignLCcpKTtcbiAgICB9XG59IiwiaW1wb3J0IHtQYWdlfSBmcm9tIFwiLi9QYWdlXCI7XG5pbXBvcnQge0Fzc2hvbGVzU3RvcmFnZX0gZnJvbSBcIi4vQXNzaG9sZXNTdG9yYWdlXCI7XG5pbXBvcnQge2hpZGVWb3Rlc1JhdGluZ3NBdmF0YXJzfSBmcm9tIFwiLi9mdW5jdGlvbnNcIjtcblxuZXhwb3J0IGNsYXNzIEZlZWRQYWdlIGV4dGVuZHMgUGFnZSB7XG4gICAgY29uc3RydWN0b3IocGF0aG5hbWUpIHtcbiAgICAgICAgc3VwZXIocGF0aG5hbWUpO1xuICAgIH1cblxuICAgIG1vZGlmeUNvbnRlbnQoKSB7XG4gICAgICAgIHRoaXMuaGlkZUJsYWNrbGlzdGVkUG9zdHMoKVxuICAgICAgICB0aGlzLmhpZGVBc3Nob2xlUG9zdHMoKVxuICAgICAgICBoaWRlVm90ZXNSYXRpbmdzQXZhdGFycygpXG5cbiAgICB9XG5cbiAgICBoaWRlQXNzaG9sZVBvc3RzKCkge1xuICAgICAgICBmb3IgKGNvbnN0IGFzc2hvbGUgb2YgQXNzaG9sZXNTdG9yYWdlLmdldEFzc2hvbGVzKCkpIHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgYXNzaG9sZUhyZWYgb2YgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgW2hyZWY9XCIvdXNlci8ke2Fzc2hvbGV9L1wiXWApKSB7XG4gICAgICAgICAgICAgICAgYXNzaG9sZUhyZWZcbiAgICAgICAgICAgICAgICAgICAgLnBhcmVudEVsZW1lbnRcbiAgICAgICAgICAgICAgICAgICAgLnBhcmVudEVsZW1lbnRcbiAgICAgICAgICAgICAgICAgICAgLnJlbW92ZSgpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoaWRlQmxhY2tsaXN0ZWRQb3N0cygpIHtcbiAgICAgICAgY29uc3QgcmVmcyA9IFtcbiAgICAgICAgICAgIFwiL3Bvc3QvNzc4OS9cIixcbiAgICAgICAgICAgIFwiL2JhdHRsZS8yMTU4L1wiLFxuICAgICAgICAgICAgXCIvYmF0dGxlLzE2MjQvXCIsXG4gICAgICAgICAgICBcIi9iYXR0bGUvODYzOC9cIixcbiAgICAgICAgICAgIFwiL2JhdHRsZS83ODE4L1wiLFxuICAgICAgICAgICAgXCIvYmF0dGxlLzc3OTUvXCIsXG4gICAgICAgICAgICBcIi9iYXR0bGUvNzc0MS9cIixcbiAgICAgICAgICAgIFwiL2JhdHRsZS83NjgwL1wiLFxuICAgICAgICAgICAgXCIvcXVlc3Rpb24vOTEwOS9cIixcbiAgICAgICAgICAgIFwiL3F1ZXN0aW9uLzExNTE3L1wiLFxuICAgICAgICAgICAgXCIvcXVlc3Rpb24vOTEyOS9cIixcbiAgICAgICAgICAgIFwiL3F1ZXN0aW9uLzkxMDEvXCIsXG4gICAgICAgICAgICBcIi9xdWVzdGlvbi85NTgyL1wiLFxuICAgICAgICAgICAgXCIvcXVlc3Rpb24vNzE4Mi9cIixcbiAgICAgICAgICAgIFwiL3F1ZXN0aW9uLzc4MDgvXCIsXG4gICAgICAgICAgICBcIi9xdWVzdGlvbi85MDcxL1wiLFxuICAgICAgICAgICAgXCIvcXVlc3Rpb24vMTMwMTkvXCIsXG4gICAgICAgICAgICBcIi9xdWVzdGlvbi8xMTM2MS9cIixcbiAgICAgICAgICAgIFwiL3Bvc3QvODAzNi9cIixcbiAgICAgICAgICAgIFwiL3Bvc3QvMTE0OTYvXCIsXG4gICAgICAgICAgICBcIi9pZGVhLzY2MTkvXCIsXG4gICAgICAgICAgICBcIi9xdWVzdGlvbi8xMTkzOC9cIlxuICAgICAgICBdXG5cbiAgICAgICAgZm9yIChjb25zdCByZWYgb2YgcmVmcykge1xuICAgICAgICAgICAgZm9yIChjb25zdCB0b3BpYyBvZiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGBhW2hyZWYqPVwiJHtyZWZ9XCJdYCkpIHtcbiAgICAgICAgICAgICAgICB0b3BpY1xuICAgICAgICAgICAgICAgICAgICAucGFyZW50RWxlbWVudFxuICAgICAgICAgICAgICAgICAgICAucGFyZW50RWxlbWVudFxuICAgICAgICAgICAgICAgICAgICAucmVtb3ZlKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuXG59IiwiaW1wb3J0IHtQYWdlfSBmcm9tIFwiLi9QYWdlXCI7XG5pbXBvcnQge0Fzc2hvbGVzU3RvcmFnZX0gZnJvbSBcIi4vQXNzaG9sZXNTdG9yYWdlXCI7XG5cbmV4cG9ydCBjbGFzcyBPd25Vc2VyUGFnZSBleHRlbmRzIFBhZ2Uge1xuICAgIGNvbnN0cnVjdG9yKHBhdGhuYW1lKSB7XG4gICAgICAgIHN1cGVyKHBhdGhuYW1lKTtcbiAgICB9XG5cbiAgICBtb2RpZnlDb250ZW50KCkge1xuICAgICAgICB0aGlzLmFkZEFzc2hvbGVzTGlzdCgpXG4gICAgfVxuXG4gICAgY3JlYXRlQXNzaG9sZXNMaXN0RWRpdCgpIHtcbiAgICAgICAgY29uc3Qgd2lkZ2V0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKVxuICAgICAgICB3aWRnZXQuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJibG9ja1wiKVxuICAgICAgICBjb25zdCBoZWFkZXIgPSBcIjxoMiBjbGFzcz0ncHJvZmlsZS1oZWFkZXInPtCc0L7QuCDQvNGD0LTQsNC60Lg8L2gyPlwiXG4gICAgICAgIGNvbnN0IHRleHRBcmVhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRleHRhcmVhXCIpXG4gICAgICAgIHRleHRBcmVhLnN0eWxlLndpZHRoID0gXCIxMDAlXCJcbiAgICAgICAgdGV4dEFyZWEudmFsdWUgPSBBc3Nob2xlc1N0b3JhZ2UuZ2V0QXNzaG9sZXNUZXh0KClcbiAgICAgICAgdGV4dEFyZWEuYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsICgpID0+IEFzc2hvbGVzU3RvcmFnZS4gc2V0QXNzaG9sZXNUZXh0KHRleHRBcmVhLnZhbHVlKSlcbiAgICAgICAgd2lkZ2V0Lmluc2VydEFkamFjZW50SFRNTChcImFmdGVyYmVnaW5cIiwgaGVhZGVyKVxuICAgICAgICB3aWRnZXQuYXBwZW5kQ2hpbGQodGV4dEFyZWEpXG4gICAgICAgIHJldHVybiB3aWRnZXRcbiAgICB9XG5cbiAgICBhZGRBc3Nob2xlc0xpc3QoKSB7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9maWxlLWludHJvJylcbiAgICAgICAgICAgIC5pbnNlcnRBZGphY2VudEVsZW1lbnQoJ2JlZm9yZWJlZ2luJywgdGhpcy5jcmVhdGVBc3Nob2xlc0xpc3RFZGl0KCkpXG4gICAgfVxuXG59IiwiZXhwb3J0IGNsYXNzIFBhZ2Uge1xuICAgIGNvbnN0cnVjdG9yKHBhdGhuYW1lKSB7XG4gICAgICAgIGlmICghcGF0aG5hbWUpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigncGF0aG5hbWUgaXMgcmVxdWlyZWQnKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnBhdGhuYW1lID0gcGF0aG5hbWU7XG4gICAgfVxuXG4gICAgbW9kaWZ5Q29udGVudCgpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJOb3RoaW5nIGlzIGhhcHBlbmVkLCBpdCdzIGFuIHVuc3BlY2lmaWVkIHBhZ2VcIilcbiAgICB9XG59IiwiaW1wb3J0IHtnZXRVc2VyfSBmcm9tIFwiLi9mdW5jdGlvbnNcIjtcbmltcG9ydCB7VXNlclBhZ2V9IGZyb20gXCIuL1VzZXJQYWdlXCI7XG5pbXBvcnQge093blVzZXJQYWdlfSBmcm9tIFwiLi9Pd25Vc2VyUGFnZVwiO1xuaW1wb3J0IHtQb3N0UGFnZX0gZnJvbSBcIi4vUG9zdFBhZ2VcIjtcbmltcG9ydCB7UGFnZX0gZnJvbSBcIi4vUGFnZVwiO1xuaW1wb3J0IHtGZWVkUGFnZX0gZnJvbSBcIi4vRmVlZFBhZ2VcIjtcblxuZXhwb3J0IGNsYXNzIFBhZ2VGYWN0b3J5IHtcbiAgICBjb25zdHJ1Y3RvcihwYXRobmFtZSkge1xuICAgICAgICAvKipcbiAgICAgICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMucGF0aG5hbWUgPSBwYXRobmFtZTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMucGFnZVR5cGUgPSB0aGlzLmdldFBhZ2VUeXBlKClcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtQYWdlfVxuICAgICAqL1xuICAgIGNyZWF0ZSgpIHtcblxuICAgICAgICBpZiAodGhpcy5pc1VzZXJQYWdlVHlwZSgpKSB7XG4gICAgICAgICAgICBpZiAoZ2V0VXNlcigpID09PSB0aGlzLmdldFdob0FtSSgpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBPd25Vc2VyUGFnZSh0aGlzLnBhdGhuYW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBuZXcgVXNlclBhZ2UodGhpcy5wYXRobmFtZSlcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmlzVXNlckNvbnRlbnRQYWdlVHlwZSgpKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFBvc3RQYWdlKHRoaXMucGF0aG5hbWUpXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuaXNGZWVkUGFnZSgpKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEZlZWRQYWdlKHRoaXMucGF0aG5hbWUpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ldyBQYWdlKHRoaXMucGF0aG5hbWUpXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgaXNGZWVkUGFnZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGFnZVR5cGUgPT09ICdhbGwnIHx8IHRoaXMucGF0aG5hbWUgPT09ICcvJ1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIGlzVXNlckNvbnRlbnRQYWdlVHlwZSgpIHtcbiAgICAgICAgY29uc3QgY29udGVudFR5cGVzID0gWydiYXR0bGUnLCBcInF1ZXN0aW9uXCIsIFwicG9zdFwiLCBcImlkZWFcIl1cbiAgICAgICAgcmV0dXJuIGNvbnRlbnRUeXBlcy5pbmNsdWRlcyh0aGlzLnBhZ2VUeXBlKVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIGlzVXNlclBhZ2VUeXBlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wYWdlVHlwZSA9PT0gXCJ1c2VyXCJcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgICAqL1xuICAgIGdldFBhZ2VUeXBlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wYXRobmFtZVxuICAgICAgICAgICAgLnNwbGl0KCcvJylcbiAgICAgICAgICAgIC5maWx0ZXIoYSA9PiBhKVswXVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAgICovXG4gICAgZ2V0V2hvQW1JKCkge1xuICAgICAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tZW51LXJpZ2h0PmEuYXZhdGFyXCIpXG4gICAgICAgICAgICAuZ2V0QXR0cmlidXRlKFwiaHJlZlwiKVxuICAgICAgICAgICAgLnNwbGl0KCcvJylcbiAgICAgICAgICAgIC5maWx0ZXIoYSA9PiBhKVxuICAgICAgICAgICAgLnBvcCgpXG4gICAgfVxufSIsImltcG9ydCB7UGFnZX0gZnJvbSBcIi4vUGFnZVwiO1xuaW1wb3J0IHtBc3Nob2xlc1N0b3JhZ2V9IGZyb20gXCIuL0Fzc2hvbGVzU3RvcmFnZVwiO1xuXG5leHBvcnQgY2xhc3MgUG9zdFBhZ2UgZXh0ZW5kcyBQYWdlIHtcbiAgICBjb25zdHJ1Y3Rvcih1cmwpIHtcbiAgICAgICAgc3VwZXIodXJsKTtcbiAgICB9XG5cbiAgICBtb2RpZnlDb250ZW50KCkge1xuICAgICAgICB0aGlzLmhpZGVBc3Nob2xlQ29tbWVudHMoKVxuICAgIH1cblxuICAgIGhpZGVBc3Nob2xlQ29tbWVudHMoKSB7XG4gICAgICAgIGZvciAoY29uc3QgYXNzaG9sZSBvZiBBc3Nob2xlc1N0b3JhZ2UuZ2V0QXNzaG9sZXMoKSkge1xuICAgICAgICAgICAgY29uc3Qgc2VsZWN0b3IgPSBgLmNvbW1lbnQtaGVhZGVyLWF1dGhvci1uYW1lW2hyZWY9XCIvdXNlci8ke2Fzc2hvbGV9L1wiXWBcbiAgICAgICAgICAgIGNvbnN0IG5vZGVzV2l0aEFzc2hvbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKVxuICAgICAgICAgICAgZm9yIChjb25zdCBhc3Nob2xlTm9kZSBvZiBub2Rlc1dpdGhBc3Nob2xlKSB7XG4gICAgICAgICAgICAgICAgYXNzaG9sZU5vZGVcbiAgICAgICAgICAgICAgICAgICAgLnBhcmVudEVsZW1lbnRcbiAgICAgICAgICAgICAgICAgICAgLnBhcmVudEVsZW1lbnRcbiAgICAgICAgICAgICAgICAgICAgLnBhcmVudEVsZW1lbnRcbiAgICAgICAgICAgICAgICAgICAgLnBhcmVudEVsZW1lbnRcbiAgICAgICAgICAgICAgICAgICAgLnJlbW92ZSgpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJpbXBvcnQge1BhZ2V9IGZyb20gXCIuL1BhZ2VcIjtcbmltcG9ydCB7QXNzaG9sZXNTdG9yYWdlfSBmcm9tIFwiLi9Bc3Nob2xlc1N0b3JhZ2VcIjtcblxuZXhwb3J0IGNsYXNzIFVzZXJQYWdlIGV4dGVuZHMgUGFnZSB7XG4gICAgY29uc3RydWN0b3IodXJsKSB7XG4gICAgICAgIHN1cGVyKHVybCk7XG4gICAgfVxuXG4gICAgbW9kaWZ5Q29udGVudCgpIHtcbiAgICAgICAgdGhpcy5hZGRBc3Nob2xlQnV0dG9uKClcbiAgICB9XG5cbiAgICBhZGRBc3Nob2xlQnV0dG9uKCkge1xuICAgICAgICBjb25zdCBwYXJzZXIgPSBuZXcgRE9NUGFyc2VyKCk7XG4gICAgICAgIGNvbnN0IGFzc2hvbGVCdG5TdHIgPSBgPGEgY2xhc3M9XCJwcm9maWxlLXN0YXR1cyBjbGlja2FibGVcIj48c3BhbiBjbGFzcz1cInByb2ZpbGUtc3RhdHVzLWljb25cIj7wn5aVPC9zcGFuPiA8c3BhbiBjbGFzcz1cInByb2ZpbGUtc3RhdHVzLXN0YXR1c1wiPtCU0L7QsdCw0LLQuNGC0Ywg0LIg0LzQvtC4INC80YPQtNCw0LrQuDwvc3Bhbj48L2E+YFxuICAgICAgICBjb25zdCBhc3Nob2xlQnRuID0gcGFyc2VyLnBhcnNlRnJvbVN0cmluZyhhc3Nob2xlQnRuU3RyLCAndGV4dC9odG1sJykucXVlcnlTZWxlY3RvcihcImFcIik7XG4gICAgICAgIGFzc2hvbGVCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgICAgIEFzc2hvbGVzU3RvcmFnZS5hZGRBc3Nob2xlKHRoaXMuZ2V0VXNlcigpKVxuICAgICAgICB9KVxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2ZpbGUtc3RhdHVzZXNcIikuYXBwZW5kQ2hpbGQoYXNzaG9sZUJ0bilcbiAgICAgICAgaWYgKHRoaXMuaXNVc2VyQXNzaG9sZSh0aGlzLmdldFVzZXIoKSkpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwidGhlIHVzZXIgaXMgYW4gYXNzaG9sZSFcIilcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAgICovXG4gICAgIGdldFVzZXIoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBhdGhuYW1lLnNwbGl0KCcvJykuZmlsdGVyKChhKSA9PiBhKS5wb3AoKVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB1c2VyXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgaXNVc2VyQXNzaG9sZSh1c2VyKSB7XG4gICAgICAgIHJldHVybiBBc3Nob2xlc1N0b3JhZ2UuZ2V0QXNzaG9sZXMoKS5pbmNsdWRlcyh1c2VyKVxuICAgIH1cbn0iLCIvKipcbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRVc2VyKCkge1xuICAgIHJldHVybiBkb2N1bWVudC5sb2NhdGlvbi5wYXRobmFtZS5zcGxpdCgnLycpLmZpbHRlcigoYSkgPT4gYSkucG9wKClcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGhpZGVWb3Rlc1JhdGluZ3NBdmF0YXJzKCkge1xuICAgIGNvbnN0IGRpc3RyYWN0ZWRFbGVtZW50c1NlbGVjdG9ycyA9IFtcbiAgICAgICAgJy51cHZvdGUnLFxuICAgICAgICAnLnVwdm90ZS12b3RlZCcsXG4gICAgICAgICcudXB2b3RlLXR5cGUtaW5saW5lJyxcbiAgICAgICAgJy5jb21tZW50LXJhdGluZycsXG4gICAgICAgICcuZmVlZC1wb3N0LWNvbW1lbnRzLXVucmVhZCdcbiAgICBdXG5cbiAgICBmb3IgKGNvbnN0IHNlbGVjdG9yIG9mIGRpc3RyYWN0ZWRFbGVtZW50c1NlbGVjdG9ycykge1xuICAgICAgICBmb3IgKGNvbnN0IGVsIG9mIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpKSB7XG4gICAgICAgICAgICBlbC5yZW1vdmUoKVxuICAgICAgICB9XG4gICAgfVxuICAgIGZvciAoY29uc3QgYXZhdGFyIG9mIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuYXZhdGFyPmltZ1wiKSkge1xuICAgICAgICBhdmF0YXIuc2V0QXR0cmlidXRlKFwic3JjXCIsIFwiaHR0cHM6Ly9pLnZhczNrLmNsdWIvdi5wbmdcIilcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwcmludEV4dGVuc2lvbkluZm8oKSB7XG4gICAgY29uc29sZS5pbmZvIChcItCS0YHQtdC8INCx0L7Rj9GC0YzRgdGPISDQktCw0YHRgtGA0LjQui3Ri9C60YHRgtGN0L3RiNGL0L0gdjEuMC4wXCIpXG4gICAgY29uc29sZS5sb2coYFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgKG8pKG8pXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC8gICAgIFxcXFxcbiAgICAgICAgICAgICAgICAgICAgICAgICAvICAgICAgIHxcbiAgICAgICAgICAgICAgICAgICAgICAgIC8gICBcXFxcICAqIHxcbiAgICAgICAgICBfX19fX19fXyAgICAgLyAgICAvXFxcXF9fL1xuICBfICAgICAgLyAgICAgICAgXFxcXCAgIC8gICAgL1xuIC8gXFxcXCAgICAvICBfX19fICAgIFxcXFxfLyAgICAvXG4vL1xcXFwgXFxcXCAgLyAgLyAgICBcXFxcICAgICAgICAgL1xuViAgXFxcXCBcXFxcLyAgLyAgICAgIFxcXFwgICAgICAgL1xuICAgIFxcXFxfX18vICAgICAgICBcXFxcX19fX18vXG4gICAgYClcbn1cblxuXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7UGFnZUZhY3Rvcnl9IGZyb20gXCIuL1BhZ2VGYWN0b3J5XCI7XG5pbXBvcnQge3ByaW50RXh0ZW5zaW9uSW5mb30gZnJvbSBcIi4vZnVuY3Rpb25zXCI7XG5cbnByaW50RXh0ZW5zaW9uSW5mbygpXG5jb25zdCBwYWdlRmFjdG9yeSA9IG5ldyBQYWdlRmFjdG9yeShsb2NhdGlvbi5wYXRobmFtZSlcbmNvbnN0IHBhZ2UgPSBwYWdlRmFjdG9yeS5jcmVhdGUoKVxucGFnZS5tb2RpZnlDb250ZW50KClcblxuXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=