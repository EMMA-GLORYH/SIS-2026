import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { personal, expertise, work, intent } = body;

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"SIS Recruitment" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO,
      subject: `New Team Application: ${personal.fullName} (${expertise.discipline})`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; color: #002147;">
          <h2>New Career Application Received</h2>
          <hr />
          <h3>Personal Details</h3>
          <p><strong>Name:</strong> ${personal.fullName}</p>
          <p><strong>Email:</strong> ${personal.email}</p>
          <p><strong>Location:</strong> ${personal.location}</p>
          
          <h3>Professional Profile</h3>
          <p><strong>Discipline:</strong> ${expertise.discipline}</p>
          <p><strong>Experience:</strong> ${expertise.years} years</p>
          <p><strong>Stack:</strong> ${expertise.stack}</p>
          
          <h3>Links</h3>
          <p><strong>LinkedIn:</strong> ${work.linkedin}</p>
          <p><strong>GitHub:</strong> ${work.github || 'N/A'}</p>
          
          <h3>Statement of Intent</h3>
          <p>${intent.whySis}</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    return NextResponse.json({ message: "Email sent successfully" }, { status: 200 });
  } catch (error) {
    console.error("Email Error:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}