    const nodemailer = require('nodemailer');

    const sendEmail = (email, password) => {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'sadirovhafiz06@gmail.com',
                pass: 'jovo hczy ogcs udal', // Ваш пароль для доступа к почте
            },
        });

        const mailOptions = {
            from: 'sadirovhafiz06@gmail.com',
            to: email,
            subject: 'Your account password',
            text: `Your password is: ${password}`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('Error sending email:', error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    };

    module.exports = { sendEmail };
