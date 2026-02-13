import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(request: Request) {
    if (!resend) {
        console.error('RESEND_API_KEY is not set');
        return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    try {
        const { name, email, message, date, venue } = await request.json();

        const data = await resend.emails.send({
            from: 'Contact Form <onboarding@resend.dev>', // Update this with verified domain later
            to: [process.env.CONTACT_EMAIL_TO || 'info@alexcinisiphotography.com'],
            subject: `New Inquiry from ${name}`,
            text: `
        Name: ${name}
        Email: ${email}
        Date: ${date}
        Venue: ${venue}
        
        Message:
        ${message}
      `,
        });

        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }
}
