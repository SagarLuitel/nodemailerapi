const express = require('express')
const app = express()
const dotenv = require ('dotenv')
dotenv.config()
app.use(express.json())

const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: process.env.CLIENT_EMAIL,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN
    }
})

transporter.verify((error,success) =>{
    if(error){
        console.log(error)
    }else
        console.log("ready to send email")
})

app.post('/sendEmail',(req,res)=>{
    const {to,subject,message} = req.body
    const mail = {
        from:process.env.CLIENT_EMAIL,
        to: to,
        subject: subject,
        text: message
    }

    transporter.sendMail(mail).then(result=>{
        res.json({
            status: "Success",
            message: "Mail sent successfully"
        })
    }).catch(err=>{
            res.json("cannot send data")
        })

    
})

app.listen(4040)