import {
    addAssholeButton,
    addAssholesList,
    getPageType,
    getUser,
    getWhoAmI, hideAssholeComments, hideAssholePosts, hideBlacklistedPosts, hideVotesRatingsAvatars,
    isListPageType, isUserContentPageType,
    isUserPageType
} from "./functions";

const pageType = getPageType()
if (isUserPageType(pageType)) {
    if (getUser() !== getWhoAmI()) {
        addAssholeButton()
    } else {
        addAssholesList()
    }

}

if (!isListPageType(pageType)) {
    hideBlacklistedPosts()
    hideAssholePosts()
}

if (isUserContentPageType(pageType)) {
    hideAssholeComments();
}

hideVotesRatingsAvatars()

