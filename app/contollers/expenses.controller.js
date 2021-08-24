const { expenses } = require("../models");
const db  = require("../models");
const Expense = db.expenses;
const Op = db.sequelize.Op;

exports.create = (req, res) => {
    const expenseBody = req.body    ;

    if(!expenseBody.title || !expenseBody.amount){
        res.status(400).send({
            error:true,
            message:"Insuffient fields"
        });
        return;
    }

    const userId = req.user.id

    const expense = {
        title: expenseBody.title,
        amount: expenseBody.amount,
        userId: userId,
    };


    Expense.create(expense)
    .then(newExpense => {
        res.send({
            error: false,
            message: "New expense created",
            data: newExpense
        })
    })
    .catch(err => {
        res.send({
            error: true,
            message: `${err}`
        })
    })

}


exports.getExpenseByUserId = (req, res) => {

    const userId = req.user.id

    Expense.findAll({where : {userId: userId}})
    .then(data => {
        res.send({
            error: false,
            message: "Expense details fetched",
            data: data
        })
    })
    .catch(err => {
        res.send({
            error: true,
            message: `${err}`
        })
    })

}

exports.getExpenseByExpenseId = (req, res) => {

    const userId = req.user.id

    Expense.findAll({where : {userId: userId}})
    .then(data => {
        res.send({
            error: false,
            message: "Expense details fetched",
            data: data
        })
    })
    .catch(err => {
        res.send({
            error: true,
            message: `${err}`
        })
    })

}
