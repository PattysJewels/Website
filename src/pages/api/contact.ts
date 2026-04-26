export const prerender = false;

import type { APIRoute } from 'astro';
import { Resend } from 'resend';

export const POST: APIRoute = async ({ request, redirect }) => {
  const resend = new Resend(import.meta.env.RESEND_API_KEY);

  const data = await request.formData();

  const fullName = data.get('full_name')?.toString() ?? '';
  const email = data.get('email')?.toString() ?? '';
  const phone = data.get('phone_number')?.toString() ?? '';
  const topic = data.get('topic')?.toString() ?? '';
  const message = data.get('message')?.toString() ?? '';

  const fromEmail = import.meta.env.RESEND_FROM_EMAIL ?? 'onboarding@resend.dev';
  const toEmail = import.meta.env.RESEND_TO_EMAIL ?? 'jewelsbypatty@gmail.com';

  // Email to Patty
  const { error } = await resend.emails.send({
    from: fromEmail,
    to: toEmail,
    replyTo: email,
    subject: `Message from ${fullName} — ${topic}`,
    html: `
      <h2 style="font-family:Georgia,serif;color:#b8922a;">New Message</h2>

      <table style="border-collapse:collapse;width:100%;font-family:Arial,sans-serif;font-size:14px;">
        <tr><td style="padding:6px 12px 6px 0;color:#666;width:120px;">Name</td><td style="padding:6px 0;">${fullName}</td></tr>
        <tr><td style="padding:6px 12px 6px 0;color:#666;">Email</td><td style="padding:6px 0;"><a href="mailto:${email}">${email}</a></td></tr>
        <tr><td style="padding:6px 12px 6px 0;color:#666;">Phone</td><td style="padding:6px 0;">${phone || '—'}</td></tr>
        <tr><td style="padding:6px 12px 6px 0;color:#666;">Topic</td><td style="padding:6px 0;">${topic}</td></tr>
      </table>

      <h3 style="font-family:Georgia,serif;margin-top:1.5rem;">Message</h3>
      <p style="font-family:Arial,sans-serif;font-size:14px;white-space:pre-wrap;">${message}</p>

      <hr style="margin-top:2rem;border:none;border-top:1px solid #e5d9c0;" />
      <p style="font-family:Arial,sans-serif;font-size:12px;color:#999;">Sent from the contact form at jewelsbypatty.com</p>
    `,
  });

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }

  // Confirmation email to sender
  await resend.emails.send({
    from: fromEmail,
    to: email,
    subject: `We got your message — Patty's Jewels`,
    html: `
      <h2 style="font-family:Georgia,serif;color:#b8922a;">Got it, ${fullName}.</h2>
      <p style="font-family:Arial,sans-serif;font-size:15px;line-height:1.7;color:#333;">
        Your message has been received. Patty will get back to you within 1–3 business days.
      </p>
      <p style="font-family:Arial,sans-serif;font-size:15px;line-height:1.7;color:#333;">
        If it's urgent, you can reach Patty directly at <a href="tel:3014564494" style="color:#b8922a;">(301) 456-4494</a> or reply to this email.
      </p>
      <hr style="margin:2rem 0;border:none;border-top:1px solid #e5d9c0;" />
      <p style="font-family:Georgia,serif;font-size:1rem;color:#b8922a;">Patty's Jewels</p>
      <p style="font-family:Arial,sans-serif;font-size:12px;color:#999;">Baltimore, Maryland · jewelsbypatty.com</p>
    `,
  });

  return redirect('/order-sent', 302);
};
