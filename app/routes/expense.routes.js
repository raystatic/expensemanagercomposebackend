const VerifyToken = require("../utils/VerifyToken");

module.exports = app => {

    const expenses = require("../contollers/expenses.controller");

    const router = require("express").Router();

    router.post("/",VerifyToken,expenses.create);
    router.get("/",VerifyToken,expenses.getExpenseByUserId);


    app.use("/api/expense", router);

}