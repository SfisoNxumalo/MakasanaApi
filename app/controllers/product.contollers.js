
exports.createProduct =(req, res)=>{
    const { username, industry, email, address, phoneNumber} =req.body
    const user = new User({
        username,
        email,
        industry,
        phoneNumber,
        address,
        password: bcrypt.hashSync(req.body.password, 8)
    });

}