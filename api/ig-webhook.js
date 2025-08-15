export default function handler(req, res) {
  if (req.method === 'GET') {
    // Verification handshake — Meta calls this when you first set up the webhook
    const VERIFY_TOKEN = process.env.VERIFY_TOKEN || 'veryfriendly-secret-123'; // pick any string you want
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (mode && token && mode === 'subscribe' && token === VERIFY_TOKEN) {
      console.log('Webhook verified');
      res.status(200).send(challenge);
    } else {
      res.sendStatus(403);
    }
  } else if (req.method === 'POST') {
    // This handles actual webhook data from Instagram
    console.log('Incoming webhook:', JSON.stringify(req.body, null, 2));
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
}
