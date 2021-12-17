import {getUser} from "./functions";
import {UserPage} from "./UserPage";
import {OwnUserPage} from "./OwnUserPage";
import {PostPage} from "./PostPage";
import {Page} from "./Page";
import {FeedPage} from "./FeedPage";

export class PageFactory {
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
            if (getUser() === this.getWhoAmI()) {
                return new OwnUserPage(this.pathname);
            }
            return new UserPage(this.pathname)
        }

        if (this.isUserContentPageType()) {
            return new PostPage(this.pathname)
        }
        if (this.isFeedPage()) {
            return new FeedPage(this.pathname)
        }
        return new Page(this.pathname)
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