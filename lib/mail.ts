import { createTransport, getTestMessageUrl } from 'nodemailer';
import endpoint from "../utils/endpoints";

const transport = createTransport({
  host: endpoint.mailHost,
  port: endpoint.mailPort,
  auth: {
    user: endpoint.mailUser,
    pass: endpoint.mailPassword,
  },
});

function makeANiceEmail(text: string): string {
  return `
    <div style="
      border: 1px solid black;
      padding: 20px;
      font-family: sens-serif;
      line-height: 2;
      font-size: 20px;
    ">
      <h2>Hello There!</h2>
      <p>${text}</p>
      <p> Angus Bezzina</p>
    </div>
  `;
}

interface Envelope {
  from: string;
  to: string[];
}

interface MailResponse {
  accepted?: string[] | null;
  rejected?: null[] | null;
  envelopeTime: number;
  messageTime: number;
  messageSize: number;
  response: string;
  envelope: Envelope;
  messageId: string;
}

export async function sendPasswordResetEmail(
  resetToken: string,
  to: string
): Promise<void> {
  // Email the user a token

  const info = (await transport.sendMail({
    to,
    from: 'angusbezzina@gmail.com',
    subject: 'Your password reset token!',
    html: makeANiceEmail(`Your password reset token is here!
      <a href="${endpoint.frontendUrl}/reset?token=${resetToken}">Click here to reset</a>
    `),
  })) as MailResponse;

  if (endpoint.mailUser.includes('ethereal.email')) {
    console.log(`📩 Message Sent! Preview it at ${getTestMessageUrl(info)}`);
  }
}
