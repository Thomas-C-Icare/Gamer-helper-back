// const nodemailer = require("nodemailer")

// const autoMail = {
//     emailDeleteConfirmation: async () => {
       

//         let transporter = nodemailer.createTransport({
//             host: "smtp-relay.gmail.com.",
//             port: 587,
//             secure: true,
//             auth: {
//                 user: "thomas.campo@gmail.com", 
//                 pass: process.env.MAIL_MDP,
//             }
//         })
//         let info = await transporter.sendMail({
//             from: '"Fred Foo 👻" <thomas.campo08@gmail.com>', // sender address
//             to: "thomas.campo08+18@gmail.com", // list of receivers
//             subject: "Hello ✔", // Subject line
//             text: "Hello world?", // plain text body
//             html: "<b>Hello world?</b>", // html body
//           });
//           console.log("Message sent: %s", info.messageId);
//     }
    
// }
// autoMail.emailDeleteConfirmation().catch(console.error);

// module.exports = autoMail;

"use strict";
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
async function sendingMail(token) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <noreply@gamerhelper.com>', // sender address
    to: "test@example.com", // list of receivers
    subject: "Delete account :(", // Subject line
    text: "", // plain text body
    html: `<b>
    We're sorry to see you go !
    Number to insert : ${token}</b>`, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

sendingMail().catch(console.error);

module.exports = sendingMail;