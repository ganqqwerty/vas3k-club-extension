const path = require("path")

module.exports = {
    entry: "./src/extension.js",
    output: {
        filename: "dist.js",
        path: path.resolve(__dirname, 'dist'),
    }

}