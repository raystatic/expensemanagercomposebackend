const { expenses } = require("../models");
const db  = require("../models");
const Expense = db.expenses;
const Op = db.sequelize.Op;

exports.create = (req, res) => {
    const expenseBody = req.body;

    if(!expenseBody.title || !expenseBody.amount || !expenseBody.date){
        res.status(400).send({
            error:true,
            message:"Insuffient fields"
        });
        return;
    }

    console.log(`expenseBody: ${expenseBody}`)

    const userId = req.user.id

    const expense = {
        title: expenseBody.title,
        amount: expenseBody.amount,
        userId: userId,
        date: expenseBody.date
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
    const expenseId = req.query.expenseId

    if(!expenseId){
        res.status(400).send({
            error:true,
            message:"Expense Id required"
        });
        return;
    }

    Expense.findOne({where : {
        userId: userId,
        id: expenseId
    }})
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

exports.updateExpense = (req, res) => {

    const userId = req.user.id
    const expenseBody = {
        title: req.body.title,
        amount: req.body.amount,
        id: req.body.expenseId,
        date: req.body.date
    }

    if(!expenseBody.title || !expenseBody.amount || !expenseBody.id || !expenseBody.date){
        res.status(400).send({
            error:true,
            message:"Insuffient fields"
        });
        return;
    }

    Expense.update({
        title: expenseBody.title,
        amount: expenseBody.amount,
        date: expenseBody.date
    },{
        where: {
            id: expenseBody.id,
            userId: userId
        }
    })
    .then(data  => {
        if(data[0] === 1){
            res.send({
                error: false,
                message: "Expense updated"
            })
        }else{
            res.send({
                error: true,
                message: "Expense not updated"
            })
        }
    })
    .catch(err => {
        res.send({
            error: true,
            message: `${err}`
        })
    })

}
