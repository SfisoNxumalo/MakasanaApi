const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs");
const Customer = require("../models/customer");

const jwt_secretKey = process.env.JWT_SK
exports.signup = (req, res) =>
{

    res.set({
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
        "Access-Control-Allow-Headers": "'Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token'",
    });
    
    const { name, email, address, phone, password} = req.body;

    if(!name || !email || !address || !phone || !password){
        return res.send(400).json({message: "Missing values"})
    }

    Customer.findOne({email}).then((userFound) => {
        if(!userFound){
            const user = new Customer({
                name,
                email,
                phone,
                address,
                password: bcrypt.hashSync(req.body.password, 8)
            });
        
            user.save().then(message => {
                return res.status(200).json({message: "Account Created"});
        
            }).catch(err => {
                return res.status(300).json(err);
            })
           
        }
        else{
            return res.status(409).json({message: "Email address already in use"})
        }
       })

    //    return res.status(400).json({message: "Email address already in use"})
};


exports.signin = (req, res) => {

    const { email, password} = req.body;

    if( !email || !password){
        return res.send(401).json({message: "Missing values"})
    }

    Customer.findOne({email})
    .then(user => {
        if (!user) {
            return res.status(401).json({ message: "User Not found" });
        }

        const passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        );

        if (!passwordIsValid) {
            return res.status(401).json({message: "Invalid Password!"});
        }

            const token = jwt.sign(
                { id: user.id },
                jwt_secretKey,
                { expiresIn: "2h" }
            );

            res.status(200).json({
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                image: user.image,
                phone: user.phone,
                address: user.address,
                accessToken: token
            });
        })
        .catch(err => {
            return res.status(500).send({ message: err.message || "Some error occurred while signing in." });
        });



    // User.findOne({
    //     email: req.body.email
    // })
    //     .populate("roles", "-__v")
    //     .then(user => {
    //         if (!user) {
    //             return res.status(404).send({ message: "User Not found" });
    //         }

    //         const passwordIsValid = bcrypt.compareSync(
    //             req.body.password,
    //             user.password
    //         );

    //         if (!passwordIsValid) {
    //             return res.status(401).send({
    //                 accessToken: null,
    //                 message: "Invalid Password!"
    //             });
    //         }

    //         const token = jwt.sign(
    //             { id: user.id },
    //             config.secret,
    //             { expiresIn: 86400 } // 24 hours
    //         );

    //         const authorities = user.roles.map(role => "ROLE_" + role.name.toUpperCase());

    //         res.status(200).send({
    //             id: user._id,
    //             username: user.username,
    //             email: user.email,
    //             roles: user.roles,
    //             image: user.image,
    //             phone: user.phone,
    //             address: user.address,
    //             authorities: authorities,
    //             accessToken: token
    //         });
    //     })
    //     .catch(err => {
    //         res.status(500).send({ message: err.message || "Some error occurred while signing in." });
    //     });
};
