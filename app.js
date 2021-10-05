var nodemailer = require("nodemailer");
const dotenv = require('dotenv')
dotenv.config()

var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        type: 'OAuth2',
        user: process.env.CLIENT_EMAIL,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN
    }
});


var mail = {
    from: "process.env.CLIENT_EMAIL",   //Sender email address
    to: "process.env.CLIENT_EMAIL", //receiver email address
    subject: "Registration successful",
    text: "You successfully registered an account at www.mydomain.com",
    html: "<p>You successfully registered an account at www.mydomain.com</p>"
}

transporter.sendMail(mail, function(err, info) {
    if (err) {
        console.log(err);
    } else {
        // see https://nodemailer.com/usage
        console.log("info.messageId: " + info.messageId);
        console.log("info.envelope: " + info.envelope);
        console.log("info.accepted: " + info.accepted);
        console.log("info.rejected: " + info.rejected);
        console.log("info.pending: " + info.pending);
        console.log("info.response: " + info.response);
    }
    transporter.close();
});