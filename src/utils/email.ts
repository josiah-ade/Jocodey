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

  const safeMessage = message.replace(/</g, "&lt;").replace(/>/g, "&gt;");

  const html = `
<!DOCTYPE html>
<html>
  <body style="margin:0;padding:0;background:#f5f7fb;font-family:Arial,Helvetica,sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center" style="padding:40px 16px;">
          <table width="100%" style="max-width:600px;background:#ffffff;border-radius:8px;overflow:hidden;">
            
            <!-- Header -->
            <tr>
              <td style="background:#0f172a;padding:20px 24px;text-align:center;">
              <img
                src="https://jocodey.com/img/logo/white.png"
                alt="Jocodey"
                width="120"
                style="display:block;margin:0 auto 8px;"
              />
              <h2 style="margin:0;font-size:20px;color:#ffffff;">
                New Contact Message
              </h2>
            </td>
            </tr>

            <!-- Content -->
            <tr>
              <td style="padding:24px;color:#334155;font-size:14px;line-height:1.6;">
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${phone || "N/A"}</p>
                <p><strong>Subject:</strong> ${subject || "N/A"}</p>

                <hr style="border:none;border-top:1px solid #e5e7eb;margin:20px 0;" />

                <p style="margin-bottom:8px;"><strong>Message:</strong></p>
                <p style="white-space:pre-line;">${safeMessage}</p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="background:#f8fafc;padding:16px 24px;color:#64748b;font-size:12px;">
                This email was sent from the contact form on <strong>jocodey.com</strong>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`;

  await resend.emails.send({
    from: "Jocodey <noreply@mail.jocodey.com>", // Replace with verified domain later
    to: "skylabsdigital101@gmail.com", // Replace with your admin email
    replyTo: email,
    subject: `New Contact Message from ${name}`,
    html,
  });
}

// Optionally send a confirmation to the user
export async function sendContactConfirmationEmail(data: ContactEmailOptions) {
  const { name, email } = data;

  const html = `
<!DOCTYPE html>
<html>
  <body style="margin:0;padding:0;background:#f5f7fb;font-family:Arial,Helvetica,sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center" style="padding:40px 16px;">
          <table width="100%" style="max-width:600px;background:#ffffff;border-radius:8px;overflow:hidden;">

            <!-- Header -->
            <tr>
              <td style="background:#0f172a;padding:20px 24px;text-align:center;">
              <img
                src="https://jocodey.com/img/logo/white.png"
                alt="Jocodey"
                width="120"
                style="display:block;margin:0 auto 8px;"
              />
              <h2 style="margin:0;font-size:20px;color:#ffffff;">
                New Contact Message
              </h2>
            </td>
            </tr>

            <!-- Content -->
            <tr>
              <td style="padding:24px;color:#334155;font-size:14px;line-height:1.7;">
                <p>Hi <strong>${name}</strong>,</p>

                <p>
                  Thanks for reaching out to <strong>Jocodey</strong>!  
                  We’ve received your message and our team will get back to you shortly.
                </p>

                <p>
                  If your request is urgent, feel free to reply directly to this email.
                </p>

                <p style="margin-top:24px;">
                  Cheers,<br />
                  <strong>Jocodey Team</strong>
                </p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="background:#f8fafc;padding:16px 24px;color:#64748b;font-size:12px;text-align:center;">
                © ${new Date().getFullYear()} Jocodey. All rights reserved.
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`;

  await resend.emails.send({
    from: "Jocodey <noreply@mail.jocodey.com>",
    to: email,
    subject: "We received your message!",
    html,
  });
}
