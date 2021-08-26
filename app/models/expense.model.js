
module.exports = (sequelize, Sequelize) => {

    const Expense = sequelize.define("expense",{
        title:{
            type: Sequelize.STRING
        },
        amount: {
            type: Sequelize.FLOAT
        },
        userId: {
            type: Sequelize.STRING
        }
    });

    return Expense;

}