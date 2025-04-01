import nodemailer from 'nodemailer';
import User from "@/models/userModel";
import bcryptjs from 'bcryptjs';
// call sendmail through transporter
// async because sending mail takes time

export const sendEmail = async({email, emailType, userId}:any) => {
    try {
        // create a hased token there is genrally no need for hashedToken simple token can be done  using uuid
        // uuid does not have special char where as hashing using bcryptjs has special char.
        const hashedToken = await bcryptjs.hash(userId.toString(), 10)

        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId, 
                {verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000})
        } else if (emailType === "RESET"){
            await User.findByIdAndUpdate(userId, 
                {forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000})
        }

        // using mailtrap
        //  it is a dummy SMTP server that allows you to test and debug emails without actually 
        // sending them to real users. 
        const transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "3e9f578b1cd8bd",
                pass: "de373bfaa27c23"
            }
        });


        const mailOptions = {
            from: 'akib.m@mail.com',
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`
        }

        const mailresponse = await transport.sendMail(mailOptions);
        return mailresponse;

    } catch (error:any) {
        throw new Error(error.message);
    }
}