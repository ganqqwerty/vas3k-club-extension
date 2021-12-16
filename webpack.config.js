const path = require("path")

module.exports = {
    entry: "./src/main.js",
    output: {
        filename: "after.js",
        path: path.resolve(__dirname, 'extension'),
    },
    watch: true,

    mode: "production"

}