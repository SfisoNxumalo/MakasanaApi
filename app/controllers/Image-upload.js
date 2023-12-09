const fileUpload = require('express-fileupload')
const AWS = require('aws-sdk');
require("dotenv").config()
const express = require('express');

const app = express();

app.use(fileUpload())


// exports.UploadImage = (req, res) =>{
//     // AWS.config.update({
//     //     accessKeyId: process.env.AWS_ACCESS_KEY,
//     //     secretAccessKey: process.env.AWS_SECRET_KEY,
//     //     region: process.env.AWS_REGION
//     // })

//     // console.log(process.env.PORT)
//     // console.log(process.env.AWS_ACCESS_KEY)
//     // console.log(process.env.AWS_SECRET_KEY)
//     // console.log(process.env.AWS_REGION)
//     // console.log(process.env.AWS_BUCKET)

//     // return res.send("Done")

//     const s3 = new AWS.S3();

//     const User = req.body.user

//     const fileContent = Buffer.from(req.files.data.data, "Binary");

//     const params = {
//         Bucket: process.env.AWS_BUCKET,
//         Key: req.files.data.name,
//         Body: fileContent
//     }

//     res.send({
//         "sentBy":User,
//         "Sent": req.files.data.name
//     })

//     // s3.upload(params, (err, data) => {
//     //     if(err){
//     //         throw err;
//     //     }

//     //     res.send({
//     //         "response_code":2000,
//     //         "response_message": "Success",
//     //         "response_data":data,
//     //     })
//     // })
// }


exports.UploadImage = async (fileImage) => {
    console.log("IN")
    AWS.config.update({
        accessKeyId: process.env.AWS_AKEY,
        secretAccessKey: process.env.AWS_SKEY,
        region: process.env.AWS_REGION
    })

    const s3 = new AWS.S3();

    const fileContent = Buffer.from(fileImage.data, "Binary");

    const params = {
        Bucket: process.env.AWS_BUCKET,
        Key: fileImage.name,
        Body: fileContent
    }

   return await s3.upload(params).promise()
}