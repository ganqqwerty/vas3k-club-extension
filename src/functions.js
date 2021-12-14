import {getAssholes} from "./database";

/**
 * @returns {string}
 */
export function getPageType() {
    return document.location.pathname
        .split('/')
        .filter(a=>a)
        .shift()
}

/**
 * @returns {string}
 */
export function getWhoAmI() {
    return document.querySelector(".menu-right>a.avatar")
        .getAttribute("href")
        .split('/')
        .filter(a=>a)
        .pop()
}

/**
 * @param {string} pageType
 * @returns {boolean}
 */
export function isUserPageType(pageType) {
    return pageType === "user"
}

/**
 * @param {string} user
 * @returns {boolean}
 */
function isUserAsshole(user) {
    return getAssholes().includes(user)
}

/**
 * @returns {string}
 */
export function getUser() {
    return document.location.pathname.split('/').filter((a)=>a).pop()
}

/**
 * @param {string} pageType
 * @returns {boolean}
 */
export function isListPageType(pageType) {
    return pageType === "all"
}

/**
 * @param {string} pageType
 * @returns {boolean}
 */
export function isUserContentPageType(pageType) {
    const contentTypes = ['battle', "question", "post", "idea"]
    return contentTypes.includes(pageType)
}



export function hideBlacklistedPosts() {
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

export function hideVotesRatingsAvatars() {
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

export function addAssholeButton() {
    const parser = new DOMParser();
    const assholeBtnStr = `<a class="profile-status clickable"><span class="profile-status-icon">🖕</span> <span class="profile-status-status">Добавить в мои мудаки</span></a>`
    const assholeBtn = parser.parseFromString(assholeBtnStr, 'text/html').querySelector("a");
    assholeBtn.addEventListener("click", () => {
        const currentUser = getUser()
        const assholesArr = getAssholes()
        assholesArr.push(currentUser)
        localStorage.setItem("assholes", assholesArr.join(","))

    })
    document.querySelector(".profile-statuses").appendChild(assholeBtn)
    if(isUserAsshole(getUser())) {
        console.log("the user is an asshole!")
    }
}

export function hideAssholePosts() {
    for (const asshole of getAssholes()) {
        for (const assholeHref of document.querySelectorAll(`[href="/user/${asshole}/"]`) ) {
            assholeHref
                .parentElement
                .parentElement
                .remove()
        }
    }
}

export function hideAssholeComments() {
    for (const asshole of getAssholes()) {
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

export function addAssholesList() {
    const textArea  = document.createElement("textarea")
    textArea.style.width = "100%"
    textArea.value = localStorage.getItem("assholes") || ""
    textArea.addEventListener("input", () => localStorage.setItem("assholes", textArea.value))
    document.querySelector('.profile-intro')
        .insertAdjacentElement('beforebegin', textArea)
}
