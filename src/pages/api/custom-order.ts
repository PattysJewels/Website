export const prerender = false;

import type { APIRoute } from 'astro';
import { Resend } from 'resend';

export const POST: APIRoute = async ({ request, redirect }) => {
  const resend = new Resend(import.meta.env.RESEND_API_KEY);

  const data = await request.formData();

  const fullName = data.get('full_name')?.toString() ?? '';
  const email = data.get('email')?.toString() ?? '';
  const phone = data.get('phone_number')?.toString() ?? '';
  const preferredContact = data.get('preferred_contact_method')?.toString() ?? '';
  const pieceType = data.get('piece_type')?.toString() ?? '';
  const quantity = data.get('quantity')?.toString() ?? '';
  const earringHook = data.get('earring_hook_style')?.toString() ?? '';
  const charm = data.get('charm_pendant')?.toString() ?? '';
  const clasp = data.get('necklace_clasp')?.toString() ?? '';
  const necklaceLength = data.get('necklace_length')?.toString() ?? '';
  const braceletSize = data.get('bracelet_size')?.toString() ?? '';
  const metalFinish = data.get('metal_finish')?.toString() ?? '';
  const notes = data.get('notes')?.toString() ?? '';

  const fromEmail = import.meta.env.RESEND_FROM_EMAIL ?? 'onboarding@resend.dev';
  const toEmail = import.meta.env.RESEND_TO_EMAIL ?? 'jewelsbypatty@gmail.com';

  // Email to Patty
  const { error } = await resend.emails.send({
    from: fromEmail,
    to: toEmail,
    replyTo: email,
    subject: `New Custom Order — ${fullName}`,
    html: `
      <h2 style="font-family:Georgia,serif;color:#b8922a;">New Custom Order Request</h2>

      <h3 style="font-family:Georgia,serif;margin-top:1.5rem;">Contact</h3>
      <table style="border-collapse:collapse;width:100%;font-family:Arial,sans-serif;font-size:14px;">
        <tr><td style="padding:6px 12px 6px 0;color:#666;width:180px;">Name</td><td style="padding:6px 0;">${fullName}</td></tr>
        <tr><td style="padding:6px 12px 6px 0;color:#666;">Email</td><td style="padding:6px 0;"><a href="mailto:${email}">${email}</a></td></tr>
        <tr><td style="padding:6px 12px 6px 0;color:#666;">Phone</td><td style="padding:6px 0;">${phone || '—'}</td></tr>
        <tr><td style="padding:6px 12px 6px 0;color:#666;">Preferred Contact</td><td style="padding:6px 0;">${preferredContact}</td></tr>
      </table>

      <h3 style="font-family:Georgia,serif;margin-top:1.5rem;">The Piece</h3>
      <table style="border-collapse:collapse;width:100%;font-family:Arial,sans-serif;font-size:14px;">
        <tr><td style="padding:6px 12px 6px 0;color:#666;width:180px;">Jewelry Type</td><td style="padding:6px 0;">${pieceType}</td></tr>
        <tr><td style="padding:6px 12px 6px 0;color:#666;">Quantity</td><td style="padding:6px 0;">${quantity}</td></tr>
      </table>

      <h3 style="font-family:Georgia,serif;margin-top:1.5rem;">Selections</h3>
      <table style="border-collapse:collapse;width:100%;font-family:Arial,sans-serif;font-size:14px;">
        <tr><td style="padding:6px 12px 6px 0;color:#666;width:180px;">Earring Hook</td><td style="padding:6px 0;">${earringHook || '—'}</td></tr>
        <tr><td style="padding:6px 12px 6px 0;color:#666;">Charm / Letter</td><td style="padding:6px 0;">${charm || '—'}</td></tr>
        <tr><td style="padding:6px 12px 6px 0;color:#666;">Necklace Clasp</td><td style="padding:6px 0;">${clasp || '—'}</td></tr>
        <tr><td style="padding:6px 12px 6px 0;color:#666;">Necklace Length</td><td style="padding:6px 0;">${necklaceLength || '—'}</td></tr>
        <tr><td style="padding:6px 12px 6px 0;color:#666;">Bracelet Size</td><td style="padding:6px 0;">${braceletSize || '—'}</td></tr>
        <tr><td style="padding:6px 12px 6px 0;color:#666;">Color / Finish</td><td style="padding:6px 0;">${metalFinish || '—'}</td></tr>
      </table>

      ${notes ? `
      <h3 style="font-family:Georgia,serif;margin-top:1.5rem;">Notes</h3>
      <p style="font-family:Arial,sans-serif;font-size:14px;white-space:pre-wrap;">${notes}</p>
      ` : ''}

      <hr style="margin-top:2rem;border:none;border-top:1px solid #e5d9c0;" />
      <p style="font-family:Arial,sans-serif;font-size:12px;color:#999;">Sent from the custom order form at jewelsbypatty.com</p>
    `,
  });

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }

  // Confirmation email to customer
  await resend.emails.send({
    from: fromEmail,
    to: email,
    subject: `We received your order request — Patty's Jewels`,
    html: `
      <h2 style="font-family:Georgia,serif;color:#b8922a;">We got your request, ${fullName}.</h2>
      <p style="font-family:Arial,sans-serif;font-size:15px;line-height:1.7;color:#333;">
        Thank you for reaching out to Patty's Jewels. Your custom order request has been received and Patty will follow up with you within 1–3 business days to confirm details and pricing.
      </p>
      <p style="font-family:Arial,sans-serif;font-size:15px;line-height:1.7;color:#333;">
        If you have any questions in the meantime, you can reach Patty directly at <a href="tel:3014564494" style="color:#b8922a;">(301) 456-4494</a> or reply to this email.
      </p>
      <hr style="margin:2rem 0;border:none;border-top:1px solid #e5d9c0;" />
      <p style="font-family:Georgia,serif;font-size:1rem;color:#b8922a;">Patty's Jewels</p>
      <p style="font-family:Arial,sans-serif;font-size:12px;color:#999;">Baltimore, Maryland · jewelsbypatty.com</p>
    `,
  });

  return redirect('/order-sent', 302);
};
