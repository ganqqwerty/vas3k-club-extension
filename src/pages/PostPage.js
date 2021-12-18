import {Page} from "./Page";
import {AssholesStorage} from "../AssholesStorage";

export class PostPage extends Page {
    constructor(url) {
        super(url);
    }

    modifyContent() {
        this.hideAssholeComments()
    }

    hideAssholeComments() {
        for (const asshole of AssholesStorage.getAssholes()) {
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
