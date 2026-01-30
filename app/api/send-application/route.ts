import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { personal, expertise, work, intent } = body;

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      secure: false, 
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Professional Icons (Lucide-inspired CDN icons)
    const iconBase = "https://img.icons8.com/ios-filled/50/3b82f6"; // Blue theme
    const icons = {
      user: `${iconBase}/user-male-circle.png`,
      code: `${iconBase}/code.png`,
      link: `${iconBase}/external-link.png`,
      mail: `${iconBase}/filled-message.png`,
      target: `${iconBase}/goal--v1.png`
    };

    const mailOptions = {
      from: `"SIS Talent Portal" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO,
      subject: `[New Candidate] ${personal.fullName} - ${expertise.discipline}`,
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <style>
            body { margin: 0; padding: 0; background-color: #f4f7fa; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; }
            .wrapper { width: 100%; table-layout: fixed; background-color: #f4f7fa; padding-bottom: 40px; }
            .main { background-color: #ffffff; width: 100%; max-width: 600px; margin: 0 auto; border-spacing: 0; color: #1e293b; border-radius: 16px; overflow: hidden; margin-top: 40px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
            .header { background-color: #002147; padding: 40px 20px; text-align: center; }
            .content { padding: 30px; }
            .section-header { display: flex; align-items: center; margin-bottom: 15px; margin-top: 25px; }
            .icon { width: 18px; height: 18px; margin-right: 10px; vertical-align: middle; }
            .section-title { font-size: 13px; font-weight: 800; color: #3b82f6; text-transform: uppercase; letter-spacing: 1.2px; }
            .data-table { width: 100%; border-collapse: collapse; }
            .data-row td { padding: 8px 0; border-bottom: 1px solid #f1f5f9; font-size: 14px; }
            .label { color: #64748b; width: 120px; font-weight: 500; }
            .value { color: #0f172a; font-weight: 600; }
            .intent-card { background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; margin-top: 15px; color: #334155; font-size: 14px; line-height: 1.6; }
            .btn-container { text-align: center; padding: 40px 0 20px; }
            .button { background-color: #002147; color: #ffffff !important; padding: 16px 32px; text-decoration: none; border-radius: 10px; font-weight: bold; font-size: 14px; transition: all 0.3s ease; }
            .footer { text-align: center; padding: 20px; font-size: 12px; color: #94a3b8; }
          </style>
        </head>
        <body>
          <div class="wrapper">
            <table class="main">
              <tr>
                <td class="header">
                  <h1 style="color: #ffffff; margin: 0; font-size: 22px; font-weight: 900;">SIS SOLUTIONS</h1>
                  <p style="color: #3b82f6; margin: 5px 0 0; font-size: 12px; font-weight: bold; text-transform: uppercase;">Recruitment Intelligence</p>
                </td>
              </tr>
              <tr>
                <td class="content">
                  
                  <table>
                    <tr>
                      <td class="section-header">
                        <img src="${icons.user}" class="icon" alt="user" />
                        <span class="section-title">Candidate Identity</span>
                      </td>
                    </tr>
                  </table>
                  <table class="data-table">
                    <tr class="data-row"><td class="label">Full Name</td><td class="value">${personal.fullName}</td></tr>
                    <tr class="data-row"><td class="label">Email</td><td class="value">${personal.email}</td></tr>
                    <tr class="data-row"><td class="label">Location</td><td class="value">${personal.location}</td></tr>
                    <tr class="data-row"><td class="label">Phone</td><td class="value">${personal.phone}</td></tr>
                  </table>

                  <table>
                    <tr>
                      <td class="section-header">
                        <img src="${icons.code}" class="icon" alt="expertise" />
                        <span class="section-title">Technical Expertise</span>
                      </td>
                    </tr>
                  </table>
                  <table class="data-table">
                    <tr class="data-row"><td class="label">Discipline</td><td class="value">${expertise.discipline}</td></tr>
                    <tr class="data-row"><td class="label">Experience</td><td class="value">${expertise.years} Years</td></tr>
                    <tr class="data-row"><td class="label">Stack</td><td class="value">${expertise.stack}</td></tr>
                  </table>

                  <table>
                    <tr>
                      <td class="section-header">
                        <img src="${icons.link}" class="icon" alt="links" />
                        <span class="section-title">Professional Links</span>
                      </td>
                    </tr>
                  </table>
                  <div style="margin-top: 10px;">
                    <a href="${work.linkedin}" style="color: #3b82f6; font-size: 13px; font-weight: 600; text-decoration: none; margin-right: 15px;">LinkedIn Profile</a>
                    ${work.github ? `<a href="${work.github}" style="color: #3b82f6; font-size: 13px; font-weight: 600; text-decoration: none;">GitHub Repository</a>` : ''}
                  </div>

                  <table>
                    <tr>
                      <td class="section-header">
                        <img src="${icons.target}" class="icon" alt="intent" />
                        <span class="section-title">Candidate Statement</span>
                      </td>
                    </tr>
                  </table>
                  <div class="intent-card">
                    "${intent.whySis}"
                  </div>

                  <div class="btn-container">
                    <a href="https://yourwebsite.com/admin" class="button">Access Full Profile</a>
                  </div>

                </td>
              </tr>
              <tr>
                <td class="footer">
                  Automated notification from SIS recruitment system.<br>
                  Confidential Candidate Data &copy; ${new Date().getFullYear()}
                </td>
              </tr>
            </table>
          </div>
        </body>
        </html>
      `,
    };

    await transporter.sendMail(mailOptions);
    return NextResponse.json({ message: "Email sent successfully" }, { status: 200 });
  } catch (error) {
    console.error("Email Error:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}