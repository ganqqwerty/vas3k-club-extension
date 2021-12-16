const path = require("path")

module.exports = {
    entry: "./src/main.js",
    output: {
        filename: "after.js",
        path: path.resolve(__dirname, 'extension'),
    },

    mode: "production"

}