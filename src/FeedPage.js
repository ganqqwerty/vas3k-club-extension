import {Page} from "./Page";
import {AssholesStorage} from "./AssholesStorage";
import {hideVotesRatingsAvatars} from "./functions";

export class FeedPage extends Page {
    constructor(pathname) {
        super(pathname);
    }

    modifyContent() {
        this.hideBlacklistedPosts()
        this.hideAssholePosts()
        hideVotesRatingsAvatars()

    }

    hideAssholePosts() {
        for (const asshole of AssholesStorage.getAssholes()) {
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