const VerifyToken = require("../utils/VerifyToken");

module.exports = app => {

    const expenses = require("../contollers/expenses.controller");

    const router = require("express").Router();

    router.post("/",VerifyToken,expenses.create);
    router.get("/",VerifyToken,expenses.getExpenseByUserId);
    router.get("/getExpenseById",VerifyToken, expenses.getExpenseByExpenseId);
    router.patch("/updateExpense",VerifyToken, expenses.updateExpense);
    router.delete("/deleteExpenseById", VerifyToken,expenses.deleteById)


    app.use("/api/expense", router);

}