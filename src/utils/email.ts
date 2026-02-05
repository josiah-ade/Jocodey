import { resend } from "@/lib/resend";

interface ContactEmailOptions {
  name: string;
  email: string;
  phone?: string | null;
  subject?: string | null;
  message: string;
}

// Sends admin notification email
export async function sendContactNotificationEmail(data: ContactEmailOptions) {
  const { name, email, phone, subject, message } = data;

  const html = `
    <h2>New Contact Form Submission</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Phone:</strong> ${phone || "N/A"}</p>
    <p><strong>Subject:</strong> ${subject || "N/A"}</p>
    <p><strong>Message:</strong></p>
    <p>${message}</p>
  `;

  await resend.emails.send({
    from: "Jocodey <noreply@skycytrack.com>", // Replace with verified domain later
    to: "skylabsdigital101@gmail.com", // Replace with your admin email
    subject: `New Contact Message from ${name}`,
    html,
  });
}

// Optionally send a confirmation to the user
export async function sendContactConfirmationEmail(data: ContactEmailOptions) {
  const { name, email } = data;

  const html = `
    <p>Hi ${name},</p>
    <p>Thanks for reaching out! We've received your message and will get back to you shortly.</p>
    <p>— The Team</p>
  `;

  await resend.emails.send({
    from: "Jocodey <noreply@skycytrack.com>",
    to: email,
    subject: "We received your message!",
    html,
  });
}
