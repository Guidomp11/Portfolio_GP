const {OAuth2Client} = require('google-auth-library');
require('dotenv').config();
const axios = require('axios');

const client = new OAuth2Client({
    clientId: process.env.CLIENT_ID
});

module.exports = async function(token) {
    const ticket = await client.verifyIdToken({
      audience: process.env.CLIENT_ID,  
      idToken: token
    })
    .then(decodedToken => {
      return decodedToken;
    })
    .catch(error => console.log(error));  

    const payload = ticket.getPayload();

    let data = await axios.get(`https://oauth2.googleapis.com/tokeninfo?id_token=${token}`)
    .then(result => {
        return result;
    })
    .catch(error => console.log(error)); 

    return ticket;
}