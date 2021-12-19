import {PageFactory} from "./PageFactory";
import {printExtensionInfo} from "./functions";

printExtensionInfo()
const pageFactory = new PageFactory(location.pathname)
const page = pageFactory.create()
page.modifyContent()


