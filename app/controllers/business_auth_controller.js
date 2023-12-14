const jwt_secretKey = process.env.JWT_SK
const jwt = require("jsonwebtoken")
var bcrypt = require("bcryptjs");
const Business = require("../models/business");


exports.signup = (req, res) =>
{
    const { name, industry, email, address, phone, password} = req.body;

    if(!name || !industry || !email || !address || !phone || !password){
        return res.send(400).json({message: "Missing values"})
    }

   Business.findOne({email}).then((userFound) => {
    if(!userFound){
        const user = new Business({
            name,
            email,
            industry,
            phone,
            address,
            password: bcrypt.hashSync(req.body.password, 8)
        });
    
        user.save().then(message => {
            return res.status(201).json({message:"Account Created"});
    
        }).catch(err => {
            return res.status(300).json({message:err});
        })
    }
    else{
        return res.status(409).json({message: "Email address already in use"})
    }
   })
    
};

exports.signin = (req, res) => {

    const { email, password} = req.body;

    if( !email || !password){
        return res.send(401).json({message: "Missing values"})
    }

    Business.findOne({email})
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
        console.log(jwt_secretKey)

            const token = jwt.sign(
                { id: user.id },
                jwt_secretKey,
                { expiresIn: "3h" } // 24 hours
            );

            res.status(200).send({
                id: user._id,
                username: user.name,
                email: user.email,
                role: user.role,
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
