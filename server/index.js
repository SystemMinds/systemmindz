require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sendEmail } = require('./emailService');

const app = express();
const PORT = process.env.SERVER_PORT || 4000;

app.use(cors());
app.use(express.json());

/**
 * POST /api/contact
 * Sends contact form submission via Zepto Mail.
 * Sends to company inbox; CCs the enquirer.
 */
app.post('/api/contact', async (req, res) => {
    const { name, email, company, budget, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ sent: false, error: 'Name, email and message are required.' });
    }

    const subject = `New Enquiry from ${name}${budget ? ` — Budget: ${budget}` : ''}`;

    const htmlBody = `
        <div style="font-family: Arial, sans-serif; line-height: 1.8; color: #222; max-width: 640px;
                    margin: 0 auto; border: 1px solid #e5e5e5; border-radius: 8px; overflow: hidden;">

            <div style="background: #000; padding: 32px 36px;">
                <h1 style="margin: 0; color: #f97316; font-size: 22px; letter-spacing: -0.5px;">
                    SystemMindz
                </h1>
                <p style="margin: 4px 0 0; color: #ffffff80; font-size: 12px; letter-spacing: 2px; text-transform: uppercase;">
                    New Contact Enquiry
                </p>
            </div>

            <div style="padding: 36px;">
                <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                    <tr>
                        <td style="padding: 10px 0; color: #999; width: 120px; vertical-align: top; font-weight: bold; text-transform: uppercase; font-size: 11px; letter-spacing: 1px;">Name</td>
                        <td style="padding: 10px 0; color: #111; font-weight: 600;">${name}</td>
                    </tr>
                    <tr style="border-top: 1px solid #f0f0f0;">
                        <td style="padding: 10px 0; color: #999; vertical-align: top; font-weight: bold; text-transform: uppercase; font-size: 11px; letter-spacing: 1px;">Email</td>
                        <td style="padding: 10px 0;"><a href="mailto:${email}" style="color: #f97316; text-decoration: none;">${email}</a></td>
                    </tr>
                    ${company ? `
                    <tr style="border-top: 1px solid #f0f0f0;">
                        <td style="padding: 10px 0; color: #999; vertical-align: top; font-weight: bold; text-transform: uppercase; font-size: 11px; letter-spacing: 1px;">Company</td>
                        <td style="padding: 10px 0; color: #111;">${company}</td>
                    </tr>` : ''}
                    ${budget ? `
                    <tr style="border-top: 1px solid #f0f0f0;">
                        <td style="padding: 10px 0; color: #999; vertical-align: top; font-weight: bold; text-transform: uppercase; font-size: 11px; letter-spacing: 1px;">Budget</td>
                        <td style="padding: 10px 0;">
                            <span style="background: #f97316; color: #000; padding: 3px 10px; border-radius: 20px; font-size: 12px; font-weight: bold;">
                                ${budget}
                            </span>
                        </td>
                    </tr>` : ''}
                    <tr style="border-top: 1px solid #f0f0f0;">
                        <td style="padding: 10px 0; color: #999; vertical-align: top; font-weight: bold; text-transform: uppercase; font-size: 11px; letter-spacing: 1px;">Message</td>
                        <td style="padding: 10px 0; color: #333; white-space: pre-wrap;">${message}</td>
                    </tr>
                </table>
            </div>

            <div style="background: #f9f9f9; padding: 20px 36px; border-top: 1px solid #eee;">
                <p style="margin: 0; font-size: 11px; color: #aaa; text-transform: uppercase; letter-spacing: 1px;">
                    Sent via SystemMindz Contact Form · hello@systemmindz.com
                </p>
            </div>
        </div>
    `;

    const companyInbox = process.env.CONTACT_RECIPIENT_EMAIL || 'hello@systemmindz.com';

    const result = await sendEmail(
        companyInbox,
        subject,
        htmlBody,
        email  // CC the enquirer so they get a copy
    );

    return res.json(result);
});

app.listen(PORT, () => {
    console.log(`[server] API running on http://localhost:${PORT}`);
});
