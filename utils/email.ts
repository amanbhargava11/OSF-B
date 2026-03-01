import { Resend } from 'resend';

// Initialize Resend with the provided API key or environment variable
const resend = new Resend(process.env.RESEND_API_KEY || 're_h8f2Pd21_HktFo9CqPxKYwcY4yFctjfwo');

export const sendAuditRequestEmail = async (data: {
  name: string;
  email: string;
  service: string;
  message: string;
}) => {
  try {
    const adminEmail = process.env.ADMIN_EMAIL || 'info@ourstartupfreelancer.com';
    // When using Resend for testing without a verified domain, use onboarding@resend.dev as the from address.
    // In production, you would configure a verified domain.
    const fromAddress = process.env.EMAIL_FROM || 'OSF Team <onboarding@resend.dev>';

    // Email to admin
    await resend.emails.send({
      from: fromAddress,
      to: adminEmail,
      subject: `🎯 New Audit Request from ${data.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #0f172a; color: #e2e8f0;">
          <div style="background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); padding: 30px; border-radius: 12px; margin-bottom: 20px;">
            <h1 style="color: white; margin: 0; font-size: 24px;">New Audit Request</h1>
          </div>
          <div style="background: #1e293b; padding: 20px; border-radius: 8px; border: 1px solid #334155;">
            <p style="margin: 10px 0;"><strong style="color: #6366f1;">Name:</strong> <span style="color: #e2e8f0;">${data.name}</span></p>
            <p style="margin: 10px 0;"><strong style="color: #6366f1;">Email:</strong> <span style="color: #e2e8f0;">${data.email}</span></p>
            <p style="margin: 10px 0;"><strong style="color: #6366f1;">Service:</strong> <span style="color: #e2e8f0;">${data.service}</span></p>
            <div style="margin: 20px 0; padding: 15px; background: #0f172a; border-radius: 6px; border-left: 4px solid #6366f1;">
              <p style="margin: 0 0 10px 0; color: #94a3b8; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Message</p>
              <p style="margin: 0; color: #e2e8f0; white-space: pre-wrap;">${data.message.replace(/\n/g, '<br>')}</p>
            </div>
            <a href="mailto:${data.email}" style="display: inline-block; margin-top: 20px; padding: 12px 24px; background: #6366f1; color: white; text-decoration: none; border-radius: 6px; font-weight: bold;">Reply to ${data.name}</a>
          </div>
        </div>
      `,
      text: `
New Audit Request

Name: ${data.name}
Email: ${data.email}
Service: ${data.service}

Message:
${data.message}

---
Reply to: ${data.email}
      `,
    });

    // Confirmation email to user
    await resend.emails.send({
      from: fromAddress,
      to: data.email,
      subject: '✅ Your Audit Request Has Been Received',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #0f172a; color: #e2e8f0;">
          <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 30px; border-radius: 12px; margin-bottom: 20px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px;">Request Received!</h1>
          </div>
          <div style="background: #1e293b; padding: 20px; border-radius: 8px; border: 1px solid #334155;">
            <p style="color: #e2e8f0; line-height: 1.6;">Hi ${data.name},</p>
            <p style="color: #e2e8f0; line-height: 1.6;">Thank you for requesting a free audit. Our strategy team has received your brief and will review it carefully.</p>
            <p style="color: #e2e8f0; line-height: 1.6;"><strong>What happens next?</strong></p>
            <ul style="color: #e2e8f0; line-height: 1.8;">
              <li>Our team will analyze your requirements</li>
              <li>We'll prepare a customized audit and roadmap</li>
              <li>You'll receive a response within 24 hours</li>
            </ul>
            <div style="margin: 30px 0; padding: 15px; background: #0f172a; border-radius: 6px; border-left: 4px solid #10b981;">
              <p style="margin: 0; color: #94a3b8; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Your Request</p>
              <p style="margin: 5px 0 0 0; color: #e2e8f0;"><strong>Service:</strong> ${data.service}</p>
            </div>
            <p style="color: #94a3b8; font-size: 14px; margin-top: 30px;">If you have any urgent questions, feel free to reach out directly:</p>
            <p style="color: #6366f1; font-weight: bold;">info@ourstartupfreelancer.com</p>
          </div>
        </div>
      `,
      text: `
Request Received!

Hi ${data.name},

Thank you for requesting a free audit. Our strategy team has received your brief and will review it carefully.

What happens next?
- Our team will analyze your requirements
- We'll prepare a customized audit and roadmap
- You'll receive a response within 24 hours

Your Request:
Service: ${data.service}

If you have any urgent questions, feel free to reach out directly:
info@ourstartupfreelancer.com
      `,
    });

    return { success: true, message: 'Emails sent successfully' };
  } catch (error: any) {
    console.error('Email sending error:', error);
    // Don't fail the request if email fails - still save to DB
    return { success: false, message: error.message || 'Email sending failed' };
  }
};

export const sendWorkWithUsEmail = async (data: {
  name: string;
  email: string;
  company: string;
  role: string;
  message: string;
}) => {
  try {
    const adminEmail = process.env.ADMIN_EMAIL || 'info@ourstartupfreelancer.com';
    const fromAddress = process.env.EMAIL_FROM || 'OSF Team <onboarding@resend.dev>';

    // Email to admin
    await resend.emails.send({
      from: fromAddress,
      to: adminEmail,
      subject: `🚀 New Work With Us Inquiry from ${data.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #0f172a; color: #e2e8f0;">
          <div style="background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%); padding: 30px; border-radius: 12px; margin-bottom: 20px;">
            <h1 style="color: white; margin: 0; font-size: 24px;">New Work With Us Inquiry</h1>
          </div>
          <div style="background: #1e293b; padding: 20px; border-radius: 8px; border: 1px solid #334155;">
            <p style="margin: 10px 0;"><strong style="color: #8b5cf6;">Name:</strong> <span style="color: #e2e8f0;">${data.name}</span></p>
            <p style="margin: 10px 0;"><strong style="color: #8b5cf6;">Email:</strong> <span style="color: #e2e8f0;">${data.email}</span></p>
            <p style="margin: 10px 0;"><strong style="color: #8b5cf6;">Company:</strong> <span style="color: #e2e8f0;">${data.company}</span></p>
            <p style="margin: 10px 0;"><strong style="color: #8b5cf6;">Role:</strong> <span style="color: #e2e8f0;">${data.role}</span></p>
            <div style="margin: 20px 0; padding: 15px; background: #0f172a; border-radius: 6px; border-left: 4px solid #8b5cf6;">
              <p style="margin: 0 0 10px 0; color: #94a3b8; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Project Details</p>
              <p style="margin: 0; color: #e2e8f0; white-space: pre-wrap;">${data.message.replace(/\n/g, '<br>')}</p>
            </div>
            <a href="mailto:${data.email}" style="display: inline-block; margin-top: 20px; padding: 12px 24px; background: #8b5cf6; color: white; text-decoration: none; border-radius: 6px; font-weight: bold;">Reply to ${data.name}</a>
          </div>
        </div>
      `,
      text: `
New Work With Us Inquiry

Name: ${data.name}
Email: ${data.email}
Company: ${data.company}
Role: ${data.role}

Project Details:
${data.message}

---
Reply to: ${data.email}
      `,
    });

    // Confirmation email to user
    await resend.emails.send({
      from: fromAddress,
      to: data.email,
      subject: '✅ Your Inquiry Has Been Received',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #0f172a; color: #e2e8f0;">
          <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 30px; border-radius: 12px; margin-bottom: 20px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px;">Inquiry Received!</h1>
          </div>
          <div style="background: #1e293b; padding: 20px; border-radius: 8px; border: 1px solid #334155;">
            <p style="color: #e2e8f0; line-height: 1.6;">Hi ${data.name},</p>
            <p style="color: #e2e8f0; line-height: 1.6;">Thank you for your interest in working with OSF. Our team has received your inquiry and will review it carefully.</p>
            <p style="color: #e2e8f0; line-height: 1.6;"><strong>What happens next?</strong></p>
            <ul style="color: #e2e8f0; line-height: 1.8;">
              <li>Our team will review your project details</li>
              <li>We'll assess how we can help you scale</li>
              <li>You'll receive a personalized response within 24 hours</li>
            </ul>
            <div style="margin: 30px 0; padding: 15px; background: #0f172a; border-radius: 6px; border-left: 4px solid #10b981;">
              <p style="margin: 0; color: #94a3b8; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Your Inquiry</p>
              <p style="margin: 5px 0 0 0; color: #e2e8f0;"><strong>Company:</strong> ${data.company}</p>
              <p style="margin: 5px 0 0 0; color: #e2e8f0;"><strong>Role:</strong> ${data.role}</p>
            </div>
            <p style="color: #94a3b8; font-size: 14px; margin-top: 30px;">If you have any urgent questions, feel free to reach out directly:</p>
            <p style="color: #8b5cf6; font-weight: bold;">info@ourstartupfreelancer.com</p>
          </div>
        </div>
      `,
      text: `
Inquiry Received!

Hi ${data.name},

Thank you for your interest in working with OSF. Our team has received your inquiry and will review it carefully.

What happens next?
- Our team will review your project details
- We'll assess how we can help you scale
- You'll receive a personalized response within 24 hours

Your Inquiry:
Company: ${data.company}
Role: ${data.role}

If you have any urgent questions, feel free to reach out directly:
info@ourstartupfreelancer.com
      `,
    });

    return { success: true, message: 'Emails sent successfully' };
  } catch (error: any) {
    console.error('Email sending error:', error);
    // Don't fail the request if email fails - still save to DB
    return { success: false, message: error.message || 'Email sending failed' };
  }
};
