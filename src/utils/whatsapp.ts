export async function sendWhatsAppMessage(message: string) {
  const token = process.env.WHATSAPP_TOKEN!;
  const phoneId = process.env.WHATSAPP_PHONE_ID!;
  const receiver = process.env.WHATSAPP_RECEIVER!;

  const url = `https://graph.facebook.com/v21.0/${phoneId}/messages`;

  const payload = {
    messaging_product: "whatsapp",
    to: receiver,
    type: "text",
    text: { body: message },
  };

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error("WhatsApp send failed:", err);
    throw new Error("Failed to send WhatsApp alert");
  }
}

export const whatsAppLink = () => {
  const phoneNumber = process.env.NEXT_PUBLIC_SITE_WHATSAPP || "";
  const message = process.env.NEXT_PUBLIC_SITE_WHATSAPP_MESSAGE || "";

  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  return whatsappLink;
};
