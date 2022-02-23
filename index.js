"use script"

const app = require("./app");

function App(req, res) {
    return app(req, res);
}

const lojaApi = App;

module.exports = {
    lojaApi
};