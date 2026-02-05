"use server";

import { prisma } from "@/lib/prisma";
import {
  sendContactConfirmationEmail,
  sendContactNotificationEmail,
} from "@/utils/email";
import { sendWhatsAppMessage } from "@/utils/whatsapp";

export async function submitContactForm(formData: FormData) {
  try {
    const name = formData.get("name")?.toString();
    const email = formData.get("email")?.toString();
    const phone = formData.get("phone")?.toString();
    const subject = formData.get("subject")?.toString();
    const message = formData.get("message")?.toString();

    if (!name || !email || !message) {
      throw new Error("Please fill all required fields");
    }

    const alert = `New Contact Message:
    Name: ${name}
    Email: ${email}
    Phone: ${phone || "N/A"}
    Subject: ${subject || "N/A"}
    Message: ${message}`;

    // await sendWhatsAppMessage(alert);

    await sendContactNotificationEmail({
      name,
      email,
      phone,
      subject,
      message,
    });
    await sendContactConfirmationEmail({
      name,
      email,
      phone,
      subject,
      message,
    });

    await prisma.contactMessage.create({
      data: {
        name,
        email,
        phone: phone || "",
        subject: subject || "",
        message,
      },
    });

    return { success: true, message: "Message sent successfully!" };
  } catch (error: any) {
    console.error(error);
    return { success: false, message: "Something went wrong" };
  }
}
