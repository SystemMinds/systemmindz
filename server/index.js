require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const express = require('express');
const cors = require('cors');
const path = require('path');
const { sendEmail } = require('./emailService');

const app = express();
const PORT = process.env.SERVER_PORT || 4000;

console.log('[server] ZEPTO_API_KEY loaded:', process.env.ZEPTO_API_KEY ? `YES (${process.env.ZEPTO_API_KEY.slice(0, 10)}...)` : 'MISSING');
console.log('[server] ZEPTO_FROM_EMAIL:', process.env.ZEPTO_FROM_EMAIL || 'MISSING');

app.use(cors());
app.use(express.json());

/**
 * POST /api/contact
 * Sends contact form submission via Zepto Mail.
 * Sends to company inbox; CCs the enquirer.
 */
app.post('/api/contact', async (req, res) => {
    const { firstName, lastName, email, phone, message, services } = req.body;

    if (!firstName || !email || !message) {
        return res.status(400).json({ sent: false, error: 'First name, email and message are required.' });
    }

    const fullName = [firstName, lastName].filter(Boolean).join(' ');
    const servicesList = Array.isArray(services) && services.length > 0 ? services.join(', ') : null;

    const enquirySubject = `New Enquiry from ${fullName} — SystemMindz`;

    const enquiryHtml = `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#ffffff;font-family:Arial,sans-serif;color:#333333;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:40px auto;">
    <tr>
      <td style="padding:0 0 24px 0;border-bottom:2px solid #333333;">
        <span style="font-size:20px;font-weight:700;color:#333333;">SystemMindz</span>
      </td>
    </tr>
    <tr>
      <td style="padding:28px 0 8px 0;">
        <p style="margin:0;font-size:13px;color:#888888;text-transform:uppercase;letter-spacing:1px;">New Contact Enquiry</p>
        <h2 style="margin:8px 0 0 0;font-size:22px;color:#111111;">You have a new message</h2>
      </td>
    </tr>
    <tr>
      <td style="padding:24px 0 0 0;">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td style="padding:12px 0;border-top:1px solid #eeeeee;font-size:12px;color:#888888;text-transform:uppercase;letter-spacing:1px;width:120px;vertical-align:top;">Name</td>
            <td style="padding:12px 0;border-top:1px solid #eeeeee;font-size:15px;color:#111111;font-weight:600;">${fullName}</td>
          </tr>
          <tr>
            <td style="padding:12px 0;border-top:1px solid #eeeeee;font-size:12px;color:#888888;text-transform:uppercase;letter-spacing:1px;vertical-align:top;">Email</td>
            <td style="padding:12px 0;border-top:1px solid #eeeeee;font-size:15px;color:#111111;">${email}</td>
          </tr>
          ${phone ? `
          <tr>
            <td style="padding:12px 0;border-top:1px solid #eeeeee;font-size:12px;color:#888888;text-transform:uppercase;letter-spacing:1px;vertical-align:top;">Phone</td>
            <td style="padding:12px 0;border-top:1px solid #eeeeee;font-size:15px;color:#111111;">${phone}</td>
          </tr>` : ''}
          ${servicesList ? `
          <tr>
            <td style="padding:12px 0;border-top:1px solid #eeeeee;font-size:12px;color:#888888;text-transform:uppercase;letter-spacing:1px;vertical-align:top;">Services</td>
            <td style="padding:12px 0;border-top:1px solid #eeeeee;font-size:15px;color:#111111;">${servicesList}</td>
          </tr>` : ''}
          <tr>
            <td style="padding:12px 0;border-top:1px solid #eeeeee;font-size:12px;color:#888888;text-transform:uppercase;letter-spacing:1px;vertical-align:top;">Message</td>
            <td style="padding:12px 0;border-top:1px solid #eeeeee;font-size:15px;color:#333333;line-height:1.6;white-space:pre-wrap;">${message}</td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td style="padding:32px 0 0 0;border-top:1px solid #eeeeee;">
        <p style="margin:0;font-size:12px;color:#aaaaaa;">This message was submitted via the contact form on systemmindz.com</p>
      </td>
    </tr>
  </table>
</body>
</html>`;

    const thankYouHtml = `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#ffffff;font-family:Arial,sans-serif;color:#333333;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:40px auto;">
    <tr>
      <td style="padding:0 0 24px 0;border-bottom:2px solid #333333;">
        <span style="font-size:20px;font-weight:700;color:#333333;">SystemMindz</span>
      </td>
    </tr>
    <tr>
      <td style="padding:32px 0 0 0;">
        <p style="margin:0 0 20px 0;font-size:16px;color:#111111;">Hi ${firstName},</p>
        <p style="margin:0 0 16px 0;font-size:15px;color:#444444;line-height:1.7;">
          Thank you for reaching out to us. We have received your message and will get back to you within <strong>24 hours</strong>.
        </p>
        <p style="margin:0 0 32px 0;font-size:15px;color:#444444;line-height:1.7;">
          If your matter is urgent, you can also reach us directly at
          <a href="mailto:hello@systemmindz.com" style="color:#333333;">hello@systemmindz.com</a>.
        </p>
        <p style="margin:0;font-size:15px;color:#444444;line-height:1.7;">
          Best regards,<br/>
          <strong>Team SystemMindz</strong>
        </p>
      </td>
    </tr>
    <tr>
      <td style="padding:40px 0 0 0;border-top:1px solid #eeeeee;margin-top:40px;">
        <p style="margin:0;font-size:12px;color:#aaaaaa;">SystemMindz · hello@systemmindz.com · systemmindz.com</p>
      </td>
    </tr>
  </table>
</body>
</html>`;

    // Send enquiry to both company owners
    const [r1, r2] = await Promise.all([
        sendEmail('sharanmneeli09@gmail.com', enquirySubject, enquiryHtml),
        sendEmail('mallikarjuns0090@gmail.com', enquirySubject, enquiryHtml),
    ]);

    const sent = r1.sent || r2.sent;

    // Send thank-you acknowledgement to the person who submitted
    if (sent) {
        await sendEmail(email, 'Thank you for reaching out — SystemMindz', thankYouHtml);
    }

    return res.json({ sent, error: sent ? undefined : (r1.error || r2.error) });
});

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, '../dist')));

// SPA Routing: Redirect all other requests to index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(PORT, () => {
    console.log(`[server] API running on http://localhost:${PORT}`);
});
