const path = require("path")

module.exports = {
    entry: "./src/extension.js",
    output: {
        filename: "after.js",
        path: path.resolve(__dirname, 'extension'),
    },

    mode: "production"

}