/**
 * @returns {string[]}
 */
export function getAssholes() {
    const assholes = localStorage.getItem("assholes") || ""
    return assholes.split(",").filter(x=>x)
}