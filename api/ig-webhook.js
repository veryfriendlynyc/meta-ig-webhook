// api/ig-webhook.js  (CommonJS; no env vars to avoid confusion)
const VERIFY_TOKEN = 'very-friendly-secret'; // <-- use this EXACT string in Meta too

module.exports = async (req, res) => {
  try {
    if (req.method === 'GET') {
      const mode = req.query && req.query['hub.mode'];
      const token = req.query && req.query['hub.verify_token'];
      const challenge = req.query && req.query['hub.challenge'];

      if (mode === 'subscribe' && token === VERIFY_TOKEN) {
        return res.status(200).send(challenge);
      }
      return res.status(403).send('Forbidden');
    }

    if (req.method === 'POST') {
      console.log('IG webhook POST:', JSON.stringify(req.body || {}, null, 2));
      return res.status(200).send('ok');
    }

    res.setHeader('Allow', 'GET, POST');
    return res.status(405).send('Method Not Allowed');
  } catch (err) {
    console.error('Webhook error:', err);
    return res.status(500).send('Internal Server Error');
  }
};
