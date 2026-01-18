import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

export async function POST(request: Request) {
  try {
    const { email, pdfBase64, planData } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    if (!resend) {
      console.log('Resend API key not configured - email would be sent to:', email);
      return NextResponse.json({
        success: true,
        message: 'Email feature not configured. PDF was generated successfully.',
      });
    }

    // Convert base64 to buffer
    const pdfBuffer = Buffer.from(pdfBase64, 'base64');

    const { data, error } = await resend.emails.send({
      from: 'GTM Quest <noreply@gtm.quest>',
      to: email,
      subject: `Your GTM Strategy Plan - ${planData.company_name || 'Strategy'}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #10b981; font-size: 24px; margin-bottom: 20px;">Your GTM Strategy Plan</h1>

          <p style="color: #374151; font-size: 16px; line-height: 1.6;">
            Thank you for using GTM Quest! Your personalized go-to-market strategy plan is attached to this email.
          </p>

          <div style="background-color: #f9fafb; border-radius: 8px; padding: 20px; margin: 20px 0;">
            <h2 style="color: #111827; font-size: 18px; margin-bottom: 15px;">Plan Summary</h2>
            <table style="width: 100%; font-size: 14px;">
              <tr>
                <td style="color: #6b7280; padding: 5px 0;">Company:</td>
                <td style="color: #111827; font-weight: 600;">${planData.company_name || 'Not specified'}</td>
              </tr>
              <tr>
                <td style="color: #6b7280; padding: 5px 0;">Industry:</td>
                <td style="color: #111827; font-weight: 600;">${planData.industry || 'Not specified'}</td>
              </tr>
              <tr>
                <td style="color: #6b7280; padding: 5px 0;">Strategy:</td>
                <td style="color: #10b981; font-weight: 600;">${planData.strategy_type?.replace('_', '-').toUpperCase() || 'Hybrid'}</td>
              </tr>
              <tr>
                <td style="color: #6b7280; padding: 5px 0;">Matched Agencies:</td>
                <td style="color: #111827; font-weight: 600;">${planData.matched_agencies?.length || 0}</td>
              </tr>
            </table>
          </div>

          <p style="color: #374151; font-size: 16px; line-height: 1.6;">
            <strong>Next Steps:</strong>
          </p>
          <ol style="color: #374151; font-size: 14px; line-height: 1.8;">
            <li>Review the attached PDF with your team</li>
            <li>Reach out to 2-3 recommended agencies</li>
            <li>Schedule initial consultations</li>
            <li>Begin implementation within 2 weeks</li>
          </ol>

          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280; font-size: 14px;">
              Need help? Visit <a href="https://gtm.quest" style="color: #10b981;">gtm.quest</a> or reply to this email.
            </p>
          </div>
        </div>
      `,
      attachments: [
        {
          filename: `GTM-Plan-${planData.company_name || 'Strategy'}.pdf`,
          content: pdfBuffer,
        },
      ],
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch (error) {
    console.error('Email API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
