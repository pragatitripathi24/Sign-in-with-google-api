const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { OAuth2Client } = require('google-auth-library');

const app = express();
const port = 9002;
const client = new OAuth2Client('802852813018-k29a6gd2rd0e71na3umbjnjfdgiqorak.apps.googleusercontent.com');

app.use(cors());

app.use(bodyParser.json());

app.post('/google-login', async (req, res) => {
  const { token } = req.body;
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: '802852813018-k29a6gd2rd0e71na3umbjnjfdgiqorak.apps.googleusercontent.com'
    });
    const payload = ticket.getPayload();
    
    const user = {
      id: payload.sub,
      email: payload.email,
      name: payload.name,
      profileImage: payload.picture  // Make sure this line is present
    };

    res.status(200).json({ user });
  } catch (error) {
    console.error('Error verifying Google token', error);
    res.status(500).json({ error: 'Failed to authenticate token' });
  }
});


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
