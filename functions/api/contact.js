/**
 * Cloudflare Pages Function: /api/contact
 * Handles submissions from both the "Free Homepage Concept Intake Modal"
 * and the main Contact Form, sending email notifications via Resend API.
 */

function arrayBufferToBase64(buffer) {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  const chunkSize = 8192;
  for (let i = 0; i < len; i += chunkSize) {
    const chunk = bytes.subarray(i, Math.min(i + chunkSize, len));
    binary += String.fromCharCode.apply(null, chunk);
  }
  return btoa(binary);
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    const contentType = request.headers.get('content-type') || '';
    let data = {};
    let logoFile = null;

    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      for (const [key, value] of formData.entries()) {
        if (key === 'logo' && value instanceof File) {
          logoFile = value;
        } else {
          data[key] = typeof value === 'string' ? value.trim() : value;
        }
      }
    } else if (contentType.includes('application/json')) {
      data = await request.json();
    } else {
      const formData = await request.formData();
      for (const [key, value] of formData.entries()) {
        data[key] = typeof value === 'string' ? value.trim() : value;
      }
    }

    // Honeypot check (hidden website field for spam bots)
    // Note: For concept form, current website is named "currentWebsite" to avoid honeypot trigger
    if (data.website && !data.formType) {
      // Spam detected via honeypot
      return new Response(JSON.stringify({ ok: true, spam: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const formType = data.formType || 'contact';
    const name = data.name || 'Anonymous';
    const business = data.business || data.businessName || '';
    const email = data.email || '';
    const phone = data.phone || '';
    const currentWebsite = data.currentWebsite || data.website || '';
    const socials = data.socials || data.socialLinks || '';
    const message = data.message || data.details || data.goals || '';
    const referenceStyle = data.referenceStyle || '';
    const services = data.services || '';
    const timeline = data.timeline || '';

    // Validate required fields
    if (!email || !email.includes('@')) {
      return new Response(
        JSON.stringify({ ok: false, error: 'A valid email address is required.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Determine subject & form title
    const isConcept = formType === 'free-concept';
    const subject = isConcept
      ? `New Free Homepage Design Request: ${business ? business : name}`
      : `New Website Enquiry: ${name}${business ? ` (${business})` : ''}`;

    // Process logo attachment if present
    const attachments = [];
    if (logoFile && logoFile.size > 0) {
      const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/svg+xml'];
      if (!allowedTypes.includes(logoFile.type) && !logoFile.name.match(/\.(png|jpg|jpeg|webp|svg)$/i)) {
        return new Response(
          JSON.stringify({ ok: false, error: 'Logo must be an image (PNG, JPEG, WebP, or SVG).' }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
      }
      if (logoFile.size > 5 * 1024 * 1024) {
        return new Response(
          JSON.stringify({ ok: false, error: 'Logo file size exceeds 5MB limit.' }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
      }

      const fileBuffer = await logoFile.arrayBuffer();
      const base64Content = arrayBufferToBase64(fileBuffer);
      attachments.push({
        filename: logoFile.name || 'company-logo.png',
        content: base64Content,
      });
    }

    // Build responsive HTML email template
    const formattedSocials = socials
      ? escapeHtml(socials).replace(
          /(https?:\/\/[^\s]+)/g,
          '<a href="$1" target="_blank" style="color: #0284C7; text-decoration: underline;">$1</a>'
        )
      : 'None provided';

    const formattedWebsite = currentWebsite
      ? `<a href="${escapeHtml(currentWebsite.startsWith('http') ? currentWebsite : 'https://' + currentWebsite)}" target="_blank" style="color: #0284C7; text-decoration: underline;">${escapeHtml(currentWebsite)}</a>`
      : 'None (Brand new website)';

    const emailHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 24px; color: #0f172a; }
    .container { max-width: 620px; margin: 0 auto; background: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); }
    .header { background: linear-gradient(135deg, #0D9488 0%, #0284C7 100%); padding: 28px 24px; color: #ffffff; }
    .header h1 { margin: 0; font-size: 22px; font-weight: 700; }
    .header p { margin: 6px 0 0; font-size: 14px; opacity: 0.95; }
    .badge { display: inline-block; background: rgba(255,255,255,0.2); padding: 4px 10px; border-radius: 20px; font-size: 12px; font-weight: 600; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px; }
    .body-content { padding: 24px; }
    table { width: 100%; border-collapse: collapse; margin-top: 12px; }
    th, td { text-align: left; padding: 12px 14px; border-bottom: 1px solid #f1f5f9; font-size: 14px; }
    th { width: 35%; color: #64748b; font-weight: 600; background: #f8fafc; }
    td { color: #0f172a; word-break: break-word; }
    .message-box { background: #f8fafc; border-left: 4px solid #0284C7; padding: 16px; border-radius: 4px; margin-top: 16px; font-size: 14px; line-height: 1.6; color: #334155; white-space: pre-wrap; }
    .footer { padding: 16px 24px; background: #f8fafc; border-top: 1px solid #e2e8f0; font-size: 12px; color: #94a3b8; text-align: center; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="badge">${escapeHtml(isConcept ? 'Free Homepage Design Request' : 'Standard Website Enquiry')}</div>
      <h1>${escapeHtml(isConcept ? (business || name) : name)}</h1>
      <p>Submitted via marstersdigital.com</p>
    </div>
    <div class="body-content">
      <table>
        <tr>
          <th>Sender Name</th>
          <td><strong>${escapeHtml(name)}</strong></td>
        </tr>
        <tr>
          <th>Business Name</th>
          <td>${business ? `<strong>${escapeHtml(business)}</strong>` : '<em>Not specified</em>'}</td>
        </tr>
        <tr>
          <th>Email Address</th>
          <td><a href="mailto:${escapeHtml(email)}" style="color: #0284C7; font-weight: 600;">${escapeHtml(email)}</a></td>
        </tr>
        <tr>
          <th>Phone / WhatsApp</th>
          <td>${phone ? `<a href="tel:${escapeHtml(phone)}" style="color: #0284C7;">${escapeHtml(phone)}</a>` : '<em>Not provided</em>'}</td>
        </tr>
        <tr>
          <th>Current Website</th>
          <td>${formattedWebsite}</td>
        </tr>
        ${
          socials
            ? `<tr>
                <th>Social Media Links</th>
                <td>${formattedSocials}</td>
              </tr>`
            : ''
        }
        ${
          referenceStyle
            ? `<tr>
                <th>Preferred Style Reference</th>
                <td><strong style="color: #0D9488;">${escapeHtml(referenceStyle)}</strong></td>
              </tr>`
            : ''
        }
        ${
          services
            ? `<tr>
                <th>Services Selected</th>
                <td>${escapeHtml(services)}</td>
              </tr>`
            : ''
        }
        ${
          timeline
            ? `<tr>
                <th>Timeline</th>
                <td>${escapeHtml(timeline)}</td>
              </tr>`
            : ''
        }
        <tr>
          <th>Company Logo</th>
          <td>${
            attachments.length > 0
              ? `<strong>Attached (${escapeHtml(attachments[0].filename)})</strong>`
              : '<em>None uploaded</em>'
          }</td>
        </tr>
      </table>

      <h3 style="margin: 24px 0 8px; font-size: 15px; color: #0f172a;">Project Details &amp; Business Goals:</h3>
      <div class="message-box">${escapeHtml(message || 'No additional message provided.')}</div>
    </div>
    <div class="footer">
      Marsters Digital &bull; Otley, West Yorkshire (LS21) &bull; Cloudflare Pages Function Handler
    </div>
  </div>
</body>
</html>
    `;

    // Check Resend API Key
    const apiKey = env && env.RESEND_API_KEY;
    if (!apiKey) {
      console.warn('RESEND_API_KEY environment variable is not configured. Email payload logged to console.');
      console.log('Submission:', { formType, name, business, email, phone, currentWebsite, socials, message });
      return new Response(
        JSON.stringify({
          ok: true,
          devMode: true,
          message: 'Enquiry received successfully (demo/development mode active).',
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Call Resend API
    const resendPayload = {
      from: 'Marsters Digital Website <website@marstersdigital.com>',
      to: ['info@marstersdigital.com'],
      reply_to: email,
      subject: subject,
      html: emailHtml,
    };

    if (attachments.length > 0) {
      resendPayload.attachments = attachments;
    }

    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(resendPayload),
    });

    if (!resendResponse.ok) {
      const errText = await resendResponse.text();
      console.error('Resend API error:', resendResponse.status, errText);
      return new Response(
        JSON.stringify({ ok: false, error: 'Failed to send enquiry via email service.' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const result = await resendResponse.json();
    return new Response(
      JSON.stringify({ ok: true, id: result.id }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    console.error('Contact function error:', err);
    return new Response(
      JSON.stringify({ ok: false, error: err.message || 'An unexpected error occurred.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
