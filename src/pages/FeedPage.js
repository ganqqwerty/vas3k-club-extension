import {Page} from "./Page";
import {AssholesStorage} from "../storage/AssholesStorage";
import {BlacklistStorage} from "../storage/BlacklistStorage";

export class FeedPage extends Page {
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
                BlacklistStorage.addPage(pageId)
                post.parentElement.remove()
            })
            post.appendChild(button)
        })
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
        const refs = BlacklistStorage.getBlacklist()
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