import { createClient } from '@sanity/client';

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { name, email, phone, service, message, company } = req.body || {};

  if (company) return res.status(200).json({ ok: true }); // honeypot: silently drop bots
  if (!name?.trim() || !/^\S+@\S+\.\S+$/.test(email || '') ||
    !/^[+\d][\d\s\-().]{6,24}$/.test((phone || '').trim()) || !message?.trim()) {
    return res.status(400).json({ error: 'Invalid input' });
  }

  try {
    await client.create({
      _type: 'projectRequest',
      name: name.trim().slice(0, 100),
      email: email.trim().slice(0, 200),
      phone: phone.trim().slice(0, 30),
      service: (service || '').slice(0, 100),
      message: message.trim().slice(0, 5000),
      submittedAt: new Date().toISOString(),
      status: 'new',
    });
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to save' });
  }
}
