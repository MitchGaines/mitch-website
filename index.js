let express = require('express');
let bodyParser = require('body-parser');
let dotenv = require('dotenv').config({ path: 'private.env' })
const nodemailer = require('nodemailer');

let app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));

app.set('view engine', 'ejs');
app.use(express.static("public"));

app.get('/', function(req, res) {
    res.render('pages/index');
});

app.get('/humedales', function(req, res) {
    res.redirect('https://www.google.com');
});

app.post('/email', function(req, res) {
    let name = req.body.name;
    let from_email = req.body.email;
    let mail_subject = req.body.mail_subject;
    let message = req.body.comments;

    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'jfjcw6z7qrgdnmfg@ethereal.email',
            pass: process.env.SMTP_PASS
        }
    });

    let mailOptions = {
        from: from_email, // sender address
        to: 'gainesmitch2@gmail.com', // list of receivers
        subject: name + ' | ' + mail_subject, // Subject line
        text: message, // plain text body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        res.redirect('/')
    });
});

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running`);
});
