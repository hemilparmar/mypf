const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const path = require("path");
const router = express.Router();

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname + "/index.html"));
});
app.get("/aboutme", function (req, res) {
  res.sendFile(path.join(__dirname + "/about.html"));
});
app.get("/contactme", function (req, res) {
  res.sendFile(path.join(__dirname + "/contact.html"));
});

app.post("/", (req, res) => {
  //   res.send(`Full name is:${req.body.email} ${req.body.subject} ${req.body.msg}.`);
  
  const email = req.body.email;
  const mono = req.body.mono;
  const msg = req.body.msg;
  const subject = req.body.subject
  const fname = req.body.fname
  const lname = req.body.lname
  console.log(fname, lname, email, mono, msg, subject);

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: false,
    service: "gmail",
    type: "OAuth2",
    auth: {
      user: process.env.EMAIL,
      pass: "ucqgquiqwxhogdvt",
      client_id:
        "322815258003-73kcvvp03c25nh36ec5hjvp9eht4585c.apps.googleusercontent.com",
      project_id: "sapient-ground-360616",
      auth_uri: "https://accounts.google.com/o/oauth2/auth",
      token_uri: "https://oauth2.googleapis.com/token",
      auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
      client_secret: "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",
    },
  });

  const mailOptions = {
    from: "hptaken2000@gmail.com",
    to: "hptaken2000@gmail.com",
    subject: `${subject}`,
    text: `First Name : ${fname}\nLast Name : ${lname}\nEmail : ${email}\nSubject : ${subject}\nMobile Number : ${mono}\nMessage : ${msg}\n\nThank You\n\nRegards,\n  ${fname}`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });

  res.sendFile(path.join(__dirname + "/index.html"));
});

const port = 3000;

app.listen(port, () => {
  console.log(`Server running on port${port}`);
});

// console.log(process.env.EMAIL);
// 322815258003-73kcvvp03c25nh36ec5hjvp9eht4585c.apps.googleusercontent.com
// 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

// ucqgquiqwxhogdvt
// ucqgquiqwxhogdvt
