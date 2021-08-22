const db  = require("../models");
const User = db.users;
const Op = db.sequelize.Op;
const jwt = require("jsonwebtoken");

exports.auth = (req, res) => {
    const userBody = req.body;

    if(!userBody.name || !userBody.email){
        res.status(400).send({
            error:true,
            message:"Insuffient fields"
        });
        return;
    }

    const user = {
        name: userBody.name,
        email: userBody.email,
        avatar: userBody.avatar ? userBody.avatar : ""
    };


    User.findOne({where : {email: user.email}})
    .then(data => {
        if(data !== null){
            const token = jwt.sign({id:data.id}, process.env.TOKEN_SECRET);
            res.send({
                error: false,
                message: "User Already exist",
                data: data,
                token: token
            })
        }else{
            User.create(user)
            .then(newUser => {
                const token = jwt.sign({id:newUser.id}, process.env.TOKEN_SECRET);
                res.send({
                    error: false,
                    message: "New user created",
                    data: newUser,
                    token: token
                })
            })
            .catch(err => {
                res.send({
                    error: true,
                    message: `${err}`
                })
            })
        }
    })
    .catch(err => {
        res.send({
            error: true,
            message: `${err}`
        })
    })
};


exports.getUserById = (req, res) => {

    const userId = req.user.id

    User.findOne({where : {id: userId}})
    .then(data => {
        if(data !== null){
            res.send({
                error: false,
                message: "User details fetched",
                data: data
        })
        }else{
            res.send({
                error: true,
                message: "User not found"
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
