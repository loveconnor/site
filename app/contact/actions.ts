"use server";

import { engagements } from "@/lib/site";

const fields = ["name", "email", "company", "link", "engagement", "description", "budget", "timing"] as const;

type Field = (typeof fields)[number];

export type InquiryState = {
  status: "idle" | "success" | "error";
  errors?: Partial<Record<"name" | "email" | "description", string>>;
  message?: string;
  values?: Partial<Record<Field, string>>;
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function submitInquiry(_: InquiryState, formData: FormData): Promise<InquiryState> {
  const values = Object.fromEntries(
    fields.map((field) => [field, String(formData.get(field) ?? "").trim().slice(0, 5000)]),
  ) as Record<Field, string>;

  // Honeypot: real visitors never see or fill this field.
  if (formData.get("company_website")) return { status: "success" };

  const errors: InquiryState["errors"] = {};
  if (!values.name) errors.name = "Please add your name.";
  if (!EMAIL.test(values.email)) errors.email = "Please check the email address.";
  if (!values.description) errors.description = "Please add a little context about the work.";
  if (Object.keys(errors).length) return { status: "error", errors, values };

  const delivered = await deliver(values);
  if (!delivered) {
    return {
      status: "error",
      message: "Your details could not be sent. Please try again. Your answers are still here.",
      values,
    };
  }
  return { status: "success" };
}

async function deliver(values: Record<Field, string>) {
  const engagement = engagements.find((item) => item.id === values.engagement)?.label ?? "Not specified";
  const text = [
    `Name: ${values.name}`,
    `Email: ${values.email}`,
    `Company or project: ${values.company || "—"}`,
    `Link: ${values.link || "—"}`,
    `Engagement: ${engagement}`,
    `Budget: ${values.budget || "—"}`,
    `Timing: ${values.timing || "—"}`,
    "",
    values.description,
  ].join("\n");

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.INQUIRY_TO_EMAIL;

  if (!apiKey || !to) {
    // Without a configured provider, only development may treat a logged inquiry as received.
    if (process.env.NODE_ENV === "development") {
      console.info(`[inquiry] Delivery is not configured. Received:\n${text}`);
      return true;
    }
    console.error("[inquiry] RESEND_API_KEY and INQUIRY_TO_EMAIL must be set to deliver inquiries.");
    return false;
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.INQUIRY_FROM_EMAIL || "Moirel Studio <onboarding@resend.dev>",
        to,
        reply_to: values.email,
        subject: `New inquiry: ${values.company || values.name} (${engagement})`,
        text,
      }),
    });
    if (!response.ok) console.error(`[inquiry] Delivery failed with status ${response.status}.`);
    return response.ok;
  } catch (error) {
    console.error("[inquiry] Delivery failed.", error);
    return false;
  }
}
