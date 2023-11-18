const config = require("../db/auth.config")
var jwt = require("jsonwebtoken")
var bcrypt = require("bcryptjs");
const Business = require("../models/business");


exports.signup = (req, res) =>
{
    const { name, industry, email, address, phone} = req.body;
    
    const user = new Business({
        name,
        email,
        industry,
        phone,
        address,
        password: bcrypt.hashSync(req.body.password, 8)
    });

    user.save().then(message => {
        res.status(201).json("Account Created");

    }).catch(err => {
        res.status(300).json(err);
    })
    
};

exports.signin = (req, res) => {
    Business.findOne({
        email: req.body.email
    })
    .then(user => {
        if (!user) {
            return res.status(401).send({ message: "User Not found" });
        }

        const passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        );

        if (!passwordIsValid) {
            return res.status(401).send({message: "Invalid Password!"});
        }

            const token = jwt.sign(
                { id: user.id },
                config.secret,
                { expiresIn: 86400 } // 24 hours
            );

            res.status(200).send({
                id: user._id,
                username: user.username,
                email: user.email,
                roles: user.roles,
                image: user.image,
                phone: user.phone,
                address: user.address,
                accessToken: token
            });
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "Some error occurred while signing in." });
        });
};

function mCheckEmailExists(email){

}
