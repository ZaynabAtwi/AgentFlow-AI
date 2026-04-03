import { Resend } from "resend";
import Twilio from "twilio";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

const twilioClient =
  process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN
    ? Twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)
    : null;

export async function sendOutreach(email: string | null, phone: string | null, subject: string, emailBody: string, smsBody: string) {
  if (email && resend) {
    await resend.emails.send({
      from: "AgentFlow <hello@agentflow.ai>",
      to: email,
      subject,
      html: `<p>${emailBody}</p>`,
    });
  }

  if (phone && twilioClient && process.env.TWILIO_FROM_NUMBER) {
    await twilioClient.messages.create({
      body: smsBody,
      from: process.env.TWILIO_FROM_NUMBER,
      to: phone,
    });
  }
}
