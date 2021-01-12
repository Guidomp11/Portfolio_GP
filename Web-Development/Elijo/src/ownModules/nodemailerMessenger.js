const nodemailer = require('nodemailer');

function setMailOptions(body){
    if(body.email){

    }
}

function nodemailerMessenger(body){
    let transporter = nodemailer.createTransport({
        host: "plesk.ar.conectemos.com",
        port: 25,
        auth: {
          user: process.env.NODEMAILER_USER,
          pass: process.env.NODEMAILER_PASS
        }
    });
    let mailOptions = {
        from: body.fromEmail,
        to: body.toEmail,
        subject: (body.affair != '') ? body.affair : 'Cuenta Elijo.org',
        text: (body.request != null || req.body.request != '') ? body.request : 'Ups! este mail esta vacio',
        html: (body.htmlContent != null) ? body.htmlContent : ''
    };
      
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
    }); 
}

module.exports = nodemailerMessenger;