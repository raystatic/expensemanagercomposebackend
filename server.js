const express = require("express");
const cors = require("cors");
const dotenv = require('dotenv');
const db  = require("./app/models");

const app = express();

dotenv.config();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({extended: true}));


// db.sequelize.sync({force: true}).then(() => {
//     console.log("DROP and re-sync db.")
// }).catch((e) => {
//     console.log(`DB sync failed due to: ${e}`);
// })

//for production
db.sequelize.sync().then(() => {
    console.log("re-sync db.")
}).catch((e) => {
    console.log(`DB sync failed due to: ${e}`);
})

app.get("/",(req, res) => {
    res.json({
        message:"Expense manager compose backend"
    })
});


require("./app/routes/user.routes")(app);
require("./app/routes/expense.routes")(app);


const PORT = process.env.PORT || 8080
app.listen(PORT,() => {
    console.log(`SERVER RUNNING ON PORT: ${PORT}`)
})
