import { createServerFn } from '@tanstack/react-start';
import nodemailer from 'nodemailer';
import { z } from 'zod';

type VerificationEmailData = {
  to: string;
  subject: string;
  text: string;
};

const verificationEmailSchema = z.object({
  to: z.email({ message: 'Invalid verification email address' }),
  subject: z.string().min(1, 'Verification subject is required'),
  text: z.string().min(1, 'Verification text is required'),
});

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  secure: true,
  port: 465,
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendSignUpVerificationEmail = async (data: VerificationEmailData) => {
  const res = await transporter.sendMail({
    from: process.env.EMAIL_ADDRESS,
    to: data.to,
    subject: data.subject,
    text: data.text,
  });
  return res;
};

export const sendSignUpVerificationEmailFn = createServerFn({ method: 'POST' })
  .inputValidator((data: VerificationEmailData) => verificationEmailSchema.parse(data))
  .handler(async (ctx) => {
    return await sendSignUpVerificationEmail(ctx.data);
  });
