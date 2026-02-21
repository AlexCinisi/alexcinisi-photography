import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(request: Request) {
    if (!resend) {
        console.error('RESEND_API_KEY is not set');
        return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    try {
        const body = await request.json();
        const {
            name,
            partnerName,
            email,
            phone,
            weddingDate,
            location,
            guestCount,
            howFound,
            budget,
            vision,
            interests,
            privacyConsent,
            pageUrl,
            referrer,
            userAgent,
            browserLang,
            timeOnPage
        } = body;

        // Basic validation
        if (!name || !email || !privacyConsent) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Tracking data from headers and body
        const city = request.headers.get('x-vercel-ip-city') || 'Unknown';
        const country = request.headers.get('x-vercel-ip-country') || 'Unknown';
        const region = request.headers.get('x-vercel-ip-country-region') || '';

        // UA Parsing
        const isMobile = /Mobile|iPhone|Android/i.test(userAgent || '');
        const deviceType = isMobile ? 'Mobile' : 'Desktop';

        let browserName = 'Other';
        const ua = userAgent || '';
        if (ua.includes('Firefox')) browserName = 'Firefox';
        else if (ua.includes('Edg')) browserName = 'Edge';
        else if (ua.includes('Chrome')) browserName = 'Chrome';
        else if (ua.includes('Safari')) browserName = 'Safari';

        const timestamp = new Date().toLocaleString('en-GB', {
            timeZone: 'Europe/Rome',
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            timeZoneName: 'short'
        });

        // 1. Send notification email to Owner
        const adminEmailContent = `
            <h2>New Wedding Enquiry</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Partner's Name:</strong> ${partnerName || 'Not provided'}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
            <p><strong>Wedding Date:</strong> ${weddingDate || 'Not provided'}</p>
            <p><strong>Location/Venue:</strong> ${location || 'Not provided'}</p>
            <p><strong>Guest Count:</strong> ${guestCount || 'Not provided'}</p>
            <p><strong>Budget:</strong> ${budget || 'Not provided'}</p>
            <p><strong>How they found us:</strong> ${howFound || 'Not provided'}</p>
            <p><strong>Interests:</strong> ${Array.isArray(interests) ? interests.join(', ') : 'None selected'}</p>
            <br/>
            <h3>Vision / Story:</h3>
            <p style="white-space: pre-wrap;">${vision || 'No details provided.'}</p>
            <br/>
            <p>────────────────────────</p>
            <p>📊 <strong>TRACKING DATA</strong></p>
            <p>────────────────────────</p>
            <p>📍 <strong>Client location:</strong> ${city}, ${region}, ${country}</p>
            <p>🌐 <strong>Submitted from:</strong> ${pageUrl || 'unknown'}</p>
            <p>🔗 <strong>Came from:</strong> ${referrer || 'unknown'}</p>
            <p>📱 <strong>Device:</strong> ${deviceType} — ${browserName}</p>
            <p>🗣️ <strong>Browser language:</strong> ${browserLang || 'unknown'}</p>
            <p>⏱️ <strong>Time on page before submitting:</strong> ${timeOnPage || 0} seconds</p>
            <p>🕐 <strong>Submitted at:</strong> ${timestamp}</p>
        `;

        const ownerEmailPromise = resend.emails.send({
            from: 'Alex Cinisi Photography <info@alexcinisiphotography.com>',
            to: ['info@alexcinisiphotography.com'],
            replyTo: email,
            subject: `New Wedding Enquiry — ${name} & ${partnerName || 'Partner'} · ${location || 'Unknown Location'}`,
            html: adminEmailContent,
        });

        // 2. Send auto-reply email to Client
        const clientAutoReplyContent = `
            <div style="font-family: sans-serif; color: #333; max-width: 600px; margin: 0 auto;">
                <h1 style="font-size: 24px; font-weight: normal; margin-bottom: 20px;">Thank you for your enquiry</h1>
                <p>Dear ${name} & ${partnerName || 'Partner'},</p>
                <p>Thank you so much for reaching out! I have received your enquiry and am truly honored that you are considering me to capture your special memories.</p>
                <p>I review every message personally and will get back to you within <strong>24 hours</strong>.</p>
                <p>In the meantime, feel free to browse my latest stories on <a href="https://www.instagram.com/alexcinisi" style="color: #000; text-decoration: underline;">Instagram</a>.</p>
                <br/>
                <p>Warmly,</p>
                <p><strong>Alex Cinisi</strong><br/>
                Alex Cinisi Photography</p>
            </div>
        `;

        const clientEmailPromise = resend.emails.send({
            from: 'Alex Cinisi Photography <info@alexcinisiphotography.com>', // Update with verified domain
            to: [email],
            subject: 'Thank you for your enquiry — Alex Cinisi Photography',
            html: clientAutoReplyContent,
        });

        // Execute both in parallel
        await Promise.all([ownerEmailPromise, clientEmailPromise]);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Email sending failed:', error);
        return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }
}
