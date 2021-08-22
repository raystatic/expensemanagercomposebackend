const VerifyToken = require("../utils/VerifyToken");

module.exports = app => {

    const users = require("../contollers/user.controller");

    const router = require("express").Router();

    router.post("/",users.auth);

    router.get("/", VerifyToken,users.getUserById);

    app.use("/api/user", router);

}