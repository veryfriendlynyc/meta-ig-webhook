module.exports = async (req, res) => {
  try {
    if (req.method === 'GET') {
      const VERIFY_TOKEN = process.env.VERIFY_TOKEN || 'veryfriendly-secret-123';
      const mode = req.query['hub.mode'];
      const token = req.query['hub.verify_token'];
      const challenge = req.query['hub.challenge'];

      if (mode === 'subscribe' && token === VERIFY_TOKEN) {
        return res.status(200).send(challenge);
      }
      return res.status(403).send('Forbidden');
    }

    if (req.method === 'POST') {
      console.log('Webhook POST body:', JSON.stringify(req.body, null, 2));
      return res.status(200).send('ok');
    }

    res.setHeader('Allow', 'GET, POST');
    res.status(405).send('Method Not Allowed');
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};
