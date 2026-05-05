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
          error: "Mailgun environment variables are missing. Add MAILGUN_API_KEY, MAILGUN_DOMAIN and CONTACT_TO.",
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
        `Enquiry type: ${enquiryType || 'Not supplied'}`,
        '',
        message,
      ].join('\n'),
    );

    const auth = Buffer.from(`api:${apiKey}`).toString('base64');
    const response = await fetch(`${apiBase}/${domain}/messages`, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: data.toString(),
    });

    if (!response.ok) {
      const text = await response.text();
      return {
        statusCode: 502,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ error: text || 'Mailgun request failed.' }),
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
      body: JSON.stringify({ error: error instanceof Error ? error.message : 'Unexpected error.' }),
    };
  }
}
