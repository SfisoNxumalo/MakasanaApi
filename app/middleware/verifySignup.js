const db = require("../models")

const Roles = db.ROLES

const User = db.user

const checkDuplicateUsernameOrEmail = (req, res ,next) =>{
    
    User.findOne({ username: req.body.username })
    .exec()
    .then(user => {
        if (user) {
            res.status(400).send({ message: "Failed! Username is already in use!" });
            return;
        }
    })
    .catch(err => {
        res.status(500).send({ message: err });
    });


    User.findOne({ email: req.body.email })
    .exec()
    .then(user => {
        if (user) {
            res.status(400).send({ message: "Failed! Email is already in use!" });
            return;
        }
    })
    .catch(err => {
        res.status(500).send({ message: err });
    });


}

const checkRolesExisted = (req, res, next) =>{
    
    if(req.body.roles){
        for(let i =0;i<req.body.roles.length; i++){
            if (!Roles.includes(req.body.roles[i])){
               res.status(400).send({
                   message:`Failed! Role ${req.body.roles[i]} does not exist`
               })
               return
            } 
           }
    }
    next()  
}

const verifySignUp ={
    checkDuplicateUsernameOrEmail, 
    checkRolesExisted
}
module.exports = verifySignUp;