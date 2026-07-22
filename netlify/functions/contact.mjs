export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Method not allowed." }),
    };
  }

  try {
    const payload = JSON.parse(event.body || '{}');
    const clean = (value) => String(value ?? '').replace(/[\r\n]/g, ' ').trim();
    const name = clean(payload.name);
    const email = clean(payload.email);
    const mobile = clean(payload.mobile);
    const venue = clean(payload.venue);
    const location = clean(payload.location);
    const venueType = clean(payload.venueType);
    const enquiryType = clean(payload.enquiryType);
    const message = String(payload.message ?? '').trim();
    const website = clean(payload.website);

    if (website) {
      return {
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ok: true }),
      };
    }

    if (!name || !email || !message) {
      return {
        statusCode: 400,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ error: "Name, email and message are required." }),
      };
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return {
        statusCode: 400,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ error: "A valid email address is required." }),
      };
    }

    const limits = { name: 100, email: 254, mobile: 30, venue: 120, location: 100, venueType: 80, enquiryType: 100, message: 3000 };
    const values = { name, email, mobile, venue, location, venueType, enquiryType, message };
    if (Object.entries(values).some(([key, value]) => value.length > limits[key])) {
      return {
        statusCode: 400,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ error: "One or more fields are too long." }),
      };
    }

    const apiKey = process.env.MAILGUN_API_KEY;
    const domain = process.env.MAILGUN_DOMAIN;
    const to = process.env.CONTACT_TO;
    const apiBase = (process.env.MAILGUN_API_BASE || 'https://api.mailgun.net/v3').replace(/\/$/, '');
    const from = process.env.CONTACT_FROM || `Website Enquiry <website@${domain}>`;

    if (!apiKey || !domain || !to) {
      return {
        statusCode: 500,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          error: "The enquiry service is temporarily unavailable. Please email us directly.",
        }),
      };
    }

    const data = new URLSearchParams();
    data.append('from', from);
    data.append('to', to);
    data.append('h:Reply-To', email);
    data.append('subject', `High Voltage Gaming Systems enquiry from ${name}`);
    data.append(
      'text',
      [
        `Name: ${name}`,
        `Email: ${email}`,
        `Mobile: ${mobile || 'Not supplied'}`,
        `Venue: ${venue || 'Not supplied'}`,
        `Location: ${location || 'Not supplied'}`,
        `Venue type: ${venueType || 'Not supplied'}`,
        `Enquiry type: ${enquiryType || 'Not supplied'}`,
        '',
        message,
      ].join('\n'),
    );

    const auth = Buffer.from(`api:${apiKey}`).toString('base64');
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);
    const response = await fetch(`${apiBase}/${domain}/messages`, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: data.toString(),
      signal: controller.signal,
    }).finally(() => clearTimeout(timeout));

    if (!response.ok) {
      return {
        statusCode: 502,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ error: 'Your enquiry could not be sent. Please email us directly.' }),
      };
    }

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ok: true }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: 'Your enquiry could not be sent. Please email us directly.' }),
    };
  }
}
