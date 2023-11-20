const config = require("../db/auth.config")
const db = require("../models")
const User = db.user
var jwt = require("jsonwebtoken")
var bcrypt = require("bcryptjs")
const Role = db.role


exports.signup =(req, res)=>{
    const { username, industry, email, address, phoneNumber} =req.body
    const user = new User({
        username,
        email,
        industry,
        phoneNumber,
        address,
        password: bcrypt.hashSync(req.body.password, 8)
    });
    user.save()
        .then(savedUser => {
            if (req.body.roles) {
                return Role.find({ name: { $in: req.body.roles } });
            } else {
                return Role.findOne({ name: "user" });
            }
        })
        .then(roles => {
            if (roles) {
                user.roles = roles.map(role => role._id);
            } else {
                user.roles = [roles._id];
            }
    
            return user.save();
        })
        .then(() => {
            res.send({ message: "User was registered successfully!" });
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "Some error occurred while saving the user." });
        });
    
};


exports.signin = (req, res) => {
    User.findOne({
        email: req.body.email
    })
        .populate("roles", "-__v")
        .then(user => {
            if (!user) {
                return res.status(404).send({ message: "User Not found" });
            }

            const passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );

            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Invalid Password!"
                });
            }

            const token = jwt.sign(
                { id: user.id },
                config.secret,
                { expiresIn: 86400 } // 24 hours
            );

            const authorities = user.roles.map(role => "ROLE_" + role.name.toUpperCase());

            res.status(200).send({
                id: user._id,
                username: user.username,
                email: user.email,
                roles: user.roles,
                image: user.image,
                phone: user.phone,
                address: user.address,
                authorities: authorities,
                accessToken: token
            });
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "Some error occurred while signing in." });
        });
};
