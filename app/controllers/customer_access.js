const config = require("../db/auth.config")
var jwt = require("jsonwebtoken")
var bcrypt = require("bcryptjs");
const Customer = require("../models/customer");


exports.signup = (req, res) =>
{
    const { name, email, address, phone} = req.body;
    
    const user = new Customer({
        name,
        email,
        phone,
        address,
        password: bcrypt.hashSync(req.body.password, 8)
    });

    user.save().then(message => {
        res.status(200).json("Account Created");

    }).catch(err => {
        res.status(300).json(err);
    })
    
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