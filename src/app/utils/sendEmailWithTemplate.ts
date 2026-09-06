import ejs from "ejs";
import path from 'path';
import nodemailer from 'nodemailer';
import config from '../config';

export const sendEmailWithTemplate = async (
    to: string,
    subject: string,
    templateName: string,
    data: Record<string, any>
): Promise<void> => {

    const templatePath = path.join(process.cwd(), `src/app/templates/${templateName}.ejs`);
    const html = await ejs.renderFile(templatePath, data);

    const transporter = nodemailer.createTransport({
        host: config.smtp.host,
        port: Number(config.smtp.port),
        secure: false,
        auth: {
            user: config.smtp.user,
            pass: config.smtp.password
        }
    });

    if (config.env === "development") {
        transporter.verify((error) => {
            if (error) {
                console.error("SMTP Connection Error:", error.message);
            } else {
                console.log("SMTP Server Ready to send emails");
            };
        });
    };

    await transporter.sendMail({
        from: `"CodeShift" <${config.smtp.user}>`,
        to,
        subject,
        html
    });
};