import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { name, location, comment } = await req.json();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO,
      subject: "📝 New Service Comment Received",
      html: `
        <div style="font-family: sans-serif; padding: 20px;">
          <h2>New Client Comment</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Location:</strong> ${location}</p>
          <p><strong>Comment:</strong></p>
          <div style="background:#f5f5f5;padding:15px;border-radius:6px;">
            ${comment}
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Send Comment Error:", error.message);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
