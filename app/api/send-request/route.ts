import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { name, email, phone, region, town, serviceType, priority, timeline, message } = data;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // 1. THE TEAM'S MESSAGE (Internal Action Required)
    const teamMail = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO,
      subject: `[ACTION REQUIRED] ${priority.toUpperCase()}: ${serviceType} - ${name}`,
      html: `
        <div style="font-family: 'Segoe UI', sans-serif; color: #333; max-width: 600px; border: 1px solid #002147;">
          <div style="background-color: #002147; color: white; padding: 20px;">
            <h2 style="margin: 0;">New Service Lead</h2>
            <p style="margin: 0; opacity: 0.8;">SIS Technical Department</p>
          </div>
          <div style="padding: 25px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Client:</strong></td><td style="padding: 10px; border-bottom: 1px solid #eee;">${name}</td></tr>
              <tr><td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Service:</strong></td><td style="padding: 10px; border-bottom: 1px solid #eee;">${serviceType}</td></tr>
              <tr><td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Priority:</strong></td><td style="padding: 10px; border-bottom: 1px solid #eee; color: ${priority === 'emergency' ? 'red' : '#002147'}; font-weight: bold;">${priority.toUpperCase()}</td></tr>
              <tr><td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Timeline:</strong></td><td style="padding: 10px; border-bottom: 1px solid #eee;">${timeline}</td></tr>
              <tr><td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Location:</strong></td><td style="padding: 10px; border-bottom: 1px solid #eee;">${town}, ${region}</td></tr>
              <tr><td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Contact:</strong></td><td style="padding: 10px; border-bottom: 1px solid #eee;">${phone} | ${email}</td></tr>
            </table>
            <div style="margin-top: 20px; padding: 15px; background: #f4f4f4; border-radius: 8px;">
              <strong>Project Requirements:</strong><br />${message}
            </div>
          </div>
        </div>
      `,
    };

    // 2. THE CLIENT'S MESSAGE (Reassurance & Professionalism)
    const clientMail = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `We've Received Your Request - SIS Solutions`,
      html: `
        <div style="font-family: 'Segoe UI', sans-serif; color: #444; max-width: 600px; margin: auto;">
          <div style="text-align: center; padding: 40px 20px;">
            <h1 style="color: #002147; margin: 0; font-size: 28px;">SIS SOLUTIONS</h1>
            <p style="color: #666; font-size: 14px; text-transform: uppercase; letter-spacing: 2px;">Engineering & Technical Services</p>
          </div>
          <div style="padding: 0 20px;">
            <p>Dear <strong>${name}</strong>,</p>
            <p>Thank you for initiating a service request with SIS Solutions. Our technical team in the <strong>${region} Region</strong> has been alerted to your requirements for <strong>${serviceType}</strong>.</p>
            
            <div style="border-left: 4px solid #002147; padding-left: 20px; margin: 30px 0; color: #555;">
              <h4 style="margin: 0; color: #002147;">What happens next?</h4>
              <ol style="padding-left: 20px;">
                <li><strong>Assessment:</strong> An engineer is assigned to review your technical brief.</li>
                <li><strong>Consultation:</strong> We will reach out via <strong>${phone}</strong> if we need more clarity.</li>
                <li><strong>Quotation:</strong> You will receive a formal proposal for the works.</li>
              </ol>
            </div>

            <p>If this is an emergency outage, please call our 24/7 hotline directly.</p>
            <p style="margin-top: 40px;">Best regards,<br /><strong>The Technical Support Team</strong><br />SIS Solutions</p>
          </div>
          <div style="background: #f9f9f9; padding: 20px; text-align: center; font-size: 12px; color: #999; margin-top: 40px;">
            This is an automated response to confirm receipt of your request. Please do not reply directly to this email.
          </div>
        </div>
      `,
    };

    // Send both
    await Promise.all([
      transporter.sendMail(teamMail),
      transporter.sendMail(clientMail)
    ]);

    return NextResponse.json({ message: "Emails Dispatched" }, { status: 200 });
  } catch (error: any) {
    console.error("Transmission Error:", error.message);
    return NextResponse.json({ error: "System failure during dispatch" }, { status: 500 });
  }
}