import {Page} from "./Page";
import {AssholesStorage} from "../storage/AssholesStorage";
import {PrivateCommentsStorage} from "../storage/PrivateCommentsStorage";

export class UserPage extends Page {
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
        textarea.value = PrivateCommentsStorage.getComment(this.user || "")
        textarea.addEventListener("input", (text) => {
            const comment = text.target.value
            PrivateCommentsStorage.setComment(this.user, comment)
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
            AssholesStorage.addAsshole(this.getUser())
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
        return AssholesStorage.getAssholes().includes(user)
    }
}