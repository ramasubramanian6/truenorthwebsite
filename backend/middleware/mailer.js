const nodemailer = require('nodemailer');

// Emails the team when a website enquiry arrives. Configure with the SMTP_*
// and NOTIFY_TO variables (see .env.example). Without them it logs and skips,
// so the enquiry is still saved.

let transporter;
const getTransporter = () => {
  if (transporter !== undefined) return transporter;
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    transporter = null;
    return transporter;
  }
  const port = Number(SMTP_PORT) || 465;
  transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: port === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
    connectionTimeout: 8000,
    greetingTimeout: 8000,
    socketTimeout: 8000,
  });
  return transporter;
};

const escape = (s = '') =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

// The form also writes "Service:" and "Phone:" lines at the top of the message
// (for the old admin screen, which shows only the message). They are already
// in the table, so leave them out of the email body.
const messageBody = (m = '') => {
  const lines = String(m).split('\n');
  while (lines.length && (/^(Service|Phone): /.test(lines[0]) || !lines[0].trim())) lines.shift();
  return lines.join('\n') || m;
};

const buildEnquiryEmail = (c) => {
  const message = messageBody(c.message);
  const rows = [
    ['Name', c.name],
    ['Email', c.email],
    ['Phone', c.phone],
    ['Company', c.company],
    ['Interested in', c.service],
  ].filter(([, v]) => v);

  const text = [
    'New enquiry from truenorthitc.com',
    '',
    ...rows.map(([k, v]) => `${k}: ${v}`),
    '',
    'Message:',
    message,
    '',
    'Reply to this email to answer them directly.',
  ].join('\n');

  const html = `
  <div style="font-family:Arial,Helvetica,sans-serif;max-width:600px;color:#141414">
    <h2 style="margin:0 0 4px;color:#d30812">New website enquiry</h2>
    <p style="margin:0 0 20px;color:#74747d;font-size:13px">From the contact form on truenorthitc.com</p>
    <table style="border-collapse:collapse;width:100%;font-size:14px">
      ${rows.map(([k, v]) => `<tr><td style="padding:6px 12px 6px 0;color:#74747d;white-space:nowrap;vertical-align:top">${k}</td><td style="padding:6px 0;font-weight:bold">${escape(v)}</td></tr>`).join('')}
    </table>
    <div style="margin-top:20px;padding:16px;background:#fdecec;border-radius:10px;font-size:14px;line-height:1.6;white-space:pre-wrap">${escape(message)}</div>
    <p style="margin-top:20px;color:#74747d;font-size:12px">Reply to this email to answer ${escape(c.name)} directly.</p>
  </div>`;

  return {
    subject: `New enquiry: ${c.name}${c.company ? ` (${c.company})` : ''}${c.service ? ` - ${c.service}` : ''}`,
    text,
    html,
  };
};

// The visitor's acknowledgement. It is a fixed message: only their first name
// is used and their message is not echoed back, so the form cannot be used to
// send someone else arbitrary text.
const SUPPORT = {
  email: 'support@truenorthitc.com',
  phone: '+91 95665 56056',
  whatsapp: 'https://wa.me/919566556056',
  site: 'https://truenorthitc.com',
};

const firstName = (name = '') => String(name).trim().split(/\s+/)[0].slice(0, 30) || 'there';

const buildAcknowledgementEmail = (c) => {
  const name = firstName(c.name);
  const text = [
    `Hi ${name},`,
    '',
    'Thank you for contacting True North IT Consulting. We have received your message and a member of our team will reply within one working day.',
    '',
    'If it is urgent, call or WhatsApp us on ' + SUPPORT.phone + '.',
    '',
    'Regards,',
    'The True North Team',
    'True North IT Consulting',
    SUPPORT.site,
    '',
    'You are receiving this because this address was entered on the contact form at truenorthitc.com. If that was not you, please ignore this email.',
  ].join('\n');

  const html = `
  <div style="font-family:Arial,Helvetica,sans-serif;max-width:600px;color:#141414;font-size:15px;line-height:1.6">
    <p style="margin:0 0 6px;font-size:18px;font-weight:bold">True North <span style="color:#d30812;font-size:12px;letter-spacing:2px">IT CONSULTING</span></p>
    <div style="height:3px;width:56px;background:#d30812;margin:0 0 24px"></div>
    <p>Hi ${escape(name)},</p>
    <p>Thank you for contacting True North IT Consulting. We have received your message and a member of our team will reply <strong>within one working day</strong>.</p>
    <p>If it is urgent, call us on <a href="tel:+919566556056" style="color:#d30812">${SUPPORT.phone}</a> or <a href="${SUPPORT.whatsapp}" style="color:#d30812">chat with us on WhatsApp</a>.</p>
    <p style="margin-top:28px">Regards,<br><strong>The True North Team</strong><br><a href="${SUPPORT.site}" style="color:#d30812">truenorthitc.com</a></p>
    <p style="margin-top:32px;color:#74747d;font-size:12px">You are receiving this because this address was entered on the contact form at truenorthitc.com. If that was not you, please ignore this email.</p>
  </div>`;

  return { subject: 'We have received your message | True North IT Consulting', text, html };
};

/** Never throws: a failed email must not fail the enquiry. Returns true if sent. */
const notifyNewEnquiry = async (contact) => {
  const t = getTransporter();
  if (!t) {
    console.warn('Enquiry email skipped: SMTP_HOST, SMTP_USER and SMTP_PASS are not set.');
    return false;
  }
  const { subject, text, html } = buildEnquiryEmail(contact);
  try {
    await t.sendMail({
      from: process.env.MAIL_FROM || `"True North Website" <${process.env.SMTP_USER}>`,
      to: process.env.NOTIFY_TO || 'support@truenorthitc.com',
      replyTo: { name: contact.name, address: contact.email },
      subject,
      text,
      html,
    });
    return true;
  } catch (err) {
    console.error('Enquiry email failed:', err.message);
    return false;
  }
};

/** Never throws. Sends the visitor a short "we got your message" email. */
const acknowledgeEnquiry = async (contact) => {
  const t = getTransporter();
  if (!t) return false;
  const { subject, text, html } = buildAcknowledgementEmail(contact);
  try {
    await t.sendMail({
      from: process.env.MAIL_FROM || `"True North IT Consulting" <${process.env.SMTP_USER}>`,
      to: contact.email,
      replyTo: process.env.REPLY_TO || SUPPORT.email,
      subject,
      text,
      html,
    });
    return true;
  } catch (err) {
    console.error('Acknowledgement email failed:', err.message);
    return false;
  }
};

module.exports = { notifyNewEnquiry, acknowledgeEnquiry, buildEnquiryEmail, buildAcknowledgementEmail };
