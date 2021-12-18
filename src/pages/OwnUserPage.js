import {Page} from "./Page";
import {AssholesStorage} from "../AssholesStorage";

export class OwnUserPage extends Page {
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
        textArea.value = AssholesStorage.getAssholesText()
        textArea.addEventListener("input", () => AssholesStorage. setAssholesText(textArea.value))
        widget.insertAdjacentHTML("afterbegin", header)
        widget.appendChild(textArea)
        return widget
    }

    addAssholesList() {
        document.querySelector('.profile-intro')
            .insertAdjacentElement('beforebegin', this.createAssholesListEdit())
    }

}