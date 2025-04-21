import nodemailer from "nodemailer";
import Mailgen from "mailgen";

const ForgetEmail = async(name: string, email: string, token: string)=>{
    try{
        let config = {
            service: "gmail",
            auth: {
                user: process.env.user_email,
                pass: process.env.user_password
            }
        }
        let transporter = nodemailer.createTransport(config);
        let MailGenerator = new Mailgen({
            theme: "default",
            product: {
                name: "Bachelor TBS",
                link: "https://mailgen.js/"
            }
        });
        let response = {
            body: {
                name: name,
                intro: "You have received this email because a password reset request for your account was received.",
                action: {
                    instructions: "Click the button below to reset your password:",
                    button: {
                        color: "#667eea",
                        text: "Reset Password",
                        link: `http://localhost:5173/${token}`
    
                    }
                },
            outro: 'If you did not request a password reset, no further action is required on your part.'
            }
        };
        let mail  = MailGenerator.generate(response);
        let message = {
            from : process.env.user_email,
            to: email,
            subject: "Password Reset",
            html: mail
        }
        let send_maail = await transporter.sendMail(message);
        return send_maail;
    }catch(err: any){
        return err;
    }
}
export default ForgetEmail;
